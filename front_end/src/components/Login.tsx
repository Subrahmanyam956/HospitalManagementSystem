import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
    setUserRole: (role: string) => void;
}


const Login : React.FC<LoginProps> = ({ setUserRole })  => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }
    setError('');
    // alert(`Logged in with email: ${email}`);
    console.log('Logged in wih email: ', {email}, '   and password: ', {password})
   
    const formData = {email, password};
    try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
        if (response.ok) {
            setUserRole(data.role);
            navigate('/dashboard');
          } else {
            setMessage(data.message);
          }
      } catch (error) {
        console.error("Error:", error);
        setMessage("An error occurred. Please try again.");
      }
    };


  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
