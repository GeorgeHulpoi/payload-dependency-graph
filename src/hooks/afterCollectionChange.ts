import type { CollectionAfterChangeHook } from 'payload/types';

import DependencyGraphService from '../service';

const afterCollectionChange: (collection: string) => CollectionAfterChangeHook =
	(collection: string) =>
	({ doc, previousDoc, operation }) => {
		return DependencyGraphService.onCollectionChange({
			doc,
			previousDoc,
			operation,
			collection,
		});
	};

export default afterCollectionChange;
