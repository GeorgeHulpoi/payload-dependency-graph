# Class: Subscription

Represents a wrapper of a calling function. Used by [Subject](Subject.md).
Very similar to [RxJS Subscription](https://rxjs.dev/guide/subscription)

## Table of contents

### Constructors

- [constructor](Subscription.md#constructor)

### Properties

- [callback](Subscription.md#callback)
- [subject](Subscription.md#subject)

### Methods

- [compare](Subscription.md#compare)
- [unsubscribe](Subscription.md#unsubscribe)
- [update](Subscription.md#update)

## Constructors

### constructor

• **new Subscription**(`callback`, `subject`): [`Subscription`](Subscription.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | [`SubscriptionCallback`](../overview.md#subscriptioncallback) |
| `subject` | [`Subject`](Subject.md) |

#### Returns

[`Subscription`](Subscription.md)

#### Defined in

[src/subscription.ts:12](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/099b8df/src/subscription.ts#L12)

## Properties

### callback

• `Private` `Readonly` **callback**: [`SubscriptionCallback`](../overview.md#subscriptioncallback)

#### Defined in

[src/subscription.ts:9](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/099b8df/src/subscription.ts#L9)

___

### subject

• `Private` `Readonly` **subject**: [`Subject`](Subject.md)

#### Defined in

[src/subscription.ts:10](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/099b8df/src/subscription.ts#L10)

## Methods

### compare

▸ **compare**(`subscription`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `subscription` | [`Subscription`](Subscription.md) |

#### Returns

`boolean`

#### Defined in

[src/subscription.ts:25](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/099b8df/src/subscription.ts#L25)

___

### unsubscribe

▸ **unsubscribe**(): `void`

#### Returns

`void`

#### Defined in

[src/subscription.ts:17](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/099b8df/src/subscription.ts#L17)

___

### update

▸ **update**(`event`): `void` \| `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`Event`](../overview.md#event) |

#### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

[src/subscription.ts:21](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/099b8df/src/subscription.ts#L21)
