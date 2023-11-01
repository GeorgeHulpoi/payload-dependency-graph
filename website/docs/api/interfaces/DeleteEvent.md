# Interface: DeleteEvent\<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Hierarchy

- [`BaseEvent`](BaseEvent.md)\<`T`\>

  ↳ **`DeleteEvent`**

## Table of contents

### Properties

- [collection](DeleteEvent.md#collection)
- [doc](DeleteEvent.md#doc)
- [global](DeleteEvent.md#global)
- [type](DeleteEvent.md#type)

## Properties

### collection

• `Optional` **collection**: `string`

#### Inherited from

[BaseEvent](BaseEvent.md).[collection](BaseEvent.md#collection)

#### Defined in

[src/types.ts:78](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/099b8df/src/types.ts#L78)

___

### doc

• **doc**: `T`

#### Inherited from

[BaseEvent](BaseEvent.md).[doc](BaseEvent.md#doc)

#### Defined in

[src/types.ts:77](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/099b8df/src/types.ts#L77)

___

### global

• `Optional` **global**: `undefined`

#### Overrides

[BaseEvent](BaseEvent.md).[global](BaseEvent.md#global)

#### Defined in

[src/types.ts:93](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/099b8df/src/types.ts#L93)

___

### type

• **type**: ``"create"`` \| ``"update"`` \| ``"delete"``

#### Inherited from

[BaseEvent](BaseEvent.md).[type](BaseEvent.md#type)

#### Defined in

[src/types.ts:76](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/099b8df/src/types.ts#L76)
