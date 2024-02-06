import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { Navigate, useNavigate } from "react-router-dom";



function LoginFormModal() {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const navigate = useNavigate();

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      navigate("/");
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const serverResponse = await dispatch(
      thunkLogin({
        email: "demo@aa.io",
        password: "password",
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");

      closeModal();
    }
  };

  return (
    <div className='login-modal'>
      <h1 className='login-header'>Log In</h1>
      <form onSubmit={handleSubmit} className='login-form'>
        <label>
          {/* Email */}
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className='email-input'
          />
        </label>
        {errors.email && <p className='errors'>{errors.email}</p>}
        <label>
          {/* Password */}
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className='password-input'
          />
        </label>
        {errors.password && <p className='errors1'>{errors.password}</p>}
        <div className='login-buttons-cont'>

          <button type="submit" className="login-button" disabled={email.length === 0 || password.length === 0}>Log In</button>
          <button onClick={demoLogin} className="demo-user">Demo User</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
