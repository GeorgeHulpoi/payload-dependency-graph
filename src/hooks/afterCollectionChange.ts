import type { CollectionAfterChangeHook } from 'payload/types';

import DependencyGraphService from '../service';

const afterCollectionChange: (collection: string) => CollectionAfterChangeHook =
	(collection: string) =>
	async ({ doc, previousDoc, operation, req, context }) => {
		const { draft = false } = context;
		const shouldSaveDraft = Boolean(
			draft && req.payload.collections[collection].config.versions.drafts,
		);

		if (!shouldSaveDraft) {
			await DependencyGraphService.onCollectionChange({
				doc,
				previousDoc,
				operation,
				collection,
			});
		}

		return doc;
	};

export default afterCollectionChange;
