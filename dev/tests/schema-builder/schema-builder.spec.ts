import { CatsSectionBlock } from '../../src/blocks/cats-section';
import { DogsSectionBlock } from '../../src/blocks/dogs-section';
import { PeopleSectionBlock } from '../../src/blocks/people-section';
import collections from '../../src/collections';
import globals from '../../src/globals';
import { Cats } from '../../src/collections/Cats';
import { Pages } from '../../src/collections/Pages';
import { People } from '../../src/collections/People';
import { SchemaBuilder } from '../../../src/schema-builder/schema-builder';
import { DiscoverMeBlock } from '../../src/blocks/discover-me';

describe('DependencySchemaBuilder', () => {
	describe('formatBaseName', () => {
		it('should generate right field path (simple field)', () => {
			const fieldPath = SchemaBuilder.formatFieldPath('', {
				name: 'category',
				type: 'text',
			});

			expect(fieldPath).toEqual('category');
		});

		it('should generate right field path (nested)', () => {
			const fieldPath = SchemaBuilder.formatFieldPath('meta.og', {
				name: 'title',
				type: 'text',
			});

			expect(fieldPath).toEqual('meta.og.title');
		});

		it('should generate right field path (nested and array)', () => {
			const fieldPath = SchemaBuilder.formatFieldPath('meta', {
				name: 'items',
				type: 'array',
			});

			expect(fieldPath).toEqual('meta.items.*');
		});

		it('should generate right field path (field from array)', () => {
			const fieldPath = SchemaBuilder.formatFieldPath('meta.items.*', {
				name: 'property',
				type: 'text',
			});

			expect(fieldPath).toEqual('meta.items.*.property');
		});
	});

	describe('getDependencies', () => {
		const builder = new SchemaBuilder([], []);

		it('should get dependencies for People', () => {
			const dependencies = builder.getDependencies(People.fields);

			expect(dependencies).toHaveLength(1);
			expect(dependencies[0]).toEqual(
				expect.objectContaining({
					type: 'relationship',
					path: 'owns.*',
				}),
			);
		});

		it('should get dependencies for Cats', () => {
			const dependencies = builder.getDependencies(Cats.fields);

			expect(dependencies).toHaveLength(1);
			expect(dependencies[0]).toEqual(
				expect.objectContaining({
					relationTo: 'toys',
					type: 'relationship',
					path: 'toys.*.toy',
				}),
			);
		});

		it('should get dependencies for Pages', () => {
			const dependencies = builder.getDependencies(Pages.fields);

			expect(dependencies).toHaveLength(1);
			expect(dependencies).toContainEqual({
				relationTo: undefined,
				type: 'blocks',
				path: 'content',
			});
		});

		it('should populate blocks', () => {
			const blocks = (builder as any).blocks;

			expect(blocks.size).toEqual(5);
			expect(blocks.has('cats-section')).toBeTruthy();
			expect(blocks.has('dogs-section')).toBeTruthy();
			expect(blocks.has('people-section')).toBeTruthy();
			expect(blocks.has('discover-me')).toBeTruthy();
			expect(blocks.has('recursive-content')).toBeTruthy();

			expect(blocks.get('cats-section')).toEqual(CatsSectionBlock);
			expect(blocks.get('dogs-section')).toEqual(DogsSectionBlock);
			expect(blocks.get('people-section')).toEqual(PeopleSectionBlock);
			expect(blocks.get('discover-me')).toEqual(DiscoverMeBlock);
		});
	});

	describe('build', () => {
		const builder = new SchemaBuilder(collections, globals);
		const schema = builder.build();

		it('should generate schema', () => {
			expect(schema).toBeDefined();

			expect(schema).toEqual(
				expect.objectContaining({
					collections: expect.anything(),
					globals: expect.anything(),
					blocks: expect.anything(),
				}),
			);
		});

		it('should contain dependencies for Cats', () => {
			expect(schema.collections.cats).toBeDefined();
			expect(schema.collections.cats).toContainEqual({
				relationTo: 'toys',
				type: 'relationship',
				path: 'toys.*.toy',
			});
		});

		it('should contain dependencies for Dogs', () => {
			expect(schema.collections.dogs).toBeDefined();
			expect(schema.collections.dogs).toContainEqual({
				relationTo: 'toys',
				type: 'relationship',
				path: 'toys.*.toy',
			});
		});

		it('should contain dependencies for Pages', () => {
			expect(schema.collections.pages).toBeDefined();
			expect(schema.collections.pages).toContainEqual({
				relationTo: undefined,
				type: 'blocks',
				path: 'content',
			});
		});

		it('should contain dependencies for People', () => {
			expect(schema.collections.people).toBeDefined();
			expect(schema.collections.people).toContainEqual({
				relationTo: undefined,
				type: 'relationship',
				path: 'owns.*',
			});
		});

		it('Toys should be undefined', () => {
			expect(schema.collections.toys).toBeUndefined();
		});

		it('should contain dependencies for CatsSectionBlock', () => {
			expect(schema.blocks['cats-section']).toBeDefined();
			expect(schema.blocks['cats-section']).toContainEqual({
				relationTo: 'cats',
				type: 'relationship',
				path: 'items.*.cat',
			});
		});

		it('should contain dependencies for DogsSectionBlock', () => {
			expect(schema.blocks['dogs-section']).toBeDefined();
			expect(schema.blocks['dogs-section']).toContainEqual({
				relationTo: 'dogs',
				type: 'relationship',
				path: 'items.*.dog',
			});
		});

		it('should contain dependencies for DogsSectionBlock', () => {
			expect(schema.blocks['people-section']).toBeDefined();
			expect(schema.blocks['people-section']).toContainEqual({
				relationTo: 'people',
				type: 'relationship',
				path: 'items.*.person',
			});
		});

		it('should contain dependencies for RecursiveContentBlock', () => {
			expect(schema.blocks['recursive-content']).toBeDefined();
			expect(schema.blocks['recursive-content']).toContainEqual({
				type: 'blocks',
				path: 'content',
			});
		});

		it('should contain dependencies for DiscoverMeBlock', () => {
			expect(schema.blocks['discover-me']).toBeDefined();
			expect(schema.blocks['discover-me']).toContainEqual({
				relationTo: 'toys',
				type: 'relationship',
				path: 'toy',
			});
		});

		it('should contain dependencies for global Layout', () => {
			expect(schema.globals.layout).toBeDefined();
			expect(schema.globals.layout).toHaveLength(2);
			expect(schema.globals.layout).toContainEqual({
				relationTo: 'pages',
				type: 'relationship',
				path: 'menus.*.page',
			});
			expect(schema.globals.layout).toContainEqual({
				relationTo: 'pages',
				type: 'relationship',
				path: 'menus.*.menus.*.page',
			});
		});
	});
});
