'use client'; 

import Image from "next/image";
import styles from "./page.module.css";
import Header from "../components/Header/Header";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';

export default function Search() {
    const [resultproducts, setresultproducts] = useState([]);
    const [resultarticles, setresultarticles] = useState([]);
    const searchParams = useSearchParams();
    const query = searchParams.get('query');

    function getSearch() {
        if (query) {
            fetch(`https://backendnext.vercel.app/api/products/search?name=${query}`, {
                method: 'GET',
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(result => {
                setresultproducts(result);
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
            });
        }
    }

    function getSearcharticle() {
        if (query) {
            fetch(`https://backendnext.vercel.app/api/products/searcharticle?name=${query}`, {
                method: 'GET',
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(result => {
                setresultarticles(result);
            })
            .catch(error => {
                console.error('Error fetching article search results:', error);
            });
        }
    }

    useEffect(() => {
        getSearch();
        getSearcharticle();
    }, [query]); 

    return (
        <div className={styles.body}>
            <Header />
            <h3>نتیجه جستجوی شما برای "{query}"</h3>

            {resultproducts.length > 0 ? (
                <div className={styles.articlesSection}>
                    <h2>پرسش و پاسخ</h2>
                    {resultproducts.map((resultproduct) => (
                        <div key={resultproduct.id}>
                            <Link href={`/Product/${resultproduct.id}`}>
                                <div className={styles.articleCard}>
                                    <h3>{resultproduct.name}</h3>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p>هیچ نتیجه‌ای برای محصولات یافت نشد.</p>
            )}

            {resultarticles.length > 0 ? (
                <div className={styles.articlesSection}>
                    <h2>مقالات</h2>
                    {resultarticles.map((resultarticle) => (
                        <div key={resultarticle.id}>
                            <Link href={`/Article/${resultarticle.id}`}>
                                <div className={styles.articleCard}>
                                    <h3>{resultarticle.name}</h3>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                // <p className={styles.p}>هیچ نتیجه‌ای برای مقالات یافت نشد.</p>
                <></>
            )}

            {resultproducts.length === 0 && resultarticles.length === 0 && (
                <h5>برای جستجوی "{query}" موردی یافت نشد.</h5>
            )}
        </div>
    );
}
