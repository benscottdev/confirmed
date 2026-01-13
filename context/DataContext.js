import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState, useMemo, useEffect } from "react";
import { getCurrentDate } from "../functions/getCurrentDate";
import { getCurrentTime } from "../functions/getCurrentTime";
import { lightTheme, darkTheme } from "../components/Themes";
import { useColorScheme } from "react-native";
export const DataContext = createContext();

const STORAGE_KEY = "@confirmed-app-async-data-storage";

export function DataContextProvider({ children }) {
	const [data, setData] = useState(null);
	const [theme, setTheme] = useState("light");

	const initaliseLocalStorage = async () => {
		try {
			const checkStorage = await AsyncStorage.getItem(STORAGE_KEY);

			// Only initialize if storage is empty (first time user)
			if (checkStorage === null) {
				const initialData = {
					// "tutorial-seen": false,
					"current-theme": "light",
					"current-confirmation-count": 0,
					"previous-confirmation-count": 0,
					"previous-confirmations": [],
					"current-confirmations": [],
				};

				await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
				setData(initialData);
				setTheme("light");
				setHasTutorialBeenSeen(false);

				console.log("Storage initialized for first-time user");
				return true;
			}
			return false;
		} catch (error) {
			console.error("Error initializing storage:", error);
			throw error;
		}
	};

	// Get all data function
	const getData = async () => {
		try {
			const appData = await AsyncStorage.getItem(STORAGE_KEY);
			if (appData) {
				const parsedData = JSON.parse(appData);
				setData(parsedData);
				setTheme(parsedData["current-theme"] || "light");
				// setHasTutorialBeenSeen(parsedData["tutorial-seen"] || false);
			} else {
				setData(null);
			}
		} catch (error) {
			console.error("Could not get data:", error);
			throw error;
		}
	};

	const resetAll = async () => {
		try {
			const keys = await AsyncStorage.getAllKeys();
			await AsyncStorage.multiRemove(keys);
			console.log("All app data cleared successfully");
		} catch (error) {
			console.error("could not clear data");
		}
	};

	const logAll = async () => {
		try {
			const keys = await AsyncStorage.getAllKeys();
			const items = await AsyncStorage.multiGet(keys);
			console.log("All AsyncStorage data:", items);
		} catch (error) {
			console.error("could not log data");
		}
	};

	// CHECK IF TUTORIAL SEEN IN LOCAL DATA
	// IF NOT SEEN SHOW TUTORIAL
	// THEN SET TUTORIALSEEN TO TRUE
	// const confirmTutorialSeen = async () => {
	// 	try {
	// 		const updatedData = {
	// 			"tutorial-seen": true,
	// 			"current-theme": theme,
	// 			"current-confirmation-count": 0,
	// 			"previous-confirmation-count": 0,
	// 			"previous-confirmations": [],
	// 			"current-confirmations": [],
	// 		};
	// 		await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
	// 		setHasTutorialBeenSeen(true);
	// 	} catch (error) {
	// 		console.error("could not check if tutorial has been seen");
	// 	}
	// };

	const deleteById = async (itemId) => {
		try {
			// get all current confirmations
			const currentConfirmations = data?.["current-confirmations"];
			// search all current confirmations to filter out matching ID
			const updatedConfirmations = currentConfirmations.filter((item) => item.id !== itemId);
			const updatedData = {
				...data,
				"current-confirmations": updatedConfirmations,
			};
			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
			setData(updatedData);
			console.log(`ITEM REMOVED: ${itemId}`);
			// console.log(`updatedConfirmations: ${JSON.stringify(updatedConfirmations)}`);
		} catch (error) {
			console.error("Could not delete by ID - see Context.js", error);
			throw error;
		}
	};

	const createNewConfirmation = async (name, icon) => {
		try {
			const currentData = data || {
				// "tutorial-seen": hasTutorialBeenSeen,
				"current-theme": theme,
				"current-confirmation-count": 0,
				"previous-confirmation-count": 0,
				"previous-confirmations": [],
				"current-confirmations": [],
			};

			// Create new confirmation object
			const newConfirmation = {
				id: Date.now(),
				name,
				icon: icon,
				confirmed: false,
				timeCreated: getCurrentTime(),
				dateCreated: getCurrentDate(),
				lastConfirmedDate: null,
				lastConfirmedTime: null,
			};

			// New data object
			const updatedData = {
				...currentData,
				"current-confirmations": [...currentData["current-confirmations"], newConfirmation],
				"current-confirmation-count": currentData["current-confirmations"].length + 1,
				"previous-confirmation-count": currentData["previous-confirmations"].length || 0,
			};

			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
			setData(updatedData);

			console.log("new confirmation created - ID: " + newConfirmation.id);
			return newConfirmation;
		} catch (error) {
			console.error("Could not create new confirmation - see Context.js", error);
			throw error;
		}
	};

	// Start new check - sets all item's confirmed status to false
	const startNewCheck = async () => {
		try {
			const allCurrentConfirmations = data?.["current-confirmations"];
			const resetConfirmations = allCurrentConfirmations.map((item) => ({
				...item,
				confirmed: false,
			}));
			const updatedData = {
				...data,
				"current-confirmations": resetConfirmations,
			};
			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
			setData(updatedData);
		} catch (error) {
			console.error("cant reset all " + error);
			throw error;
		}
	};

	const setCompletedById = async (itemId) => {
		// loop through current confirmations and find matching ID, then set confirmed as true
		try {
			const currentTime = getCurrentTime();
			const currentDate = getCurrentDate();

			const currentConfirmations = data?.["current-confirmations"];
			const previousConfirmations = data?.["previous-confirmations"];

			if (!currentConfirmations) return;

			const itemToConfirm = currentConfirmations.find((c) => c.id === itemId);
			if (!itemToConfirm) return;

			const updatedCurrentConfirmations = currentConfirmations.map((confirmation) => {
				if (confirmation.id === itemId) {
					return {
						...confirmation,
						confirmed: true,
						lastConfirmedDate: currentDate,
						lastConfirmedTime: currentTime,
					};
				}
				return confirmation;
			});

			const newPreviousConfirmation = {
				title: itemToConfirm.name,
				timeConfirmed: currentTime,
				dateConfirmed: currentDate,
				orignalId: itemId,
			};

			const updatedPreviousConfirmations = [newPreviousConfirmation, ...previousConfirmations];

			const updatedData = {
				...data,
				"current-confirmations": updatedCurrentConfirmations,
				"previous-confirmations": updatedPreviousConfirmations,
				"previous-confirmations-count": updatedPreviousConfirmations.length,
			};
			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
			setData(updatedData);
			// console.log("Confirmation Updated to TRUE");
		} catch (error) {
			console.log("setCompletedById error", error);
			console.error(error);
		}
	};

	// Theme Switcher
	const changeTheme = async (newTheme) => {
		try {
			let updatedData = {
				...data,
				"current-theme": newTheme,
			};

			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
			setData(updatedData);
			setTheme(newTheme);

			console.log(`Theme changed to: ${newTheme}`);
		} catch (error) {
			console.error("Issue with changing theme see - changeTheme.js", error);
			throw error;
		}
	};
	const getThemeColors = () => {
		return theme === "light" ? lightTheme[0] : darkTheme[0];
	};

	// Clear all storage
	const clearStorage = async () => {
		try {
			const emptyData = {
				// "tutorial-seen": hasTutorialBeenSeen,
				"current-theme": data?.["current-theme"],
				"current-confirmation-count": 0,
				"previous-confirmation-count": 0,
				"previous-confirmations": [],
				"current-confirmations": [],
			};

			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(emptyData));
			setData(emptyData);
			console.log("Storage cleared");
		} catch (error) {
			console.error("Issue clearing storage:", error);
			throw error;
		}
	};

	useEffect(() => {
		// clearStorage();
		const initializeApp = async () => {
			const wasInitialized = await initaliseLocalStorage();
			if (!wasInitialized) {
				await getData();
			}
		};
		initializeApp();
	}, []);

	const contextValue = useMemo(
		() => ({
			data,
			theme,
			themeColors: getThemeColors(),
			clearStorage,
			createNewConfirmation,
			setCompletedById,
			changeTheme,
			startNewCheck,
			deleteById,

			resetAll,
			logAll,
		}),
		[data, theme]
	);

	return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
}
