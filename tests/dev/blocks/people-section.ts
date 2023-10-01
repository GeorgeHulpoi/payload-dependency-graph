import { Block } from 'payload/types';

import { People } from '../collections/People';

export const PeopleSectionBlock: Block = {
	slug: 'people-section',
	interfaceName: 'PeopleSectionBlock',
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
					name: 'person',
					type: 'relationship',
					relationTo: People.slug,
				},
			],
		},
	],
};
