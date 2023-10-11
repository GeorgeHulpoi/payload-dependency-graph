/* eslint-disable max-classes-per-file */
import type { Block, CollectionConfig, Field, GlobalConfig } from 'payload/types';

import type { DependencySchema, DependencySchemaSlug } from './types';

export class DependencyGraphSchema {
	collections: DependencySchemaSlug;
	globals: DependencySchemaSlug;
	blocks: DependencySchemaSlug;

	constructor(
		collections: DependencySchemaSlug,
		globals: DependencySchemaSlug,
		blocks: DependencySchemaSlug,
	) {
		this.collections = collections;
		this.globals = globals;
		this.blocks = blocks;
	}

	static Builder = class DependencyGraphSchemaBuilder {
		collections?: CollectionConfig[];
		globals?: GlobalConfig[];
		blocks: Map<string, Block> = new Map();

		constructor(builder?: DependencyGraphSchemaBuilder) {
			if (builder) {
				if (builder.collections) {
					this.collections = builder.collections;
				}

				if (builder.globals) {
					this.globals = builder.globals;
				}

				if (builder.blocks) {
					this.blocks = new Map(builder.blocks);
				}
			}
		}

		/**
		 * Formats the path based on the field type and base. Used exclusively by {@link build | build method}
		 *
		 * @param base
		 * @param field
		 * @returns a string representing the path to the field
		 */
		static formatFieldPath(base: string, field: { name?: string; type?: string }): string {
			let newBaseName = base;

			if (newBaseName !== '') {
				newBaseName += '.';
			}

			if ('name' in field) {
				newBaseName += field.name;
			}

			if (field.type === 'array') {
				newBaseName += '.*';
			}

			return newBaseName;
		}

		setCollections(collections: CollectionConfig[]): DependencyGraphSchemaBuilder {
			this.collections = collections;
			return this;
		}

		setGlobals(globals: GlobalConfig[]): DependencyGraphSchemaBuilder {
			this.globals = globals;
			return this;
		}

		/**
		 * Build the Dependency Graph Schema
		 */
		build(): DependencyGraphSchema {
			const collections: DependencySchemaSlug = {};
			const globals: DependencySchemaSlug = {};
			const blocks: DependencySchemaSlug = {};

			if (this.collections === undefined || this.globals === undefined) {
				throw new Error(
					"You can't build a schema without providing collections and globals",
				);
			}

			this.collections.forEach((collection) => {
				const relationships = this.getDependencies(collection.fields || []);

				if (relationships.length > 0) {
					collections[collection.slug] = relationships;
				}
			});

			this.globals.forEach((global) => {
				const relationships = this.getDependencies(global.fields || []);
				if (relationships.length > 0) {
					globals[global.slug] = relationships;
				}
			});

			this.blocks.forEach((block, slug) => {
				const relationships = this.getDependencies(block.fields || []);

				if (relationships.length > 0) {
					blocks[slug] = relationships;
				}
			});

			return new DependencyGraphSchema(collections, globals, blocks);
		}

		/**
		 * Recursively traverse each field until it reaches a Block or a RelationshipField.
		 *
		 * @param fields
		 * @param baseName
		 * @returns Extracts a list of dependencies
		 */
		getDependencies(fields: Field[], baseName = ''): DependencySchema[] {
			const dependencies: DependencySchema[] = [];

			fields.forEach((field) => {
				if (field.type === 'array') {
					dependencies.push(
						...this.getDependencies(
							field.fields,
							DependencyGraphSchemaBuilder.formatFieldPath(baseName, field),
						),
					);
				} else if (field.type === 'tabs') {
					field.tabs.forEach((tab) => {
						dependencies.push(
							...this.getDependencies(
								tab.fields,
								DependencyGraphSchemaBuilder.formatFieldPath(baseName, tab as any),
							),
						);
					});
				} else if (field.type === 'relationship') {
					/**
					 * https://payloadcms.com/docs/fields/relationship#how-the-data-is-saved
					 */

					if (Array.isArray(field.relationTo)) {
						/**
						 * This case means that the field is polymorphic, and there are two
						 * scenarios.
						 *
						 * 1. Has many and it will be saved in the database like this:
						 *
						 * 		"owners": [
						 * 			{
						 * 				"relationTo": "users",
						 * 				"value": "6031ac9e1289176380734024"
						 * 			},
						 * 			{
						 * 				"relationTo": "organizations",
						 * 				"value": "602c3c327b811235943ee12b"
						 * 			}
						 * 		]
						 *
						 * 2. Has one and it will be saved in the database like this:
						 *
						 * 		"owner": {
						 * 			"relationTo": "organizations",
						 * 			"value": "6031ac9e1289176380734024"
						 * 		}
						 *
						 * Therefore it's pointless to pass the collection, because it will
						 * be extracted at runtime.
						 */

						dependencies.push({
							type: 'relationship',
							path:
								DependencyGraphSchemaBuilder.formatFieldPath(baseName, field) +
								(field.hasMany ? '.*' : ''),
						});
					} else {
						/**
						 * Similar to polymorphic, there are two scenarios:
						 *
						 * 1. Has many and it will be saved in the database like this:
						 *
						 *  	"owners": ["6031ac9e1289176380734024", "602c3c327b811235943ee12b"]
						 *
						 * 2. Has one and it will be saved in the database like this:
						 *
						 * 		"owner": "6031ac9e1289176380734024"
						 */
						dependencies.push({
							relationTo: field.relationTo,
							type: 'relationship',
							path:
								DependencyGraphSchemaBuilder.formatFieldPath(baseName, field) +
								(field.hasMany ? '.*' : ''),
						});
					}
				} else if (field.type === 'blocks') {
					/**
					 * You can't know exactly what will be here.
					 * It can be a block which has a relation to
					 * multiple collections, it can be anything here.
					 * It's better to treat this case at runtime.
					 */
					dependencies.push({
						type: 'blocks',
						path: DependencyGraphSchemaBuilder.formatFieldPath(baseName, field),
					});

					for (const block of field.blocks) {
						if (!this.blocks.has(block.slug)) {
							this.blocks.set(block.slug, block);
							this.exploreBlockFields(block.fields);
						}
					}
				} else if ('fields' in field) {
					dependencies.push(
						...this.getDependencies(
							field.fields,
							DependencyGraphSchemaBuilder.formatFieldPath(baseName, field),
						),
					);
				}
			});

			return dependencies;
		}

		/**
		 * Used to extract all available blocks rather than extracting dependencies.
		 * It doesn't make sense to extract the dependencies for each block at a time,
		 * because the process will most likely repeat itself, so it's better to
		 * extract a list of all the available blocks and analyze it later.
		 *
		 * @param fields
		 */
		exploreBlockFields(fields: Field[]): void {
			fields.forEach((field) => {
				if (field.type === 'array') {
					this.exploreBlockFields(field.fields);
				} else if (field.type === 'tabs') {
					field.tabs.forEach((tab) => {
						this.exploreBlockFields(tab.fields);
					});
				} else if (field.type === 'blocks') {
					for (const block of field.blocks) {
						if (!this.blocks.has(block.slug)) {
							this.blocks.set(block.slug, block);
							this.exploreBlockFields(block.fields);
						}
					}
				}
			});
		}
	};
}
