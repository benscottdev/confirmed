import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./navigation/Navigation";
import { StatusBar } from "react-native";

// Create a context
// export const NameContext = createContext();

export default function App() {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<StatusBar style="auto" />
				<Navigation />
			</NavigationContainer>
		</SafeAreaProvider>
	);
}
