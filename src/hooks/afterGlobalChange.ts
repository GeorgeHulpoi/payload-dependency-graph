import type { GlobalAfterChangeHook } from 'payload/types';

import DependenciesGraphObserver from '../observer';

const afterGlobalChange: GlobalAfterChangeHook = async ({ doc, previousDoc }) => {
	return DependenciesGraphObserver.onGlobalChange({
		doc,
		previousDoc,
	});
};

export default afterGlobalChange;
