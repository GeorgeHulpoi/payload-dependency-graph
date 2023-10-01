import getValuesFromPath from '../../src/utils/get-values-from-path';

describe('getValuesFromPath', () => {
	it('should get value from a simple object', () => {
		const obj = {
			page: 'id1',
		};
		const values = getValuesFromPath('page', obj);
		expect(values).toHaveLength(1);
		expect(values[0]).toEqual('id1');
	});

	it('should get values from an array', () => {
		const obj = {
			page: 'id1',
			items: [
				{
					page: 'id2',
				},
				{
					page: 'id3',
				},
			],
		};
		const values = getValuesFromPath('items.*.page', obj);
		expect(values).toHaveLength(2);
		expect(values).toContain('id2');
		expect(values).toContain('id3');
	});

	it('should get values from complex object', () => {
		const obj = {
			nav: {
				menus: [
					{
						page: 'id1',
					},
					{
						name: 'other',
						menus: [
							{
								page: 'id4',
							},
							{
								desc: 'hah',
							},
						],
					},
					{
						name: 'services',
						menus: [
							{
								page: 'id2',
								desc: 'abc',
							},
							{
								page: 'id3',
								desc: 'dfg',
							},
						],
					},
				],
			},
		};
		const values = getValuesFromPath('nav.menus.*.menus.*.page', obj);
		expect(values).toHaveLength(3);
		expect(values).toContain('id2');
		expect(values).toContain('id3');
		expect(values).toContain('id4');
	});

	it('should get relationships', () => {
		const obj = {
			owners: [
				{
					relationTo: 'users',
					value: '6031ac9e1289176380734024',
				},
				{
					relationTo: 'organizations',
					value: '602c3c327b811235943ee12b',
				},
			],
		};
		const values = getValuesFromPath('owners.*', obj);
		expect(values).toHaveLength(2);
		expect(values).toContainEqual({
			relationTo: 'users',
			value: '6031ac9e1289176380734024',
		});
		expect(values).toContainEqual({
			relationTo: 'organizations',
			value: '602c3c327b811235943ee12b',
		});
	});
});
