import type { CollectionConfig } from 'payload/types';


export const Media: CollectionConfig = {
	slug: 'media',
	access: {
		create: () => true,
		read: () => true,
		update: () => true,
		delete: () => true,
	},
	upload: {
		staticURL: '/media',
		staticDir: '../public/media',
		mimeTypes: ['image/*'],
	},
    fields: [
        {
			name: 'id',
			type: 'text',
			unique: true,
			index: true,
			required: true,
		},
    ]
};
