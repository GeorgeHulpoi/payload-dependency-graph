import path from 'path';

import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';
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
	db: mongooseAdapter({
		url: process.env.MONGODB_URI!,
	}),
	editor: slateEditor({}),
	plugins: [
		DependencyGraphPlugin({
			editorExtractor,
			factory: () => new InMemoryDependencyGraph(),
		}),
	],
	onInit: async (payload) => {
		await seed(payload);
	},
});
