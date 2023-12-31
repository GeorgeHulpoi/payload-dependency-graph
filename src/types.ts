import type { DependencyGraphBase } from './dependency-graph/base';

export type EditorExtractor = (args: {
	dependencyGraph: DependencyGraphBase;
	source: DependencyGraphResource;
	doc: any;
	value: any;
}) => void | Promise<void>;

export interface DependencyGraphPluginConfig {
	factory: () => DependencyGraphBase;
	editorExtractor?: EditorExtractor;
}

export interface OnCollectionChangeArgs<T = any> {
	previousDoc: T;
	doc: T;
	collection: string;
	operation: string;
}

export interface OnCollectionDeleteArgs<T = any> {
	doc: T;
	id: string | number;
	collection: string;
}

export interface OnGlobalChangeArgs<T = any> {
	previousDoc: T;
	doc: T;
}

export interface DependencySchemaSlug {
	[slug: string]: DependencySchema[];
}

export interface DependencySchema {
	relationTo?: string;
	editorExtractor?: EditorExtractor;
	type: 'relationship' | 'blocks' | 'richText';
	path: string;
}

export type DependencyGraphResource =
	| DependencyGraphGlobalResource
	| DependencyGraphCollectionResource;

export interface DependencyGraphGlobalResource {
	global: string;
	collection?: never;
	id?: never;
}

export interface DependencyGraphCollectionResource {
	global?: never;
	collection: string;
	id: string | number;
}

export interface DependencyGraphNode {
	dependentOn: DependencyGraphResource[];
	dependencyFor: DependencyGraphResource[];
}

export interface DependencyGraphCollections {
	[slug: string]: {
		[id: string]: DependencyGraphNode;
	};
}

export interface DependencyGraphGlobals {
	[slug: string]: DependencyGraphNode;
}

export interface BaseEvent<T = any> {
	type: 'create' | 'update' | 'delete';
	doc: T;
	collection?: string;
	global?: string;
}

export interface CreateEvent<T = any> extends BaseEvent<T> {
	type: 'create';
	global?: never;
}

export interface UpdateEvent<T = any> extends BaseEvent<T> {
	type: 'update';
	previousDoc: T;
}

export interface DeleteEvent<T = any> extends BaseEvent<T> {
	global?: never;
}

export type Event = CreateEvent | UpdateEvent | DeleteEvent;

export type SubscriptionCallback = (event: Event) => void | Promise<void>;
