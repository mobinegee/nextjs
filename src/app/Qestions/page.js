'use client'; // اضافه کردن این خط برای مشخص کردن اینکه این یک Client Component است

import styles from "./page.module.css";
import Header from "../components/Header/Header";
import Link from "next/link";
import Loading from "../components/Loading/Loading"; // اضافه کردن کامپوننت لودینگ
import { useEffect, useState } from "react";

export default function Home() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // تابع برای دریافت محصولات از API
    function getArticles() {
        fetch(`https://backendnext.vercel.app/api/products/getproducts`, {
            method: 'GET',
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((result) => {
                setArticles(result);
                setLoading(false); // متوقف کردن لودینگ بعد از دریافت داده‌ها
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false); // متوقف کردن لودینگ در صورت بروز خطا
            });
    }

    useEffect(() => {
        getArticles();
    }, []);

    // نمایش لودینگ در حین بارگذاری
    if (loading) return <Loading />;
    // نمایش پیام خطا در صورت بروز مشکل
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.body}>
            <Header />
            <div className={styles.articlesSection}>
                <h2>پرسش و پاسخ ها</h2>
                {articles.map((article) => (
                    <div key={article.id}>
                        <Link href={`/Product/${article.id}`}>
                            <div className={styles.articleCard}>
                                <h3>{article.name.substring(0, 40)} ... </h3>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <footer className={styles.footer}>
                {/* Footer content */}
            </footer>
        </div>
    );
}
