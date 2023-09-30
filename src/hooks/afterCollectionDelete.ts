import type { CollectionAfterDeleteHook } from 'payload/types';

import DependenciesGraphService from '../service';

const afterCollectionDelete: (collection: string) => CollectionAfterDeleteHook =
	(collection: string) =>
	({ doc, id }) => {
		return DependenciesGraphService.onCollectionDelete({
			doc,
			id,
			collection,
		});
	};

export default afterCollectionDelete;
