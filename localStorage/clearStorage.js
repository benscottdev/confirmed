import AsyncStorage from "@react-native-async-storage/async-storage";
const STORAGE_KEY = "@confirmed-app-async-data-storage";
export const clearStorage = async () => {
	try {
		const data = await AsyncStorage.getItem(STORAGE_KEY);
		if (data) {
			await AsyncStorage.clear();
			const keys = await AsyncStorage.getAllKeys();
			console.log(keys); // []
		} else {
			console.log("Nothing to clear");
		}
	} catch (e) {
		console.error("Issue with clearing storage - see clearStorage.js", e);
		throw e;
	}
};
