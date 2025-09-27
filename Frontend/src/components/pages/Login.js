import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api';

export default function Login() {
  const [creds, setCreds] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e =>
    setCreds(c => ({ ...c, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await login(creds);
    console.log('Login response:', res);

    if (res.token) {
      localStorage.setItem('token', res.token);
      window.location.href = '/home';
    } else {
      alert(res.msg || 'Login failed');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center mb-4">Log In</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    className="form-control"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={creds.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={creds.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Log In</button>
              </form>
              <p className="text-center mt-3">
                Don’t have an account?{' '}
                <button className="btn btn-link p-0" onClick={() => navigate('/signup')}>
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
