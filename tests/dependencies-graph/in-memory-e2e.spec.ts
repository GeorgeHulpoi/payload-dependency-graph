import type { Server } from 'http';
import { MongoMemoryServer } from 'mongodb-memory-server';
import path from 'path';
import payload from 'payload';

import { DependencyGraphService } from '../../src';
import { start } from '../dev/server';

describe('InMemoryDependencyGraph e2e', () => {
	let mongod: MongoMemoryServer;
	let server: Server;

	let graph: any;
	let globals: any;
	let collections: any;
	const callback = jest.fn();

	beforeAll(async () => {
		mongod = await MongoMemoryServer.create();

		process.env.PAYLOAD_CONFIG_PATH = path.join(__dirname, '..', 'dev', 'payload.config.ts');
		process.env.MONGODB_URI = mongod.getUri();

		server = await start();
		// Need to populate again, it's because that the seeding it's executing
		// after graph population.
		graph = DependencyGraphService.dependencyGraph;
		graph.collections = {};
		graph.globals = {};
		await DependencyGraphService.dependencyGraph.populate();
		globals = graph.globals;
		collections = graph.collections;
		DependencyGraphService.subscribe(callback);
	});

	afterAll(async () => {
		await mongod.stop();
		server.close();
	});

	describe('should populate graph on init', () => {
		it('should populate layout global', () => {
			expect(globals).toEqual(
				expect.objectContaining({
					layout: {
						dependentOn: expect.anything(),
						dependencyFor: expect.anything(),
					},
				}),
			);
			expect(globals.layout.dependentOn).toHaveLength(3);
			expect(globals.layout.dependentOn).toContainEqual({
				collection: 'pages',
				id: 'cats_page',
			});
			expect(globals.layout.dependentOn).toContainEqual({
				collection: 'pages',
				id: 'dogs_page',
			});
			expect(globals.layout.dependentOn).toContainEqual({
				collection: 'pages',
				id: 'home',
			});
		});

		it('should populate collections', () => {
			expect(collections).toEqual(
				expect.objectContaining({
					toys: {
						rubber_ball: {
							dependentOn: expect.anything(),
							dependencyFor: expect.anything(),
						},
						dog_bone: {
							dependentOn: expect.anything(),
							dependencyFor: expect.anything(),
						},
						feathers_wand: {
							dependentOn: expect.anything(),
							dependencyFor: expect.anything(),
						},
					},
					cats: {
						cat_coco: {
							dependentOn: expect.anything(),
							dependencyFor: expect.anything(),
						},
						cat_luna: {
							dependentOn: expect.anything(),
							dependencyFor: expect.anything(),
						},
					},
					dogs: {
						dog_charlie: {
							dependentOn: expect.anything(),
							dependencyFor: expect.anything(),
						},
						dog_max: {
							dependentOn: expect.anything(),
							dependencyFor: expect.anything(),
						},
					},
					people: {
						val_gabby: {
							dependentOn: expect.anything(),
							dependencyFor: expect.anything(),
						},
						elsa_brylee: {
							dependentOn: expect.anything(),
							dependencyFor: expect.anything(),
						},
						theobald_beverley: {
							dependentOn: expect.anything(),
							dependencyFor: expect.anything(),
						},
					},
					pages: {
						cats_page: {
							dependentOn: expect.anything(),
							dependencyFor: expect.anything(),
						},
						dogs_page: {
							dependentOn: expect.anything(),
							dependencyFor: expect.anything(),
						},
						home: {
							dependentOn: expect.anything(),
							dependencyFor: expect.anything(),
						},
					},
				}),
			);
		});

		it('should populate toys', () => {
			for (const toy of ['rubber_ball', 'dog_bone', 'feathers_wand']) {
				expect(collections.toys[toy].dependentOn).toHaveLength(0);
				expect(collections.toys[toy].dependencyFor).toHaveLength(4);
				expect(collections.toys[toy].dependencyFor).toContainEqual({
					collection: 'cats',
					id: 'cat_coco',
				});
				expect(collections.toys[toy].dependencyFor).toContainEqual({
					collection: 'cats',
					id: 'cat_luna',
				});
				expect(collections.toys[toy].dependencyFor).toContainEqual({
					collection: 'dogs',
					id: 'dog_charlie',
				});
				expect(collections.toys[toy].dependencyFor).toContainEqual({
					collection: 'dogs',
					id: 'dog_max',
				});
			}
		});

		it('should populate cat coco', () => {
			expect(collections.cats.cat_coco.dependentOn).toHaveLength(3);
			expect(collections.cats.cat_coco.dependentOn).toContainEqual({
				collection: 'toys',
				id: 'rubber_ball',
			});
			expect(collections.cats.cat_coco.dependentOn).toContainEqual({
				collection: 'toys',
				id: 'dog_bone',
			});
			expect(collections.cats.cat_coco.dependentOn).toContainEqual({
				collection: 'toys',
				id: 'feathers_wand',
			});
			expect(collections.cats.cat_coco.dependencyFor).toHaveLength(3);
			expect(collections.cats.cat_coco.dependencyFor).toContainEqual({
				collection: 'pages',
				id: 'cats_page',
			});
			expect(collections.cats.cat_coco.dependencyFor).toContainEqual({
				collection: 'pages',
				id: 'home',
			});
			expect(collections.cats.cat_coco.dependencyFor).toContainEqual({
				collection: 'people',
				id: 'val_gabby',
			});
		});

		it('should populate cat luna', () => {
			expect(collections.cats.cat_luna.dependentOn).toHaveLength(3);
			expect(collections.cats.cat_luna.dependentOn).toContainEqual({
				collection: 'toys',
				id: 'rubber_ball',
			});
			expect(collections.cats.cat_luna.dependentOn).toContainEqual({
				collection: 'toys',
				id: 'dog_bone',
			});
			expect(collections.cats.cat_luna.dependentOn).toContainEqual({
				collection: 'toys',
				id: 'feathers_wand',
			});
			expect(collections.cats.cat_luna.dependencyFor).toHaveLength(3);
			expect(collections.cats.cat_luna.dependencyFor).toContainEqual({
				collection: 'pages',
				id: 'cats_page',
			});
			expect(collections.cats.cat_luna.dependencyFor).toContainEqual({
				collection: 'pages',
				id: 'home',
			});
			expect(collections.cats.cat_luna.dependencyFor).toContainEqual({
				collection: 'people',
				id: 'elsa_brylee',
			});
		});

		it('should populate dog max', () => {
			expect(collections.dogs.dog_max.dependentOn).toHaveLength(3);
			expect(collections.dogs.dog_max.dependentOn).toContainEqual({
				collection: 'toys',
				id: 'rubber_ball',
			});
			expect(collections.dogs.dog_max.dependentOn).toContainEqual({
				collection: 'toys',
				id: 'dog_bone',
			});
			expect(collections.dogs.dog_max.dependentOn).toContainEqual({
				collection: 'toys',
				id: 'feathers_wand',
			});
			expect(collections.dogs.dog_max.dependencyFor).toHaveLength(3);
			expect(collections.dogs.dog_max.dependencyFor).toContainEqual({
				collection: 'pages',
				id: 'dogs_page',
			});
			expect(collections.dogs.dog_max.dependencyFor).toContainEqual({
				collection: 'pages',
				id: 'home',
			});
			expect(collections.dogs.dog_max.dependencyFor).toContainEqual({
				collection: 'people',
				id: 'theobald_beverley',
			});
		});

		it('should populate dog charlie', () => {
			expect(collections.dogs.dog_charlie.dependentOn).toHaveLength(3);
			expect(collections.dogs.dog_charlie.dependentOn).toContainEqual({
				collection: 'toys',
				id: 'rubber_ball',
			});
			expect(collections.dogs.dog_charlie.dependentOn).toContainEqual({
				collection: 'toys',
				id: 'dog_bone',
			});
			expect(collections.dogs.dog_charlie.dependentOn).toContainEqual({
				collection: 'toys',
				id: 'feathers_wand',
			});
			expect(collections.dogs.dog_charlie.dependencyFor).toHaveLength(3);
			expect(collections.dogs.dog_charlie.dependencyFor).toContainEqual({
				collection: 'pages',
				id: 'dogs_page',
			});
			expect(collections.dogs.dog_charlie.dependencyFor).toContainEqual({
				collection: 'pages',
				id: 'home',
			});
			expect(collections.dogs.dog_charlie.dependencyFor).toContainEqual({
				collection: 'people',
				id: 'val_gabby',
			});
		});

		it('should populate val gabby', () => {
			expect(collections.people.val_gabby.dependentOn).toHaveLength(2);
			expect(collections.people.val_gabby.dependentOn).toContainEqual({
				collection: 'cats',
				id: 'cat_coco',
			});
			expect(collections.people.val_gabby.dependentOn).toContainEqual({
				collection: 'dogs',
				id: 'dog_charlie',
			});
			expect(collections.people.val_gabby.dependencyFor).toHaveLength(1);
			expect(collections.people.val_gabby.dependencyFor).toContainEqual({
				collection: 'pages',
				id: 'home',
			});
		});

		it('should populate elsa brylee', () => {
			expect(collections.people.elsa_brylee.dependentOn).toHaveLength(1);
			expect(collections.people.elsa_brylee.dependentOn).toContainEqual({
				collection: 'cats',
				id: 'cat_luna',
			});
			expect(collections.people.elsa_brylee.dependencyFor).toHaveLength(1);
			expect(collections.people.elsa_brylee.dependencyFor).toContainEqual({
				collection: 'pages',
				id: 'home',
			});
		});

		it('should populate theobald beverley', () => {
			expect(collections.people.theobald_beverley.dependentOn).toHaveLength(1);
			expect(collections.people.theobald_beverley.dependentOn).toContainEqual({
				collection: 'dogs',
				id: 'dog_max',
			});
			expect(collections.people.theobald_beverley.dependencyFor).toHaveLength(1);
			expect(collections.people.theobald_beverley.dependencyFor).toContainEqual({
				collection: 'pages',
				id: 'home',
			});
		});

		it('should populate cats page', () => {
			expect(collections.pages.cats_page.dependentOn).toHaveLength(2);
			expect(collections.pages.cats_page.dependentOn).toContainEqual({
				collection: 'cats',
				id: 'cat_luna',
			});
			expect(collections.pages.cats_page.dependentOn).toContainEqual({
				collection: 'cats',
				id: 'cat_coco',
			});
			expect(collections.pages.cats_page.dependencyFor).toHaveLength(1);
			expect(collections.pages.cats_page.dependencyFor).toContainEqual({
				global: 'layout',
			});
		});

		it('should populate dogs page', () => {
			expect(collections.pages.dogs_page.dependentOn).toHaveLength(2);
			expect(collections.pages.dogs_page.dependentOn).toContainEqual({
				collection: 'dogs',
				id: 'dog_max',
			});
			expect(collections.pages.dogs_page.dependentOn).toContainEqual({
				collection: 'dogs',
				id: 'dog_charlie',
			});
			expect(collections.pages.dogs_page.dependencyFor).toHaveLength(1);
			expect(collections.pages.dogs_page.dependencyFor).toContainEqual({
				global: 'layout',
			});
		});

		it('should populate home page', () => {
			expect(collections.pages.home.dependentOn).toHaveLength(7);
			expect(collections.pages.home.dependentOn).toContainEqual({
				collection: 'dogs',
				id: 'dog_max',
			});
			expect(collections.pages.home.dependentOn).toContainEqual({
				collection: 'dogs',
				id: 'dog_charlie',
			});
			expect(collections.pages.home.dependentOn).toContainEqual({
				collection: 'cats',
				id: 'cat_luna',
			});
			expect(collections.pages.home.dependentOn).toContainEqual({
				collection: 'cats',
				id: 'cat_coco',
			});
			expect(collections.pages.home.dependentOn).toContainEqual({
				collection: 'people',
				id: 'val_gabby',
			});
			expect(collections.pages.home.dependentOn).toContainEqual({
				collection: 'people',
				id: 'theobald_beverley',
			});
			expect(collections.pages.home.dependentOn).toContainEqual({
				collection: 'people',
				id: 'elsa_brylee',
			});
			expect(collections.pages.home.dependencyFor).toHaveLength(1);
			expect(collections.pages.home.dependencyFor).toContainEqual({
				global: 'layout',
			});
		});

		it('dependencies should work', () => {
			expect(
				graph.isDirectDependency(
					{
						collection: 'cats',
						id: 'cat_coco',
					},
					{
						collection: 'toys',
						id: 'feathers_wand',
					},
				),
			).toBeTruthy();

			expect(
				graph.isDependency(
					{
						collection: 'pages',
						id: 'dogs_page',
					},
					{
						collection: 'cats',
						id: 'cat_luna',
					},
				),
			).toBeFalsy();

			expect(
				graph.isDependency(
					{
						collection: 'pages',
						id: 'dogs_page',
					},
					{
						collection: 'dogs',
						id: 'dog_max',
					},
				),
			).toBeTruthy();

			expect(
				graph.isDependency(
					{ global: 'layout' },
					{
						collection: 'toys',
						id: 'feathers_wand',
					},
				),
			).toBeTruthy();
		});
	});

	it('should add resource in graph', async () => {
		callback.mockClear();

		await payload.create({
			collection: 'cats',
			data: {
				id: 'cat_rex',
				name: 'Rex',
				toys: [
					{
						degreeOfLove: '1',
						toy: 'feathers_wand',
					},
				],
			},
		});

		expect(callback).toHaveBeenCalledTimes(1);
		expect(callback).toHaveBeenCalledWith(
			expect.objectContaining({
				type: 'create',
			}),
		);

		expect(collections).toEqual(
			expect.objectContaining({
				toys: {
					rubber_ball: {
						dependentOn: expect.anything(),
						dependencyFor: expect.anything(),
					},
					dog_bone: {
						dependentOn: expect.anything(),
						dependencyFor: expect.anything(),
					},
					feathers_wand: {
						dependentOn: expect.anything(),
						dependencyFor: expect.anything(),
					},
				},
				cats: {
					cat_coco: {
						dependentOn: expect.anything(),
						dependencyFor: expect.anything(),
					},
					cat_luna: {
						dependentOn: expect.anything(),
						dependencyFor: expect.anything(),
					},
					cat_rex: {
						dependentOn: expect.anything(),
						dependencyFor: expect.anything(),
					},
				},
				dogs: {
					dog_charlie: {
						dependentOn: expect.anything(),
						dependencyFor: expect.anything(),
					},
					dog_max: {
						dependentOn: expect.anything(),
						dependencyFor: expect.anything(),
					},
				},
				people: {
					val_gabby: {
						dependentOn: expect.anything(),
						dependencyFor: expect.anything(),
					},
					elsa_brylee: {
						dependentOn: expect.anything(),
						dependencyFor: expect.anything(),
					},
					theobald_beverley: {
						dependentOn: expect.anything(),
						dependencyFor: expect.anything(),
					},
				},
				pages: {
					cats_page: {
						dependentOn: expect.anything(),
						dependencyFor: expect.anything(),
					},
					dogs_page: {
						dependentOn: expect.anything(),
						dependencyFor: expect.anything(),
					},
					home: {
						dependentOn: expect.anything(),
						dependencyFor: expect.anything(),
					},
				},
			}),
		);

		expect(collections.cats.cat_rex.dependentOn).toHaveLength(1);
		expect(collections.cats.cat_rex.dependentOn).toContainEqual({
			collection: 'toys',
			id: 'feathers_wand',
		});
		expect(collections.cats.cat_rex.dependencyFor).toHaveLength(0);

		expect(collections.toys.feathers_wand.dependentOn).toHaveLength(0);
		expect(collections.toys.feathers_wand.dependencyFor).toHaveLength(5);
		expect(collections.toys.feathers_wand.dependencyFor).toContainEqual({
			collection: 'cats',
			id: 'cat_coco',
		});
		expect(collections.toys.feathers_wand.dependencyFor).toContainEqual({
			collection: 'cats',
			id: 'cat_luna',
		});
		expect(collections.toys.feathers_wand.dependencyFor).toContainEqual({
			collection: 'cats',
			id: 'cat_rex',
		});
		expect(collections.toys.feathers_wand.dependencyFor).toContainEqual({
			collection: 'dogs',
			id: 'dog_charlie',
		});
		expect(collections.toys.feathers_wand.dependencyFor).toContainEqual({
			collection: 'dogs',
			id: 'dog_max',
		});

		for (const toy of ['rubber_ball', 'dog_bone']) {
			expect(collections.toys[toy].dependentOn).toHaveLength(0);
			expect(collections.toys[toy].dependencyFor).toHaveLength(4);
			expect(collections.toys[toy].dependencyFor).toContainEqual({
				collection: 'cats',
				id: 'cat_coco',
			});
			expect(collections.toys[toy].dependencyFor).toContainEqual({
				collection: 'cats',
				id: 'cat_luna',
			});
			expect(collections.toys[toy].dependencyFor).toContainEqual({
				collection: 'dogs',
				id: 'dog_charlie',
			});
			expect(collections.toys[toy].dependencyFor).toContainEqual({
				collection: 'dogs',
				id: 'dog_max',
			});
		}

		await payload.delete({
			collection: 'cats',
			id: 'cat_rex',
		});
	});

	it('should delete resource from graph', async () => {
		callback.mockClear();

		await payload.delete({
			collection: 'people',
			id: 'val_gabby',
		});

		expect(callback).toHaveBeenCalledTimes(1);
		expect(callback).toHaveBeenCalledWith(
			expect.objectContaining({
				type: 'delete',
			}),
		);

		expect(collections.pages.home.dependentOn).toHaveLength(6);
		expect(collections.pages.home.dependentOn).toContainEqual({
			collection: 'dogs',
			id: 'dog_max',
		});
		expect(collections.pages.home.dependentOn).toContainEqual({
			collection: 'dogs',
			id: 'dog_charlie',
		});
		expect(collections.pages.home.dependentOn).toContainEqual({
			collection: 'cats',
			id: 'cat_luna',
		});
		expect(collections.pages.home.dependentOn).toContainEqual({
			collection: 'cats',
			id: 'cat_coco',
		});
		expect(collections.pages.home.dependentOn).toContainEqual({
			collection: 'people',
			id: 'theobald_beverley',
		});
		expect(collections.pages.home.dependentOn).toContainEqual({
			collection: 'people',
			id: 'elsa_brylee',
		});

		expect(collections.cats.cat_coco.dependencyFor).toHaveLength(2);
		expect(collections.cats.cat_coco.dependencyFor).toContainEqual({
			collection: 'pages',
			id: 'cats_page',
		});
		expect(collections.cats.cat_coco.dependencyFor).toContainEqual({
			collection: 'pages',
			id: 'home',
		});

		expect(collections.dogs.dog_charlie.dependencyFor).toHaveLength(2);
		expect(collections.dogs.dog_charlie.dependencyFor).toContainEqual({
			collection: 'pages',
			id: 'dogs_page',
		});
		expect(collections.dogs.dog_charlie.dependencyFor).toContainEqual({
			collection: 'pages',
			id: 'home',
		});
	});

	it('should update graph', async () => {
		callback.mockClear();

		await payload.update({
			collection: 'people',
			id: 'elsa_brylee',
			data: {
				owns: [
					{
						relationTo: 'cats',
						value: 'cat_coco',
					},
					{
						relationTo: 'dogs',
						value: 'dog_charlie',
					},
					{
						relationTo: 'cats',
						value: 'cat_luna',
					},
				],
			},
		});

		expect(callback).toHaveBeenCalledTimes(1);
		expect(callback).toHaveBeenCalledWith(
			expect.objectContaining({
				type: 'update',
			}),
		);

		expect(collections.people.elsa_brylee.dependentOn).toHaveLength(3);
		expect(collections.people.elsa_brylee.dependentOn).toContainEqual({
			collection: 'cats',
			id: 'cat_luna',
		});
		expect(collections.people.elsa_brylee.dependentOn).toContainEqual({
			collection: 'cats',
			id: 'cat_coco',
		});
		expect(collections.people.elsa_brylee.dependentOn).toContainEqual({
			collection: 'dogs',
			id: 'dog_charlie',
		});

		expect(collections.dogs.dog_charlie.dependencyFor).toHaveLength(3);
		expect(collections.dogs.dog_charlie.dependencyFor).toContainEqual({
			collection: 'pages',
			id: 'dogs_page',
		});
		expect(collections.dogs.dog_charlie.dependencyFor).toContainEqual({
			collection: 'pages',
			id: 'home',
		});
		expect(collections.dogs.dog_charlie.dependencyFor).toContainEqual({
			collection: 'people',
			id: 'elsa_brylee',
		});

		expect(collections.cats.cat_coco.dependencyFor).toHaveLength(3);
		expect(collections.cats.cat_coco.dependencyFor).toContainEqual({
			collection: 'pages',
			id: 'cats_page',
		});
		expect(collections.cats.cat_coco.dependencyFor).toContainEqual({
			collection: 'pages',
			id: 'home',
		});
		expect(collections.cats.cat_coco.dependencyFor).toContainEqual({
			collection: 'people',
			id: 'elsa_brylee',
		});
	});

	it('isDependency should return true when deletion', async () => {
		await payload.create({
			collection: 'cats',
			data: {
				id: 'cat_rex',
				name: 'Rex',
				toys: [
					{
						degreeOfLove: '1',
						toy: 'feathers_wand',
					},
				],
			},
		});

		const sub = DependencyGraphService.subscribe((event) => {
			expect(event.type).toBe('delete');
			expect(event.collection).toBe('cats');
			expect(event.doc.id).toBe('cat_rex');

			expect(
				graph.isDependency(
					{
						collection: 'cats',
						id: 'cat_rex',
					},
					{
						collection: 'toys',
						id: 'feathers_wand',
					},
				),
			).toBeTruthy();
		});

		await payload.delete({
			collection: 'cats',
			id: 'cat_rex',
		});

		sub.unsubscribe();
	});

	describe('isDependencyForAnyResourceOfCollection', () => {
		it('should return true', () => {
			const result = graph.isDependencyForAnyResourceOfCollection(
				{
					collection: 'dogs',
					id: 'dog_charlie',
				},
				'pages',
			);

			expect(result).toBeTruthy();
		});

		it('should return false', async () => {
			await payload.create({
				collection: 'cats',
				data: {
					id: 'cat_rex',
					name: 'Rex',
					toys: [
						{
							degreeOfLove: '1',
							toy: 'feathers_wand',
						},
					],
				},
			});

			const result = graph.isDependencyForAnyResourceOfCollection(
				{
					collection: 'cats',
					id: 'cat_rex',
				},
				'pages',
			);

			expect(result).toBeFalsy();

			await payload.delete({
				collection: 'cats',
				id: 'cat_rex',
			});
		});
	});
});
