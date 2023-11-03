import type { CollectionAfterDeleteHook } from 'payload/types';

import DependencyGraphService from '../service';

const afterCollectionDelete: (collection: string) => CollectionAfterDeleteHook =
	(collection: string) =>
	async ({ doc, id }) => {
		await DependencyGraphService.onCollectionDelete({
			doc,
			id,
			collection,
		});
	};

export default afterCollectionDelete;
