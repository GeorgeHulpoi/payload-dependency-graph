import type { DependenciesGraphBase } from './dependencies-graph/base';
import { Subject } from './subject';
import type {
	DependenciesSchema,
	OnCollectionChangeArgs,
	OnCollectionDeleteArgs,
	OnGlobalChangeArgs,
} from './types';

class DependenciesGraphService extends Subject {
	schema?: DependenciesSchema;
	dependenciesGraph?: DependenciesGraphBase;

	async onCollectionChange(args: OnCollectionChangeArgs): Promise<void> {
		if (!this.dependenciesGraph) {
			return;
		}

		const { doc, previousDoc, collection, operation } = args;

		await this.dependenciesGraph.purgeDependentOn({
			collection,
			id: previousDoc.id,
		});

		await this.dependenciesGraph.extractDependenciesFromDoc(
			{
				collection,
				id: doc.id,
			},
			doc,
			this.schema?.collections[collection] || [],
		);

		if (operation === 'create') {
			this.notifySubscribers({
				type: 'create',
				doc,
				collection,
			});
		} else if (operation === 'update') {
			this.notifySubscribers({
				type: 'update',
				doc,
				previousDoc,
				collection,
			});
		}
	}

	async onCollectionDelete(args: OnCollectionDeleteArgs): Promise<void> {
		if (!this.dependenciesGraph) {
			return;
		}

		const { id, doc, collection } = args;

		await this.dependenciesGraph.deleteResource({
			collection,
			id: id.toString(),
		});

		this.notifySubscribers({
			type: 'delete',
			doc,
			collection,
		});
	}

	async onGlobalChange(args: OnGlobalChangeArgs): Promise<void> {
		if (!this.dependenciesGraph) {
			return;
		}

		const { doc, previousDoc } = args;
		const resource = {
			global: doc.globalType,
		};

		await this.dependenciesGraph.purgeDependentOn(resource);

		await this.dependenciesGraph.extractDependenciesFromDoc(
			resource,
			doc,
			this.schema?.globals[doc.globalType] || [],
		);

		this.notifySubscribers({
			type: 'update',
			doc,
			previousDoc,
			global: doc.globalType,
		});
	}
}

export default new DependenciesGraphService();
