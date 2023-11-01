import type { Server } from 'http';
import { MongoMemoryServer } from 'mongodb-memory-server';
import path from 'path';
import payload from 'payload';
import * as fs from 'fs/promises';
import { MongooseAdapter } from '@payloadcms/db-mongodb';

import { DependencyGraphService, MongoDBDependencyGraph } from '../../../src';
import { start } from '../../dev/server';
import { pageEditorExtractorDescription } from '../../dev/collections/Pages';

function collection() {
	const db = payload.db as MongooseAdapter;
	return db.connection.collection('_dependency_graph');
}

describe('MongoDBDependencyGraph', () => {
	let mongod: MongoMemoryServer;
	let server: Server;

	let dependencyGraph: MongoDBDependencyGraph;
	const callback = jest.fn();

	beforeAll(async () => {
		mongod = await MongoMemoryServer.create();

		process.env.PAYLOAD_CONFIG_PATH = path.join(__dirname, 'payload.config.ts');
		process.env.MONGODB_URI = mongod.getUri();

		server = await start();
		dependencyGraph = DependencyGraphService.dependencyGraph as MongoDBDependencyGraph;
		DependencyGraphService.subscribe(callback);
	});

	afterAll(async () => {
		await mongod.stop();
		server.close();
		await fs.rm(path.join(__dirname, '..', 'public'), { recursive: true });
	});

	describe('should populate graph on init', () => {
		it('should populate layout global', async () => {
			const globals = await collection()
				.find({
					global: {
						$exists: true,
					},
				})
				.toArray();

			expect(globals.length).toEqual(1);
			expect(globals[0]).toEqual(
				expect.objectContaining({
					global: 'layout',
					dependentOn: expect.anything(),
					dependencyFor: expect.anything(),
				}),
			);

			const layout = globals[0];

			expect(layout.dependentOn).toHaveLength(3);

			const cats_page = await collection().findOne({
				collection: 'pages',
				id: 'cats_page',
			});
			expect(layout.dependentOn).toContainEqual(cats_page!._id);

			const dogs_page = await collection().findOne({
				collection: 'pages',
				id: 'dogs_page',
			});
			expect(layout.dependentOn).toContainEqual(dogs_page!._id);

			const home = await collection().findOne({
				collection: 'pages',
				id: 'home',
			});
			expect(layout.dependentOn).toContainEqual(home!._id);
		});

		it('should populate collections', async () => {
			const docs = await collection()
				.find({
					collection: {
						$exists: true,
					},
					id: {
						$exists: true,
					},
				})
				.toArray();

			expect(docs).toContainEqual(
				expect.objectContaining({
					collection: 'media',
					id: 'val_gabby_picture',
					dependentOn: expect.anything(),
					dependencyFor: expect.anything(),
				}),
			);

			expect(docs).toContainEqual(
				expect.objectContaining({
					collection: 'toys',
					id: 'rubber_ball',
					dependentOn: expect.anything(),
					dependencyFor: expect.anything(),
				}),
			);

			expect(docs).toContainEqual(
				expect.objectContaining({
					collection: 'toys',
					id: 'dog_bone',
					dependentOn: expect.anything(),
					dependencyFor: expect.anything(),
				}),
			);

			expect(docs).toContainEqual(
				expect.objectContaining({
					collection: 'toys',
					id: 'feathers_wand',
					dependentOn: expect.anything(),
					dependencyFor: expect.anything(),
				}),
			);

			expect(docs).toContainEqual(
				expect.objectContaining({
					collection: 'cats',
					id: 'cat_coco',
					dependentOn: expect.anything(),
					dependencyFor: expect.anything(),
				}),
			);

			expect(docs).toContainEqual(
				expect.objectContaining({
					collection: 'cats',
					id: 'cat_luna',
					dependentOn: expect.anything(),
					dependencyFor: expect.anything(),
				}),
			);

			expect(docs).toContainEqual(
				expect.objectContaining({
					collection: 'dogs',
					id: 'dog_charlie',
					dependentOn: expect.anything(),
					dependencyFor: expect.anything(),
				}),
			);

			expect(docs).toContainEqual(
				expect.objectContaining({
					collection: 'dogs',
					id: 'dog_max',
					dependentOn: expect.anything(),
					dependencyFor: expect.anything(),
				}),
			);

			expect(docs).toContainEqual(
				expect.objectContaining({
					collection: 'people',
					id: 'val_gabby',
					dependentOn: expect.anything(),
					dependencyFor: expect.anything(),
				}),
			);

			expect(docs).toContainEqual(
				expect.objectContaining({
					collection: 'people',
					id: 'elsa_brylee',
					dependentOn: expect.anything(),
					dependencyFor: expect.anything(),
				}),
			);

			expect(docs).toContainEqual(
				expect.objectContaining({
					collection: 'people',
					id: 'theobald_beverley',
					dependentOn: expect.anything(),
					dependencyFor: expect.anything(),
				}),
			);

			expect(docs).toContainEqual(
				expect.objectContaining({
					collection: 'pages',
					id: 'cats_page',
					dependentOn: expect.anything(),
					dependencyFor: expect.anything(),
				}),
			);

			expect(docs).toContainEqual(
				expect.objectContaining({
					collection: 'pages',
					id: 'dogs_page',
					dependentOn: expect.anything(),
					dependencyFor: expect.anything(),
				}),
			);

			expect(docs).toContainEqual(
				expect.objectContaining({
					collection: 'pages',
					id: 'home',
					dependentOn: expect.anything(),
					dependencyFor: expect.anything(),
				}),
			);
		});

		it('should populate toys', async () => {
			const cat_coco = await collection().findOne({
				collection: 'cats',
				id: 'cat_coco',
			});

			const cat_luna = await collection().findOne({
				collection: 'cats',
				id: 'cat_luna',
			});

			const dog_charlie = await collection().findOne({
				collection: 'dogs',
				id: 'dog_charlie',
			});

			const dog_max = await collection().findOne({
				collection: 'dogs',
				id: 'dog_max',
			});

			for (const toy of ['rubber_ball', 'dog_bone', 'feathers_wand']) {
				const doc: any = await collection().findOne({
					collection: 'toys',
					id: toy,
				});

				expect(doc).toBeDefined();

				expect(doc.dependentOn).toHaveLength(0);
				expect(doc.dependencyFor).toHaveLength(4);

				expect(doc.dependencyFor).toContainEqual(cat_coco!._id);
				expect(doc.dependencyFor).toContainEqual(cat_luna!._id);
				expect(doc.dependencyFor).toContainEqual(dog_charlie!._id);
				expect(doc.dependencyFor).toContainEqual(dog_max!._id);
			}
		});

		it('should populate cat coco', async () => {
			const cat_coco: any = await collection().findOne({
				collection: 'cats',
				id: 'cat_coco',
			});

			expect(cat_coco.dependentOn).toHaveLength(3);
			for (const toy of ['rubber_ball', 'dog_bone', 'feathers_wand']) {
				const doc: any = await collection().findOne({
					collection: 'toys',
					id: toy,
				});

				expect(cat_coco.dependentOn).toContainEqual(doc._id);
			}

			expect(cat_coco.dependencyFor).toHaveLength(3);

			const cats_page: any = await collection().findOne({
				collection: 'pages',
				id: 'cats_page',
			});
			expect(cat_coco.dependencyFor).toContainEqual(cats_page._id);

			const home: any = await collection().findOne({
				collection: 'pages',
				id: 'home',
			});
			expect(cat_coco.dependencyFor).toContainEqual(home._id);

			const val_gabby: any = await collection().findOne({
				collection: 'people',
				id: 'val_gabby',
			});
			expect(cat_coco.dependencyFor).toContainEqual(val_gabby._id);
		});

		it('should populate cat luna', async () => {
			const cat_luna: any = await collection().findOne({
				collection: 'cats',
				id: 'cat_luna',
			});

			expect(cat_luna.dependentOn).toHaveLength(3);
			for (const toy of ['rubber_ball', 'dog_bone', 'feathers_wand']) {
				const doc: any = await collection().findOne({
					collection: 'toys',
					id: toy,
				});

				expect(cat_luna.dependentOn).toContainEqual(doc._id);
			}

			expect(cat_luna.dependencyFor).toHaveLength(3);

			const cats_page: any = await collection().findOne({
				collection: 'pages',
				id: 'cats_page',
			});
			expect(cat_luna.dependencyFor).toContainEqual(cats_page._id);

			const home: any = await collection().findOne({
				collection: 'pages',
				id: 'home',
			});
			expect(cat_luna.dependencyFor).toContainEqual(home._id);

			const elsa_brylee: any = await collection().findOne({
				collection: 'people',
				id: 'elsa_brylee',
			});
			expect(cat_luna.dependencyFor).toContainEqual(elsa_brylee._id);
		});

		it('should populate dog max', async () => {
			const dog_max: any = await collection().findOne({
				collection: 'dogs',
				id: 'dog_max',
			});

			expect(dog_max.dependentOn).toHaveLength(3);
			for (const toy of ['rubber_ball', 'dog_bone', 'feathers_wand']) {
				const doc: any = await collection().findOne({
					collection: 'toys',
					id: toy,
				});

				expect(dog_max.dependentOn).toContainEqual(doc._id);
			}

			expect(dog_max.dependencyFor).toHaveLength(3);

			const dogs_page: any = await collection().findOne({
				collection: 'pages',
				id: 'dogs_page',
			});
			expect(dog_max.dependencyFor).toContainEqual(dogs_page._id);

			const home: any = await collection().findOne({
				collection: 'pages',
				id: 'home',
			});
			expect(dog_max.dependencyFor).toContainEqual(home._id);

			const theobald_beverley: any = await collection().findOne({
				collection: 'people',
				id: 'theobald_beverley',
			});
			expect(dog_max.dependencyFor).toContainEqual(theobald_beverley._id);
		});

		it('should populate dog charlie', async () => {
			const dog_charlie: any = await collection().findOne({
				collection: 'dogs',
				id: 'dog_charlie',
			});

			expect(dog_charlie.dependentOn).toHaveLength(3);
			for (const toy of ['rubber_ball', 'dog_bone', 'feathers_wand']) {
				const doc: any = await collection().findOne({
					collection: 'toys',
					id: toy,
				});

				expect(dog_charlie.dependentOn).toContainEqual(doc._id);
			}

			expect(dog_charlie.dependencyFor).toHaveLength(3);

			const dogs_page: any = await collection().findOne({
				collection: 'pages',
				id: 'dogs_page',
			});
			expect(dog_charlie.dependencyFor).toContainEqual(dogs_page._id);

			const home: any = await collection().findOne({
				collection: 'pages',
				id: 'home',
			});
			expect(dog_charlie.dependencyFor).toContainEqual(home._id);

			const val_gabby: any = await collection().findOne({
				collection: 'people',
				id: 'val_gabby',
			});
			expect(dog_charlie.dependencyFor).toContainEqual(val_gabby._id);
		});

		it('should populate val gabby', async () => {
			const val_gabby: any = await collection().findOne({
				collection: 'people',
				id: 'val_gabby',
			});

			expect(val_gabby.dependentOn).toHaveLength(3);

			const cat_coco: any = await collection().findOne({
				collection: 'cats',
				id: 'cat_coco',
			});
			expect(val_gabby.dependentOn).toContainEqual(cat_coco._id);

			const dog_charlie: any = await collection().findOne({
				collection: 'dogs',
				id: 'dog_charlie',
			});
			expect(val_gabby.dependentOn).toContainEqual(dog_charlie._id);

			const media: any = await collection().findOne({
				collection: 'media',
				id: 'val_gabby_picture',
			});
			expect(val_gabby.dependentOn).toContainEqual(media._id);

			expect(val_gabby.dependencyFor).toHaveLength(1);

			const home: any = await collection().findOne({
				collection: 'pages',
				id: 'home',
			});
			expect(val_gabby.dependencyFor).toContainEqual(home._id);
		});

		it('should populate elsa brylee', async () => {
			const elsa_brylee: any = await collection().findOne({
				collection: 'people',
				id: 'elsa_brylee',
			});

			expect(elsa_brylee.dependentOn).toHaveLength(1);

			const cat_luna: any = await collection().findOne({
				collection: 'cats',
				id: 'cat_luna',
			});
			expect(elsa_brylee.dependentOn).toContainEqual(cat_luna._id);

			expect(elsa_brylee.dependencyFor).toHaveLength(1);

			const home: any = await collection().findOne({
				collection: 'pages',
				id: 'home',
			});
			expect(elsa_brylee.dependencyFor).toContainEqual(home._id);
		});

		it('should populate theobald beverley', async () => {
			const theobald_beverley: any = await collection().findOne({
				collection: 'people',
				id: 'theobald_beverley',
			});

			expect(theobald_beverley.dependentOn).toHaveLength(1);

			const dog_max: any = await collection().findOne({
				collection: 'dogs',
				id: 'dog_max',
			});
			expect(theobald_beverley.dependentOn).toContainEqual(dog_max._id);

			expect(theobald_beverley.dependencyFor).toHaveLength(1);
			const home: any = await collection().findOne({
				collection: 'pages',
				id: 'home',
			});
			expect(theobald_beverley.dependencyFor).toContainEqual(home._id);
		});

		it('should populate cats page', async () => {
			const cats_page: any = await collection().findOne({
				collection: 'pages',
				id: 'cats_page',
			});
			expect(cats_page.dependentOn).toHaveLength(2);

			const cat_luna: any = await collection().findOne({
				collection: 'cats',
				id: 'cat_luna',
			});
			expect(cats_page.dependentOn).toContainEqual(cat_luna._id);

			const cat_coco: any = await collection().findOne({
				collection: 'cats',
				id: 'cat_coco',
			});
			expect(cats_page.dependentOn).toContainEqual(cat_coco._id);

			expect(cats_page.dependencyFor).toHaveLength(1);

			const layout: any = await collection().findOne({
				global: 'layout',
			});
			expect(cats_page.dependencyFor).toContainEqual(layout._id);
		});

		it('should populate dogs page', async () => {
			const dogs_page: any = await collection().findOne({
				collection: 'pages',
				id: 'dogs_page',
			});

			expect(dogs_page.dependentOn).toHaveLength(2);

			const dog_max: any = await collection().findOne({
				collection: 'dogs',
				id: 'dog_max',
			});
			expect(dogs_page.dependentOn).toContainEqual(dog_max._id);

			const dog_charlie: any = await collection().findOne({
				collection: 'dogs',
				id: 'dog_charlie',
			});
			expect(dogs_page.dependentOn).toContainEqual(dog_charlie._id);
			expect(dogs_page.dependencyFor).toHaveLength(1);

			const layout: any = await collection().findOne({
				global: 'layout',
			});
			expect(dogs_page.dependencyFor).toContainEqual(layout._id);
		});

		it('should populate home page', async () => {
			const home: any = await collection().findOne({
				collection: 'pages',
				id: 'home',
			});
			expect(home.dependentOn).toHaveLength(7);

			const dog_max: any = await collection().findOne({
				collection: 'dogs',
				id: 'dog_max',
			});
			expect(home.dependentOn).toContainEqual(dog_max._id);

			const dog_charlie: any = await collection().findOne({
				collection: 'dogs',
				id: 'dog_charlie',
			});
			expect(home.dependentOn).toContainEqual(dog_charlie._id);

			const cat_luna: any = await collection().findOne({
				collection: 'cats',
				id: 'cat_luna',
			});
			expect(home.dependentOn).toContainEqual(cat_luna._id);

			const cat_coco: any = await collection().findOne({
				collection: 'cats',
				id: 'cat_coco',
			});
			expect(home.dependentOn).toContainEqual(cat_coco._id);

			const theobald_beverley: any = await collection().findOne({
				collection: 'people',
				id: 'theobald_beverley',
			});
			expect(home.dependentOn).toContainEqual(theobald_beverley._id);

			const val_gabby: any = await collection().findOne({
				collection: 'people',
				id: 'val_gabby',
			});
			expect(home.dependentOn).toContainEqual(val_gabby._id);

			const elsa_brylee: any = await collection().findOne({
				collection: 'people',
				id: 'elsa_brylee',
			});
			expect(home.dependentOn).toContainEqual(elsa_brylee._id);

			expect(home.dependencyFor).toHaveLength(1);

			const layout: any = await collection().findOne({
				global: 'layout',
			});
			expect(home.dependencyFor).toContainEqual(layout._id);
		});

		it('dependencies should work', async () => {
			expect(
				await dependencyGraph.isDirectDependency(
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
				await dependencyGraph.isDependency(
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
				await dependencyGraph.isDependency(
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
				await dependencyGraph.isDependency(
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
		callback.mockReset();

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

		expect(
			await dependencyGraph.isDependency(
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

		expect(
			await dependencyGraph.isDirectDependency(
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

		expect(
			await dependencyGraph.isDependency(
				{
					collection: 'pages',
					id: 'cats_page',
				},
				{
					collection: 'cats',
					id: 'cat_rex',
				},
			),
		).toBeFalsy();

		const doc: any = await collection().findOne({
			collection: 'cats',
			id: 'cat_rex',
		});

		expect(doc).toBeDefined();
		expect(doc.dependentOn).toHaveLength(1);

		const toy: any = await collection().findOne({
			collection: 'toys',
			id: 'feathers_wand',
		});

		expect(toy.dependencyFor).toContainEqual(doc._id);
		expect(toy.dependencyFor).toHaveLength(5);

		expect(callback).toHaveBeenCalledTimes(1);
		expect(callback).toHaveBeenCalledWith(
			expect.objectContaining({
				type: 'create',
			}),
		);

		await payload.delete({
			collection: 'cats',
			id: 'cat_rex',
		});
	});

	it('should delete resource from graph', async () => {
		callback.mockReset();

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

		const home: any = await collection().findOne({
			collection: 'pages',
			id: 'home',
		});

		expect(home.dependentOn).toHaveLength(6);

		expect(
			await dependencyGraph.isDependency(
				{
					collection: 'pages',
					id: 'home',
				},
				{
					collection: 'people',
					id: 'val_gabby',
				},
			),
		).toBeFalsy();

		expect(
			await dependencyGraph.isDirectDependency(
				{
					collection: 'cats',
					id: 'cat_coco',
				},
				{ collection: 'people', id: 'val_gabby' },
			),
		).toBeFalsy();

		const cat_coco: any = await collection().findOne({
			collection: 'cats',
			id: 'cat_coco',
		});

		expect(cat_coco.dependencyFor).toHaveLength(2);

		expect(
			await dependencyGraph.isDirectDependency(
				{
					collection: 'dogs',
					id: 'dog_charlie',
				},
				{ collection: 'people', id: 'val_gabby' },
			),
		).toBeFalsy();

		const dog_charlie: any = await collection().findOne({
			collection: 'dogs',
			id: 'dog_charlie',
		});
		expect(dog_charlie.dependencyFor).toHaveLength(2);
	});

	it('should update graph', async () => {
		expect(
			await dependencyGraph.isDependency(
				{
					collection: 'people',
					id: 'elsa_brylee',
				},
				{
					collection: 'cats',
					id: 'cat_luna',
				},
			),
		).toBeTruthy();

		expect(
			await dependencyGraph.isDependency(
				{
					collection: 'people',
					id: 'elsa_brylee',
				},
				{
					collection: 'cats',
					id: 'cat_coco',
				},
			),
		).toBeFalsy();

		expect(
			await dependencyGraph.isDependency(
				{
					collection: 'people',
					id: 'elsa_brylee',
				},
				{
					collection: 'dogs',
					id: 'dog_charlie',
				},
			),
		).toBeFalsy();

		callback.mockReset();

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

		const elsa_brylee: any = await collection().findOne({
			collection: 'people',
			id: 'elsa_brylee',
		});

		expect(elsa_brylee.dependentOn).toHaveLength(3);

		expect(
			await dependencyGraph.isDependency(
				{
					collection: 'people',
					id: 'elsa_brylee',
				},
				{
					collection: 'cats',
					id: 'cat_luna',
				},
			),
		).toBeTruthy();

		expect(
			await dependencyGraph.isDependency(
				{
					collection: 'people',
					id: 'elsa_brylee',
				},
				{
					collection: 'cats',
					id: 'cat_coco',
				},
			),
		).toBeTruthy();

		expect(
			await dependencyGraph.isDependency(
				{
					collection: 'people',
					id: 'elsa_brylee',
				},
				{
					collection: 'dogs',
					id: 'dog_charlie',
				},
			),
		).toBeTruthy();
	});

	it('should update graph on delete', async () => {
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

		callback.mockReset();

		await payload.delete({
			collection: 'cats',
			id: 'cat_rex',
		});

		expect(callback).toHaveBeenCalledWith(
			expect.objectContaining({
				type: 'delete',
				collection: 'cats',
				doc: expect.objectContaining({
					id: 'cat_rex',
				}),
			}),
		);
	});

	it('isDependency should return true inside subscription', async () => {
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

		const sub = DependencyGraphService.subscribe(() => {
			expect(
				dependencyGraph.isDependency(
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
		it('should return true', async () => {
			const result = await dependencyGraph.isDependencyForAnyResourceOfCollection(
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

			const result = await dependencyGraph.isDependencyForAnyResourceOfCollection(
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

	it('should call pageEditorExtractorDescription on init', () => {
		expect(pageEditorExtractorDescription).toHaveBeenCalledTimes(3); // because there are 3 pages
		pageEditorExtractorDescription.mockReset();
	});

	it('should call pageEditorExtractorDescription when adding resource with richText', async () => {
		pageEditorExtractorDescription.mockReset();

		await payload.create({
			collection: 'pages',
			data: {
				id: 'page_test',
				description: [
					{
						children: [{ text: 'Test description' }],
					},
				],
				content: [],
			},
		});

		expect(pageEditorExtractorDescription).toHaveBeenCalledTimes(1);
		expect(pageEditorExtractorDescription).toHaveBeenCalledWith(
			expect.objectContaining({
				dependencyGraph: dependencyGraph,
				source: {
					collection: 'pages',
					id: 'page_test',
				},
				doc: expect.objectContaining({
					id: 'page_test',
					description: [
						{
							children: [{ text: 'Test description' }],
						},
					],
					content: [],
				}),
				value: [
					{
						children: [{ text: 'Test description' }],
					},
				],
			}),
		);
		pageEditorExtractorDescription.mockReset();

		await payload.delete({
			collection: 'pages',
			id: 'page_test',
		});

		expect(pageEditorExtractorDescription).toHaveBeenCalledTimes(0);
	});

	// it('should call pageEditorExtractorDescription when updating resource with richText', async () => {
	// 	pageEditorExtractorDescription.mockReset();

	// 	await payload.update({
	// 		collection: 'pages',
	// 		id: 'home',
	// 		data: {
	// 			description: [
	// 				{
	// 					children: [{ text: 'blah blah' }],
	// 				},
	// 			],
	// 		},
	// 	});

	// 	expect(pageEditorExtractorDescription).toHaveBeenCalledTimes(1);
	// 	expect(pageEditorExtractorDescription).toHaveBeenCalledWith(
	// 		expect.objectContaining({
	// 			dependencyGraph: dependencyGraph,
	// 			source: {
	// 				collection: 'pages',
	// 				id: 'home',
	// 			},
	// 			doc: expect.objectContaining({
	// 				id: 'home',
	// 				description: [
	// 					{
	// 						children: [{ text: 'blah blah' }],
	// 					},
	// 				],
	// 			}),
	// 			value: [
	// 				{
	// 					children: [{ text: 'blah blah' }],
	// 				},
	// 			],
	// 		}),
	// 	);
	// 	pageEditorExtractorDescription.mockReset();
	// });
});
