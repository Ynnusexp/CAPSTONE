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
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit} className='signup-form'>
        <label>


          <div className="inputcont">
            <input
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="email-input"
            />
          </div>
        </label>
        {errors.email && <p className="errors">{errors.email}</p>}
        <label>
          <div className="inputcont">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="username-input"
            />
          </div>
        </label>

        {errors.username && <p className="error-username">{errors.username}</p>}
        <label>
          <div className="inputcont">
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="password-input"
            />
          </div>
        </label>
        {errors.password && <p className="errors2">{errors.password}</p>}
        <label>
          <div className="inputcont">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="confirmPassword-input"
            />
          </div>
        </label>
        {errors.confirmPassword && <p className="error">Passwords must match</p>}
        <button type="submit" className='signup-button1' disabled={email.length === 0 || username.length === 0 || password.length === 0 || confirmPassword.length === 0}>Sign Up</button>
      </form >
    </div >
  );
}

export default SignupFormModal;
