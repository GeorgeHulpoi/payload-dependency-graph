/* eslint-disable no-underscore-dangle */
import type { DependencyGraphResource } from '../types';

/**
 * The `DependencyGraphResourceSet` object lets you store unique dependency graph resources.
 * @beta
 */
export class DependencyGraphResourceSet {
	private readonly _map: Map<string, DependencyGraphResource>;

	constructor(iterable?: DependencyGraphResourceSet | DependencyGraphResource[]) {
		if (iterable && iterable instanceof DependencyGraphResourceSet) {
			this._map = new Map(iterable._map);
		} else {
			this._map = new Map();
		}

		if (iterable && !(iterable instanceof DependencyGraphResourceSet)) {
			for (const r of iterable) {
				this.add(r);
			}
		}
	}

	/**
	 * The size accessor property of `DependencyGraphResourceSet` instances returns the number of (unique) resources in this set.
	 */
	get size(): number {
		return this._map.size;
	}

	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	[Symbol.iterator]() {
		return this.values();
	}

	/**
	 * This method inserts a new element with a specified value in to this set, if there isn't an element with the same value already in this set.
	 *
	 * @param resource - The resource to add to the `DependencyGraphResourceSet` object.
	 * @returns The `DependencyGraphResourceSet` object with added resource.
	 */
	add(resource: DependencyGraphResource): DependencyGraphResourceSet {
		const key = this.getKey(resource);
		if (!this._map.has(key)) {
			this._map.set(this.getKey(resource), resource);
		}
		return this;
	}

	/**
	 * This method removes all resources from this set.
	 */
	clear(): void {
		this._map.clear();
	}

	/**
	 * This method removes a specified resource from this set, if it is in the set.
	 *
	 * @param resource - The resource to remove from `DependencyGraphResourceSet`.
	 * @returns Returns `true` if `resource` was already in `DependencyGraphResourceSet`; otherwise `false`.
	 */
	delete(resource: DependencyGraphResource): boolean {
		const key = this.getKey(resource);

		if (this._map.has(key)) {
			this._map.delete(key);
			return true;
		}

		return false;
	}

	/**
	 * Executes a provided function once per each resource in the `DependencyGraphResourceSet`, in insertion order.
	 */
	forEach(
		callbackfn: (
			value: DependencyGraphResource,
			key: string,
			map: Map<string, DependencyGraphResource>,
		) => void,
		thisArg?: any,
	): void {
		this._map.forEach((value, key) => {
			callbackfn.call(thisArg, value, key, this._map);
		});
	}

	/**
	 * This method returns a boolean indicating whether a resource exists in this `DependencyGraphResourceSet` or not.
	 *
	 * @param resource - The resource to test for presence in the `DependencyGraphResourceSet` object.
	 * @returns `true` if the resource exists in the `DependencyGraphResourceSet` object; otherwise false.
	 */
	has(resource: DependencyGraphResource): boolean {
		return this._map.has(this.getKey(resource));
	}

	/**
	 * This method returns an iterator object that contains the resources of this `DependencyGraphResourceSet` in insertion order.
	 *
	 * @returns A new {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator | iterable iterator object}.
	 */
	values(): IterableIterator<DependencyGraphResource> {
		return this._map.values();
	}

	private getKey(resource: DependencyGraphResource): string {
		if (resource.global) {
			return `global:${resource.global}`;
		}
		return `collection:${resource.collection}:${resource.id}`;
	}
}
