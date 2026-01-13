export function getCurrentDate() {
	const date = new Date();
	const day = date.getDate();
	const month = date.getMonth() + 1; // getMonth() is 0-indexed
	const year = date.getFullYear();

	return `${day}/${month}/${year}`;
}
