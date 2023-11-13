import type { Payload } from 'payload';

import type { DependencyGraphResource, DependencySchema, EditorExtractor } from '../types';
import getValuesFromPath from '../utils/get-values-from-path';
import type { DependencyGraphSchema } from '../schema';

/**
 * Represents the base class for implementing a concrete dependency graph.
 */
export abstract class DependencyGraphBase {
	/**
	 * Schema of the dependency graph
	 */
	protected schema!: DependencyGraphSchema;

	/**
	 * Payload instance
	 */
	protected payload!: Payload;

	/**
	 * The function that takes care of extracting the dependencies from a field of type `richText`.
	 */
	protected editorExtractor?: EditorExtractor;

	setSchema(schema: DependencyGraphSchema): DependencyGraphBase {
		this.schema = schema;
		return this;
	}

	setPayload(payload: Payload): DependencyGraphBase {
		this.payload = payload;
		return this;
	}

	setEditorExtractor(editorExtractor: EditorExtractor): DependencyGraphBase {
		this.editorExtractor = editorExtractor;
		return this;
	}

	/**
	 * Deletes a resource from the dependency graph.
	 *
	 * @param resource
	 */
	abstract deleteResource(resource: DependencyGraphResource): void | Promise<void>;

	/**
	 * Add target as a direct dependency of source.
	 *
	 * @param source
	 * @param target
	 */
	abstract addDependency(
		source: DependencyGraphResource,
		target: DependencyGraphResource,
	): void | Promise<void>;

	/**
	 * The function purges the dependentsOn for a resource and removes for that
	 * dependencies the dependencyFor.
	 *
	 * @param resource
	 */
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

	/**
	 * Is target a dependency for any resource of collection given?
	 * @param target
	 * @param collection
	 */
	abstract isDependencyForAnyResourceOfCollection(
		target: DependencyGraphResource,
		collection: string,
	): boolean | Promise<boolean>;

	/**
	 * Get dependencies of `resource` that is from `collection`
	 * @param resource
	 * @param collection
	 */
	abstract getDependenciesOfCollection(
		resource: DependencyGraphResource,
		collection: string,
	): DependencyGraphResource[] | Promise<DependencyGraphResource[]>;

	/**
	 * Used at Payload initialization to populate the dependency graph.
	 * You shouldn't call this function by yourself.
	 */
	async populate(): Promise<void> {
		this.payload.logger.info('Starting to populate the Dependency Graph');

		for (const collection of Object.keys(this.payload.collections)) {
			const collectionSchemas = this.schema.collections[collection] || [];

			const find = await this.payload.find({
				collection,
				limit: 0,
				pagination: false,
				depth: 0,
			});

			for (const doc of find.docs) {
				await this.extractDependenciesFromDoc(
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

			await this.extractDependenciesFromDoc(
				{
					global,
				},
				doc,
				globalSchemas,
			);
		}

		this.payload.logger.info('The Dependency Graph have been populated successfully.');
	}

	/**
	 * Used to extract dependencies from a document based on schemas. The function will automatically populate the dependency graph.
	 *
	 * @param source
	 * @param doc
	 * @param schemas
	 */
	async extractDependenciesFromDoc(
		source: DependencyGraphResource,
		doc: any,
		schemas: DependencySchema[],
	): Promise<void> {
		for (const schema of schemas) {
			const values = getValuesFromPath(schema.path, doc);

			if (schema.type === 'blocks') {
				const blocks = values[0];

				for (const block of blocks) {
					/**
					 * If the block doesn't have any relationship,
					 * it will not be included in schema
					 */
					if (this.schema.blocks[block.blockType]) {
						await this.extractDependenciesFromDoc(
							source,
							block,
							this.schema.blocks[block.blockType],
						);
					}
				}
			} else if (schema.type === 'relationship') {
				if (schema.type === 'relationship') {
					/**
					 * The only issue is that sometimes `value` is populated or not
					 * which is pretty annoying.
					 */
					if (schema.relationTo) {
						for (const value of values) {
							if (value === null || value === undefined) {
								// eslint-disable-next-line no-continue
								continue;
							}

							await this.addDependency(source, {
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
							if (item === null || item === undefined) {
								// eslint-disable-next-line no-continue
								continue;
							}

							/**
							 * Value will look like this:
							 *
							 *      {
							 *          "relationTo": "organizations",
							 *          "value": "602c3c327b811235943ee12b"
							 *      }
							 *
							 */
							await this.addDependency(source, {
								collection: item.relationTo,
								id:
									typeof item.value === 'string' || typeof item.value === 'number'
										? item.value
										: item.value.id,
							});
						}
					}
				}
			} else if (schema.type === 'richText') {
				if (this.editorExtractor) {
					await this.editorExtractor({
						dependencyGraph: this,
						source,
						doc,
						value: values[0],
					});
				}
			}
		}
	}
}
