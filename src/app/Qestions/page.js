'use client'; // اضافه کردن این خط برای مشخص کردن اینکه این یک Client Component است

import Image from "next/image";
import styles from "./page.module.css";
import Header from "../components/Header/Header";
import Link from "next/link";
import { useEffect, useState } from "react";





export default function Home() {
    const [articles, setarticles] = useState([])


    function getarticle() {
        fetch(`https://backendnext.vercel.app/api/products/getproducts`, {
            method: 'GET',
        }).then(res => res.json()).then(result => {
            setarticles(result)
            // alert('seccessfuly')

        })
    }
    useEffect(() => {
        getarticle()

    }, [])

    return (
        <div className={styles.body}>
            <Header />
                <div className={styles.articlesSection}>
                    <h2>پرسش و پاسخ ها</h2>
                    {articles.map((article) => (
                        <div key={article.id}>
                            <Link  href={`/Product/${article.id}`}>
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
