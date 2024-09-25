/* eslint-disable react/prop-types */

const SignInForm = ({
  email,
  password,
  setEmail,
  setPassword,
  handleSubmit,
  handleForgotPassword,
}) => (
  <form onSubmit={handleSubmit} className="auth-form">
    <h3>Sign In</h3>

    <label>Email</label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />

    <label>Password</label>
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />

    <p className="forgot-password" onClick={handleForgotPassword}>
      Forgot Password?
    </p>

    <button type="submit">Sign In</button>
  </form>
);

export default SignInForm;
