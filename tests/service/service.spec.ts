import type { Server } from 'http';
import { MongoMemoryServer } from 'mongodb-memory-server';
import path from 'path';
import payload from 'payload';

import { DependencyGraphService } from '../../src';
import { start } from './server';

describe('DependencyGraphService', () => {
	let mongod: MongoMemoryServer;
	let server: Server;

	let graph: any;
	let globals: any;
	let collections: any;
	const callback = jest.fn();

	beforeAll(async () => {
		mongod = await MongoMemoryServer.create();

		process.env.PAYLOAD_CONFIG_PATH = path.join(__dirname, 'payload.config.ts');
		process.env.MONGODB_URI = mongod.getUri();

		server = await start();
		graph = DependencyGraphService.dependencyGraph;
		globals = graph.globals;
		collections = graph.collections;
		DependencyGraphService.subscribe(callback);
	});

	afterAll(async () => {
		await mongod.stop();
		server.close();
	});

	it('should call callback when create', async () => {
		callback.mockReset();

		await payload.create({
			collection: 'toys',
			data: {
				id: 'gagball',
				name: 'Gagball',
				color: 'black',
			},
		});

		expect(callback).toHaveBeenCalledTimes(1);
		expect(callback).toHaveBeenCalledWith({
			type: 'create',
			collection: 'toys',
			doc: expect.objectContaining({
				id: 'gagball',
				name: 'Gagball',
				color: 'black',
			}),
		});
	});

	it('should call callback when update', async () => {
		callback.mockReset();

		await payload.update({
			collection: 'toys',
			id: 'gagball',
			data: {
				color: 'red',
			},
		});

		expect(callback).toHaveBeenCalledTimes(1);
		expect(callback).toHaveBeenCalledWith({
			type: 'update',
			collection: 'toys',
			doc: expect.objectContaining({
				id: 'gagball',
				name: 'Gagball',
				color: 'red',
			}),
			previousDoc: expect.objectContaining({
				id: 'gagball',
				name: 'Gagball',
				color: 'black',
			}),
		});
	});

	it('should call callback when delete', async () => {
		callback.mockReset();

		await payload.delete({
			collection: 'toys',
			id: 'gagball',
		});

		expect(callback).toHaveBeenCalledTimes(1);
		expect(callback).toHaveBeenCalledWith({
			type: 'delete',
			collection: 'toys',
			doc: expect.objectContaining({
				id: 'gagball',
				name: 'Gagball',
				color: 'red',
			}),
		});
	});
});
