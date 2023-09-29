import collections from '../../src/collections';
import globals from '../../src/globals';
import { SchemaBuilder } from '../../../src/schema-builder/schema-builder';
import type { DependencyGraphResource } from '../../../src/types';
import { DependenciesGraphBase } from '../../../src/dependencies-graph/base';

class DummyDependenciesGraph extends DependenciesGraphBase {
	deleteResource(resource: DependencyGraphResource): void | Promise<void> {}

	addDependency(
		source: DependencyGraphResource,
		target: DependencyGraphResource,
	): void | Promise<void> {}

	purgeDependentOn(resource: DependencyGraphResource): void | Promise<void> {}

	isDirectDependency(
		source: DependencyGraphResource,
		target: DependencyGraphResource,
	): boolean | Promise<boolean> {
		return true;
	}

	isDependency(
		source: DependencyGraphResource,
		target: DependencyGraphResource,
	): boolean | Promise<boolean> {
		return true;
	}
}

describe('DependenciesGraphBase', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe('getProjection', () => {
		it('should generate projection for simple schema', () => {
			const schemas: any = [
				{
					path: 'menus',
				},
				{
					path: 'category',
				},
			];

			const projection = DependenciesGraphBase.getProjection(schemas);

			expect(projection).toEqual(
				expect.objectContaining({
					_id: 1,
					menus: 1,
					category: 1,
				}),
			);
		});

		it('should generate projection for complex schema', () => {
			const schemas: any = [
				{
					path: 'nav.menus.*.menus.*.page',
				},
				{
					path: 'nav.categories.*',
				},
			];

			const projection = DependenciesGraphBase.getProjection(schemas);

			expect(projection).toEqual(
				expect.objectContaining({
					_id: 1,
					'nav.menus.menus.page': 1,
					'nav.categories': 1,
				}),
			);
		});
	});

	describe('extractDependenciesFromDoc', () => {
		const builder = new SchemaBuilder(collections, globals);
		const schema = builder.build();
		const dependencyGraph = new DummyDependenciesGraph(schema, undefined as any);

		it('should extract dependencies', () => {
			const addDependency = jest.spyOn(dependencyGraph, 'addDependency');

			const doc = {
				_id: '650ac0c148e8ee7e9b7a9c02',
				content: [
					{
						id: '650819f459fe56d31c3a1e2c',
						heading: 'Cats',
						items: [
							{
								cat: 'cat_1',
							},
						],
						blockType: 'cats-section',
					},
					{
						id: '650ac48af952ef445c8be6b6',
						content: [
							{
								id: '650ef89de022509961805e09',
								content: [
									{
										id: '650ab89de022509923805e09',
										heading: 'People',
										items: [
											{
												person: 'person_1',
											},
										],
										blockType: 'people-section',
									},
								],
								blockType: 'recursive-content',
							},
						],
						blockType: 'recursive-content',
					},
				],
			};

			dependencyGraph.extractDependenciesFromDoc(
				{
					collection: 'pages',
					id: '650ac0c148e8ee7e9b7a9c02',
				},
				doc,
				schema.collections.pages,
			);

			expect(addDependency).toHaveBeenCalledWith(
				{
					collection: 'pages',
					id: '650ac0c148e8ee7e9b7a9c02',
				},
				{
					collection: 'cats',
					id: 'cat_1',
				},
			);

			expect(addDependency).toHaveBeenCalledWith(
				{
					collection: 'pages',
					id: '650ac0c148e8ee7e9b7a9c02',
				},
				{
					collection: 'people',
					id: 'person_1',
				},
			);

			expect(addDependency).toHaveBeenCalledTimes(2);
		});

		it('should extract dependencies 2', () => {
			const addDependency = jest.spyOn(dependencyGraph, 'addDependency');

			const doc = {
				menus: [
					{
						type: 'link',
						page: 'page_1',
					},
					{
						type: 'dropdown',
						name: 'Services',
						menus: [
							{
								page: 'page_2',
								description: 'Page 2 desc',
							},
							{
								page: 'page_3',
								description: 'Page 3 desc',
							},
						],
					},
				],
			};

			dependencyGraph.extractDependenciesFromDoc(
				{
					global: 'layout',
				},
				doc,
				schema.globals.layout,
			);

			expect(addDependency).toHaveBeenCalledWith(
				{
					global: 'layout',
				},
				{
					collection: 'pages',
					id: 'page_1',
				},
			);

			expect(addDependency).toHaveBeenCalledWith(
				{
					global: 'layout',
				},
				{
					collection: 'pages',
					id: 'page_2',
				},
			);

			expect(addDependency).toHaveBeenCalledWith(
				{
					global: 'layout',
				},
				{
					collection: 'pages',
					id: 'page_3',
				},
			);

			expect(addDependency).toHaveBeenCalledTimes(3);
		});
	});
});
