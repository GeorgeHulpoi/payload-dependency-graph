# Class: DependencyGraphServiceImpl

This class is an implementation for the service that is a singleton instance.
Through this class you interact with the plugin.

## Hierarchy

- [`Subject`](Subject.md)

  ↳ **`DependencyGraphServiceImpl`**

## Table of contents

### Constructors

- [constructor](DependencyGraphServiceImpl.md#constructor)

### Properties

- [dependencyGraph](DependencyGraphServiceImpl.md#dependencygraph)
- [schema](DependencyGraphServiceImpl.md#schema)
- [subscriptions](DependencyGraphServiceImpl.md#subscriptions)

### Methods

- [notifySubscribers](DependencyGraphServiceImpl.md#notifysubscribers)
- [onCollectionChange](DependencyGraphServiceImpl.md#oncollectionchange)
- [onCollectionDelete](DependencyGraphServiceImpl.md#oncollectiondelete)
- [onGlobalChange](DependencyGraphServiceImpl.md#onglobalchange)
- [subscribe](DependencyGraphServiceImpl.md#subscribe)
- [unsubscribe](DependencyGraphServiceImpl.md#unsubscribe)

## Constructors

### constructor

• **new DependencyGraphServiceImpl**(): [`DependencyGraphServiceImpl`](DependencyGraphServiceImpl.md)

#### Returns

[`DependencyGraphServiceImpl`](DependencyGraphServiceImpl.md)

#### Inherited from

[Subject](Subject.md).[constructor](Subject.md#constructor)

## Properties

### dependencyGraph

• `Optional` **dependencyGraph**: [`DependencyGraphBase`](DependencyGraphBase.md)

The concrete instance of the dependency graph

#### Defined in

[src/service.ts:19](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/service.ts#L19)

___

### schema

• **schema**: `DependencyGraphSchema`

Schema of dependencies generated by SchemaBuilder

#### Defined in

[src/service.ts:14](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/service.ts#L14)

___

### subscriptions

• **subscriptions**: [`Subscription`](Subscription.md)[] = `[]`

#### Inherited from

[Subject](Subject.md).[subscriptions](Subject.md#subscriptions)

#### Defined in

[src/subject.ts:8](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/subject.ts#L8)

## Methods

### notifySubscribers

▸ **notifySubscribers**(`event`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`Event`](../overview.md#event) |

#### Returns

`Promise`\<`void`\>

#### Inherited from

[Subject](Subject.md).[notifySubscribers](Subject.md#notifysubscribers)

#### Defined in

[src/subject.ts:20](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/subject.ts#L20)

___

### onCollectionChange

▸ **onCollectionChange**(`args`): `Promise`\<`void`\>

Function called exclusively by the `afterChange` hook in each collection.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`OnCollectionChangeArgs`](../interfaces/OnCollectionChangeArgs.md)\<`any`\> |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/service.ts:26](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/service.ts#L26)

___

### onCollectionDelete

▸ **onCollectionDelete**(`args`): `Promise`\<`void`\>

Function called exclusively by the `afterDelete` hook in each collection.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`OnCollectionDeleteArgs`](../interfaces/OnCollectionDeleteArgs.md)\<`any`\> |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/service.ts:68](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/service.ts#L68)

___

### onGlobalChange

▸ **onGlobalChange**(`args`): `Promise`\<`void`\>

Function called exclusively by the `afterChange` hook in each global.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`OnGlobalChangeArgs`](../interfaces/OnGlobalChangeArgs.md)\<`any`\> |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/service.ts:92](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/service.ts#L92)

___

### subscribe

▸ **subscribe**(`callback`): [`Subscription`](Subscription.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | [`SubscriptionCallback`](../overview.md#subscriptioncallback) |

#### Returns

[`Subscription`](Subscription.md)

#### Inherited from

[Subject](Subject.md).[subscribe](Subject.md#subscribe)

#### Defined in

[src/subject.ts:10](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/subject.ts#L10)

___

### unsubscribe

▸ **unsubscribe**(`subscription`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `subscription` | [`Subscription`](Subscription.md) |

#### Returns

`void`

#### Inherited from

[Subject](Subject.md).[unsubscribe](Subject.md#unsubscribe)

#### Defined in

[src/subject.ts:16](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/subject.ts#L16)
