import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./navigation/Navigation";
import { StatusBar, View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "./context/DataContext";

export default function App() {
	const [isAppStarting, setIsAppStarting] = useState(true);
	const { themeColors } = useContext(DataContext);

	useEffect(() => {
		setTimeout(() => {
			setIsAppStarting(false);
		}, 2000);
	});

	return (
		<SafeAreaProvider>
			<NavigationContainer>
				{isAppStarting && (
					<View style={[styles.loader, { backgroundColor: themeColors.tertiaryColor }]}>
						<ActivityIndicator />
					</View>
				)}
				<StatusBar style="auto" />
				<Navigation />
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	loader: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		top: 0,
		left: 0,
		height: "100%",
		width: "100%",
		zIndex: 99999,
	},
});
