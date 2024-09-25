/* eslint-disable react/prop-types */

const ResetPasswordForm = ({
  newPassword,
  setNewPassword,
  handleResetPasswordSubmit,
}) => (
  <form onSubmit={handleResetPasswordSubmit} className="auth-form">
    <h3>Reset Password</h3>

    <label>New Password</label>
    <input
      type="password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      required
    />

    <button type="submit">Reset Password</button>
  </form>
);

export default ResetPasswordForm;
