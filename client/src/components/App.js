import "@fontsource/roboto";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core";
import { useEffect, useState } from "react";
import { setAccessToken } from "../utils/token";
import { Routes } from "./Routes";
import { darkTheme } from "../utils/theme";

export function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/auth", {
            method: "POST",
            credentials: "include",
        }).then(async (data) => {
            const { accessToken } = await data.json();
            setAccessToken(accessToken);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>...</div>;
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <div className="App">
                <CssBaseline />
                <Routes />
            </div>
        </ThemeProvider>
    );
}

export default App;
