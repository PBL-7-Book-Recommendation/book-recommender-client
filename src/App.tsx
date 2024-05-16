import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import { Box, ThemeProvider } from "@mui/material";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import { setHeaderConfigAxios } from "./services/config";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { GlobalStyle } from "./styles/GlobalStyle";
import Theme from "./theme";

function App() {
	const [loading, setLoading] = useState(true);
	const accessToken = store.getState().auth.accessToken;

	useEffect(() => {
		if (accessToken) {
			setHeaderConfigAxios(accessToken);
		}
		setLoading(false);
	}, [accessToken]);

	if (loading) return <></>;

	return (
		<Box>
			<Suspense fallback={<>Loading...</>}>
				<ThemeProvider theme={Theme}>
					<GlobalStyle>
						<ToastContainer
							style={{ fontSize: "15px" }}
							autoClose={2000}
							draggable
						/>
						<RouterProvider router={router}></RouterProvider>
					</GlobalStyle>
				</ThemeProvider>
			</Suspense>
		</Box>
	);
}

export default App;
