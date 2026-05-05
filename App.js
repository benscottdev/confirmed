import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import Navigation from "./navigation/Navigation";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useContext, useMemo } from "react";
import { DataContext } from "./context/DataContext";

export default function App() {
	const [isAppStarting, setIsAppStarting] = useState(true);
	const ctx = useContext(DataContext);
	const themeColors = ctx?.themeColors;

	const navigationTheme = useMemo(() => {
		const base = ctx?.theme === "light" ? DefaultTheme : DarkTheme;
		const bg = themeColors?.backgroundColor ?? "#121212";
		return {
			...base,
			colors: {
				...base.colors,
				background: bg,
				card: bg,
			},
		};
	}, [ctx?.theme, themeColors?.backgroundColor]);

	useEffect(() => {
		const t = setTimeout(() => setIsAppStarting(false), 2000);
		return () => clearTimeout(t);
	}, []);

	return (
		<SafeAreaProvider>
			<NavigationContainer theme={navigationTheme}>
				{isAppStarting && (
					<View style={[styles.loader, { backgroundColor: themeColors?.backgroundColor ?? "#121212" }]}>
						<ActivityIndicator color={themeColors?.textColor} />
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
