import type { CollectionAfterChangeHook } from 'payload/types';

import DependenciesGraphService from '../service';

const afterCollectionChange: (collection: string) => CollectionAfterChangeHook =
	(collection: string) =>
	({ doc, previousDoc, operation }) => {
		return DependenciesGraphService.onCollectionChange({
			doc,
			previousDoc,
			operation,
			collection,
		});
	};

export default afterCollectionChange;
