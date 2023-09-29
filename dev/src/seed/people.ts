import type { Payload } from 'payload';

export const seedPeople = async (payload: Payload): Promise<void> => {
	await payload.create({
		collection: 'people',
		data: {
			id: 'val_gabby',
			firstname: 'Val',
			lastname: 'Gabby',
			owns: [
				{
					relationTo: 'cats',
					value: 'cat_coco',
				},
				{
					relationTo: 'dogs',
					value: 'dog_charlie',
				},
			],
		},
	});

	await payload.create({
		collection: 'people',
		data: {
			id: 'elsa_brylee',
			firstname: 'Elsa',
			lastname: 'Brylee',
			owns: [
				{
					relationTo: 'cats',
					value: 'cat_luna',
				},
			],
		},
	});

	await payload.create({
		collection: 'people',
		data: {
			id: 'theobald_beverley',
			firstname: 'Theobald',
			lastname: 'Beverley',
			owns: [
				{
					relationTo: 'dogs',
					value: 'dog_max',
				},
			],
		},
	});
};
