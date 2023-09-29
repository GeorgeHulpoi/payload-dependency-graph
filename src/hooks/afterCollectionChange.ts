import type { CollectionAfterChangeHook } from 'payload/types';

import DependenciesGraphObserver from '../observer';

const afterCollectionChange: (collection: string) => CollectionAfterChangeHook =
	(collection: string) =>
	({ doc, previousDoc, operation }) => {
		return DependenciesGraphObserver.onCollectionChange({
			doc,
			previousDoc,
			operation,
			collection,
		});
	};

export default afterCollectionChange;
