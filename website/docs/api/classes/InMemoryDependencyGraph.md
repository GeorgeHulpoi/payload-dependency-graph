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
- [getDependencyGraphNode](InMemoryDependencyGraph.md#getdependencygraphnode)
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

[src/dependency-graph/in-memory.ts:10](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/dependency-graph/in-memory.ts#L10)

___

### editorExtractor

• `Protected` `Optional` **editorExtractor**: [`EditorExtractor`](../overview.md#editorextractor)

The function that takes care of extracting the dependencies from a field of type `richText`.

#### Inherited from

[DependencyGraphBase](DependencyGraphBase.md).[editorExtractor](DependencyGraphBase.md#editorextractor)

#### Defined in

[src/dependency-graph/base.ts:42](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/dependency-graph/base.ts#L42)

___

### globals

• `Private` **globals**: [`DependencyGraphGlobals`](../interfaces/DependencyGraphGlobals.md) = `{}`

#### Defined in

[src/dependency-graph/in-memory.ts:11](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/dependency-graph/in-memory.ts#L11)

___

### payload

• `Protected` **payload**: `Payload`

Payload instance

#### Inherited from

[DependencyGraphBase](DependencyGraphBase.md).[payload](DependencyGraphBase.md#payload)

#### Defined in

[src/dependency-graph/base.ts:37](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/dependency-graph/base.ts#L37)

___

### schema

• `Protected` **schema**: `DependencyGraphSchema`

Schema of the dependency graph

#### Inherited from

[DependencyGraphBase](DependencyGraphBase.md).[schema](DependencyGraphBase.md#schema)

#### Defined in

[src/dependency-graph/base.ts:32](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/dependency-graph/base.ts#L32)

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

[src/dependency-graph/in-memory.ts:107](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/dependency-graph/in-memory.ts#L107)

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

[src/dependency-graph/in-memory.ts:75](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/dependency-graph/in-memory.ts#L75)

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

[src/dependency-graph/base.ts:169](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/dependency-graph/base.ts#L169)

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

[src/dependency-graph/in-memory.ts:19](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/dependency-graph/in-memory.ts#L19)

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

[src/dependency-graph/in-memory.ts:158](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/dependency-graph/in-memory.ts#L158)

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

[src/dependency-graph/in-memory.ts:177](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/dependency-graph/in-memory.ts#L177)

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

[src/dependency-graph/in-memory.ts:145](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/dependency-graph/in-memory.ts#L145)

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

[src/dependency-graph/base.ts:121](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/dependency-graph/base.ts#L121)

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

[src/dependency-graph/in-memory.ts:125](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/dependency-graph/in-memory.ts#L125)

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

[src/dependency-graph/in-memory.ts:44](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/dependency-graph/in-memory.ts#L44)

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

[src/dependency-graph/base.ts:54](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/dependency-graph/base.ts#L54)

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

[src/dependency-graph/base.ts:49](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/dependency-graph/base.ts#L49)

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

[src/dependency-graph/base.ts:44](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/dependency-graph/base.ts#L44)

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

[src/dependency-graph/base.ts:18](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/dependency-graph/base.ts#L18)
