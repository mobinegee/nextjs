'use client';

import Image from 'next/image';
import styles from './page.module.css';
import Header from '@/app/components/Header/Header';
import Loading from '@/app/components/Loading/Loading'; // اضافه کردن کامپوننت لودینگ
import { useEffect, useState } from 'react';

export default function ProductPage({ params }) {
    const { id: productID } = params; // Access productID from params
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (productID) {
            async function getProduct() {
                try {
                    const response = await fetch(`https://backendnext.vercel.app/api/products/products/${productID}`, {
                        method: 'GET',
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const result = await response.json();
                    setProduct(result);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            }

            getProduct();
        } else {
            setLoading(false); // Stop loading if no productID
        }
    }, [productID]);

    // نمایش لودینگ در حین بارگذاری داده‌ها
    if (loading) return <Loading />;
    
    // نمایش پیام خطا در صورت بروز مشکل
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.body}>
            <Header />
            <div className={styles.container}>
                <div className={styles.box}>
                    <h3 className={styles.title}>{product.name}</h3>
                    <p className={styles.details}>{product.description}</p>
                </div>
                <div className={styles.box}>
                    <h2 className={styles.answerTitle}>پاسخ</h2>
                    <p className={styles.answer}>{product.answer}</p>
                </div>
                {product.code && (
                    <div className={styles.box1}>
                        <h2 className={styles.answerTitle}>code</h2>
                        <p className={styles.answer}>
                            <code className={styles.code}>{product.code}</code>
                        </p>
                    </div>
                )}

                {product.image_url && (
                    <div className={styles.box}>
                        <Image
                            src={`${product.image_url}`}
                            alt="Question Image"
                            layout="responsive"
                            width={800}
                            height={600}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
