/**
 * Used to extract values from a given path within `doc`.
 *
 * @param path
 * @param doc
 * @returns a list of values, because the path accepts array.
 */
export default function getValuesFromPath(path: string, doc: any): any[] {
	const pathArr = path.split('.');

	if (path === '') {
		return [doc];
	}

	const values: any[] = [];

	let root = doc;

	for (let i = 0; i < pathArr.length; i++) {
		const prop = pathArr[i];
		root = root[prop];

		if (root === undefined) {
			break;
		} else if (i === pathArr.length - 1) {
			values.push(root);
		} else if (pathArr[i + 1] === '*') {
			for (const child of root) {
				values.push(...getValuesFromPath(pathArr.slice(i + 2).join('.'), child));
			}

			break;
		}
	}

	return values;
}
