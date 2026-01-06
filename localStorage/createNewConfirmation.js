import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@confirmed-app-async-data-storage";

export const createNewConfirmation = async (name, icon) => {
	try {
		// Get current data
		const data = await AsyncStorage.getItem(STORAGE_KEY);
		const appData = data
			? JSON.parse(data)
			: {
					"current-theme": "light",
					"current-confirmation-count": 0,
					"all-previous-confirmations": [
						{
							title: "Front Door",
							timeConfirmed: "7:47pm",
							dateConfirmed: "21.02.2025",
						},
						{
							title: "Shower",
							timeConfirmed: "7:47pm",
							dateConfirmed: "21.02.2025",
						},
						{
							title: "Back Door",
							timeConfirmed: "7:47pm",
							dateConfirmed: "21.02.2025",
						},
					],
					"current-confirmations": [],
			  };

		// Create new confirmation object
		const newConfirmation = {
			// Set id to unique number with date now
			id: Date.now(),
			name,
			icon: null,
			confirmed: false,
			lastConfirmedDate: null,
			lastConfirmedTime: null,
		};

		// Push new confirmation
		appData["current-confirmations"].push(newConfirmation);

		// Update total confirmations
		appData["current-confirmation-count"] = appData["current-confirmations"].length;

		// Store updated data
		await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
		console.log("added");
		return newConfirmation;
	} catch (e) {
		console.error("Error creating new confirmation - see createNewConfirmation.js", e);
		throw e;
	}
};
