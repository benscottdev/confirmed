import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@confirmed-app-async-data-storage";

export const removeConfirmation = async (id) => {
	try {
		// Get current storage
		const data = await AsyncStorage.getItem(STORAGE_KEY);
		if (!data) return;

		const appData = JSON.parse(data);

		//  Filter out the confirmation with the given id
		appData["current-confirmations"] = appData["current-confirmations"].filter((item) => item.id !== id);

		// Update total confirmations
		appData["total-confirmations"] = appData["current-confirmations"].length;

		//  Save back
		await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
		if (id) {
			console.log(id, " removed");
		}
		return appData;
	} catch (e) {
		console.error("Error removing confirmation - see removeConfirmation.js", e);
		throw e;
	}
};
