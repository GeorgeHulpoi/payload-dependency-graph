import type { Subject } from './subject';
import type { Event, SubscriptionCallback } from './types';

/**
 * Represents a wrapper of a calling function. Used by {@link Subject | Subject}.
 * Very similar to {@link https://rxjs.dev/guide/subscription | RxJS Subscription}
 */
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

	update(event: Event): void | Promise<void> {
		return this.callback(event);
	}

	compare(subscription: Subscription): boolean {
		return this.callback === subscription.callback;
	}
}
