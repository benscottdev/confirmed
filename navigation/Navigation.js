import { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import Home from "../screens/Home";
import CreateNew from "../screens/CreateNew";
import History from "../screens/History";
import Settings from "../screens/Settings";
import { getData } from "../localStorage/getData";

const Tab = createBottomTabNavigator();

export default function Navigation() {
	const [storedData, setStoredData] = useState(null);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedData = await getData();
				if (fetchedData) {
					setStoredData(fetchedData);
				}
			} catch (e) {
				console.error("Error fetching data:", e);
			}
		};

		fetchData();
	}, []);

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarShowLabel: false,
				tabBarInactiveTintColor: "#c9c9c9",
				tabBarActiveTintColor: "#9A9A94",
				tabBarStyle: {
					height: 85,
					paddingTop: 10,
					backgroundColor: "transparent",
					position: "absolute",
					borderTopWidth: 0.5,
					elevation: 0,
					shadowBackground: 0,
				},
				tabBarItemStyle: {
					alignItems: "center",
				},
				tabBarBackground: () => null,
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					let iconSize = size;

					if (route.name === "Home") {
						iconName = focused ? "grid" : "grid-outline";
						iconSize = 22;
					} else if (route.name === "Create New") {
						iconName = focused ? "create" : "create-outline";
						iconSize = 26;
					} else if (route.name === "History") {
						iconName = focused ? "list" : "list-outline";
						iconSize = 28;
					} else if (route.name === "Settings") {
						iconName = focused ? "settings" : "settings-outline";
						iconSize = 24;
					}
					return <Ionicons name={iconName} size={iconSize} color={color} />;
				},
			})}>
			<Tab.Screen name="Home" component={Home} />
			<Tab.Screen name="Create New" component={CreateNew} />
			<Tab.Screen name="History" component={History} storedData={storedData} />
			<Tab.Screen name="Settings" component={Settings} />
		</Tab.Navigator>
	);
}
