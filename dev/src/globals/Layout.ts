import { GlobalConfig } from 'payload/types';
import { Pages } from '../collections/Pages';

const Layout: GlobalConfig = {
	slug: 'layout',
	fields: [
		{
			name: 'menus',
			type: 'array',
			fields: [
				{
					name: 'type',
					type: 'select',
					options: [
						{
							label: 'Link',
							value: 'link',
						},
						{
							label: 'Dropdown',
							value: 'dropdown',
						},
					],
				},
				{
					name: 'page',
					type: 'relationship',
					relationTo: Pages.slug,
					required: true,
					admin: {
						condition: (data, siblingData) => siblingData['type'] === 'link',
					},
				},
				{
					name: 'name',
					type: 'text',
					required: true,
					admin: {
						condition: (data, siblingData) => siblingData['type'] === 'dropdown',
					},
				},
				{
					name: 'menus',
					type: 'array',
					required: true,
					fields: [
						{
							name: 'page',
							type: 'relationship',
							relationTo: Pages.slug,
							required: true,
							maxDepth: 1,
						},
						{
							name: 'description',
							type: 'textarea',
						},
					],
					admin: {
						condition: (data, siblingData) => siblingData['type'] === 'dropdown',
					},
				},
			],
		},
	],
};

export default Layout;
