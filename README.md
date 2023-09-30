# Payload Dependencies Graph Plugin

[![CI](https://github.com/GeorgeHulpoi/payload-dependencies-graph/workflows/Test/badge.svg?branch=main)](https://github.com/GeorgeHulpoi/payload-dependencies-graph/actions?query=workflow%3ATest)

This plugin creates a dependency graph between collections and globals. The graph updates automatically, because the plugin observes the changes made on any collection or globals.

## Use Cases

The plugin is useful when it comes to cached content or relationship-based changes.

-   You're caching a static page that uses nested relationship fields. If the page has fields with blocks, and these blocks are recursive and have their own relationship fields, it can be difficult to know which cache needs to be purged. For this situation, the plugin is perfect for knowing which resource is dependent on whom.
-   You're caching the API responses that contain a depth greater than 0. You can purge that cache for that specific resource when its dependencies change.

## Installation

```shell
yarn add payload-dependencies-graph
# OR
npm i payload-dependencies-graph
```

## Usage

1. In the `plugins` array of your [Payload config](https://payloadcms.com/docs/configuration/overview), call the plugin with [options](https://github.com/GeorgeHulpoi/payload-recaptcha-v3/blob/main/README.md#plugin-options):

```ts
import { buildConfig } from 'payload/config';
import { DependenciesGraphPlugin } from 'payload-dependencies-graph';

const config = buildConfig({
	// ... rest of your config
	plugins: [DependenciesGraphPlugin()],
});

export default config;
```

### Plugin Options

By default, the plugin uses the `InMemoryDependenciesGraph`, but you can use another way to manage dependencies as long as you extend the `DependenciesGraphBase` class. You can do this using the `factory` property.

| Property             | Type                                                                      |
| -------------------- | ------------------------------------------------------------------------- |
| factory `(optional)` | `(schema: DependenciesSchema, payload: Payload) => DependenciesGraphBase` |

If you're dealing with a lot of documents, a better approach is to use a database-oriented implementation because the in-memory approach will increase the RAM. In the next versions, the plugin will provide it by default for MongoDB and PostgreSQL.

2. If you want to listen for changes, call the `subscribe` function from `DependenciesGraphService`. The `DependenciesGraphService` is a singletone instance.

```ts
import { buildConfig } from 'payload/config';
import { DependenciesGraphPlugin, DependenciesGraphService } from 'payload-dependencies-graph';

const config = buildConfig({
	// ... rest of your config
	plugins: [DependenciesGraphPlugin()],
	onInit: (payload) => {
		DependenciesGraphService.subscribe((event) => {
			// write your own logic
		});
	},
});

export default config;
```

3. To check if a resource is a dependency for another resource use the `dependenciesGraph` from `DependenciesGraphService`:

```ts
import { buildConfig } from 'payload/config';
import { DependenciesGraphPlugin, DependenciesGraphService } from 'payload-dependencies-graph';

const config = buildConfig({
	// ... rest of your config
	plugins: [DependenciesGraphPlugin()],
	onInit: (payload) => {
		DependenciesGraphService.subscribe((event) => {
			if (event.type === 'update' && event.collection) {
				const graph = DependenciesGraphService.dependenciesGraph;
				const resource = {
					collection: event.collection,
					id: doc.id,
				};

				if (event.collection === 'pages' && doc.id === 'home') {
					// regenerate home page
				} else {
					if (
						graph.isDependency(
							{
								collection: 'pages',
								id: 'home',
							},
							resource,
						)
					) {
						// regenerate home page
					}
				}
			}
		});
	},
});

export default config;
```

## Tests

Tests are using Jest, to run the tests use:

```shell
npm run test
```

## API

... to do
