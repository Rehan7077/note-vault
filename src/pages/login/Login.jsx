import "./Login.css";
import { useContext, useState } from "react";
import { LoginPopup } from "../../components/loginPopup/LoginPopup";
import { UserContext } from "../../context/userContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    let formValid = true;
    const newErrors = { email: "", password: "" };
    if (!email.trim()) {
      newErrors.email = "Email is required";
      formValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Invalid email address";
        formValid = false;
      }
    }
    if (!password) {
      newErrors.password = "Password is required";
      formValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      formValid = false;
    }
    setErrors(newErrors);
    if (formValid) {
      console.log("Form submitted:", { email, password });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="form-heading">Welcome Back </h1>
      <div className="input-group">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
      </div>
      <div className="input-group">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
      </div>
      <button type="submit">Login</button>
      <div className="divider">
        <span>OR</span>
      </div>
      <LoginPopup />
    </form>
  );
};
