import type { GlobalAfterChangeHook } from 'payload/types';

import { DependencyGraphService } from '..';

const afterGlobalChange: GlobalAfterChangeHook = async ({ doc, previousDoc }) => {
	return DependencyGraphService.onGlobalChange({
		doc,
		previousDoc,
	});
};

export default afterGlobalChange;
