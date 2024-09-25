/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [zone, setZone] = useState("");
  const [zones, setZones] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // For success messages
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    if (token) {
      setResetToken(token); // Save token to state
      setIsResetPassword(true); // Toggle the reset password form
    }
  }, []);

  useEffect(() => {
    if (isSignUp) {
      fetchZones();
    }
  }, [isSignUp]);

  // const domain = "http://localhost:5000";
  const domain = "https://pengooin-testing-by-rakin-v1.vercel.app";

  const fetchZones = async () => {
    try {
      const response = await fetch(`${domain}/api/zone/get-all-zone`);
      const result = await response.json();
      if (Array.isArray(result.data)) {
        setZones(result.data);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (err) {
      setError("Failed to load zones");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isSignUp ? "/api/auth/register" : "/api/auth/login";
      const payload = isSignUp
        ? { email, password, zone }
        : { email, password };

      const response = await axios.post(domain + url, payload);

      if (response.status === 200) {
        isSignUp
          ? setSuccessMessage("Sign up successful")
          : setSuccessMessage("Sign in successful");
      }
    } catch (error) {
      console.error("Authentication error", error);
      setError("Failed to authenticate. Please try again.");
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${domain}/api/auth/forgot`, { email });
      if (response.status === 200) {
        setSuccessMessage("Reset link sent to your email.");
      }
    } catch (error) {
      setError("Failed to send reset email.");
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${domain}/api/auth/reset/${resetToken}`,
        { newPassword }
      );
      if (response.status === 200) {
        setSuccessMessage("Password reset successful. You can now sign in.");
        setIsResetPassword(false);
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("Failed to reset password", error);
      setError("Failed to reset password.");
    }
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
  };

  const handleGoogleSignInUp = () => {
    window.location.href =
      // "https://pengooin-testing-by-rakin-v1.vercel.app/api/auth/google";
      `${domain}/api/auth/google`;
  };

  return (
    <div className="auth-container">
      <div className="auth-toggle">
        {!isResetPassword && (
          <>
            <button
              onClick={() => {
                setIsSignUp(false);
                setIsForgotPassword(false);
                setSuccessMessage(null); // Clear any success messages
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsSignUp(true);
                setIsForgotPassword(false);
                setSuccessMessage(null); // Clear any success messages
              }}
            >
              Sign Up
            </button>
          </>
        )}
      </div>

      {successMessage && (
        <div className="success-message">
          <p>{successMessage}</p>
        </div>
      )}

      {isResetPassword ? (
        successMessage ? (
          <div className="reset-success">
            <p>{successMessage}</p>
          </div>
        ) : (
          <ResetPasswordForm
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            handleResetPasswordSubmit={handleResetPasswordSubmit}
          />
        )
      ) : isForgotPassword ? (
        <ForgotPasswordForm
          email={email}
          setEmail={setEmail}
          handleForgotPasswordSubmit={handleForgotPasswordSubmit}
        />
      ) : isSignUp ? (
        <>
          <SignUpForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            zone={zone}
            setZone={setZone}
            zones={zones}
            handleSubmit={handleSubmit}
            error={error}
          />
          <div className="google-signup">
            <button type="button" onClick={handleGoogleSignInUp}>
              <img src="/images/google-logo.png" alt="Google Logo" />
              Sign up with Google
            </button>
          </div>
        </>
      ) : (
        <>
          <SignInForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
            handleForgotPassword={handleForgotPassword}
          />
          <div className="google-signup">
            <button type="button" onClick={handleGoogleSignInUp}>
              <img src="/images/google-logo.png" alt="Google Logo" />
              Sign in with Google
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthForm;
