import type { Payload } from 'payload';

import type { DependencyGraphBase } from './dependency-graph/base';

export interface DependencyGraphPluginConfig {
	factory: (schema: DependenciesSchema, payload: Payload) => DependencyGraphBase;
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

export interface DependenciesSchema {
	collections: {
		[slug: string]: DependencySchema[];
	};
	globals: {
		[slug: string]: DependencySchema[];
	};
	blocks: {
		[slug: string]: DependencySchema[];
	};
}

export interface DependencySchema {
	relationTo?: string;
	type: 'relationship' | 'blocks';
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
	id: string;
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

export type SubscriptionCallback = (event: Event) => void;
