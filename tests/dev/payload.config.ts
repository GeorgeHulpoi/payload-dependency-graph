import path from 'path';

import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';
import { buildConfig } from 'payload/config';

import { DependencyGraphPlugin } from '../../src';
import collections from './collections';
import globals from './globals';
import { seed } from './seed';

export default buildConfig({
	serverURL: 'http://localhost:3000',
	admin: {
		disable: true,
	},
	collections,
	globals,
	db: mongooseAdapter({
		url: process.env.MONGODB_URI!,
	}),
	editor: slateEditor({}),
	typescript: {
		outputFile: path.resolve(__dirname, 'payload-types.ts'),
	},
	graphQL: {
		disable: true,
	},
	plugins: [DependencyGraphPlugin()],
	onInit: async (payload) => {
		await seed(payload);
	}
});
