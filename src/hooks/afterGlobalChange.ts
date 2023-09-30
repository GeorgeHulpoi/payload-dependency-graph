import type { GlobalAfterChangeHook } from 'payload/types';

import DependenciesGraphService from '../service';

const afterGlobalChange: GlobalAfterChangeHook = async ({ doc, previousDoc }) => {
	return DependenciesGraphService.onGlobalChange({
		doc,
		previousDoc,
	});
};

export default afterGlobalChange;
