/* eslint-disable react/prop-types */

const SignUpForm = ({
  email,
  password,
  setEmail,
  setPassword,
  zone,
  setZone,
  zones,
  handleSubmit,
  error,
}) => (
  <form onSubmit={handleSubmit} className="auth-form">
    <h3>Sign Up</h3>

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

    <label>Zone</label>
    {error ? (
      <p className="error">{error}</p>
    ) : (
      <select value={zone} onChange={(e) => setZone(e.target.value)} required>
        <option value="" disabled>
          Select your zone
        </option>
        {zones.map((zone) => (
          <option key={zone._id} value={zone._id}>
            {zone.name}
          </option>
        ))}
      </select>
    )}

    <button type="submit">Sign Up</button>
  </form>
);

export default SignUpForm;
