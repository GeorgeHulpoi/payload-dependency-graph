import type { Payload } from 'payload';

import type { DependenciesSchema, DependencyGraphResource, DependencySchema } from '../types';
import getValuesFromPath from '../utils/get-values-from-path';

export abstract class DependenciesGraphBase {
	protected readonly schema: DependenciesSchema;
	protected readonly payload: Payload;

	constructor(schema: DependenciesSchema, payload: Payload) {
		this.schema = schema;
		this.payload = payload;
	}

	abstract deleteResource(resource: DependencyGraphResource): void | Promise<void>;

	abstract addDependency(
		source: DependencyGraphResource,
		target: DependencyGraphResource,
	): void | Promise<void>;

	abstract purgeDependentOn(resource: DependencyGraphResource): void | Promise<void>;

	/**
	 * Is target a direct dependency for source?
	 *
	 * @param source
	 * @param target
	 */
	abstract isDirectDependency(
		source: DependencyGraphResource,
		target: DependencyGraphResource,
	): boolean | Promise<boolean>;

	/**
	 * Is target a dependency for source?
	 *
	 * @param source
	 * @param target
	 */
	abstract isDependency(
		source: DependencyGraphResource,
		target: DependencyGraphResource,
	): boolean | Promise<boolean>;

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

	async populate(): Promise<void> {
		this.payload.logger.info('Starting to populate Dependencies Graph');

		for (const collection of Object.keys(this.payload.collections)) {
			const collectionSchemas = this.schema.collections[collection] || [];

			const find = await this.payload.find({
				collection,
				limit: 0,
				pagination: false,
				depth: 0,
			});

			for (const doc of find.docs) {
				this.extractDependenciesFromDoc(
					{
						collection,
						id: doc.id,
					},
					doc,
					collectionSchemas,
				);
			}
		}

		for (const global of Object.keys(this.schema.globals)) {
			const globalSchemas = this.schema.globals[global] || [];

			const doc = await this.payload.findGlobal({
				slug: global,
				depth: 0,
			});

			this.extractDependenciesFromDoc(
				{
					global,
				},
				doc,
				globalSchemas,
			);
		}

		this.payload.logger.info('Dependencies Graph have been populated successfully.');
	}

	extractDependenciesFromDoc(
		source: DependencyGraphResource,
		doc: any,
		schemas: DependencySchema[],
	): void | Promise<void> {
		for (const schema of schemas) {
			const values = getValuesFromPath(schema.path, doc);

			if (schema.type === 'blocks') {
				const blocks = values[0];

				for (const block of blocks) {
					this.extractDependenciesFromDoc(
						source,
						block,
						this.schema.blocks[block.blockType],
					);
				}
			} else if (schema.type === 'relationship') {
				if (schema.type === 'relationship') {
					/**
					 * The only issue is that sometimes `value` is populated or not
					 * which is pretty annoying.
					 */
					if (schema.relationTo) {
						for (const value of values) {
							this.addDependency(source, {
								collection: schema.relationTo,
								id:
									typeof value === 'string' || typeof value === 'number'
										? value
										: value.id,
							});
						}
					} else {
						// Polymorphic
						for (const item of values) {
							/**
							 * Value will look like this:
							 *
							 *      {
							 *          "relationTo": "organizations",
							 *          "value": "602c3c327b811235943ee12b"
							 *      }
							 *
							 */
							this.addDependency(source, {
								collection: item.relationTo,
								id:
									typeof item.value === 'string' || typeof item.value === 'number'
										? item.value
										: item.value.id,
							});
						}
					}
				}
			}
		}
	}
}
