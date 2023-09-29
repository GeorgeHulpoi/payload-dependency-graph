import type { Payload } from 'payload';

export const seedToys = async (payload: Payload): Promise<void> => {
	await payload.create({
		collection: 'toys',
		data: {
			id: 'rubber_ball',
			name: 'Rubber Ball',
			color: 'red',
		},
	});

	await payload.create({
		collection: 'toys',
		data: {
			id: 'dog_bone',
			name: 'Dog Bone',
			color: 'white',
		},
	});

	await payload.create({
		collection: 'toys',
		data: {
			id: 'feathers_wand',
			name: 'Feathers Wand',
			color: 'blue',
		},
	});
};
