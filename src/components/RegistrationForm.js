import { Snackbar } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FIRST_NAME_MANDATORY, LAST_NAME_MANDATORY, PASSWORD_LENGTH_ERROR_MESSAGE, PASSWORD_LOWER_LETTER_ERROR_MESSAGE, PASSWORD_MANDATORY, PASSWORD_NUMBER_ERROR_MESSAGE, PASSWORD_SPECIAL_CHARACTER_ERROR_MESSAGE, PASSWORD_UPPER_LETTER_ERROR_MESSAGE, REGISTRATION_POST, SUCCESSFUL_REGISTRATION, USER_ID_LENGTH_ERROR_MESSAGE, USER_ID_LENGTH_ERROR_MESSAGES, USER_ID_MANDATORY } from "../utils/constants";

function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState("");
  const [pass, setPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userIdErrorMessage, setUserIdErrorMessage] = useState("");
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [successToast, setSuccessToast] = useState(false);
  const firstNameRef = useRef(null);
  useEffect(() => {
    if (firstNameRef.current) {
      firstNameRef.current.focus();
    }
  }, []);
  const navigate = useNavigate();
  const handleSubmit = () => {
    let flag = false;
    if (userIdErrorMessage || passwordErrorMessage) return;
    if (firstName.length === 0) {
      setFirstNameErrorMessage(FIRST_NAME_MANDATORY);
      flag = true;
    }
    if (lastName.length === 0) {
      setLastNameErrorMessage(LAST_NAME_MANDATORY);
      flag = true;
    }
    if (pass.length === 0) {
      setPasswordErrorMessage(PASSWORD_MANDATORY);
      flag = true;
    }
    if (userId.length === 0) {
      setUserIdErrorMessage(USER_ID_MANDATORY);
    }
    if (flag) {
      return;
    }
    const obj = {
      fullname: firstName + " " + lastName,
      userId: userId,
      password: pass,
    };
    fetch(REGISTRATION_POST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setErrorMessage(data.error);
        } else {
          setSuccessToast(true);
        }
      })
      .catch((err) => setErrorMessage(err));
  };
  const handleBlurUserId = (e) => {
    if (e.target.value.length < 7) {
      setUserIdErrorMessage(USER_ID_LENGTH_ERROR_MESSAGE);
    }
  };
  const handleChangePassword = (e) => {
    setPasswordErrorMessage("");
    setPass(e.target.value);
  };
  const handleBlurPassword = (e) => {
    let password = e.target.value;
    if (password.length < 8) {
      setPasswordErrorMessage(PASSWORD_LENGTH_ERROR_MESSAGE);
    } else if (!/[A-Z]/.test(password)) {
      setPasswordErrorMessage(
        PASSWORD_UPPER_LETTER_ERROR_MESSAGE
      );
    } else if (!/[a-z]/.test(password)) {
      setPasswordErrorMessage(
        PASSWORD_LOWER_LETTER_ERROR_MESSAGE
      );
    } else if (!/\d/.test(password)) {
      setPasswordErrorMessage(PASSWORD_NUMBER_ERROR_MESSAGE);
    } else if (!/[!@#$%^&*.]/.test(password)) {
      setPasswordErrorMessage(
        PASSWORD_SPECIAL_CHARACTER_ERROR_MESSAGE
      );
    }
  };
  const handleClose = () => {
    setSuccessToast(false);
    navigate("/login");
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center  min-h-screen -mt-20">
        <div className="flex justify-center ">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full bg-white px-14 sm:px-28 py-10 shadow-md rounded-md"
          >
            <h1 className="text-2xl font-semibold mb-4 text-gray-700">
              Registration Form
            </h1>
            <div className="mb-4">
              <input
                placeholder="Enter your first name"
                ref={firstNameRef}
                onChange={(e) => {
                  setFirstNameErrorMessage("");
                  setFirstName(e.target.value);
                }}
                value={firstName}
                className={`w-full p-2 border ${
                  firstNameErrorMessage ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              ></input>
              {firstNameErrorMessage.length > 0 && (
                <div className="text-red-500 text-sm  mt-2 text-center flex-wrap">
                  {firstNameErrorMessage}
                </div>
              )}
            </div>
            <div className="mb-4">
              <input
                placeholder="Enter your last name"
                onChange={(e) => {
                  setLastNameErrorMessage("");
                  setLastName(e.target.value);
                }}
                value={lastName}
                className={`w-full p-2 border ${
                  lastNameErrorMessage ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              ></input>
              {lastNameErrorMessage.length > 0 && (
                <div className="text-red-500 text-sm  mt-2 text-center flex-wrap">
                  {lastNameErrorMessage}
                </div>
              )}
            </div>
            <div className="mb-4">
              <input
                placeholder="Enter your userid"
                onChange={(e) => {
                  setErrorMessage("");
                  setUserIdErrorMessage("");
                  setUserId(e.target.value);
                }}
                onBlur={handleBlurUserId}
                value={userId}
                className={`w-full p-2 border ${
                  userIdErrorMessage ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              ></input>
              {userIdErrorMessage.length > 0 && (
                <div className="text-red-500 text-sm  mt-2 text-center flex-wrap">
                  {userIdErrorMessage}
                </div>
              )}
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Enter your password"
                onChange={handleChangePassword}
                onBlur={handleBlurPassword}
                className={`w-full p-2 border ${
                  passwordErrorMessage ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              ></input>
              {passwordErrorMessage.length > 0 && (
                <div className="text-red-500 text-sm  mt-2 text-center flex-wrap">
                  {passwordErrorMessage}
                </div>
              )}
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full mb-4 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Register
            </button>
            <div>
              Already a user ?{" "}
              <a href="/login" className="text-blue-500 hover:text-blue-700">
                Click here
              </a>
            </div>
            {errorMessage.length > 0 && (
              <div className="text-red-500 text-sm  mt-4 text-center">
                {errorMessage}
              </div>
            )}
          </form>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={successToast}
        autoHideDuration={1500}
        onClose={handleClose}
        message={SUCCESSFUL_REGISTRATION}
        sx={{
          "& .MuiSnackbarContent-root": {
            bgcolor: "green",
            color: "white",
          },
        }}
        action={
          <>
            <span className="text-white cursor-pointer" onClick={handleClose}>
              X
            </span>
          </>
        }
      />
    </>
  );
}
export default RegistrationForm;
