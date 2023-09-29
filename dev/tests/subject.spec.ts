import { Subject } from '../../src';

describe('Subject', () => {
	const subject: Subject = new Subject();

	afterEach(() => {
		subject.subscriptions = [];
	});

	it('should notify', () => {
		const fn1 = jest.fn();
		const fn2 = jest.fn();

		subject.subscribe(fn1);
		subject.subscribe(fn2);

		const e: any = { test: 'da' };

		subject.notifySubscribers(e);

		expect(fn1).toHaveBeenCalledTimes(1);
		expect(fn1).toHaveBeenCalledWith(e);

		expect(fn2).toHaveBeenCalledTimes(1);
		expect(fn2).toHaveBeenCalledWith(e);
	});

	it('should unsubscribe', () => {
		const fn1 = jest.fn();
		const fn2 = jest.fn();

		subject.subscribe(fn1);
		const sub2 = subject.subscribe(fn2);

		const e: any = { test: 'da' };

		subject.notifySubscribers(e);

		expect(fn1).toHaveBeenCalledTimes(1);
		expect(fn1).toHaveBeenCalledWith(e);

		expect(fn2).toHaveBeenCalledTimes(1);
		expect(fn2).toHaveBeenCalledWith(e);

		sub2.unsubscribe();

		fn1.mockClear();
		fn2.mockClear();

		const e2: any = { bla: 'bla' };
		subject.notifySubscribers(e2);

		expect(fn1).toHaveBeenCalledTimes(1);
		expect(fn1).toHaveBeenCalledWith(e2);

		expect(fn2).toHaveBeenCalledTimes(0);
	});
});
