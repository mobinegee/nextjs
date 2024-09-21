'use client';

import React, { useState } from 'react';
import './Loginform.css';
import { useRouter } from 'next/navigation';  // 'next/router' با 'next/navigation' جایگزین کنید.
import Swal from 'sweetalert2';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Logic for submitting login form
    fetch('https://backendnext.vercel.app/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Login failed');
      }
      return res.json();
    })
    .then(result => {
      if (result && result.token) {
        localStorage.setItem('authorization', result.token);
        Swal.fire({
          icon: 'success',
          title: 'ورود موفقیت‌آمیز',
          text: 'شما با موفقیت وارد شدید!',
        });
        router.push('/');  // هدایت پس از ورود موفق
      } else {
        throw new Error('Token not found in response');
      }
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'خطا',
        text: 'ورود ناموفق بود. لطفاً دوباره تلاش کنید!',
      });
      console.error('Error:', error);
    });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>ورود</h2>
        <div className="input-group">
          <label htmlFor="email">ایمیل</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">رمز</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">ورود</button>
      </form>
    </div>
  );
};

export default LoginForm;
