import type { Config, Plugin } from 'payload/config';

import { InMemoryDependencyGraph } from './dependency-graph/in-memory';
import afterCollectionChange from './hooks/afterCollectionChange';
import afterCollectionDelete from './hooks/afterCollectionDelete';
import afterGlobalChange from './hooks/afterGlobalChange';
import service from './service';
import type { DependencyGraphPluginConfig } from './types';
import { DependencyGraphSchema } from './schema';

const DependencyGraphPlugin: (pluginConfig?: DependencyGraphPluginConfig) => Plugin =
	(
		pluginConfig: DependencyGraphPluginConfig = {
			factory: (schema, payload) =>
				new InMemoryDependencyGraph().setSchema(schema).setPayload(payload),
		},
	) =>
	(incomingConfig: Config): Config => {
		const { globals, collections, onInit, ...restOfConfig } = incomingConfig;

		const builder = new DependencyGraphSchema.Builder()
			.setCollections(collections || [])
			.setGlobals(globals || []);
		const schema = builder.build();
		service.schema = schema;

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

				service.dependencyGraph = pluginConfig.factory(schema, payload);
				if (pluginConfig.editorExtractor) {
					service.dependencyGraph.setEditorExtractor(pluginConfig.editorExtractor);
				}
				await service.dependencyGraph.populate();
			},
			...restOfConfig,
		};
	};

export default DependencyGraphPlugin;
