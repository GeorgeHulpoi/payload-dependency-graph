import type { CollectionConfig } from 'payload/types';

import { Toys } from './Toys';

export const Dogs: CollectionConfig = {
	slug: 'dogs',
	fields: [
		{
			name: 'id',
			type: 'text',
			unique: true,
			index: true,
			required: true,
		},
		{
			name: 'name',
			type: 'text',
		},
		{
			name: 'toys',
			type: 'array',
			fields: [
				{
					name: 'degreeOfLove',
					type: 'select',
					options: [
						{
							label: 'Very much!!',
							value: '1',
						},
						{
							label: "It's ok",
							value: '0.5',
						},
						{
							label: 'Not so much',
							value: '0',
						},
					],
				},
				{
					name: 'toy',
					type: 'relationship',
					relationTo: Toys.slug,
				},
			],
		},
	],
};
