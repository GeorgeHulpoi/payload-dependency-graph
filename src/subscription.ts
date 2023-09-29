import type { Subject } from './subject';
import type { Event, SubscriptionCallback } from './types';

export class Subscription {
	private readonly callback: SubscriptionCallback;
	private readonly subject: Subject;

	constructor(callback: SubscriptionCallback, subject: Subject) {
		this.callback = callback;
		this.subject = subject;
	}

	unsubscribe(): void {
		this.subject.unsubscribe(this);
	}

	update(event: Event): void {
		this.callback(event);
	}

	compare(subscription: Subscription): boolean {
		return this.callback === subscription.callback;
	}
}
