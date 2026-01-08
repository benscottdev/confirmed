export function getCurrentTime() {
	const date = new Date();
	const timeOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit" };

	return date.toLocaleTimeString("en-US", timeOptions);
}
