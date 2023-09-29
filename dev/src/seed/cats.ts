import type { Payload } from 'payload';

export const seedCats = async (payload: Payload): Promise<void> => {
	await payload.create({
		collection: 'cats',
		data: {
			id: 'cat_coco',
			name: 'Coco',
			toys: [
				{
					degreeOfLove: '1',
					toy: 'feathers_wand',
				},
				{
					degreeOfLove: '0',
					toy: 'dog_bone',
				},
				{
					degreeOfLove: '0',
					toy: 'rubber_ball',
				},
			],
		},
	});

	await payload.create({
		collection: 'cats',
		data: {
			id: 'cat_luna',
			name: 'Luna',
			toys: [
				{
					degreeOfLove: '0.5',
					toy: 'feathers_wand',
				},
				{
					degreeOfLove: '0',
					toy: 'dog_bone',
				},
				{
					degreeOfLove: '0',
					toy: 'rubber_ball',
				},
			],
		},
	});
};
