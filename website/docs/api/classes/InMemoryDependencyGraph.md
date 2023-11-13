# Class: InMemoryDependencyGraph

Represents the base class for implementing a concrete dependency graph.

## Hierarchy

- [`DependencyGraphBase`](DependencyGraphBase.md)

  ↳ **`InMemoryDependencyGraph`**

## Table of contents

### Constructors

- [constructor](InMemoryDependencyGraph.md#constructor)

### Properties

- [collections](InMemoryDependencyGraph.md#collections)
- [editorExtractor](InMemoryDependencyGraph.md#editorextractor)
- [globals](InMemoryDependencyGraph.md#globals)
- [payload](InMemoryDependencyGraph.md#payload)
- [schema](InMemoryDependencyGraph.md#schema)

### Methods

- [addDependency](InMemoryDependencyGraph.md#adddependency)
- [deleteResource](InMemoryDependencyGraph.md#deleteresource)
- [extractDependenciesFromDoc](InMemoryDependencyGraph.md#extractdependenciesfromdoc)
- [getDependenciesForCollection](InMemoryDependencyGraph.md#getdependenciesforcollection)
- [getDependenciesOfCollection](InMemoryDependencyGraph.md#getdependenciesofcollection)
- [getDependencyGraphNode](InMemoryDependencyGraph.md#getdependencygraphnode)
- [getDependsOnCollection](InMemoryDependencyGraph.md#getdependsoncollection)
- [isDependency](InMemoryDependencyGraph.md#isdependency)
- [isDependencyForAnyResourceOfCollection](InMemoryDependencyGraph.md#isdependencyforanyresourceofcollection)
- [isDirectDependency](InMemoryDependencyGraph.md#isdirectdependency)
- [populate](InMemoryDependencyGraph.md#populate)
- [purgeDependentOn](InMemoryDependencyGraph.md#purgedependenton)
- [safeGetDependencyGraphNode](InMemoryDependencyGraph.md#safegetdependencygraphnode)
- [setEditorExtractor](InMemoryDependencyGraph.md#seteditorextractor)
- [setPayload](InMemoryDependencyGraph.md#setpayload)
- [setSchema](InMemoryDependencyGraph.md#setschema)
- [compareResources](InMemoryDependencyGraph.md#compareresources)

## Constructors

### constructor

• **new InMemoryDependencyGraph**(): [`InMemoryDependencyGraph`](InMemoryDependencyGraph.md)

#### Returns

[`InMemoryDependencyGraph`](InMemoryDependencyGraph.md)

#### Inherited from

[DependencyGraphBase](DependencyGraphBase.md).[constructor](DependencyGraphBase.md#constructor)

## Properties

### collections

• `Private` **collections**: [`DependencyGraphCollections`](../interfaces/DependencyGraphCollections.md) = `{}`

#### Defined in

[src/dependency-graph/in-memory.ts:11](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/in-memory.ts#L11)

___

### editorExtractor

• `Protected` `Optional` **editorExtractor**: [`EditorExtractor`](../overview.md#editorextractor)

The function that takes care of extracting the dependencies from a field of type `richText`.

#### Inherited from

[DependencyGraphBase](DependencyGraphBase.md).[editorExtractor](DependencyGraphBase.md#editorextractor)

#### Defined in

[src/dependency-graph/base.ts:42](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/base.ts#L42)

___

### globals

• `Private` **globals**: [`DependencyGraphGlobals`](../interfaces/DependencyGraphGlobals.md) = `{}`

#### Defined in

[src/dependency-graph/in-memory.ts:12](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/in-memory.ts#L12)

___

### payload

• `Protected` **payload**: `Payload`

Payload instance

#### Inherited from

[DependencyGraphBase](DependencyGraphBase.md).[payload](DependencyGraphBase.md#payload)

#### Defined in

[src/dependency-graph/base.ts:37](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/base.ts#L37)

___

### schema

• `Protected` **schema**: `DependencyGraphSchema`

Schema of the dependency graph

#### Inherited from

[DependencyGraphBase](DependencyGraphBase.md).[schema](DependencyGraphBase.md#schema)

#### Defined in

[src/dependency-graph/base.ts:32](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/base.ts#L32)

## Methods

### addDependency

▸ **addDependency**(`source`, `target`): `void`

Add target as a direct dependency of source.

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |
| `target` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |

#### Returns

`void`

#### Overrides

[DependencyGraphBase](DependencyGraphBase.md).[addDependency](DependencyGraphBase.md#adddependency)

#### Defined in

[src/dependency-graph/in-memory.ts:108](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/in-memory.ts#L108)

___

### deleteResource

▸ **deleteResource**(`resource`): `void`

Deletes a resource from the dependency graph.

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |

#### Returns

`void`

#### Overrides

[DependencyGraphBase](DependencyGraphBase.md).[deleteResource](DependencyGraphBase.md#deleteresource)

#### Defined in

[src/dependency-graph/in-memory.ts:76](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/in-memory.ts#L76)

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

#### Inherited from

[DependencyGraphBase](DependencyGraphBase.md).[extractDependenciesFromDoc](DependencyGraphBase.md#extractdependenciesfromdoc)

#### Defined in

[src/dependency-graph/base.ts:199](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/base.ts#L199)

___

### getDependenciesForCollection

▸ **getDependenciesForCollection**(`resource`, `collection`): [`DependencyGraphResource`](../overview.md#dependencygraphresource)[]

Get dependencies from `resource` that is of `collection`. This function traverses from bottom to up, using `dependecyFor`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |
| `collection` | `string` |

#### Returns

[`DependencyGraphResource`](../overview.md#dependencygraphresource)[]

#### Overrides

[DependencyGraphBase](DependencyGraphBase.md).[getDependenciesForCollection](DependencyGraphBase.md#getdependenciesforcollection)

#### Defined in

[src/dependency-graph/in-memory.ts:203](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/in-memory.ts#L203)

___

### getDependenciesOfCollection

▸ **getDependenciesOfCollection**(`resource`, `collection`): [`DependencyGraphResource`](../overview.md#dependencygraphresource)[]

Get dependencies of `resource` that is of `collection`

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |
| `collection` | `string` |

#### Returns

[`DependencyGraphResource`](../overview.md#dependencygraphresource)[]

#### Overrides

[DependencyGraphBase](DependencyGraphBase.md).[getDependenciesOfCollection](DependencyGraphBase.md#getdependenciesofcollection)

#### Defined in

[src/dependency-graph/in-memory.ts:259](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/in-memory.ts#L259)

___

### getDependencyGraphNode

▸ **getDependencyGraphNode**(`resource`): `undefined` \| [`DependencyGraphNode`](../interfaces/DependencyGraphNode.md)

Extracts the node from the dependency graph.

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |

#### Returns

`undefined` \| [`DependencyGraphNode`](../interfaces/DependencyGraphNode.md)

`DependencyGraphNode`, if doesn't exists it will be `undefined`

#### Defined in

[src/dependency-graph/in-memory.ts:20](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/in-memory.ts#L20)

___

### getDependsOnCollection

▸ **getDependsOnCollection**(`resource`, `collection`): [`DependencyGraphResource`](../overview.md#dependencygraphresource)[]

Get dependencies from `resource` that is of `collection`. This function traverses from up to bottom, using `dependentOn`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |
| `collection` | `string` |

#### Returns

[`DependencyGraphResource`](../overview.md#dependencygraphresource)[]

#### Overrides

[DependencyGraphBase](DependencyGraphBase.md).[getDependsOnCollection](DependencyGraphBase.md#getdependsoncollection)

#### Defined in

[src/dependency-graph/in-memory.ts:231](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/in-memory.ts#L231)

___

### isDependency

▸ **isDependency**(`source`, `target`): `boolean`

Is target a dependency for source?

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |
| `target` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |

#### Returns

`boolean`

#### Overrides

[DependencyGraphBase](DependencyGraphBase.md).[isDependency](DependencyGraphBase.md#isdependency)

#### Defined in

[src/dependency-graph/in-memory.ts:159](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/in-memory.ts#L159)

___

### isDependencyForAnyResourceOfCollection

▸ **isDependencyForAnyResourceOfCollection**(`target`, `collection`): `boolean`

Is target a dependency for any resource of collection given?

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |
| `collection` | `string` |

#### Returns

`boolean`

#### Overrides

[DependencyGraphBase](DependencyGraphBase.md).[isDependencyForAnyResourceOfCollection](DependencyGraphBase.md#isdependencyforanyresourceofcollection)

#### Defined in

[src/dependency-graph/in-memory.ts:178](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/in-memory.ts#L178)

___

### isDirectDependency

▸ **isDirectDependency**(`source`, `target`): `boolean`

Is target a direct dependency for source?

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |
| `target` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |

#### Returns

`boolean`

#### Overrides

[DependencyGraphBase](DependencyGraphBase.md).[isDirectDependency](DependencyGraphBase.md#isdirectdependency)

#### Defined in

[src/dependency-graph/in-memory.ts:146](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/in-memory.ts#L146)

___

### populate

▸ **populate**(): `Promise`\<`void`\>

Used at Payload initialization to populate the dependency graph.
You shouldn't call this function by yourself.

#### Returns

`Promise`\<`void`\>

#### Inherited from

[DependencyGraphBase](DependencyGraphBase.md).[populate](DependencyGraphBase.md#populate)

#### Defined in

[src/dependency-graph/base.ts:151](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/base.ts#L151)

___

### purgeDependentOn

▸ **purgeDependentOn**(`resource`): `void`

The function purges the dependentsOn for a resource and removes for that
dependencies the dependencyFor.

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |

#### Returns

`void`

#### Overrides

[DependencyGraphBase](DependencyGraphBase.md).[purgeDependentOn](DependencyGraphBase.md#purgedependenton)

#### Defined in

[src/dependency-graph/in-memory.ts:126](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/in-memory.ts#L126)

___

### safeGetDependencyGraphNode

▸ **safeGetDependencyGraphNode**(`resource`): [`DependencyGraphNode`](../interfaces/DependencyGraphNode.md)

Extracts dependency graph node, and if it doesn't exist, it will create it.

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |

#### Returns

[`DependencyGraphNode`](../interfaces/DependencyGraphNode.md)

#### Defined in

[src/dependency-graph/in-memory.ts:45](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/in-memory.ts#L45)

___

### setEditorExtractor

▸ **setEditorExtractor**(`editorExtractor`): [`DependencyGraphBase`](DependencyGraphBase.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `editorExtractor` | [`EditorExtractor`](../overview.md#editorextractor) |

#### Returns

[`DependencyGraphBase`](DependencyGraphBase.md)

#### Inherited from

[DependencyGraphBase](DependencyGraphBase.md).[setEditorExtractor](DependencyGraphBase.md#seteditorextractor)

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

#### Inherited from

[DependencyGraphBase](DependencyGraphBase.md).[setPayload](DependencyGraphBase.md#setpayload)

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

#### Inherited from

[DependencyGraphBase](DependencyGraphBase.md).[setSchema](DependencyGraphBase.md#setschema)

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

#### Inherited from

[DependencyGraphBase](DependencyGraphBase.md).[compareResources](DependencyGraphBase.md#compareresources)

#### Defined in

[src/dependency-graph/base.ts:18](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/410696e/src/dependency-graph/base.ts#L18)
