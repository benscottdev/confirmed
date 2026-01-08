import { registerRootComponent } from "expo";
import { DataContextProvider } from "./context/DataContext";
import App from "./App";

function Root() {
	return (
		<DataContextProvider>
			<App />
		</DataContextProvider>
	);
}

registerRootComponent(Root);
