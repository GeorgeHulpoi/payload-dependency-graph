import { Block } from 'payload/types';

import { Cats } from '../collections/Cats';

export const CatsSectionBlock: Block = {
	slug: 'cats-section',
	interfaceName: 'CatsSectionBlock',
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
					name: 'cat',
					type: 'relationship',
					relationTo: Cats.slug,
				},
			],
		},
	],
};
