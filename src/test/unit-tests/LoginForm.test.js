import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import { AuthContext } from "../../Auth/AuthContext";

// Mock useNavigate from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("LoginForm component", () => {
  const mockSetLogin = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    global.fetch = jest.fn();
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ data: { userId: "johnDoe123" } }), 
    });
    mockSetLogin.mockReset();
    mockNavigate.mockReset();
  });

  function renderLoginForm() {
    return render(
      <AuthContext.Provider value={{ setLogin: mockSetLogin }}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </AuthContext.Provider>
    );
  }

  test("renders the login form inputs and buttons", () => {
    renderLoginForm();
    expect(
      screen.getByPlaceholderText(/Enter your userid/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter your password/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId("login-button")).toBeInTheDocument();
  });
  test("displays error messages when fields are empty", () => {
    renderLoginForm();
    fireEvent.click(screen.getByTestId("login-button"));
    expect(screen.getByText(/userid is mandatory/i)).toBeInTheDocument();
    expect(
      screen.getByText(/password is a mandatory field/i)
    ).toBeInTheDocument();
  });
  test("displays wrror messages when fields are empty", async() => {
    
    renderLoginForm();
    fireEvent.change(screen.getByPlaceholderText(/Enter your userid/i), {
      target: { value: "johnDoe123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: "Password@123" },
    });
    fireEvent.click(screen.getByTestId('login-button'));
  });
});
