import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { ActivityIndicator, View, Easing } from "react-native";
import Home from "../screens/Home";
import CreateNew from "../screens/CreateNew";
import History from "../screens/History";
import Settings from "../screens/Settings";
import { Tutorial } from "../screens/Tutorial";
import { EditConfirmations } from "../screens/EditConfirmations";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
	const context = useContext(DataContext);

	const tabFadeSpec = {
		animation: "timing",
		config: {
			duration: 400,
			easing: Easing.out(Easing.cubic),
		},
	};

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarShowLabel: false,
				animation: "fade",
				transitionSpec: tabFadeSpec,
				sceneStyle: { backgroundColor: context.themeColors.backgroundColor },
				tabBarInactiveTintColor: context.themeColors.secondaryColor,
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

export default function Navigation() {
	const { data, themeColors } = useContext(DataContext);

	if (!data) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: themeColors.backgroundColor }}>
				<ActivityIndicator size="large" color={themeColors.textColor} />
			</View>
		);
	}

	const showTutorialFirst = data["tutorial-seen"] === false;

	return (
		<Stack.Navigator
			initialRouteName={showTutorialFirst ? "Tutorial" : "MainTabs"}
			screenOptions={{
				headerShown: false,
				animation: "fade",
				animationDuration: 280,
				contentStyle: { backgroundColor: themeColors.backgroundColor },
			}}>
			<Stack.Screen name="Tutorial" component={Tutorial} />
			<Stack.Screen name="MainTabs" component={TabNavigator} />
			<Stack.Screen name="EditConfirmations" component={EditConfirmations} />
		</Stack.Navigator>
	);
}
