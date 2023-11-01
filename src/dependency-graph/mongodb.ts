/* eslint-disable no-underscore-dangle */
import type { MongooseAdapter } from '@payloadcms/db-mongodb';
import type { Types } from 'mongoose';

import type { DependencyGraphResource } from '../types';
import { DependencyGraphBase } from './base';

export class MongoDBDependencyGraph extends DependencyGraphBase {
	async deleteResource(resource: DependencyGraphResource): Promise<void> {
		const doc = await this.collection.findOneAndDelete(resource, { projection: { _id: 1 } });

		if (doc.value) {
			await this.collection.updateMany(
				{},
				{
					$pull: {
						dependentOn: doc.value._id,
						dependencyFor: doc.value._id,
					},
				} as any /* stupid mongo shit */,
				{
					multi: true,
				} as any /* stupid mongo shit */,
			);
		}
	}

	async addDependency(
		source: DependencyGraphResource,
		target: DependencyGraphResource,
	): Promise<void> {
		const sourceDoc$ = this.safeFindOne(source);
		const targetDoc$ = this.safeFindOne(target);

		const [sourceDoc, targetDoc] = await Promise.all([sourceDoc$, targetDoc$]);

		const updateSource$ = this.collection.updateOne(
			{
				_id: sourceDoc._id,
			},
			{
				$addToSet: {
					dependentOn: targetDoc._id,
				},
			},
		);

		const updateTarget$ = this.collection.updateOne(
			{
				_id: targetDoc._id,
			},
			{
				$addToSet: {
					dependencyFor: sourceDoc._id,
				},
			},
		);

		return Promise.all([updateSource$, updateTarget$]).then();
	}

	async purgeDependentOn(resource: DependencyGraphResource): Promise<void> {
		const beforeUpdate = await this.collection.findOneAndUpdate(
			resource,
			{
				$set: {
					dependentOn: [],
				},
			},
			{
				returnDocument: 'before',
			},
		);

		if (beforeUpdate.value) {
			await this.collection.updateMany(
				{},
				{
					$pull: {
						dependencyFor: beforeUpdate.value._id,
					},
				} as any /* stupid mongo shit */,
				{
					multi: true,
				} as any /* stupid mongo shit */,
			);
		}
	}

	async isDirectDependency(
		source: DependencyGraphResource,
		target: DependencyGraphResource,
	): Promise<boolean> {
		const sourceDoc$ = this.safeFindOne(source);
		const targetDoc$ = this.safeFindOne(target);

		const [sourceDoc, targetDoc] = await Promise.all([sourceDoc$, targetDoc$]);

		if (sourceDoc && targetDoc) {
			return (
				sourceDoc.dependentOn.some((r: Types.ObjectId) => r.equals(targetDoc._id)) ||
				sourceDoc.dependencyFor.some((r: Types.ObjectId) => r.equals(targetDoc._id))
			);
		}

		return false;
	}

	isDependency(
		source: DependencyGraphResource,
		target: DependencyGraphResource,
	): Promise<boolean> {
		return this.collection
			.aggregate([
				{
					$match: source,
				},
				{
					$graphLookup: {
						from: '_dependency_graph',
						startWith: '$dependentOn',
						connectFromField: 'dependentOn',
						connectToField: '_id',
						as: 'result',
					},
				},
				{
					$unwind: {
						path: '$result',
					},
				},
				{
					$replaceRoot: {
						newRoot: '$result',
					},
				},
				{
					$project: {
						_id: 1,
						id: 1,
						collection: 1,
						global: 1,
					},
				},
				{
					$match: target,
				},
			])
			.toArray()
			.then((docs) => {
				return docs.length > 0;
			});
	}

	isDependencyForAnyResourceOfCollection(
		target: DependencyGraphResource,
		collection: string,
	): Promise<boolean> {
		return this.collection
			.aggregate([
				{
					$match: target,
				},
				{
					$graphLookup: {
						from: '_dependency_graph',
						startWith: '$dependencyFor',
						connectFromField: 'dependencyFor',
						connectToField: '_id',
						as: 'result',
					},
				},
				{
					$unwind: {
						path: '$result',
					},
				},
				{
					$replaceRoot: {
						newRoot: '$result',
					},
				},
				{
					$project: {
						_id: 1,
						collection: 1,
					},
				},
				{
					$match: {
						collection,
					},
				},
			])
			.toArray()
			.then((docs) => {
				return docs.length > 0;
			});
	}

	/**
	 * Get collection and if doesn't exist, it will create it
	 */
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	private get collection() {
		const db = this.payload.db as MongooseAdapter;
		return db.connection.collection('_dependency_graph');
	}

	/**
	 * Find a resource and if doesn't exist, it will create it
	 */
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	private async safeFindOne(resource: DependencyGraphResource) {
		const doc = await this.collection.findOne(resource);

		if (doc === undefined || doc === null) {
			const result = await this.collection.insertOne({
				...resource,
				dependencyFor: [],
				dependentOn: [],
			});

			const _doc = await this.collection.findOne({ _id: result.insertedId });
			return _doc as NonNullable<typeof _doc>;
		}

		return doc;
	}
}
