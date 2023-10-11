import { InMemoryDependencyGraph } from '../../../src/dependency-graph/in-memory';

describe('InMemoryDependencyGraph', () => {
	describe('compareResources', () => {
		it('should return true', () => {
			const result = InMemoryDependencyGraph.compareResources(
				{
					collection: 'pages',
					id: '1',
				},
				{
					collection: 'pages',
					id: '1',
				},
			);

			expect(result).toEqual(true);
		});

		it('should return false', () => {
			const result = InMemoryDependencyGraph.compareResources(
				{
					global: 'layout',
				},
				{
					collection: 'pages',
					id: '1',
				},
			);

			expect(result).toEqual(false);
		});
	});

	describe('safeGetDependencyGraphNode', () => {
		const graph = new InMemoryDependencyGraph();

		afterEach(() => {
			(graph as any).collections = {};
			(graph as any).globals = {};
		});

		it('should throw error if collection or global is not provided', () => {
			const fn = () => {
				graph.safeGetDependencyGraphNode({ id: '1' } as any);
			};

			expect(fn).toThrowError();
		});

		it('should return the node from collections', () => {
			const node: any = {
				dependentOn: [2],
				dependencyFor: [3],
			};

			(graph as any).collections = {
				cats: {
					'1': node,
				},
			};

			const returned = graph.safeGetDependencyGraphNode({ collection: 'cats', id: '1' });
			expect(returned).toEqual(node);
		});

		it("should create the node in collections if doesn't exist", () => {
			const returned = graph.safeGetDependencyGraphNode({ collection: 'cats', id: '1' });
			expect(returned).toEqual(
				expect.objectContaining({
					dependentOn: expect.anything(),
					dependencyFor: expect.anything(),
				}),
			);

			expect((graph as any).collections).toEqual(
				expect.objectContaining({
					cats: {
						'1': {
							dependentOn: expect.anything(),
							dependencyFor: expect.anything(),
						},
					},
				}),
			);
		});

		it('should return the node from globals', () => {
			const node: any = {
				dependentOn: [2],
				dependencyFor: [3],
			};

			(graph as any).globals = {
				layout: node,
			};

			const returned = graph.safeGetDependencyGraphNode({ global: 'layout' });
			expect(returned).toEqual(node);
		});

		it("should create the node in globals if doesn't exist", () => {
			const returned = graph.safeGetDependencyGraphNode({ global: 'layout' });
			expect(returned).toEqual(
				expect.objectContaining({
					dependentOn: expect.anything(),
					dependencyFor: expect.anything(),
				}),
			);

			expect((graph as any).globals).toEqual(
				expect.objectContaining({
					layout: {
						dependentOn: expect.anything(),
						dependencyFor: expect.anything(),
					},
				}),
			);
		});
	});

	describe('addDependency', () => {
		const graph = new InMemoryDependencyGraph();

		afterEach(() => {
			(graph as any).collections = {};
			(graph as any).globals = {};
		});

		it('should add dependency', () => {
			graph.addDependency(
				{
					collection: 'pages',
					id: 'privacy-policy',
				},
				{
					collection: 'legal',
					id: '1',
				},
			);

			expect((graph as any).collections).toEqual(
				expect.objectContaining({
					pages: {
						'privacy-policy': {
							dependentOn: [
								{
									collection: 'legal',
									id: '1',
								},
							],
							dependencyFor: [],
						},
					},
					legal: {
						'1': {
							dependentOn: [],
							dependencyFor: [
								{
									collection: 'pages',
									id: 'privacy-policy',
								},
							],
						},
					},
				}),
			);
		});

		it('should prevent creating duplicates', () => {
			graph.addDependency(
				{
					collection: 'people',
					id: 'george',
				},
				{
					collection: 'cats',
					id: 'tom',
				},
			);

			graph.addDependency(
				{
					collection: 'people',
					id: 'george',
				},
				{
					collection: 'cats',
					id: 'tom',
				},
			);

			expect((graph as any).collections).toEqual(
				expect.objectContaining({
					people: {
						george: {
							dependentOn: [
								{
									collection: 'cats',
									id: 'tom',
								},
							],
							dependencyFor: [],
						},
					},
					cats: {
						tom: {
							dependentOn: [],
							dependencyFor: [
								{
									collection: 'people',
									id: 'george',
								},
							],
						},
					},
				}),
			);
		});

		it('should add multiple dependencies', () => {
			graph.addDependency(
				{
					collection: 'pages',
					id: 'web-development',
				},
				{
					collection: 'testimonials',
					id: 'client1',
				},
			);

			graph.addDependency(
				{
					collection: 'pages',
					id: 'web-development',
				},
				{
					collection: 'testimonials',
					id: 'client2',
				},
			);

			graph.addDependency(
				{
					collection: 'pages',
					id: 'maintenance',
				},
				{
					collection: 'testimonials',
					id: 'client1',
				},
			);

			graph.addDependency(
				{
					collection: 'pages',
					id: 'maintenance',
				},
				{
					collection: 'testimonials',
					id: 'client2',
				},
			);

			graph.addDependency(
				{
					global: 'layout',
				},
				{
					collection: 'pages',
					id: 'maintenance',
				},
			);

			graph.addDependency(
				{
					global: 'layout',
				},
				{
					collection: 'pages',
					id: 'web-development',
				},
			);

			expect((graph as any).globals).toEqual(
				expect.objectContaining({
					layout: {
						dependentOn: expect.anything(),
						dependencyFor: expect.anything(),
					},
				}),
			);

			expect((graph as any).globals.layout.dependencyFor).toHaveLength(0);
			expect((graph as any).globals.layout.dependentOn).toHaveLength(2);
			expect((graph as any).globals.layout.dependentOn).toContainEqual({
				collection: 'pages',
				id: 'web-development',
			});
			expect((graph as any).globals.layout.dependentOn).toContainEqual({
				collection: 'pages',
				id: 'maintenance',
			});

			expect((graph as any).collections).toEqual(
				expect.objectContaining({
					pages: {
						'web-development': {
							dependentOn: [
								{
									collection: 'testimonials',
									id: 'client1',
								},
								{
									collection: 'testimonials',
									id: 'client2',
								},
							],
							dependencyFor: [
								{
									global: 'layout',
								},
							],
						},
						maintenance: {
							dependentOn: [
								{
									collection: 'testimonials',
									id: 'client1',
								},
								{
									collection: 'testimonials',
									id: 'client2',
								},
							],
							dependencyFor: [
								{
									global: 'layout',
								},
							],
						},
					},
					testimonials: {
						client1: {
							dependentOn: [],
							dependencyFor: [
								{
									collection: 'pages',
									id: 'web-development',
								},
								{
									collection: 'pages',
									id: 'maintenance',
								},
							],
						},
						client2: {
							dependentOn: [],
							dependencyFor: [
								{
									collection: 'pages',
									id: 'web-development',
								},
								{
									collection: 'pages',
									id: 'maintenance',
								},
							],
						},
					},
				}),
			);
		});
	});

	describe('purgeDependentOn', () => {
		const graph = new InMemoryDependencyGraph();

		afterEach(() => {
			(graph as any).collections = {};
			(graph as any).globals = {};
		});

		it('should purge resource dependent on ', () => {
			graph.addDependency(
				{
					collection: 'pages',
					id: 'web-development',
				},
				{
					collection: 'testimonials',
					id: 'client1',
				},
			);

			graph.addDependency(
				{
					collection: 'pages',
					id: 'web-development',
				},
				{
					collection: 'testimonials',
					id: 'client2',
				},
			);

			graph.addDependency(
				{
					collection: 'pages',
					id: 'maintenance',
				},
				{
					collection: 'testimonials',
					id: 'client1',
				},
			);

			graph.addDependency(
				{
					collection: 'pages',
					id: 'maintenance',
				},
				{
					collection: 'testimonials',
					id: 'client2',
				},
			);

			graph.addDependency(
				{
					global: 'layout',
				},
				{
					collection: 'pages',
					id: 'maintenance',
				},
			);

			graph.addDependency(
				{
					global: 'layout',
				},
				{
					collection: 'pages',
					id: 'web-development',
				},
			);

			graph.purgeDependentOn({
				collection: 'pages',
				id: 'maintenance',
			});

			expect((graph as any).globals).toEqual(
				expect.objectContaining({
					layout: {
						dependentOn: expect.anything(),
						dependencyFor: expect.anything(),
					},
				}),
			);

			expect((graph as any).globals.layout.dependencyFor).toHaveLength(0);
			expect((graph as any).globals.layout.dependentOn).toHaveLength(2);
			expect((graph as any).globals.layout.dependentOn).toContainEqual({
				collection: 'pages',
				id: 'web-development',
			});
			expect((graph as any).globals.layout.dependentOn).toContainEqual({
				collection: 'pages',
				id: 'maintenance',
			});

			expect((graph as any).collections).toEqual(
				expect.objectContaining({
					pages: {
						'web-development': {
							dependentOn: [
								{
									collection: 'testimonials',
									id: 'client1',
								},
								{
									collection: 'testimonials',
									id: 'client2',
								},
							],
							dependencyFor: [
								{
									global: 'layout',
								},
							],
						},
						maintenance: {
							dependentOn: [],
							dependencyFor: [
								{
									global: 'layout',
								},
							],
						},
					},
					testimonials: {
						client1: {
							dependentOn: [],
							dependencyFor: [
								{
									collection: 'pages',
									id: 'web-development',
								},
							],
						},
						client2: {
							dependentOn: [],
							dependencyFor: [
								{
									collection: 'pages',
									id: 'web-development',
								},
							],
						},
					},
				}),
			);
		});
	});

	describe('isDirectDependency', () => {
		const graph = new InMemoryDependencyGraph();

		afterEach(() => {
			(graph as any).collections = {};
			(graph as any).globals = {};
		});

		it('should return true', () => {
			graph.addDependency(
				{
					collection: 'pages',
					id: 'web-development',
				},
				{
					collection: 'testimonials',
					id: 'client1',
				},
			);

			const result = graph.isDirectDependency(
				{
					collection: 'pages',
					id: 'web-development',
				},
				{
					collection: 'testimonials',
					id: 'client1',
				},
			);

			expect(result).toBe(true);
		});

		it('should return false', () => {
			graph.addDependency(
				{
					collection: 'pages',
					id: 'web-development',
				},
				{
					collection: 'testimonials',
					id: 'client1',
				},
			);

			const result = graph.isDirectDependency(
				{
					collection: 'pages',
					id: 'web-development',
				},
				{
					collection: 'people',
					id: 'george',
				},
			);

			expect(result).toBe(false);
		});

		it('should return false 2', () => {
			graph.addDependency(
				{
					collection: 'pages',
					id: 'web-development',
				},
				{
					collection: 'testimonials',
					id: 'client1',
				},
			);

			graph.addDependency(
				{
					collection: 'testimonials',
					id: 'client1',
				},
				{
					collection: 'people',
					id: 'george',
				},
			);

			const result = graph.isDirectDependency(
				{
					collection: 'pages',
					id: 'web-development',
				},
				{
					collection: 'people',
					id: 'george',
				},
			);

			expect(result).toBe(false);
		});
	});

	describe('isDependency', () => {
		const graph = new InMemoryDependencyGraph();

		afterEach(() => {
			(graph as any).collections = {};
			(graph as any).globals = {};
		});

		it('should return true for depth 1', () => {
			graph.addDependency(
				{
					collection: 'pages',
					id: 'web-development',
				},
				{
					collection: 'testimonials',
					id: 'client1',
				},
			);

			const result = graph.isDependency(
				{
					collection: 'pages',
					id: 'web-development',
				},
				{
					collection: 'testimonials',
					id: 'client1',
				},
			);

			expect(result).toBe(true);
		});

		it('should return false', () => {
			graph.addDependency(
				{
					collection: 'pages',
					id: 'web-development',
				},
				{
					collection: 'testimonials',
					id: 'client1',
				},
			);

			const result = graph.isDependency(
				{
					collection: 'pages',
					id: 'web-development',
				},
				{
					collection: 'people',
					id: 'george',
				},
			);

			expect(result).toBe(false);
		});

		it('should return true for depth 2', () => {
			graph.addDependency(
				{
					collection: 'pages',
					id: 'web-development',
				},
				{
					collection: 'testimonials',
					id: 'client1',
				},
			);

			graph.addDependency(
				{
					collection: 'testimonials',
					id: 'client1',
				},
				{
					collection: 'people',
					id: 'george',
				},
			);

			const result = graph.isDependency(
				{
					collection: 'pages',
					id: 'web-development',
				},
				{
					collection: 'people',
					id: 'george',
				},
			);

			expect(result).toBe(true);
		});

		it('should work fine with a lot of dependencies', () => {
			graph.addDependency(
				{
					global: 'layout',
				},
				{
					collection: 'pages',
					id: 'home',
				},
			);
			graph.addDependency(
				{
					global: 'layout',
				},
				{
					collection: 'pages',
					id: 'web-development',
				},
			);
			graph.addDependency(
				{
					collection: 'pages',
					id: 'home',
				},
				{
					collection: 'testimonials',
					id: 'company1',
				},
			);
			graph.addDependency(
				{
					collection: 'pages',
					id: 'home',
				},
				{
					collection: 'testimonials',
					id: 'company2',
				},
			);
			graph.addDependency(
				{
					collection: 'pages',
					id: 'web-development',
				},
				{
					collection: 'testimonials',
					id: 'company3',
				},
			);
			graph.addDependency(
				{
					collection: 'testimonials',
					id: 'company1',
				},
				{
					collection: 'people',
					id: 'person1',
				},
			);
			graph.addDependency(
				{
					collection: 'testimonials',
					id: 'company2',
				},
				{
					collection: 'people',
					id: 'person2',
				},
			);
			graph.addDependency(
				{
					collection: 'testimonials',
					id: 'company3',
				},
				{
					collection: 'people',
					id: 'person3',
				},
			);

			expect(
				graph.isDependency(
					{
						collection: 'pages',
						id: 'web-development',
					},
					{
						collection: 'people',
						id: 'person3',
					},
				),
			).toBeTruthy();

			expect(
				graph.isDependency(
					{
						collection: 'pages',
						id: 'home',
					},
					{
						collection: 'people',
						id: 'person1',
					},
				),
			).toBeTruthy();

			expect(
				graph.isDependency(
					{
						collection: 'pages',
						id: 'home',
					},
					{
						collection: 'people',
						id: 'person2',
					},
				),
			).toBeTruthy();

			expect(
				graph.isDependency(
					{
						collection: 'pages',
						id: 'web-development',
					},
					{
						collection: 'people',
						id: 'person2',
					},
				),
			).toBeFalsy();

			expect(
				graph.isDependency(
					{
						global: 'layout',
					},
					{
						collection: 'people',
						id: 'person2',
					},
				),
			).toBeTruthy();
		});
	});

	describe('deleteResource', () => {
		const graph = new InMemoryDependencyGraph();

		afterEach(() => {
			(graph as any).collections = {};
			(graph as any).globals = {};
		});

		it('should delete resource', () => {
			graph.addDependency(
				{
					collection: 'pages',
					id: 'web-development',
				},
				{
					collection: 'testimonials',
					id: 'client1',
				},
			);

			graph.addDependency(
				{
					collection: 'pages',
					id: 'web-development',
				},
				{
					collection: 'testimonials',
					id: 'client2',
				},
			);

			graph.addDependency(
				{
					collection: 'pages',
					id: 'maintenance',
				},
				{
					collection: 'testimonials',
					id: 'client1',
				},
			);

			graph.addDependency(
				{
					collection: 'pages',
					id: 'maintenance',
				},
				{
					collection: 'testimonials',
					id: 'client2',
				},
			);

			graph.addDependency(
				{
					global: 'layout',
				},
				{
					collection: 'pages',
					id: 'maintenance',
				},
			);

			graph.addDependency(
				{
					global: 'layout',
				},
				{
					collection: 'pages',
					id: 'web-development',
				},
			);

			graph.deleteResource({
				collection: 'pages',
				id: 'web-development',
			});

			expect((graph as any).globals).toEqual(
				expect.objectContaining({
					layout: {
						dependentOn: expect.anything(),
						dependencyFor: expect.anything(),
					},
				}),
			);

			expect((graph as any).globals.layout.dependencyFor).toHaveLength(0);
			expect((graph as any).globals.layout.dependentOn).toHaveLength(1);
			expect((graph as any).globals.layout.dependentOn).toContainEqual({
				collection: 'pages',
				id: 'maintenance',
			});

			expect((graph as any).collections).toEqual(
				expect.objectContaining({
					pages: {
						maintenance: {
							dependentOn: [
								{
									collection: 'testimonials',
									id: 'client1',
								},
								{
									collection: 'testimonials',
									id: 'client2',
								},
							],
							dependencyFor: [
								{
									global: 'layout',
								},
							],
						},
					},
					testimonials: {
						client1: {
							dependentOn: [],
							dependencyFor: [
								{
									collection: 'pages',
									id: 'maintenance',
								},
							],
						},
						client2: {
							dependentOn: [],
							dependencyFor: [
								{
									collection: 'pages',
									id: 'maintenance',
								},
							],
						},
					},
				}),
			);
		});
	});
});
