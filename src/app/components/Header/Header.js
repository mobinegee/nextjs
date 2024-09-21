import './Header.css';
import styles from "./../../page.module.css";
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // تغییر واردات useRouter
import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
    const [searchInput, setSearchInput] = useState(''); // مقدار اولیه برای ورودی جستجو
    const router = useRouter(); // استفاده از useRouter

    function handleSearch(event) {
        event.preventDefault();
        // هدایت به صفحه جستجو با query جستجو
        router.push(`/Search?query=${encodeURIComponent(searchInput)}`);
        setSearchInput('')
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            handleSearch(event);
        }
    }

    return (
        <div className={styles.static}>
            <div className={styles.header}>
                <h2>آکادمی کد</h2>
            </div>

            <ul className={styles.ul}>
                <li className={styles.li}><Link href="/">خانه</Link></li>
                <li className={styles.li}><Link href="/Articles">مقالات</Link></li>
                <li className={styles.li}><Link href="/Qestions">سوالات</Link></li>
                <li className={styles.liLeft}>
                    <Link href="/Account"><Image  src="https://nextjs-i8ta-6r2sdmpro-mobinegees-projects.vercel.app/_next/image?url=%2Fimages%2F2.png&w=3840&q=75" alt="Account" width="25px" /></Link>
                </li>
                <li className={styles.liLeft}><Link href="/AdminPanel">پنل ادمین</Link></li>
                <li>
                    <input 
                        value={searchInput} 
                        onChange={(event) => setSearchInput(event.target.value)}
                        onKeyDown={(event) => handleKeyPress(event)}
                        className={styles.input} 
                        type="text" 
                        placeholder='جستجو ...' 
                    />
                </li>
            </ul>
        </div>
    );
}
