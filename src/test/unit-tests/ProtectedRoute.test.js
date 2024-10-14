import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContext";
import ProtectedRoute from "../../Auth/ProtectedRoute";

const MockComponent = () => <div>Protected Content</div>;
const renderWithAuthProvider = (isLoggedIn) => {
  const mockSetLogin = jest.fn();
  const mockContextValue = { isLoggedIn, setLogin: mockSetLogin };
  return render(
    <AuthContext.Provider value={mockContextValue}>
      <Router>
        <ProtectedRoute>
          <MockComponent />
        </ProtectedRoute>
      </Router>
    </AuthContext.Provider>
  );
};
describe('ProtectedRoute Component',()=>{
    test('renders children when user is logged in', ()=>{
        renderWithAuthProvider(true);
        const protectedContent = screen.getByText(/Protected Content/i);
        expect(protectedContent).toBeInTheDocument();
    });
    test("navigates to login when user is not logged in", ()=>{
        renderWithAuthProvider(false);
        const protectedContent = screen.queryByText(/Protected Content/i);
        expect(protectedContent).not.toBeInTheDocument();
        expect(window.location.pathname).toBe('/login');
    })
})
