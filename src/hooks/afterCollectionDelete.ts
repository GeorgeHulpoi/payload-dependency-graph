import type { CollectionAfterDeleteHook } from 'payload/types';

import { DependencyGraphService } from '..';

const afterCollectionDelete: (collection: string) => CollectionAfterDeleteHook =
	(collection: string) =>
	({ doc, id }) => {
		return DependencyGraphService.onCollectionDelete({
			doc,
			id,
			collection,
		});
	};

export default afterCollectionDelete;
