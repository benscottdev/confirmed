import { createContext, useState, useMemo } from "react";

export const MyContext = createContext();

export function MyContextProvider({ children }) {
	const [defaultData, setDefaultData] = useState([
		{
			title: "Front Window",
			timeConfirmed: "7:47pm",
			dateConfirmed: "21.02.2025",
		},
		{
			title: "Shower",
			timeConfirmed: "7:47pm",
			dateConfirmed: "21.02.2025",
		},
		{
			title: "Back Door",
			timeConfirmed: "7:47pm",
			dateConfirmed: "21.02.2025",
		},
	]);

	const contextValue = useMemo(
		() => ({
			defaultData,
			setDefaultData,
		}),
		[defaultData]
	);

	return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
}
