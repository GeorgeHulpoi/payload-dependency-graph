import type { Payload } from 'payload';

export const seedDogs = async (payload: Payload): Promise<void> => {
	await payload.create({
		collection: 'dogs',
		data: {
			id: 'dog_charlie',
			name: 'Charlie',
			toys: [
				{
					degreeOfLove: '0',
					toy: 'feathers_wand',
				},
				{
					degreeOfLove: '0.5',
					toy: 'dog_bone',
				},
				{
					degreeOfLove: '1',
					toy: 'rubber_ball',
				},
			],
		},
	});

	await payload.create({
		collection: 'dogs',
		data: {
			id: 'dog_max',
			name: 'Max',
			toys: [
				{
					degreeOfLove: '0',
					toy: 'feathers_wand',
				},
				{
					degreeOfLove: '1',
					toy: 'dog_bone',
				},
				{
					degreeOfLove: '0.5',
					toy: 'rubber_ball',
				},
			],
		},
	});
};
