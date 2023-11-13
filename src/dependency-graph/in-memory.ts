import type {
	DependencyGraphCollections,
	DependencyGraphGlobals,
	DependencyGraphNode,
	DependencyGraphResource,
} from '../types';
import { DependencyGraphResourceSet } from '../utils/set';
import { DependencyGraphBase } from './base';

export class InMemoryDependencyGraph extends DependencyGraphBase {
	private collections: DependencyGraphCollections = {};
	private globals: DependencyGraphGlobals = {};

	/**
	 * Compares two resources with each other
	 *
	 * @param first
	 * @param second
	 * @returns `true` if the resources are the same, `false` otherwise
	 */
	static compareResources(
		first: DependencyGraphResource,
		second: DependencyGraphResource,
	): boolean {
		return (
			first.global === second.global &&
			first.collection === second.collection &&
			first.id === second.id
		);
	}

	/**
	 * Extracts the node from the dependency graph.
	 *
	 * @param resource
	 * @returns `DependencyGraphNode`, if doesn't exists it will be `undefined`
	 */
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
					(item) => !InMemoryDependencyGraph.compareResources(item, resource),
				);
			}
		}

		for (const dep of resourceNode.dependencyFor) {
			const depNode = this.getDependencyGraphNode(dep);
			if (depNode) {
				depNode.dependentOn = depNode.dependentOn.filter(
					(item) => !InMemoryDependencyGraph.compareResources(item, resource),
				);
			}
		}

		if (resource.collection) {
			delete this.collections[resource.collection][resource.id];
		} else if (resource.global) {
			delete this.globals[resource.global];
		}
	}

	addDependency(source: DependencyGraphResource, target: DependencyGraphResource): void {
		const sourceNode = this.safeGetDependencyGraphNode(source);

		if (
			!sourceNode.dependentOn.find((r) => InMemoryDependencyGraph.compareResources(r, target))
		) {
			sourceNode.dependentOn.push(target);
		}

		const targetNode = this.safeGetDependencyGraphNode(target);

		if (
			targetNode.dependencyFor.find((r) =>
				InMemoryDependencyGraph.compareResources(r, source),
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
					(item) => !InMemoryDependencyGraph.compareResources(item, resource),
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
				result || InMemoryDependencyGraph.compareResources(resource, target),
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

	isDependencyForAnyResourceOfCollection(
		target: DependencyGraphResource,
		collection: string,
	): boolean {
		if (target.collection === collection) {
			return true;
		}

		const node = this.getDependencyGraphNode(target);

		if (node === undefined) {
			return false;
		}

		if (node.dependencyFor.length > 0) {
			return node.dependencyFor.reduce(
				(result, dep) =>
					result || this.isDependencyForAnyResourceOfCollection(dep, collection),
				false,
			);
		}

		return false;
	}

	getDependenciesOfCollection(
		resource: DependencyGraphResource,
		collection: string,
	): DependencyGraphResource[] {
		const resources = this.getDependenciesOfCollectionRecursive(resource, collection);
		const set = new DependencyGraphResourceSet(resources);
		return Array.from(set);
	}

	private getDependenciesOfCollectionRecursive(
		resource: DependencyGraphResource,
		collection: string,
		direction?: boolean,
	): DependencyGraphResource[] {
		if (resource.collection === collection) {
			return [resource];
		}

		const node = this.getDependencyGraphNode(resource);

		if (node === undefined) {
			return [];
		}

		const items: DependencyGraphResource[] = [];

		if (direction === false || direction === undefined) {
			items.push(
				...node.dependencyFor.reduce(
					(result: DependencyGraphResource[], r: DependencyGraphResource) => [
						...result,
						...this.getDependenciesOfCollectionRecursive(r, collection, false),
					],
					[],
				),
			);
		}

		if (direction === true || direction === undefined) {
			items.push(
				...node.dependentOn.reduce(
					(result: DependencyGraphResource[], r: DependencyGraphResource) => [
						...result,
						...this.getDependenciesOfCollectionRecursive(r, collection, true),
					],
					[],
				),
			);
		}

		return items;
	}
}
