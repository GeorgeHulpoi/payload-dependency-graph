import path from 'path';
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
	typescript: {
		outputFile: path.resolve(__dirname, 'payload-types.ts'),
	},
	graphQL: {
		disable: true,
	},
	plugins: [DependencyGraphPlugin()],
});
