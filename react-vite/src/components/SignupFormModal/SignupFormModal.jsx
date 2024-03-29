import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import { Navigate, useNavigate } from "react-router-dom";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
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

  return (
    <div className="signup-modal">
      <h1 className="login-header">Sign Up</h1>
      {errors.server && <span>{errors.server}</span>}
      <form onSubmit={handleSubmit} className='signup-form'>
        <label>


          <div className="inputcont">
            <input

              type="text"
              value={email}
              maxLength={20}
              placeholder={"Email"}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="email-input"
            />
          </div>
        </label>
        {errors.email && <span className="error">{errors.email}</span>}

        {email.length === 20 && <p className=" warning2" > Max Length: 20 characters </p>}
        <label>
          <div className="inputcont">
            <input
              type="text"
              placeholder="Username"
              value={username}
              maxLength={15}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="username-input"
            />
          </div>
        </label>

        {errors.username && <span className="error1">{errors.username}</span>}
        {username.length === 15 && <p className="warning3" > Max Length: 15 characters </p>}
        <label>
          <div className="inputcont">
            <input
              type="password"
              value={password}
              maxLength={15}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="password-input"
            />
          </div>
        </label>
        {errors.password && <span className="errors">{errors.password}</span>}
        {password.length === 15 && <p className=" warning" > Max Length: 15 characters </p>}
        {password.length < 8 && password.length !== 0 && <p className=" warning" > Min Length: 8 characters </p>}
        <label>
          <div className="inputcont">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              maxLength={15}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="confirmPassword-input"
            />
          </div>
        </label>
        {errors.confirmPassword && <span className="errormatch">Passwords must match</span>}
        {confirmPassword.length === 15 && <p className="warning4" > Max Length: 15 characters </p>}
        <button type="submit" className='signup-button1' disabled={email.length === 0 || username.length === 0 || password.length < 8 || confirmPassword.length < 8}>Sign Up</button>
      </form >
    </div >
  );
}

export default SignupFormModal;
