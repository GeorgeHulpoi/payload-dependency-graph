import { Subscription } from './subscription';
import type { Event, SubscriptionCallback } from './types';

/**
 * A simplistic implementation of the Observer design pattern. You can understand more reading {@link https://refactoring.guru/design-patterns/observer}.
 */
export class Subject {
	subscriptions: Subscription[] = [];

	subscribe(callback: SubscriptionCallback): Subscription {
		const subscription = new Subscription(callback, this);
		this.subscriptions.push(subscription);
		return subscription;
	}

	unsubscribe(subscription: Subscription): void {
		this.subscriptions = this.subscriptions.filter((s) => !subscription.compare(s));
	}

	notifySubscribers(event: Event): Promise<void> {
		const promises: unknown[] = [];

		this.subscriptions.forEach(async (subscription) => {
			promises.push(subscription.update(event));
		});

		return Promise.all(promises).then(() => {});
	}
}
