import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    email:''
  });
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registering user:', credentials);

    try {
        register(credentials);
        setMessage('Registration successful! Please log in.');
        navigate('auth/login');
    } catch (error) {
        setMessage(error.message)
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input
        type="username"
        placeholder="Username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button type="submit">Register</button>
    </form>
    {message && <p>{message}</p>}
    <p>
      Already have an account? <a href="/login">Login here</a>
    </p>
    </>
  );
};

export default Register;