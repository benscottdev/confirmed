import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import Home from "../screens/Home";
import CreateNew from "../screens/CreateNew";
import History from "../screens/History";
import Settings from "../screens/Settings";
import { EditConfirmations } from "../screens/EditConfirmations";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Create a separate component for your tabs
function TabNavigator() {
	const context = useContext(DataContext);

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarShowLabel: false,
				tabBarInactiveTintColor: context.themeColors.tertiaryColor,
				tabBarActiveTintColor: context.themeColors.textColor,
				tabBarStyle: {
					height: 85,
					paddingTop: 10,
					backgroundColor: "transparent",
					position: "absolute",
					borderTopWidth: 0,
					borderColor: context.themeColors.tertiaryColor,
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
						iconName = focused ? "add" : "add-outline";
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
			<Tab.Screen name="History" component={History} />
			<Tab.Screen name="Settings" component={Settings} />
		</Tab.Navigator>
	);
}

// Main navigation component with Stack
export default function Navigation() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="MainTabs" component={TabNavigator} />
			<Stack.Screen name="EditConfirmations" component={EditConfirmations} />
		</Stack.Navigator>
	);
}
