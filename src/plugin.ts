import type { Config, Plugin } from 'payload/config';
import { IncomingGlobalVersions } from 'payload/dist/versions/types';

import { InMemoryDependencyGraph } from './dependency-graph/in-memory';
import afterCollectionChange from './hooks/afterCollectionChange';
import afterCollectionDelete from './hooks/afterCollectionDelete';
import afterGlobalChange from './hooks/afterGlobalChange';
import beforeCollectionOperation from './hooks/beforeCollectionOperation';
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

				const newGlobal = {
					hooks: {
						afterChange: [afterGlobalChange, ...(afterChange || [])],
						...restOfHooks,
					},
					...restOfGlobal,
				};

				if (
					(newGlobal.versions as boolean) === true ||
					(newGlobal.versions as IncomingGlobalVersions)?.drafts === true
				) {
					console.warn("Don't use globals with drafts, it can break Dependency Graph.");
					console.warn(
						'Issue: https://github.com/GeorgeHulpoi/payload-dependency-graph/issues/9',
					);
				}

				return newGlobal;
			}),
			collections: (collections || []).map((collection) => {
				const { hooks, ...restOfCollection } = collection;
				const { afterChange, afterDelete, beforeOperation, ...restOfHooks } = hooks || {};

				return {
					hooks: {
						beforeOperation: [beforeCollectionOperation, ...(beforeOperation || [])],
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
