import { Block } from 'payload/types';

import { Dogs } from '../collections/Dogs';

export const DogsSectionBlock: Block = {
	slug: 'dogs-section',
	interfaceName: 'DogsSectionBlock',
	fields: [
		{
			name: 'heading',
			type: 'text',
		},
		{
			name: 'items',
			type: 'array',
			fields: [
				{
					name: 'dog',
					type: 'relationship',
					relationTo: Dogs.slug,
				},
			],
		},
	],
};
