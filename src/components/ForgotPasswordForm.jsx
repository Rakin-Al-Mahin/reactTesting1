/* eslint-disable react/prop-types */

const ForgotPasswordForm = ({
  email,
  setEmail,
  handleForgotPasswordSubmit,
}) => (
  <form onSubmit={handleForgotPasswordSubmit} className="auth-form">
    <h3>Forgot Password</h3>

    <label>Email</label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />

    <button type="submit">Send Reset Link</button>
  </form>
);

export default ForgotPasswordForm;
