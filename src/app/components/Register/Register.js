'use client';

import React, { useState } from 'react';
import './Register.css';
import { useRouter } from 'next/navigation';  // 'next/router' با 'next/navigation' جایگزین کنید.
import Swal from 'sweetalert2';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null); // State to handle errors
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    if (password !== confirmPassword) {
      setError("رمزها یکسان نیستند");
      Swal.fire({
        icon: 'error',
        title: 'خطا',
        text: 'رمز عبور و تکرار آن یکسان نیست!',
      });
      return;
    }

    fetch('https://backendnext.vercel.app/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(result => {
        if (result.success) {
          Swal.fire({
            icon: 'success',
            title: 'ثبت نام موفق',
            text: 'ثبت نام با موفقیت انجام شد!',
          });
          localStorage.setItem('authorization', result.token);
          router.push('/');
        } else {
          setError(result.message || 'ثبت نام ناموفق');
          Swal.fire({
            icon: 'error',
            title: 'خطا',
            text: result.message || 'خطایی در فرآیند ثبت نام رخ داد!',
          });
        }
      })
      .catch(err => {
        console.error('Error during registration:', err.message);
        setError('An error occurred during registration. Please try again.');
        Swal.fire({
          icon: 'error',
          title: 'خطا',
          text: 'خطایی در ثبت نام رخ داد. لطفا دوباره تلاش کنید!',
        });
      });

    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>ثبت نام</h2>
        <div className="input-group">
          <label htmlFor="username">نام کاربری</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <div className="input-group">
          <label htmlFor="confirm-password">تکرار رمز</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>} 
        <button type="submit" className="signup-button">ثبت نام</button>
      </form>
    </div>
  );
};

export default Register;
