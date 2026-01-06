import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./navigation/Navigation";

// Create a context
// export const NameContext = createContext();

export default function App() {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<Navigation />
			</NavigationContainer>
		</SafeAreaProvider>
	);
}
