import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegistrationForm from "../../components/RegistrationForm";
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));
global.fetch = jest.fn();
describe("Registration Form", () => {
  beforeEach(() => {
    fetch.mockClear();
  });
  test("renders registration form", () => {
    render(<RegistrationForm />);
    expect(screen.getByPlaceholderText(/Enter your first name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your last name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your userid/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();
  });
  test('validates fields and displays error messages', ()=> {
    render(<RegistrationForm />);
    fireEvent.click(screen.getByText(/Register/i));
    expect(
       screen.getByText(/first name cannot be blank/i)
    ).toBeInTheDocument();
    expect(
       screen.getByText(/last name cannot be blank/i)
    ).toBeInTheDocument();
    expect(
       screen.getByText(/password field cannot be blank/i)
    ).toBeInTheDocument();
    expect(
       screen.getByText(/userid field cannot be blank/i)
    ).toBeInTheDocument();
  });
  test('submits the form successfully', async()=> {
    fetch.mockResolvedValueOnce({
        ok: true,
        json: async()=>({success:true})
    });
    render(<RegistrationForm />);
    fireEvent.change(screen.getByPlaceholderText(/Enter your first name/i),{target: {value: 'John'}});
    fireEvent.change(screen.getByPlaceholderText(/Enter your last name/i),{target: {value: 'Doe'}});
    fireEvent.change(screen.getByPlaceholderText(/Enter your userid/i),{target: {value: 'johnDoe123'}});
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i),{target: {value: 'Password@123'}});
    fireEvent.click(screen.getByText(/Register/i));
    const successMessage = await screen.findByText(/Registration Successful/i);
    expect(successMessage).toBeInTheDocument();
  })
});
