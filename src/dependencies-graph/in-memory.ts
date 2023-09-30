import type {
	DependenciesGraphCollections,
	DependenciesGraphGlobals,
	DependencyGraphNode,
	DependencyGraphResource,
	DependencySchema,
} from '../types';
import { DependenciesGraphBase } from './base';

export class InMemoryDependenciesGraph extends DependenciesGraphBase {
	private collections: DependenciesGraphCollections = {};
	private globals: DependenciesGraphGlobals = {};

	static getProjection(schemas?: DependencySchema[]): Record<string, number> {
		return {
			_id: 1,
			...(schemas || []).reduce((acc, dep) => {
				/**
				 * Projections in MongoDB doesn't need the
				 * asterisk character.
				 */
				let path = dep.path.replaceAll('.*.', '.');
				path = path.replaceAll('.*', '');

				return {
					...acc,
					[path]: 1,
				};
			}, {}),
		};
	}

	static compareResources(a: DependencyGraphResource, b: DependencyGraphResource): boolean {
		return a.global === b.global && a.collection === b.collection && a.id === b.id;
	}

	getDependencyGraphNode(resource: DependencyGraphResource): DependencyGraphNode | undefined {
		if (resource.global === undefined && resource.collection === undefined) {
			throw new Error('You have to provide a global or a collection for the resource.');
		}

		if (
			resource.collection &&
			this.collections[resource.collection] &&
			this.collections[resource.collection][resource.id]
		) {
			return this.collections[resource.collection][resource.id];
		}
		if (resource.global && this.globals[resource.global!]) {
			return this.globals[resource.global!];
		}

		return undefined;
	}

	/**
	 * Extracts dependency graph node, and if it doesn't exist, it will create it.
	 *
	 * @param resource
	 * @returns
	 */
	safeGetDependencyGraphNode(resource: DependencyGraphResource): DependencyGraphNode {
		if (resource.global === undefined && resource.collection === undefined) {
			throw new Error('You have to provide a global or a collection for the resource.');
		}

		if (resource.collection) {
			if (this.collections[resource.collection] === undefined) {
				this.collections[resource.collection] = {};
			}

			const ref: any = this.collections[resource.collection];

			if (ref[resource.id] === undefined) {
				ref[resource.id] = {
					dependentOn: [],
					dependencyFor: [],
				};
			}

			return ref[resource.id];
		}
		if (this.globals[resource.global!] === undefined) {
			this.globals[resource.global!] = {
				dependentOn: [],
				dependencyFor: [],
			};
		}

		return this.globals[resource.global!];
	}

	deleteResource(resource: DependencyGraphResource): void {
		const resourceNode = this.getDependencyGraphNode(resource);

		if (resourceNode === undefined) {
			return;
		}

		for (const dep of resourceNode.dependentOn) {
			const depNode = this.getDependencyGraphNode(dep);
			if (depNode) {
				depNode.dependencyFor = depNode.dependencyFor.filter(
					(item) => !InMemoryDependenciesGraph.compareResources(item, resource),
				);
			}
		}

		for (const dep of resourceNode.dependencyFor) {
			const depNode = this.getDependencyGraphNode(dep);
			if (depNode) {
				depNode.dependentOn = depNode.dependentOn.filter(
					(item) => !InMemoryDependenciesGraph.compareResources(item, resource),
				);
			}
		}

		if (resource.collection) {
			delete this.collections[resource.collection][resource.id];
		} else if (resource.global) {
			delete this.globals[resource.global];
		}
	}

	/**
	 * Add target as a dependency to source
	 *
	 * @param source
	 * @param target
	 */
	addDependency(source: DependencyGraphResource, target: DependencyGraphResource): void {
		const sourceNode = this.safeGetDependencyGraphNode(source);

		if (
			!sourceNode.dependentOn.find((r) =>
				InMemoryDependenciesGraph.compareResources(r, target),
			)
		) {
			sourceNode.dependentOn.push(target);
		}

		const targetNode = this.safeGetDependencyGraphNode(target);

		if (
			targetNode.dependencyFor.find((r) =>
				InMemoryDependenciesGraph.compareResources(r, source),
			) === undefined
		) {
			targetNode.dependencyFor.push(source);
		}
	}

	purgeDependentOn(resource: DependencyGraphResource): void {
		const resourceNode = this.getDependencyGraphNode(resource);

		if (resourceNode === undefined) {
			return;
		}

		const dependentOn = [...resourceNode.dependentOn];
		resourceNode.dependentOn = [];

		for (const dep of dependentOn) {
			const depNode = this.getDependencyGraphNode(dep);
			if (depNode) {
				depNode.dependencyFor = depNode.dependencyFor.filter(
					(item) => !InMemoryDependenciesGraph.compareResources(item, resource),
				);
			}
		}
	}

	isDirectDependency(source: DependencyGraphResource, target: DependencyGraphResource): boolean {
		const sourceNode = this.getDependencyGraphNode(source);

		if (sourceNode === undefined) {
			return false;
		}

		return sourceNode.dependentOn.reduce(
			(result, resource) =>
				result || InMemoryDependenciesGraph.compareResources(resource, target),
			false,
		);
	}

	isDependency(source: DependencyGraphResource, target: DependencyGraphResource): boolean {
		if (this.isDirectDependency(source, target)) {
			return true;
		}
		const sourceNode = this.getDependencyGraphNode(source);

		if (sourceNode === undefined) {
			return false;
		}

		if (sourceNode.dependentOn.length > 0) {
			return sourceNode.dependentOn.reduce(
				(result, dep) => result || this.isDependency(dep, target),
				false,
			);
		}
		return false;
	}
}
