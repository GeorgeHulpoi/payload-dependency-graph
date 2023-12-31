import type { GlobalAfterChangeHook } from 'payload/types';

import { DependencyGraphService } from '..';

const afterGlobalChange: GlobalAfterChangeHook = async ({ doc, previousDoc }) => {
	await DependencyGraphService.onGlobalChange({
		doc,
		previousDoc,
	});

	return doc;
};

export default afterGlobalChange;
