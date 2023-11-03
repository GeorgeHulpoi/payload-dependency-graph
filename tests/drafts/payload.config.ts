import path from 'path';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';
import { buildConfig } from 'payload/config';

import { DependencyGraphPlugin } from '../../src';

export default buildConfig({
	serverURL: 'http://localhost:3000',
	admin: {
		disable: true,
	},
	collections: [
		{
			slug: 'test',
			versions: {
				maxPerDoc: 5,
				drafts: true,
			},
			fields: [
				{
					name: 'id',
					type: 'text',
					unique: true,
					index: true,
					required: true,
				},
				{
					name: 'content',
					type: 'textarea',
				},
			],
		},
	],
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
});
