import type { Payload } from 'payload';
import * as path from 'path';

export const seedMedia = async (payload: Payload): Promise<void> => {
	await payload.create({
		collection: 'media',
		data: {
			id: 'val_gabby_picture'
		},
        filePath: path.resolve(__dirname, '..', 'images', 'val_gabby.jpg'),
	});
};