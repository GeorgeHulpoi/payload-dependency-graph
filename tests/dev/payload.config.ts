import path from 'path';
import { buildConfig } from 'payload/config';

import { DependencyGraphPlugin } from '../../src';
import collections from './collections';
import globals from './globals';

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
	plugins: [DependencyGraphPlugin()],
});
