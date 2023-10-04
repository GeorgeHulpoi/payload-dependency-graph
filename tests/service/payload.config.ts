import path from 'path';
import { buildConfig } from 'payload/config';

import { DependencyGraphPlugin } from '../../src';
import { Toys } from '../dev/collections/Toys';

export default buildConfig({
	serverURL: 'http://localhost:3000',
	admin: {
		disable: true,
	},
	collections: [Toys],
	typescript: {
		outputFile: path.resolve(__dirname, 'payload-types.ts'),
	},
	graphQL: {
		disable: true,
	},
	plugins: [DependencyGraphPlugin()],
});
