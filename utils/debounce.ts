// utils/debounce.ts
export function debounce(fn: (...args: any[]) => void, delay: number) {
	let timeoutId: NodeJS.Timeout;
	return function(...args: any[]) {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => {
			fn(...args);
		}, delay);
	};
}
