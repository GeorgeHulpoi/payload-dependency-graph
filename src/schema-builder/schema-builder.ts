import type { Block, CollectionConfig, Field, GlobalConfig } from 'payload/types';
import type { DependenciesSchema, DependencySchema } from '../types';

/**
 * It is the class used to extract the dependency schema from collections, globals and blocks. It is a way of saying 'I know there's an dependency in that place'.
 */
export class SchemaBuilder {
	private readonly collections: CollectionConfig[];
	private readonly globals: GlobalConfig[];
	private blocks: Map<string, Block> = new Map();

	constructor(collections: CollectionConfig[], globals: GlobalConfig[]) {
		this.collections = collections;
		this.globals = globals;
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

	/**
	 * Build the Dependencies Schema
	 */
	build(): DependenciesSchema {
		const schema: DependenciesSchema = {
			collections: {},
			globals: {},
			blocks: {},
		};

		this.collections.forEach((collection) => {
			const relationships = this.getDependencies(collection.fields || []);

			if (relationships.length > 0) {
				schema.collections[collection.slug] = relationships;
			}
		});

		this.globals.forEach((global) => {
			const relationships = this.getDependencies(global.fields || []);
			if (relationships.length > 0) {
				schema.globals[global.slug] = relationships;
			}
		});

		this.blocks.forEach((block, slug) => {
			const relationships = this.getDependencies(block.fields || []);

			if (relationships.length > 0) {
				schema.blocks[slug] = relationships;
			}
		});

		return schema;
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
						SchemaBuilder.formatFieldPath(baseName, field),
					),
				);
			} else if (field.type === 'tabs') {
				field.tabs.forEach((tab) => {
					dependencies.push(
						...this.getDependencies(
							tab.fields,
							SchemaBuilder.formatFieldPath(baseName, tab as any),
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
							SchemaBuilder.formatFieldPath(baseName, field) +
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
							SchemaBuilder.formatFieldPath(baseName, field) +
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
					path: SchemaBuilder.formatFieldPath(baseName, field),
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
						SchemaBuilder.formatFieldPath(baseName, field),
					),
				);
			}
		});

		return dependencies;
	}
}
