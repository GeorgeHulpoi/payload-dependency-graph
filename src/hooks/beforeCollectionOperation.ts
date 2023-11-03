import type { CollectionBeforeOperationHook } from 'payload/types';

const beforeCollectionOperation: CollectionBeforeOperationHook = ({ operation, args }) => {
	if (operation === 'create' || operation === 'update') {
		const clone = { ...args };

		clone.req.context = {
			...(clone.req.context || {}),
			draft: args.draft,
		};

		return clone;
	}
	return args;
};

export default beforeCollectionOperation;
