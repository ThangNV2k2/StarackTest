import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import {createTheme, ThemeProvider} from "@mui/material";
import {AuthProvider} from "./AuthContext";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import {AuthLayout} from "./component/auth/AuthLayout";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import Admin from './component/admin/Admin';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { App } from './App';
import { UserManagement } from './component/admin/UserManagement';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createTheme({
    palette: {
        primary: {
            main: "#635BFF",
            
        },
        text: {
            primary: "#111927",
            secondary: "#6C737F",

        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        fontWeightBold: "bold"
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: "20px",
                    boxShadow: `
                        0px 5px 22px rgba(0, 0, 0, 0.04), 
                        0px 0px 5px rgba(0, 0, 0, 0.03)
                    `,
                },
            },
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
    
});

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <AuthProvider>
                    <Router>
                        <App>
                            <Routes>
                                <Route path="/" element={<AuthLayout />}>
                                    <Route path="login" element={<Login />} />
                                    <Route path="register" element={<Register />} />
                                </Route>
                                <Route path='/admin' element={<Admin />}>
                                    <Route path='user_management' element={<UserManagement />} />
                                </Route>
                            </Routes>
                        </App>
                    </Router>
                </AuthProvider>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
);

reportWebVitals();
