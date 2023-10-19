import type { Payload } from 'payload';
import { seedToys } from './toys';
import { seedCats } from './cats';
import { seedDogs } from './dogs';
import { seedPeople } from './people';
import { seedPages } from './pages';
import { seedLayout } from './layout';
import { seedMedia } from './media';

export const seed = async (payload: Payload): Promise<void> => {
	await seedMedia(payload);
	await seedToys(payload);
	await seedCats(payload);
	await seedDogs(payload);
	await seedPeople(payload);
	await seedPages(payload);
	await seedLayout(payload);
};
