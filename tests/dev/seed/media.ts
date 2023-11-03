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
<<<<<<< HEAD
};
=======
};
>>>>>>> fab6bec1f642f4cd26150cfb760da24004485b33
