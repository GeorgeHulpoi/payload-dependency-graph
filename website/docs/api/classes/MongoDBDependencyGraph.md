# Class: MongoDBDependencyGraph

Represents the base class for implementing a concrete dependency graph.

## Hierarchy

- [`DependencyGraphBase`](DependencyGraphBase.md)

  ↳ **`MongoDBDependencyGraph`**

## Table of contents

### Constructors

- [constructor](MongoDBDependencyGraph.md#constructor)

### Properties

- [editorExtractor](MongoDBDependencyGraph.md#editorextractor)
- [payload](MongoDBDependencyGraph.md#payload)
- [schema](MongoDBDependencyGraph.md#schema)

### Accessors

- [collection](MongoDBDependencyGraph.md#collection)

### Methods

- [addDependency](MongoDBDependencyGraph.md#adddependency)
- [deleteResource](MongoDBDependencyGraph.md#deleteresource)
- [extractDependenciesFromDoc](MongoDBDependencyGraph.md#extractdependenciesfromdoc)
- [isDependency](MongoDBDependencyGraph.md#isdependency)
- [isDependencyForAnyResourceOfCollection](MongoDBDependencyGraph.md#isdependencyforanyresourceofcollection)
- [isDirectDependency](MongoDBDependencyGraph.md#isdirectdependency)
- [populate](MongoDBDependencyGraph.md#populate)
- [purgeDependentOn](MongoDBDependencyGraph.md#purgedependenton)
- [safeFindOne](MongoDBDependencyGraph.md#safefindone)
- [setEditorExtractor](MongoDBDependencyGraph.md#seteditorextractor)
- [setPayload](MongoDBDependencyGraph.md#setpayload)
- [setSchema](MongoDBDependencyGraph.md#setschema)
- [compareResources](MongoDBDependencyGraph.md#compareresources)

## Constructors

### constructor

• **new MongoDBDependencyGraph**(): [`MongoDBDependencyGraph`](MongoDBDependencyGraph.md)

#### Returns

[`MongoDBDependencyGraph`](MongoDBDependencyGraph.md)

#### Inherited from

[DependencyGraphBase](DependencyGraphBase.md).[constructor](DependencyGraphBase.md#constructor)

## Properties

### editorExtractor

• `Protected` `Optional` **editorExtractor**: [`EditorExtractor`](../overview.md#editorextractor)

The function that takes care of extracting the dependencies from a field of type `richText`.

#### Inherited from

[DependencyGraphBase](DependencyGraphBase.md).[editorExtractor](DependencyGraphBase.md#editorextractor)

#### Defined in

[src/dependency-graph/base.ts:42](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/dependency-graph/base.ts#L42)

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

## Accessors

### collection

• `get` **collection**(): `Collection`\<`AnyObject`\>

Get collection and if doesn't exist, it will create it

#### Returns

`Collection`\<`AnyObject`\>

#### Defined in

[src/dependency-graph/mongodb.ts:205](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/dependency-graph/mongodb.ts#L205)

## Methods

### addDependency

▸ **addDependency**(`source`, `target`): `Promise`\<`void`\>

Add target as a direct dependency of source.

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |
| `target` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |

#### Returns

`Promise`\<`void`\>

#### Overrides

[DependencyGraphBase](DependencyGraphBase.md).[addDependency](DependencyGraphBase.md#adddependency)

#### Defined in

[src/dependency-graph/mongodb.ts:28](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/dependency-graph/mongodb.ts#L28)

___

### deleteResource

▸ **deleteResource**(`resource`): `Promise`\<`void`\>

Deletes a resource from the dependency graph.

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |

#### Returns

`Promise`\<`void`\>

#### Overrides

[DependencyGraphBase](DependencyGraphBase.md).[deleteResource](DependencyGraphBase.md#deleteresource)

#### Defined in

[src/dependency-graph/mongodb.ts:9](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/dependency-graph/mongodb.ts#L9)

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

### isDependency

▸ **isDependency**(`source`, `target`): `Promise`\<`boolean`\>

Is target a dependency for source?

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |
| `target` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |

#### Returns

`Promise`\<`boolean`\>

#### Overrides

[DependencyGraphBase](DependencyGraphBase.md).[isDependency](DependencyGraphBase.md#isdependency)

#### Defined in

[src/dependency-graph/mongodb.ts:109](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/dependency-graph/mongodb.ts#L109)

___

### isDependencyForAnyResourceOfCollection

▸ **isDependencyForAnyResourceOfCollection**(`target`, `collection`): `Promise`\<`boolean`\>

Is target a dependency for any resource of collection given?

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |
| `collection` | `string` |

#### Returns

`Promise`\<`boolean`\>

#### Overrides

[DependencyGraphBase](DependencyGraphBase.md).[isDependencyForAnyResourceOfCollection](DependencyGraphBase.md#isdependencyforanyresourceofcollection)

#### Defined in

[src/dependency-graph/mongodb.ts:155](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/dependency-graph/mongodb.ts#L155)

___

### isDirectDependency

▸ **isDirectDependency**(`source`, `target`): `Promise`\<`boolean`\>

Is target a direct dependency for source?

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |
| `target` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |

#### Returns

`Promise`\<`boolean`\>

#### Overrides

[DependencyGraphBase](DependencyGraphBase.md).[isDirectDependency](DependencyGraphBase.md#isdirectdependency)

#### Defined in

[src/dependency-graph/mongodb.ts:90](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/dependency-graph/mongodb.ts#L90)

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

▸ **purgeDependentOn**(`resource`): `Promise`\<`void`\>

The function purges the dependentsOn for a resource and removes for that
dependencies the dependencyFor.

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |

#### Returns

`Promise`\<`void`\>

#### Overrides

[DependencyGraphBase](DependencyGraphBase.md).[purgeDependentOn](DependencyGraphBase.md#purgedependenton)

#### Defined in

[src/dependency-graph/mongodb.ts:62](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/dependency-graph/mongodb.ts#L62)

___

### safeFindOne

▸ **safeFindOne**(`resource`): `Promise`\<`WithId`\<`AnyObject`\>\>

Find a resource and if doesn't exist, it will create it

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`DependencyGraphResource`](../overview.md#dependencygraphresource) |

#### Returns

`Promise`\<`WithId`\<`AnyObject`\>\>

#### Defined in

[src/dependency-graph/mongodb.ts:214](https://github.com/GeorgeHulpoi/payload-dependencies-graph/blob/02eaae1/src/dependency-graph/mongodb.ts#L214)

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
