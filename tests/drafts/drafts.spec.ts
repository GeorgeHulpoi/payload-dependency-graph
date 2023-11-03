import type { Server } from 'http';
import { MongoMemoryServer } from 'mongodb-memory-server';
import path from 'path';
import payload from 'payload';

import { DependencyGraphService } from '../../src';
import { start } from '../dev/server';

describe('Drafts Test', () => {
	let mongod: MongoMemoryServer;
	let server: Server;

	let graph: any;
	const callback = jest.fn();

	beforeAll(async () => {
		mongod = await MongoMemoryServer.create();

		process.env.PAYLOAD_CONFIG_PATH = path.join(__dirname, 'payload.config.ts');
		process.env.MONGODB_URI = mongod.getUri();

		server = await start();
		graph = DependencyGraphService.dependencyGraph;
		DependencyGraphService.subscribe(callback);
	});

	afterAll(async () => {
		await mongod.stop();
		server.close();
	});

	it('should skip if is draft', async () => {
		callback.mockReset();

		await payload.create({
			collection: 'test',
			data: {
				id: 'test_id',
				content: 'bluh blah bli',
			},
			draft: true,
		});

		expect(callback).toHaveBeenCalledTimes(0);
	});

	it('should skip if is draft 2', async () => {
		await payload.create({
			collection: 'test',
			data: {
				id: 'test_2',
				content: 'haha',
			},
		});

		callback.mockReset();

		await payload.update({
			collection: 'test',
			id: 'test_2',
			data: {
				content: 'sad',
			},
			draft: true,
		});

		expect(callback).toHaveBeenCalledTimes(0);
	});
});
