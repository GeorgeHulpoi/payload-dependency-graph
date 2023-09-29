import type { CollectionAfterDeleteHook } from 'payload/types';

import DependenciesGraphObserver from '../observer';

const afterCollectionDelete: (collection: string) => CollectionAfterDeleteHook =
	(collection: string) =>
	({ doc, id }) => {
		return DependenciesGraphObserver.onCollectionDelete({
			doc,
			id,
			collection,
		});
	};

export default afterCollectionDelete;
