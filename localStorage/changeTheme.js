import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@confirmed-app-async-data-storage";

export const changeTheme = async () => {
	try {
		const data = await AsyncStorage.getItem(STORAGE_KEY);
		const appData = JSON.parse(data);
		if (appData["current-theme"] == "light") {
			appData["current-theme"] = "dark";
		} else {
			appData["current-theme"] = "light";
		}

		await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
	} catch (e) {
		console.error("Issue with changing theme see - changeTheme.js", e);
		throw e;
	}
};
