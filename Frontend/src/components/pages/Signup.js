import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../api';

export default function Signup() {
  const [data, setData] = useState({
    name: '', email: '', password: '',
    phone: '', city: '', photo: null
  });
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setData(d => ({ ...d, photo: files[0] }));
    } else {
      setData(d => ({ ...d, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const form = new FormData();
    ['name', 'email', 'password', 'phone', 'city'].forEach(k => form.append(k, data[k]));
    if (data.photo) form.append('photo', data.photo);

    const res = await signup(form);
    if (res.msg === 'Signup successful') {
      alert('Signup successful! Please login.');
      navigate('/login');
    } else {
      alert(res.msg || 'Signup failed');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center mb-4">Sign Up</h3>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                  <input
                    className="form-control"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    name="email"
                    type="email"
                    placeholder="Email"
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
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    name="city"
                    placeholder="City"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <input
                    className="form-control"
                    name="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
              </form>
              <p className="text-center mt-3">
                Already have an account?{' '}
                <button className="btn btn-link p-0" onClick={() => navigate('/login')}>
                  Log In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
