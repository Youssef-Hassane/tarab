// utils/throttle.ts
export function throttle(fn: (...args: any[]) => void, limit: number) {
	let lastFunc: NodeJS.Timeout;
	let lastRan: number;
	return function(...args: any[]) {
		if (!lastRan) {
			fn(...args);
			lastRan = Date.now();
		} else {
			clearTimeout(lastFunc);
			lastFunc = setTimeout(function() {
				if (Date.now() - lastRan >= limit) {
					fn(...args);
					lastRan = Date.now();
				}
			}, limit - (Date.now() - lastRan));
		}
	};
}
