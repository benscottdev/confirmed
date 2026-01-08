export function getCurrentDate() {
	const date = new Date();
	const dateOptions = { month: "numeric", year: "numeric", day: "numeric" };

	return date.toLocaleDateString("en-US", dateOptions);
}
