/* eslint-disable no-console */
import type { Config, Plugin } from 'payload/config';
import type { IncomingGlobalVersions } from 'payload/dist/versions/types';

import { DependencyGraphService } from '.';
import { InMemoryDependencyGraph } from './dependency-graph/in-memory';
import afterCollectionChange from './hooks/afterCollectionChange';
import afterCollectionDelete from './hooks/afterCollectionDelete';
import afterGlobalChange from './hooks/afterGlobalChange';
import beforeCollectionOperation from './hooks/beforeCollectionOperation';
import { DependencyGraphSchema } from './schema';
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
