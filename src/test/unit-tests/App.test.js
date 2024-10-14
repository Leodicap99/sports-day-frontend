import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import  AuthProvider  from "./Auth/AuthContext";

// Mocking AuthContext and the required functions
const mockSetLogin = jest.fn();
const mockContextValue = {
  setLogin: mockSetLogin,
};

describe("Layout Component", () => {
  const renderWithRouter = (initialRoute = "/") => {
    window.history.pushState({}, "Test page", initialRoute);
    return render(
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    );
  };

  test("renders Sports Day Event heading", () => {
    renderWithRouter("/");
    const heading = screen.getByText(/Sports Day Event/i);
    expect(heading).toBeInTheDocument();
  });

  test("shows Logout button on /events route", () => {
    renderWithRouter("/events");
    const logoutButton = screen.getByText(/Logout/i);
    expect(logoutButton).toBeInTheDocument();
  });
});
