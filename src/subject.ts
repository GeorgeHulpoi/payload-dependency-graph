import { Subscription } from './subscription';
import type { Event, SubscriptionCallback } from './types';

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

	notifySubscribers(event: Event): void {
		this.subscriptions.forEach((subscription) => {
			subscription.update(event);
		});
	}
}
