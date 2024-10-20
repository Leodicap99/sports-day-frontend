import { Snackbar } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import { LOGIN_POST, PASSWORD_MANDATORY, SUCCESSFUL_LOGIN, USER_ID_MANDATORY } from "../utils/constants";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
function LoginForm(){
    const [userId, setUserId] = useState("");
    const [pass, setPass] = useState("");
    const [successData,setSuccessData] = useState(null);
    const [userIdErrorMessage,setUserIdErrorMessage] = useState('');
    const [passwordErrorMessage,setPasswordErrorMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [viewPassword,setViewPassword] = useState(false);
    const [successToast,setSuccessToast] = useState(false);
    const userIdRef = useRef(null);
    const navigate = useNavigate();
    const {setLogin} = useContext(AuthContext);
    useEffect(()=>{
      if(userIdRef.current){
        userIdRef.current.focus();
      }
    },[])
    const handleLogin = () =>{
        setErrorMessage('');
        let flag=false;
        if(userId.length===0){
            setUserIdErrorMessage(USER_ID_MANDATORY);
            flag=true;
        }
        if(pass.length===0){
            setPasswordErrorMessage(PASSWORD_MANDATORY);
            flag=true;
        }
        if (flag) return;
        let obj = {
            userId: userId,
            password: pass
        }
        fetch(LOGIN_POST,{
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
       <div className="flex flex-col justify-center items-center min-h-screen -mt-20 bg-gray-100 dark:bg-gray-900">
         <div className="flex justify-center">
           <form
             onSubmit={(e) => e.preventDefault()}
             className="w-full bg-white dark:bg-gray-800 px-14 sm:px-28 py-10 shadow-md rounded-md text-gray-900 dark:text-white"
           >
             <h1 className="text-2xl text-center font-semibold mb-4">
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
                 ref={userIdRef}
                 className={`w-full p-2 border ${
                   userIdErrorMessage
                     ? "border-red-500"
                     : "border-gray-300 dark:border-gray-600"
                 } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
               />
               {userIdErrorMessage.length > 0 && (
                 <div className="text-red-500 text-sm mt-2 text-center flex-wrap">
                   {userIdErrorMessage}
                 </div>
               )}
             </div>
             <div className="mb-4">
               <div className="flex relative">
                 <input
                   type={viewPassword?"text":"password"}
                   placeholder="Enter your password"
                   onChange={(e) => {
                     setPasswordErrorMessage("");
                     setPass(e.target.value);
                   }}
                   className={`w-full p-2 border ${
                     passwordErrorMessage
                       ? "border-red-500"
                       : "border-gray-300 dark:border-gray-600"
                   } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                 />
                 <div className="absolute right-1 top-2 hover:cursor-pointer" onClick={()=>setViewPassword(prev=>!prev)}>
                   {viewPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                 </div>
               </div>
               {passwordErrorMessage.length > 0 && (
                 <div className="text-red-500 text-sm mt-2 text-center flex-wrap">
                   {passwordErrorMessage}
                 </div>
               )}
             </div>
             <button
               type="submit"
               id="login-button"
               data-testid="login-button"
               onClick={handleLogin}
               className="w-full mb-4 bg-blue-500 dark:bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition duration-200"
             >
               Login
             </button>
             <div>
               New user?{" "}
               <a
                 href="/"
                 className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
               >
                 Register here
               </a>
             </div>
             {errorMessage.length > 0 && (
               <div className="text-red-500 text-sm mt-4 text-center">
                 {errorMessage}
               </div>
             )}
           </form>
         </div>
         <Snackbar
           anchorOrigin={{ vertical: "top", horizontal: "right" }}
           open={successToast}
           autoHideDuration={1500}
           onClose={handleClose}
           message={SUCCESSFUL_LOGIN}
           sx={{
             "& .MuiSnackbarContent-root": {
               bgcolor: "green", // background color
               color: "white", // text color
             },
           }}
           action={
             <>
               <span
                 className="text-white cursor-pointer"
                 onClick={handleClose}
               >
                 X
               </span>
             </>
           }
         />
       </div>
     </>
   );

}
export default LoginForm;