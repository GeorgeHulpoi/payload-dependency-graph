import type { Config, Plugin } from 'payload/config';

import { InMemoryDependenciesGraph } from './dependencies-graph/in-memory';
import afterCollectionChange from './hooks/afterCollectionChange';
import afterCollectionDelete from './hooks/afterCollectionDelete';
import afterGlobalChange from './hooks/afterGlobalChange';
import dependenciesGraphObserver from './observer';
import { SchemaBuilder } from './schema-builder/schema-builder';
import type { PluginConfig } from './types';

const DependenciesGraphObserverPlugin: (pluginConfig?: PluginConfig) => Plugin =
	(
		pluginConfig: PluginConfig = {
			factory: (schema, payload) => new InMemoryDependenciesGraph(schema, payload),
		},
	) =>
	(incomingConfig: Config): Config => {
		const { globals, collections, onInit, ...restOfConfig } = incomingConfig;

		const builder = new SchemaBuilder(collections || [], globals || []);
		const schema = builder.build();
		dependenciesGraphObserver.schema = schema;

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

				dependenciesGraphObserver.dependenciesGraph = pluginConfig.factory(schema, payload);
				await dependenciesGraphObserver.dependenciesGraph.populate();
			},
			...restOfConfig,
		};
	};

export default DependenciesGraphObserverPlugin;
