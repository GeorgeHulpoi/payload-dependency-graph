import type { Config, Plugin } from 'payload/config';

import { InMemoryDependencyGraph } from './dependency-graph/in-memory';
import afterCollectionChange from './hooks/afterCollectionChange';
import afterCollectionDelete from './hooks/afterCollectionDelete';
import afterGlobalChange from './hooks/afterGlobalChange';
import { DependencyGraphSchema } from './schema';
import { DependencyGraphService } from '.';
import type { DependencyGraphPluginConfig } from './types';

export const DependencyGraphPlugin: (pluginConfig?: DependencyGraphPluginConfig) => Plugin =
	(
		pluginConfig: DependencyGraphPluginConfig = {
			factory: () => new InMemoryDependencyGraph(),
		},
	) =>
	(incomingConfig: Config): Config => {
		const { globals, collections, onInit, ...restOfConfig } = incomingConfig;

		const builder = new DependencyGraphSchema.Builder()
			.setCollections(collections || [])
			.setGlobals(globals || []);
		const schema = builder.build();
		DependencyGraphService.schema = schema;

		return {
			globals: (globals || []).map((global) => {
				const { hooks, ...restOfGlobal } = global;
				const { afterChange, ...restOfHooks } = hooks || {};

				return {
					hooks: {
						afterChange: [afterGlobalChange, ...(afterChange || [])],
						...restOfHooks,
					},
					...restOfGlobal,
				};
			}),
			collections: (collections || []).map((collection) => {
				const { hooks, ...restOfCollection } = collection;
				const { afterChange, afterDelete, ...restOfHooks } = hooks || {};

				return {
					hooks: {
						afterChange: [
							afterCollectionChange(collection.slug),
							...(afterChange || []),
						],
						afterDelete: [
							afterCollectionDelete(collection.slug),
							...(afterDelete || []),
						],
						...restOfHooks,
					},
					...restOfCollection,
				};
			}),
			onInit: async (payload) => {
				if (incomingConfig.onInit) {
					await incomingConfig.onInit(payload);
				}

				DependencyGraphService.dependencyGraph = pluginConfig
					.factory()
					.setSchema(schema)
					.setPayload(payload);
				if (pluginConfig.editorExtractor) {
					DependencyGraphService.dependencyGraph.setEditorExtractor(
						pluginConfig.editorExtractor,
					);
				}
				await DependencyGraphService.dependencyGraph.populate();
			},
			...restOfConfig,
		};
	};
