# Class: DependencyGraphBase

Represents the base class for implementing a concrete dependency graph.

## Hierarchy

- **`DependencyGraphBase`**

  ↳ [`InMemoryDependencyGraph`](InMemoryDependencyGraph.md)

  ↳ [`MongoDBDependencyGraph`](MongoDBDependencyGraph.md)

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
- [getDependenciesForCollection](DependencyGraphBase.md#getdependenciesforcollection)
- [getDependenciesOfCollection](DependencyGraphBase.md#getdependenciesofcollection)
- [getDependsOnCollection](DependencyGraphBase.md#getdependsoncollection)
- [isDependency](DependencyGraphBase.md#isdependency)
- [isDependencyForAnyResourceOfCollection](DependencyGraphBase.md#isdependencyforanyresourceofcollection)
- [isDirectDependency](DependencyGraphBase.md#isdirectdependency)
- [populate](DependencyGraphBase.md#populate)
- [purgeDependentOn](DependencyGraphBase.md#purgedependenton)
- [setEditorExtractor](DependencyGraphBase.md#seteditorextractor)
- [setPayload](DependencyGraphBase.md#setpayload)
- [setSchema](DependencyGraphBase.md#setschema)
- [compareResources](DependencyGraphBase.md#compareresources)

## Constructors

### constructor

• **new DependencyGraphBase**(): [`DependencyGraphBase`](DependencyGraphBase.md)

#### Returns

[`DependencyGraphBase`](DependencyGraphBase.md)

## Properties

### editorExtractor

• `Protected` `Optional` **editorExtractor**: [`EditorExtractor`](../overview.md#editorextractor)

The function that takes care of extracting the dependencies from a field of type `richText`.

#### Defined in

[src/dependency-graph/base.ts:42](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/base.ts#L42)

___

### payload

• `Protected` **payload**: `Payload`

Payload instance

#### Defined in

[src/dependency-graph/base.ts:37](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/base.ts#L37)

___

### schema

• `Protected` **schema**: `DependencyGraphSchema`

Schema of the dependency graph

#### Defined in

[src/dependency-graph/base.ts:32](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/base.ts#L32)

## Methods

### addDependency

▸ **addDependency**(`source`, `target`): `void` \| `Promise`\<`void`\>

Add target as a direct dependency of source.

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |
| `target` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |

#### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

[src/dependency-graph/base.ts:72](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/base.ts#L72)

___

### deleteResource

▸ **deleteResource**(`resource`): `void` \| `Promise`\<`void`\>

Deletes a resource from the dependency graph.

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |

#### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

[src/dependency-graph/base.ts:64](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/base.ts#L64)

___

### extractDependenciesFromDoc

▸ **extractDependenciesFromDoc**(`source`, `doc`, `schemas`): `Promise`\<`void`\>

Used to extract dependencies from a document based on schemas. The function will automatically populate the dependency graph.

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |
| `doc` | `any` |
| `schemas` | [`DependencySchema`](../interfaces/DependencySchema.md)[] |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/dependency-graph/base.ts:199](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/base.ts#L199)

___

### getDependenciesForCollection

▸ **getDependenciesForCollection**(`resource`, `collection`): [`DependencyGraphResource`](../overview.md#dependencygraphresource)[] \| `Promise`\<[`DependencyGraphResource`](../overview.md#dependencygraphresource)[]\>

Get dependencies from `resource` that is of `collection`. This function traverses from bottom to up, using `dependecyFor`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |
| `collection` | `string` |

#### Returns

[`DependencyGraphResource`](../overview.md#dependencygraphresource)[] \| `Promise`\<[`DependencyGraphResource`](../overview.md#dependencygraphresource)[]\>

#### Defined in

[src/dependency-graph/base.ts:132](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/base.ts#L132)

___

### getDependenciesOfCollection

▸ **getDependenciesOfCollection**(`resource`, `collection`): [`DependencyGraphResource`](../overview.md#dependencygraphresource)[] \| `Promise`\<[`DependencyGraphResource`](../overview.md#dependencygraphresource)[]\>

Get dependencies of `resource` that is of `collection`

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |
| `collection` | `string` |

#### Returns

[`DependencyGraphResource`](../overview.md#dependencygraphresource)[] \| `Promise`\<[`DependencyGraphResource`](../overview.md#dependencygraphresource)[]\>

#### Defined in

[src/dependency-graph/base.ts:122](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/base.ts#L122)

___

### getDependsOnCollection

▸ **getDependsOnCollection**(`resource`, `collection`): [`DependencyGraphResource`](../overview.md#dependencygraphresource)[] \| `Promise`\<[`DependencyGraphResource`](../overview.md#dependencygraphresource)[]\>

Get dependencies from `resource` that is of `collection`. This function traverses from up to bottom, using `dependentOn`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |
| `collection` | `string` |

#### Returns

[`DependencyGraphResource`](../overview.md#dependencygraphresource)[] \| `Promise`\<[`DependencyGraphResource`](../overview.md#dependencygraphresource)[]\>

#### Defined in

[src/dependency-graph/base.ts:142](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/base.ts#L142)

___

### isDependency

▸ **isDependency**(`source`, `target`): `boolean` \| `Promise`\<`boolean`\>

Is target a dependency for source?

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |
| `target` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |

#### Returns

`boolean` \| `Promise`\<`boolean`\>

#### Defined in

[src/dependency-graph/base.ts:102](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/base.ts#L102)

___

### isDependencyForAnyResourceOfCollection

▸ **isDependencyForAnyResourceOfCollection**(`target`, `collection`): `boolean` \| `Promise`\<`boolean`\>

Is target a dependency for any resource of collection given?

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |
| `collection` | `string` |

#### Returns

`boolean` \| `Promise`\<`boolean`\>

#### Defined in

[src/dependency-graph/base.ts:112](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/base.ts#L112)

___

### isDirectDependency

▸ **isDirectDependency**(`source`, `target`): `boolean` \| `Promise`\<`boolean`\>

Is target a direct dependency for source?

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |
| `target` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |

#### Returns

`boolean` \| `Promise`\<`boolean`\>

#### Defined in

[src/dependency-graph/base.ts:91](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/base.ts#L91)

___

### populate

▸ **populate**(): `Promise`\<`void`\>

Used at Payload initialization to populate the dependency graph.
You shouldn't call this function by yourself.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/dependency-graph/base.ts:151](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/base.ts#L151)

___

### purgeDependentOn

▸ **purgeDependentOn**(`resource`): `void` \| `Promise`\<`void`\>

The function purges the dependentsOn for a resource and removes for that
dependencies the dependencyFor.

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |

#### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

[src/dependency-graph/base.ts:83](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/base.ts#L83)

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

[src/dependency-graph/base.ts:54](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/base.ts#L54)

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

[src/dependency-graph/base.ts:49](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/base.ts#L49)

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

[src/dependency-graph/base.ts:44](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/base.ts#L44)

___

### compareResources

▸ **compareResources**(`first`, `second`): `boolean`

Compares two resources with each other

#### Parameters

| Name | Type |
| :------ | :------ |
| `first` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |
| `second` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |

#### Returns

`boolean`

`true` if the resources are the same, `false` otherwise

#### Defined in

[src/dependency-graph/base.ts:18](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/base.ts#L18)
