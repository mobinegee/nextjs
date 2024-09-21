'use client';

import { Suspense } from 'react';
import Header from "../components/Header/Header";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from 'next/navigation';
import styles from "./page.module.css";

function SearchResults() {
    const [resultproducts, setresultproducts] = useState([]);
    const [resultarticles, setresultarticles] = useState([]);
    const searchParams = useSearchParams();
    const query = searchParams.get('query');

    const getSearch = useCallback(() => {
        if (query) {
            fetch(`https://backendnext.vercel.app/api/products/search?name=${query}`)
                .then(res => res.json())
                .then(result => {
                    setresultproducts(result);
                });
        }
    }, [query]);

    const getSearcharticle = useCallback(() => {
        if (query) {
            fetch(`https://backendnext.vercel.app/api/products/searcharticle?name=${query}`)
                .then(res => res.json())
                .then(result => {
                    setresultarticles(result);
                });
        }
    }, [query]);

    useEffect(() => {
        getSearch();
        getSearcharticle();
    }, [getSearch, getSearcharticle]);

    return (
        <div>
            <h3>نتیجه جستجوی شما برای &quot;{query}&quot;</h3>

            {resultproducts.length > 0 ? (
                <div className={styles.articlesSection}>
                    <h2>پرسش و پاسخ</h2>
                    {resultproducts.map(resultproduct => (
                        <Link key={resultproduct.id} href={`/Product/${resultproduct.id}`}>
                            <div className={styles.articleCard}>
                                <h3>{resultproduct.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p>هیچ نتیجه‌ای برای محصولات یافت نشد.</p>
            )}

            {resultarticles.length > 0 ? (
                <div className={styles.articlesSection}>
                    <h2>مقالات</h2>
                    {resultarticles.map(resultarticle => (
                        <Link key={resultarticle.id} href={`/Article/${resultarticle.id}`}>
                            <div className={styles.articleCard}>
                                <h3>{resultarticle.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : null}
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div>در حال بارگذاری...</div>}>
            <Header />
            <SearchResults />
        </Suspense>
    );
}
