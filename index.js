import { registerRootComponent } from "expo";
import { MyContextProvider } from "./context/Context";
import App from "./App";

function Root() {
	return (
		<MyContextProvider>
			<App />
		</MyContextProvider>
	);
}

registerRootComponent(Root);
