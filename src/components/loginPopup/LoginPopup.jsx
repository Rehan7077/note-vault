import "./LoginPopup.css";
import { useContext } from "react";
import { handleLogin } from "../../Firebase/userService";
import { UserContext } from "../../context/userContext";

export const LoginPopup = () => {
  const { setUser } = useContext(UserContext)
  const googleLogin = async () => {
    try {
      const userData = await handleLogin();
      setUser(userData.user)
      console.log("Login successful:", userData);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div>
      <button onClick={googleLogin} className="google-login-button">
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          width="24"
          height="24"
        />{" "}
        Login with Google
      </button>
    </div>
  );
};
