import { useEffect, useState } from 'react';
import './UserAccount.css';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';  // 'next/router' با 'next/navigation' جایگزین کنید.
import Image from 'next/image';

export default function Userinformation() {
    const [userinfo, setuserinfo] = useState({});
    const router = useRouter();

    function exitaccount() {
        Swal.fire({
            title: 'آیا مطمئن هستید؟',
            text: 'با خروج از حساب کاربری تمامی داده‌های شما پاک خواهد شد.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'بله، خارج شو',
            cancelButtonText: 'لغو'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('authorization');
                Swal.fire(
                    'خارج شدید!',
                    'شما با موفقیت از حساب کاربری خود خارج شدید.',
                    'success'
                );
                router.push('/');
            }
        });
    }

    useEffect(() => {
        const token = localStorage.getItem('authorization');

        fetch('https://backendnext.vercel.app/api/users/user-info', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => {
            console.log('data =>', data);
            setuserinfo(data.user);
        });
    }, []);

    return (
        <div className="profile-container">
            <div className="profile-card">
                <Image src="images/1.png" className="avatar" alt="" />
                <h1 className="name">{userinfo.username}</h1>
                <p className="email">{userinfo.email}</p>
                <p className="bio"></p>
                <button onClick={exitaccount}>خروج از حساب کاربری</button>
            </div>
        </div>
    );
}
