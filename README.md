# Payload Dependency Graph Plugin

[![npm version](https://badge.fury.io/js/payload-dependency-graph.svg)](https://badge.fury.io/js/payload-dependency-graph) [![Test](https://github.com/GeorgeHulpoi/payload-dependency-graph/actions/workflows/test.yml/badge.svg)](https://github.com/GeorgeHulpoi/payload-dependency-graph/actions/workflows/test.yml) [![Downloads](http://img.shields.io/npm/dw/payload-dependency-graph.svg)](https://www.npmjs.com/package/payload-dependency-graph)

This plugin creates a dependency graph between collections and globals. The graph updates automatically, because the plugin observes the changes made on any collection or globals.

## Use Cases

The plugin is useful when it comes to cached content or relationship-based changes.

- You're caching a static page that uses nested relationship fields. If the page has fields with blocks, and these blocks are recursive and have their own relationship fields, it can be difficult to know which cache needs to be purged. For this situation, the plugin is perfect for knowing which resource is dependent on whom.
- You're caching the API responses that contain a depth greater than 0. You can purge that cache for that specific resource when its dependencies change.

## Installation

```shell
yarn add payload-dependency-graph
# OR
npm i payload-dependency-graph
```

## Usage

1. In the `plugins` array of your [Payload config](https://payloadcms.com/docs/configuration/overview), call the plugin with [options](#plugin-options):

```ts
import { buildConfig } from 'payload/config';
import { DependencyGraphPlugin } from 'payload-dependency-graph';

const config = buildConfig({
    // ... rest of your config
    plugins: [DependencyGraphPlugin()],
});

export default config;
```

### Plugin Options

By default, the plugin uses the `InMemoryDependencyGraph`, but you can use another way to manage dependencies as long as you extend the [DependencyGraphBase](#dependencygraphbase) class. You can do this using the `factory` property.

| Property               | Type                                                                                                                                                                                                                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `factory` (optional) | (`schema`: [DependenciesSchema](https://github.com/GeorgeHulpoi/payload-dependency-graph/blob/e99365aeb527e8cbe7b2cbcbf40f8b2d14d5aedd/src/types.ts#L27), `payload`:[Payload](https://github.com/payloadcms/payload/blob/master/src/payload.ts)) =>[DependencyGraphBase](#dependencygraphbase) |

If you're dealing with a lot of documents, a better approach is to use a database-oriented implementation because the in-memory approach will increase the RAM. In the next versions, the plugin will provide it by default for MongoDB and PostgreSQL.

2. If you want to listen for changes, call the `subscribe` function from [DependencyGraphService](#dependencygraphservice). The [DependencyGraphService](#dependencygraphservice) is a singletone instance.

```ts
import { buildConfig } from 'payload/config';
import { DependencyGraphPlugin, DependencyGraphService } from 'payload-dependency-graph';

const config = buildConfig({
    // ... rest of your config
    plugins: [DependencyGraphPlugin()],
    onInit: (payload) => {
        DependencyGraphService.subscribe((event) => {
            // write your own logic
        });
    },
});

export default config;
```

3. To check if a resource is a dependency for another resource use the `dependencyGraph` from [DependencyGraphService](#dependencygraphservice):

```ts
import { buildConfig } from 'payload/config';
import { DependencyGraphPlugin, DependencyGraphService } from 'payload-dependency-graph';

const config = buildConfig({
    // ... rest of your config
    plugins: [DependencyGraphPlugin()],
    onInit: (payload) => {
        DependencyGraphService.subscribe((event) => {
            if (event.type === 'update' && event.collection) {
                const graph = DependencyGraphService.dependencyGraph;
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

### DependencyGraphBase

Represents the base class for implementing a concrete dependency graph.

#### Properties

| Property Name | Type                   | Description                                        |
| ------------- | ---------------------- | -------------------------------------------------- |
| `schema`    | `DependenciesSchema` | Schema of dependencies generated by SchemaBuilder. |
| `payload`   | `Payload`            | The payload associated with the dependency graph.  |

#### Methods

| Method Name                       | Description                                                                                                                   | Parameters                                                                         | Returns                             |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------- |
| `deleteResource` (abstract)     | Deletes a resource from the dependency graph.                                                                                 | `resource: DependencyGraphResource`                                              | `void` \| `Promise<void>`       |
| `addDependency` (abstract)      | Add target as a direct dependency of source.                                                                                  | `source: DependencyGraphResource`, `target: DependencyGraphResource`           | `void` \| `Promise<void>`       |
| `purgeDependentOn` (abstract)   | Removes dependency on resource and removes them as dependencyFor.                                                             | `resource: DependencyGraphResource`                                              | `void` \| `Promise<void>`       |
| `isDirectDependency` (abstract) | Checks if target is a direct dependency for source.                                                                           | `source: DependencyGraphResource`, `target: DependencyGraphResource`           | `boolean` \| `Promise<boolean>` |
| `isDependency` (abstract)       | Checks if target is a dependency for source.                                                                                  | `source: DependencyGraphResource`, `target: DependencyGraphResource`           | `boolean` \| `Promise<boolean>` |
| `populate`                      | Used at Payload initialization to populate the dependency graph. You shouldn't call this<br />function by yourself.           | None                                                                               | `Promise<void>`                   |
| `extractDependenciesFromDoc`    | Used to extract dependencies from a document based on schemas. The function will automatically populate the dependency graph. | `source: DependencyGraphResource`, `doc: any`, `schemas: DependencySchema[]` | `void` \| `Promise<void>`       |

### DependencyGraphService

This class is an implementation for the service that is a singleton instance. Through this class, you interact with the plugin.

#### Properties

| Property Name       | Description                                                       | Type                                     |
| ------------------- | ----------------------------------------------------------------- | ---------------------------------------- |
| `schema`          | Schema of dependencies generated by SchemaBuilder.                | `DependenciesSchema`                   |
| `dependencyGraph` | The concrete instance of[DependencyGraphBase](#dependencygraphbase). | [DependencyGraphBase](#dependencygraphbase) |

#### Methods

| Method Name            | Description                                                                 | Parameters                       | Returns           |
| ---------------------- | --------------------------------------------------------------------------- | -------------------------------- | ----------------- |
| `onCollectionChange` | Function called exclusively by the `afterChange` hook in each collection. | `args: OnCollectionChangeArgs` | `Promise<void>` |
| `onCollectionDelete` | Function called exclusively by the `afterDelete` hook in each collection. | `args: OnCollectionDeleteArgs` | `Promise<void>` |
| `onGlobalChange`     | Function called exclusively by the `afterChange` hook in each global.     | `args: OnGlobalChangeArgs`     | `Promise<void>` |

#### Inheritance

- Inherits from the `Subject` class.

### Subject

A simplistic implementation of the Observer design pattern. You can understand more by reading [here](https://refactoring.guru/design-patterns/observer).

#### Properties

| Property Name     | Description                                    | Type               |
| ----------------- | ---------------------------------------------- | ------------------ |
| `subscriptions` | An array of subscriptions to manage observers. | `Subscription[]` |

#### Methods

| Method Name           | Description                                                                         | Parameters                         | Returns          |
| --------------------- | ----------------------------------------------------------------------------------- | ---------------------------------- | ---------------- |
| `subscribe`         | Subscribe to the subject with a callback function and return a subscription object. | `callback: SubscriptionCallback` | `Subscription` |
| `unsubscribe`       | Unsubscribe from the subject by providing a subscription object.                    | `subscription: Subscription`     | `void`         |
| `notifySubscribers` | Notify all subscribers with an event.                                               | `event: Event`                   | `void`         |

### Subscription

Represents a wrapper of a calling function. Used by [Subject](#subject). Very similar to [RxJS Subscription](https://rxjs.dev/guide/subscription).

#### Properties

| Property Name | Type                     |
| ------------- | ------------------------ |
| `callback`  | `SubscriptionCallback` |
| `subject`   | `Subject`              |

#### Methods

| Method Name     | Description                                          | Parameters                     | Returns     |
| --------------- | ---------------------------------------------------- | ------------------------------ | ----------- |
| `unsubscribe` | Unsubscribe from the associated subject.             | None                           | `void`    |
| `update`      | Update the subscription with an event.               | `event: Event`               | `void`    |
| `compare`     | Compare this subscription with another subscription. | `subscription: Subscription` | `boolean` |
