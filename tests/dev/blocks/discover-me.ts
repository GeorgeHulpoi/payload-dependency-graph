import { Block } from 'payload/types';

import { Cats } from '../collections/Cats';
import { Toys } from '../collections/Toys';

export const DiscoverMeBlock: Block = {
	slug: 'discover-me',
	interfaceName: 'DiscoverMeBlock',
	fields: [
		{
			name: 'toy',
			type: 'relationship',
			relationTo: Toys.slug,
		},
	],
};
