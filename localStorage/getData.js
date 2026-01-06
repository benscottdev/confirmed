import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@confirmed-app-async-data-storage";

export const getData = async () => {
	try {
		const data = await AsyncStorage.getItem(STORAGE_KEY);
		const parsedData = JSON.parse(data);
		// console.log(parsedData);
		return parsedData;
	} catch (e) {
		console.log("Could not retrieve data - see getData.js", e);
		throw e;
	}
};
