# Interface: BaseEvent\<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Hierarchy

- **`BaseEvent`**

  ↳ [`CreateEvent`](CreateEvent.md)

  ↳ [`UpdateEvent`](UpdateEvent.md)

  ↳ [`DeleteEvent`](DeleteEvent.md)

## Table of contents

### Properties

- [collection](BaseEvent.md#collection)
- [doc](BaseEvent.md#doc)
- [global](BaseEvent.md#global)
- [type](BaseEvent.md#type)

## Properties

### collection

• `Optional` **collection**: `string`

#### Defined in

[src/types.ts:78](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/types.ts#L78)

___

### doc

• **doc**: `T`

#### Defined in

[src/types.ts:77](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/types.ts#L77)

___

### global

• `Optional` **global**: `string`

#### Defined in

[src/types.ts:79](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/types.ts#L79)

___

### type

• **type**: ``"create"`` \| ``"update"`` \| ``"delete"``

#### Defined in

[src/types.ts:76](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/types.ts#L76)
