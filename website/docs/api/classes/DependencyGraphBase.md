# Class: DependencyGraphBase

Represents the base class for implementing a concrete dependency graph.

## Hierarchy

- **`DependencyGraphBase`**

  ↳ [`InMemoryDependencyGraph`](InMemoryDependencyGraph.md)

## Table of contents

### Constructors

- [constructor](DependencyGraphBase.md#constructor)

### Properties

- [editorExtractor](DependencyGraphBase.md#editorextractor)
- [payload](DependencyGraphBase.md#payload)
- [schema](DependencyGraphBase.md#schema)

### Methods

- [addDependency](DependencyGraphBase.md#adddependency)
- [deleteResource](DependencyGraphBase.md#deleteresource)
- [extractDependenciesFromDoc](DependencyGraphBase.md#extractdependenciesfromdoc)
- [isDependency](DependencyGraphBase.md#isdependency)
- [isDependencyForAnyResourceOfCollection](DependencyGraphBase.md#isdependencyforanyresourceofcollection)
- [isDirectDependency](DependencyGraphBase.md#isdirectdependency)
- [populate](DependencyGraphBase.md#populate)
- [purgeDependentOn](DependencyGraphBase.md#purgedependenton)
- [setEditorExtractor](DependencyGraphBase.md#seteditorextractor)
- [setPayload](DependencyGraphBase.md#setpayload)
- [setSchema](DependencyGraphBase.md#setschema)

## Constructors

### constructor

• **new DependencyGraphBase**()

## Properties

### editorExtractor

• `Protected` `Optional` **editorExtractor**: [`EditorExtractor`](../overview.md#editorextractor)

The function that takes care of extracting the dependencies from a field of type `richText`.

#### Defined in

[src/dependency-graph/base.ts:24](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/e996cfd/src/dependency-graph/base.ts#L24)

___

### payload

• `Protected` **payload**: `Payload`

Payload instance

#### Defined in

[src/dependency-graph/base.ts:19](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/e996cfd/src/dependency-graph/base.ts#L19)

___

### schema

• `Protected` **schema**: `DependencyGraphSchema`

Schema of the dependency graph

#### Defined in

[src/dependency-graph/base.ts:14](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/e996cfd/src/dependency-graph/base.ts#L14)

## Methods

### addDependency

▸ `Abstract` **addDependency**(`source`, `target`): `void` \| `Promise`<`void`\>

Add target as a direct dependency of source.

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |
| `target` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[src/dependency-graph/base.ts:54](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/e996cfd/src/dependency-graph/base.ts#L54)

___

### deleteResource

▸ `Abstract` **deleteResource**(`resource`): `void` \| `Promise`<`void`\>

Deletes a resource from the dependency graph.

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[src/dependency-graph/base.ts:46](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/e996cfd/src/dependency-graph/base.ts#L46)

___

### extractDependenciesFromDoc

▸ **extractDependenciesFromDoc**(`source`, `doc`, `schemas`): `Promise`<`void`\>

Used to extract dependencies from a document based on schemas. The function will automatically populate the dependency graph.

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |
| `doc` | `any` |
| `schemas` | [`DependencySchema`](../interfaces/DependencySchema.md)[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/dependency-graph/base.ts:155](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/e996cfd/src/dependency-graph/base.ts#L155)

___

### isDependency

▸ `Abstract` **isDependency**(`source`, `target`): `boolean` \| `Promise`<`boolean`\>

Is target a dependency for source?

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |
| `target` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |

#### Returns

`boolean` \| `Promise`<`boolean`\>

#### Defined in

[src/dependency-graph/base.ts:84](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/e996cfd/src/dependency-graph/base.ts#L84)

___

### isDependencyForAnyResourceOfCollection

▸ `Abstract` **isDependencyForAnyResourceOfCollection**(`target`, `collection`): `boolean` \| `Promise`<`boolean`\>

Is target a dependency for any resource of collection given?

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |
| `collection` | `string` |

#### Returns

`boolean` \| `Promise`<`boolean`\>

#### Defined in

[src/dependency-graph/base.ts:94](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/e996cfd/src/dependency-graph/base.ts#L94)

___

### isDirectDependency

▸ `Abstract` **isDirectDependency**(`source`, `target`): `boolean` \| `Promise`<`boolean`\>

Is target a direct dependency for source?

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |
| `target` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |

#### Returns

`boolean` \| `Promise`<`boolean`\>

#### Defined in

[src/dependency-graph/base.ts:73](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/e996cfd/src/dependency-graph/base.ts#L73)

___

### populate

▸ **populate**(): `Promise`<`void`\>

Used at Payload initialization to populate the dependency graph.
You shouldn't call this function by yourself.

#### Returns

`Promise`<`void`\>

#### Defined in

[src/dependency-graph/base.ts:103](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/e996cfd/src/dependency-graph/base.ts#L103)

___

### purgeDependentOn

▸ `Abstract` **purgeDependentOn**(`resource`): `void` \| `Promise`<`void`\>

The function purges the dependentsOn for a resource and removes for that
dependencies the dependencyFor.

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[src/dependency-graph/base.ts:65](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/e996cfd/src/dependency-graph/base.ts#L65)

___

### setEditorExtractor

▸ **setEditorExtractor**(`editorExtractor`): [`DependencyGraphBase`](DependencyGraphBase.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `editorExtractor` | [`EditorExtractor`](../overview.md#editorextractor) |

#### Returns

[`DependencyGraphBase`](DependencyGraphBase.md)

#### Defined in

[src/dependency-graph/base.ts:36](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/e996cfd/src/dependency-graph/base.ts#L36)

___

### setPayload

▸ **setPayload**(`payload`): [`DependencyGraphBase`](DependencyGraphBase.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `Payload` |

#### Returns

[`DependencyGraphBase`](DependencyGraphBase.md)

#### Defined in

[src/dependency-graph/base.ts:31](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/e996cfd/src/dependency-graph/base.ts#L31)

___

### setSchema

▸ **setSchema**(`schema`): [`DependencyGraphBase`](DependencyGraphBase.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `DependencyGraphSchema` |

#### Returns

[`DependencyGraphBase`](DependencyGraphBase.md)

#### Defined in

[src/dependency-graph/base.ts:26](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/e996cfd/src/dependency-graph/base.ts#L26)
