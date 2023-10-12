import path from 'path';
import { buildConfig } from 'payload/config';

import { DependencyGraphPlugin, InMemoryDependencyGraph } from '../../../src';
import collections from '../../dev/collections';
import globals from '../../dev/globals';
import { seed } from '../../dev/seed';

export const editorExtractor = jest.fn((args) => {});

export default buildConfig({
	serverURL: 'http://localhost:3000',
	admin: {
		disable: true,
	},
	collections,
	globals,
	typescript: {
		outputFile: path.resolve(__dirname, 'payload-types.ts'),
	},
	graphQL: {
		disable: true,
	},
	plugins: [
		DependencyGraphPlugin({
			editorExtractor,
			factory: (schema, payload) =>
				new InMemoryDependencyGraph().setSchema(schema).setPayload(payload),
		}),
	],
	onInit: async (payload) => {
		await seed(payload);
	},
});
