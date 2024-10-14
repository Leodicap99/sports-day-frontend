import { Snackbar } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";

function LoginForm(){
    const [userId, setUserId] = useState("");
    const [pass, setPass] = useState("");
    const [successData,setSuccessData] = useState(null);
    const [userIdErrorMessage,setUserIdErrorMessage] = useState('');
    const [passwordErrorMessage,setPasswordErrorMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successToast,setSuccessToast] = useState(false);
    const navigate = useNavigate();
    const {setLogin} = useContext(AuthContext);
    const handleLogin = () =>{
        setErrorMessage('');
        if(userIdErrorMessage.length || passwordErrorMessage.length)return;
        if(userId.length===0){
            setUserIdErrorMessage('userid is mandatory')
        }
        if(pass.length===0){
            setPasswordErrorMessage('password is a mandatory field');
        }
        let obj = {
            userId: userId,
            password: pass
        }
        fetch("http://localhost:5000/api/login",{
            method:'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(response=>response.json())
        .then((data)=>{
            if(data.error){
                setErrorMessage(data.error);
            }else{
                setSuccessData(data.data);
                setSuccessToast(true);
            }
        });
    }
    const handleClose = () => {
        setSuccessToast(false);
        setLogin(successData);
        navigate('/events')
    }
    return (
      <>
        <div className="flex flex-col justify-center items-center  min-h-screen -mt-20">
          <div className="flex justify-center ">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full bg-white px-14 sm:px-28 py-10 shadow-md rounded-md"
            >
              <h1 className="text-2xl text-center font-semibold mb-4 text-gray-700">
                Login Form
              </h1>
              <div className="mb-4">
                <input
                  placeholder="Enter your userid"
                  onChange={(e) => {
                    setUserIdErrorMessage("");
                    setUserId(e.target.value);
                  }}
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
                  onChange={(e) => {
                    setPasswordErrorMessage("");
                    setPass(e.target.value);
                  }}
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
                onClick={handleLogin}
                className="w-full mb-4 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Login
              </button>
              <div>
                New user ?{" "}
                <a href="/" className="text-blue-500 hover:text-blue-700">
                  Register here
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
          message="Login Successful!"
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
export default LoginForm;