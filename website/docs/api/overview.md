# Overview

## Table of contents

### Classes

- [DependencyGraphBase](classes/DependencyGraphBase.md)
- [DependencyGraphServiceImpl](classes/DependencyGraphServiceImpl.md)
- [InMemoryDependencyGraph](classes/InMemoryDependencyGraph.md)
- [MongoDBDependencyGraph](classes/MongoDBDependencyGraph.md)
- [Subject](classes/Subject.md)
- [Subscription](classes/Subscription.md)

### Interfaces

- [BaseEvent](interfaces/BaseEvent.md)
- [CreateEvent](interfaces/CreateEvent.md)
- [DeleteEvent](interfaces/DeleteEvent.md)
- [DependencyGraphCollectionResource](interfaces/DependencyGraphCollectionResource.md)
- [DependencyGraphCollections](interfaces/DependencyGraphCollections.md)
- [DependencyGraphGlobalResource](interfaces/DependencyGraphGlobalResource.md)
- [DependencyGraphGlobals](interfaces/DependencyGraphGlobals.md)
- [DependencyGraphNode](interfaces/DependencyGraphNode.md)
- [DependencyGraphPluginConfig](interfaces/DependencyGraphPluginConfig.md)
- [DependencySchema](interfaces/DependencySchema.md)
- [DependencySchemaSlug](interfaces/DependencySchemaSlug.md)
- [OnCollectionChangeArgs](interfaces/OnCollectionChangeArgs.md)
- [OnCollectionDeleteArgs](interfaces/OnCollectionDeleteArgs.md)
- [OnGlobalChangeArgs](interfaces/OnGlobalChangeArgs.md)
- [UpdateEvent](interfaces/UpdateEvent.md)

### Type Aliases

- [DependencyGraphResource](overview.md#dependencygraphresource)
- [EditorExtractor](overview.md#editorextractor)
- [Event](overview.md#event)
- [SubscriptionCallback](overview.md#subscriptioncallback)

### Variables

- [DependencyGraphService](overview.md#dependencygraphservice)

### Functions

- [DependencyGraphPlugin](overview.md#dependencygraphplugin)

## Type Aliases

### DependencyGraphResource

Ƭ **DependencyGraphResource**: [`DependencyGraphGlobalResource`](interfaces/DependencyGraphGlobalResource.md) \| [`DependencyGraphCollectionResource`](interfaces/DependencyGraphCollectionResource.md)

#### Defined in

[src/types.ts:44](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/types.ts#L44)

___

### EditorExtractor

Ƭ **EditorExtractor**: (`args`: \{ `dependencyGraph`: [`DependencyGraphBase`](classes/DependencyGraphBase.md) ; `doc`: `any` ; `source`: [`DependencyGraphResource`](overview.md#dependencygraphresource) ; `value`: `any`  }) => `void` \| `Promise`\<`void`\>

#### Type declaration

▸ (`args`): `void` \| `Promise`\<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.dependencyGraph` | [`DependencyGraphBase`](classes/DependencyGraphBase.md) |
| `args.doc` | `any` |
| `args.source` | [`DependencyGraphResource`](overview.md#dependencygraphresource) |
| `args.value` | `any` |

##### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

[src/types.ts:3](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/types.ts#L3)

___

### Event

Ƭ **Event**: [`CreateEvent`](interfaces/CreateEvent.md) \| [`UpdateEvent`](interfaces/UpdateEvent.md) \| [`DeleteEvent`](interfaces/DeleteEvent.md)

#### Defined in

[src/types.ts:96](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/types.ts#L96)

___

### SubscriptionCallback

Ƭ **SubscriptionCallback**: (`event`: [`Event`](overview.md#event)) => `void` \| `Promise`\<`void`\>

#### Type declaration

▸ (`event`): `void` \| `Promise`\<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`Event`](overview.md#event) |

##### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

[src/types.ts:98](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/types.ts#L98)

## Variables

### DependencyGraphService

• `Const` **DependencyGraphService**: [`DependencyGraphServiceImpl`](classes/DependencyGraphServiceImpl.md)

#### Defined in

[src/index.ts:9](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/index.ts#L9)

## Functions

### DependencyGraphPlugin

▸ **DependencyGraphPlugin**(`pluginConfig?`): `Plugin`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pluginConfig?` | [`DependencyGraphPluginConfig`](interfaces/DependencyGraphPluginConfig.md) |

#### Returns

`Plugin`

#### Defined in

[src/plugin.ts:11](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/plugin.ts#L11)
