// AuthProvider.test.js

import React, { act, useContext } from "react";
import { render, screen, renderHook } from "@testing-library/react";
import AuthProvider, { AuthContext } from "../../Auth/AuthContext";

beforeAll(() => {
  Object.defineProperty(window, "sessionStorage", {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    },
    writeable: true,
  });
});
describe("AuthProvider", () => {
  test("renders without crashing", () => {
    render(
      <AuthProvider>
        <div>Test Children</div>
      </AuthProvider>
    );
    expect(screen.getByText(/Test Children/i)).toBeInTheDocument();
  });
  test('default state when not logged in',()=>{
    sessionStorage.getItem.mockReturnValueOnce(undefined);
    const {result} = renderHook(()=>useContext(AuthContext),{
        wrapper: AuthProvider
    });
    expect(result.current.isLoggedIn).toBe(false);
  });
  test('logging in updates state and sessionStorage', ()=>{
    const {result} = renderHook(()=>useContext(AuthContext),{
        wrapper: AuthProvider
    });
    act(()=>{
        result.current.setLogin({userId:'testUser'});
    });
    expect(result.current.isLoggedIn).toBe(true);
    expect(sessionStorage.setItem).toHaveBeenCalledWith('isLoggedIn', JSON.stringify({userId:'testUser'}));
  });
  test('logging out updates state and sessionStorage', ()=>{
    const {result} = renderHook(()=>useContext(AuthContext),{
        wrapper: AuthProvider
    });
    act(() => {
      result.current.setLogin({ userId: "testUser" });
    });
    act(() => {
      result.current.setLogin();
    });
    expect(result.current.isLoggedIn).toBe(false);
    expect(sessionStorage.removeItem).toHaveBeenCalledWith('isLoggedIn');
  });
  
});
