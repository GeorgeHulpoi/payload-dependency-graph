import type { CollectionConfig } from 'payload/types';

import { Dogs } from './Dogs';
import { Cats } from './Cats';
import { Media } from './Media';

export const People: CollectionConfig = {
	slug: 'people',
	fields: [
		{
			name: 'id',
			type: 'text',
			unique: true,
			index: true,
			required: true,
		},
		{
			name: 'firstname',
			type: 'text',
		},
		{
			name: 'lastname',
			type: 'text',
		},
		{
			name: 'picture',
			type: 'upload',
			relationTo: Media.slug
		},
		{
			name: 'owns',
			type: 'relationship',
			hasMany: true,
			relationTo: [Cats.slug, Dogs.slug],
		},
	],
};
