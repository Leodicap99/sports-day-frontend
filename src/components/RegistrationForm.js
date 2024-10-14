import { Snackbar } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [successToast,setSuccessToast] = useState(false);
  const navigate = useNavigate()
  const handleSubmit = () => {
    let flag = false;
    if(userIdErrorMessage || passwordErrorMessage)return;
    if (firstName.length === 0) {
      setFirstNameErrorMessage("first name cannot be blank");
      flag = true;
    }
    if (lastName.length === 0) {
      setLastNameErrorMessage("last name cannot be blank");
      flag = true;
    }
    if (pass.length === 0) {
      setPasswordErrorMessage("password field cannot be blank");
      flag = true;
    }
    if (userId.length === 0) {
      setUserIdErrorMessage("userId field cannot be blank");
    }
    if (flag) {
      return;
    }
    const obj = {
      fullname: firstName + " " + lastName,
      userId: userId,
      password: pass,
    };
    fetch("http://localhost:5000/api/users", {
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
        }
        else{
            setSuccessToast(true);
        }
      })
      .catch((err) => setErrorMessage(err));
  };
  const handleBlurUserId = (e) => {
    if (e.target.value.length < 7) {
      setUserIdErrorMessage("UserId length must be greater than 7 letters");
    }
  };
  const handleChangePassword = (e) => {
    setPasswordErrorMessage("");
    setPass(e.target.value);
  };
  const handleBlurPassword = (e) => {
    let password = e.target.value;
    if (password.length < 8) {
      setPasswordErrorMessage("Password must be atleast 8 characters long");
    }
    else if (!/[A-Z]/.test(password)) {
      setPasswordErrorMessage(
        "Password must contan at least one uppercase letter (A-Z)"
      );
    }
    else if(!/[a-z]/.test(password)){
        setPasswordErrorMessage('Password must contain atleast one lowercase letter (a-z)')
    }
    else if(!/\d/.test(password)){
        setPasswordErrorMessage('Password must contain atleast one digit (0-9');
    }
    else if(!/[!@#$%^&*.]/.test(password)){
        setPasswordErrorMessage(
          "Password must contain atleast one special character (e.g.,(@$!%*?&)"
        );
    }
  };
  const handleClose = () => {
    setSuccessToast(false);
    navigate("/login");
  }
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
        message="Registration Successful"
        sx={{
          "& .MuiSnackbarContent-root": {
            bgcolor: "green", // background color
            color: "white", // text color
          },
        }}
      />
    </>
  );
}
export default RegistrationForm;
