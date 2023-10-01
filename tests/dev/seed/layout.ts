import type { Payload } from 'payload';

export const seedLayout = async (payload: Payload): Promise<void> => {
	payload.updateGlobal({
		slug: 'layout',
		data: {
			menus: [
				{
					type: 'link',
					page: 'home',
				},
				{
					type: 'dropdown',
					name: 'Pets',
					menus: [
						{
							page: 'dogs_page',
							description: 'Dogs',
						},
						{
							page: 'cats_page',
							description: 'Cats',
						},
					],
				},
			],
		},
	});
};
