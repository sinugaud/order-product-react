import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8083/login', {
        username: username,
        password: password,
      });

      const authToken = response.data;
      console.log("token",authToken)
      sessionStorage.setItem('token', authToken);

      sessionStorage.setItem('username', username);


      // Redirect to the '/' route and send the token as state
      // window.location.href = '/';
        window.history.back();
    } catch (error) {
      console.error('Error:', error);
      setError('Invalid username or password');
    }

    setUsername('');
    setPassword('');
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-4 rounded-md shadow-md w-[400px] h-[400px]">
        <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col max-w-md">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded-md p-2 mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-md p-2 mb-4"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Login
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
