# Class: Subject

A simplistic implementation of the Observer design pattern. You can understand more reading [https://refactoring.guru/design-patterns/observer](https://refactoring.guru/design-patterns/observer).

## Hierarchy

- **`Subject`**

  ↳ [`DependencyGraphServiceImpl`](DependencyGraphServiceImpl.md)

## Table of contents

### Constructors

- [constructor](Subject.md#constructor)

### Properties

- [subscriptions](Subject.md#subscriptions)

### Methods

- [notifySubscribers](Subject.md#notifysubscribers)
- [subscribe](Subject.md#subscribe)
- [unsubscribe](Subject.md#unsubscribe)

## Constructors

### constructor

• **new Subject**()

## Properties

### subscriptions

• **subscriptions**: [`Subscription`](Subscription.md)[] = `[]`

#### Defined in

[src/subject.ts:8](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/e996cfd/src/subject.ts#L8)

## Methods

### notifySubscribers

▸ **notifySubscribers**(`event`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`Event`](../overview.md#event) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/subject.ts:20](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/e996cfd/src/subject.ts#L20)

___

### subscribe

▸ **subscribe**(`callback`): [`Subscription`](Subscription.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | [`SubscriptionCallback`](../overview.md#subscriptioncallback) |

#### Returns

[`Subscription`](Subscription.md)

#### Defined in

[src/subject.ts:10](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/e996cfd/src/subject.ts#L10)

___

### unsubscribe

▸ **unsubscribe**(`subscription`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `subscription` | [`Subscription`](Subscription.md) |

#### Returns

`void`

#### Defined in

[src/subject.ts:16](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/e996cfd/src/subject.ts#L16)
