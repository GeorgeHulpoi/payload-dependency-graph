# Class: DependencyGraphResourceSet

The `DependencyGraphResourceSet` object lets you store unique dependency graph resources.

## Table of contents

### Constructors

- [constructor](DependencyGraphResourceSet.md#constructor)

### Properties

- [\_map](DependencyGraphResourceSet.md#_map)

### Accessors

- [size](DependencyGraphResourceSet.md#size)

### Methods

- [[iterator]](DependencyGraphResourceSet.md#[iterator])
- [add](DependencyGraphResourceSet.md#add)
- [clear](DependencyGraphResourceSet.md#clear)
- [delete](DependencyGraphResourceSet.md#delete)
- [forEach](DependencyGraphResourceSet.md#foreach)
- [getKey](DependencyGraphResourceSet.md#getkey)
- [has](DependencyGraphResourceSet.md#has)
- [values](DependencyGraphResourceSet.md#values)

## Constructors

### constructor

• **new DependencyGraphResourceSet**(`iterable?`): [`DependencyGraphResourceSet`](DependencyGraphResourceSet.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `iterable?` | [`DependencyGraphResource`](../overview.md#dependencygraphresource)[] \| [`DependencyGraphResourceSet`](DependencyGraphResourceSet.md) |

#### Returns

[`DependencyGraphResourceSet`](DependencyGraphResourceSet.md)

#### Defined in

[src/utils/set.ts:11](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/bf25d07/src/utils/set.ts#L11)

## Properties

### \_map

• `Private` `Readonly` **\_map**: `Map`\<`string`, [`DependencyGraphResource`](../overview.md#dependencygraphresource)\>

#### Defined in

[src/utils/set.ts:9](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/bf25d07/src/utils/set.ts#L9)

## Accessors

### size

• `get` **size**(): `number`

The size accessor property of `DependencyGraphResourceSet` instances returns the number of (unique) resources in this set.

#### Returns

`number`

#### Defined in

[src/utils/set.ts:28](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/bf25d07/src/utils/set.ts#L28)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<[`DependencyGraphResource`](../overview.md#dependencygraphresource)\>

#### Returns

`IterableIterator`\<[`DependencyGraphResource`](../overview.md#dependencygraphresource)\>

#### Defined in

[src/utils/set.ts:33](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/bf25d07/src/utils/set.ts#L33)

___

### add

▸ **add**(`resource`): [`DependencyGraphResourceSet`](DependencyGraphResourceSet.md)

This method inserts a new element with a specified value in to this set, if there isn't an element with the same value already in this set.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resource` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) | The resource to add to the `DependencyGraphResourceSet` object. |

#### Returns

[`DependencyGraphResourceSet`](DependencyGraphResourceSet.md)

The `DependencyGraphResourceSet` object with added resource.

#### Defined in

[src/utils/set.ts:43](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/bf25d07/src/utils/set.ts#L43)

___

### clear

▸ **clear**(): `void`

This method removes all resources from this set.

#### Returns

`void`

#### Defined in

[src/utils/set.ts:54](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/bf25d07/src/utils/set.ts#L54)

___

### delete

▸ **delete**(`resource`): `boolean`

This method removes a specified resource from this set, if it is in the set.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resource` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) | The resource to remove from `DependencyGraphResourceSet`. |

#### Returns

`boolean`

Returns `true` if `resource` was already in `DependencyGraphResourceSet`; otherwise `false`.

#### Defined in

[src/utils/set.ts:64](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/bf25d07/src/utils/set.ts#L64)

___

### forEach

▸ **forEach**(`callbackfn`, `thisArg?`): `void`

Executes a provided function once per each resource in the `DependencyGraphResourceSet`, in insertion order.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callbackfn` | (`value`: [`DependencyGraphResource`](../overview.md#dependencygraphresource), `key`: `string`, `map`: `Map`\<`string`, [`DependencyGraphResource`](../overview.md#dependencygraphresource)\>) => `void` |
| `thisArg?` | `any` |

#### Returns

`void`

#### Defined in

[src/utils/set.ts:78](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/bf25d07/src/utils/set.ts#L78)

___

### getKey

▸ **getKey**(`resource`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |

#### Returns

`string`

#### Defined in

[src/utils/set.ts:110](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/bf25d07/src/utils/set.ts#L110)

___

### has

▸ **has**(`resource`): `boolean`

This method returns a boolean indicating whether a resource exists in this `DependencyGraphResourceSet` or not.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resource` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) | The resource to test for presence in the `DependencyGraphResourceSet` object. |

#### Returns

`boolean`

`true` if the resource exists in the `DependencyGraphResourceSet` object; otherwise false.

#### Defined in

[src/utils/set.ts:97](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/bf25d07/src/utils/set.ts#L97)

___

### values

▸ **values**(): `IterableIterator`\<[`DependencyGraphResource`](../overview.md#dependencygraphresource)\>

This method returns an iterator object that contains the resources of this `DependencyGraphResourceSet` in insertion order.

#### Returns

`IterableIterator`\<[`DependencyGraphResource`](../overview.md#dependencygraphresource)\>

A new [iterable iterator object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator).

#### Defined in

[src/utils/set.ts:106](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/bf25d07/src/utils/set.ts#L106)
