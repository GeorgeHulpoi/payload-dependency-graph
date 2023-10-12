import type { Block } from 'payload/types';

export const ContentBlock: Block = {
	slug: 'content',
	interfaceName: 'ContentBlock',
	fields: [
		{
			name: 'content',
			type: 'richText',
		},
	],
};
