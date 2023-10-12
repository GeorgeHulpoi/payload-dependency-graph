import type { CollectionConfig } from 'payload/types';
import blocks from '../blocks';

export const pageEditorExtractorDescription = jest.fn((args) => {});

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
			name: 'description',
			type: 'richText',
			custom: {
				editorExtractor: pageEditorExtractorDescription
			}
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
