import type { Payload } from 'payload';

export const seedPages = async (payload: Payload): Promise<void> => {
	await payload.create({
		collection: 'pages',
		data: {
			id: 'cats_page',
			content: [
				{
					content: [
						{
							content: [
								{
									heading: 'Our Cats',
									items: [
										{
											cat: 'cat_coco',
										},
										{
											cat: 'cat_luna',
										},
									],
									blockType: 'cats-section',
								},
							],
							blockType: 'recursive-content',
						},
					],
					blockType: 'recursive-content',
				},
			],
		},
	});

	await payload.create({
		collection: 'pages',
		data: {
			id: 'dogs_page',
			content: [
				{
					content: [
						{
							content: [
								{
									heading: 'Our Dogs',
									items: [
										{
											dog: 'dog_charlie',
										},
										{
											dog: 'dog_max',
										},
									],
									blockType: 'dogs-section',
								},
							],
							blockType: 'recursive-content',
						},
					],
					blockType: 'recursive-content',
				},
			],
		},
	});

	await payload.create({
		collection: 'pages',
		data: {
			id: 'home',
			content: [
				{
					heading: 'Our Cats',
					items: [
						{
							cat: 'cat_coco',
						},
						{
							cat: 'cat_luna',
						},
					],
					blockType: 'cats-section',
				},
				{
					heading: 'Our Dogs',
					items: [
						{
							dog: 'dog_charlie',
						},
						{
							dog: 'dog_max',
						},
					],
					blockType: 'dogs-section',
				},
				{
					heading: 'Us',
					items: [
						{
							person: 'val_gabby',
						},
						{
							person: 'elsa_brylee',
						},
						{
							person: 'theobald_beverley',
						},
					],
					blockType: 'people-section',
				},
			],
		},
	});
};
