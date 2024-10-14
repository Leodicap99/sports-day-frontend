import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "../../Auth/AuthContext";
import { Layout } from "../../App";
import { render, screen } from "@testing-library/react";
const mockUserInfo = { userId: "testUser", fullName: "Test User" };
describe("App Component",()=>{
    const renderWithRouter = (initialRoute='/') => {
        window.history.pushState({},"Test page",initialRoute);
        return render(
            <AuthProvider>
                <Router>
                    <Layout />
                </Router>
            </AuthProvider>
        )
    };
    test('renders Sports Day Event heading', () => {
        renderWithRouter('/');
        const heading = screen.getByText(/Sports Day Event/i);
        expect(heading).toBeInTheDocument();
    });
    test("shows Logout button on /events when user is logged in", ()=>{
        sessionStorage.setItem("isLoggedIn",JSON.stringify(mockUserInfo));
        renderWithRouter('/events');
        const logoutButton = screen.getByText(/Logout/i);
        expect(logoutButton).toBeInTheDocument();
    });
    test('does not show Logout button on the other routes', () =>{
        renderWithRouter('/login');
        const logoutButtoninLogin = screen.queryByText(/Logout/i);
        expect(logoutButtoninLogin).not.toBeInTheDocument();
        renderWithRouter();
        const logoutButtoninRgister = screen.queryByText(/Logout/i);
        expect(logoutButtoninRgister).not.toBeInTheDocument();
    })
})