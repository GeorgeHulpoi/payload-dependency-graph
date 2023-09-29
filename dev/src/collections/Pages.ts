import type { CollectionConfig } from 'payload/types';
import blocks from '../blocks';

export const Pages: CollectionConfig = {
	slug: 'pages',
	fields: [
		{
			name: 'id',
			type: 'text',
			unique: true,
			index: true,
			required: true,
		},
		{
			type: 'tabs',
			tabs: [
				{
					label: 'Content',
					fields: [
						{
							name: 'content',
							type: 'blocks',
							blocks,
						},
					],
				},
			],
		},
	],
};
