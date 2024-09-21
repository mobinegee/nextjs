'use client'; // Specify that this is a Client Component

import Image from "next/image";
import styles from "./page.module.css";
import Header from "./components/Header/Header";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState([]);

  function getAllProducts() {
    fetch(`https://backendnext.vercel.app/api/products/get5lastproducts`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(result => {
        setProducts(result);
      });
  }

  function getArticles() {
    fetch(`https://backendnext.vercel.app/api/products/get5lastarticle`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(result => {
        setArticles(result);
      });
  }

  useEffect(() => {
    getAllProducts();
    getArticles();
  }, []);

  return (
    <div className={styles.body}>
      <Header />
      <div className={styles.section}>
        <p>
          این پلتفرم برای پرسش و پاسخ هست. هر ماه تعداد زیادی برای پرسیدن سوال،
          یادگیری و به اشتراک گذاشتن دانش فنی از آن بازدید می‌کنند.
        </p>
        <div className={styles.buttons}>
          <Link href="/Account">
            <button className={styles.button1}>ثبت نام</button>
          </Link>
          <Link href="/Account">
            <button className={styles.button2}>ورود</button>
          </Link>
        </div>
      </div>
      <div className={styles.sections}>
        <div className={styles.articlesSection}>
          <h2>مقالات اخیر</h2>
          {articles.map(article => (
            <Link key={article.id} href={`/Article/${article.id}`}>
              <div className={styles.articleCard}>
                {article.image_url ? (
                  <Image
                    src={article.image_url}
                    alt="Question Image"
                    layout="responsive"
                    width={40}  // Use the original width of the image
                    height={40} // Use the original height of the image
                  />

                ) : (
                  <Image
                    src="/images/1.jpeg" // Replace with your fallback image path
                    alt="Fallback Image"
                    width={40}
                    height={40}

                  // style={{ width: "100%", height: "auto" }}
                  />
                )}
                <h5>{article.name.substring(0, 55)}</h5>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.qasSection}>
          <h2>پرسش و پاسخ</h2>
          {products.map(product => (
            <Link key={product.id} href={`/Product/${product.id}`}>
              <div className={styles.qaCard}>
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt="Question Image"
                    layout="responsive"
                    width={40}
                    height={40}
                    style={{ objectFit: "cover", width: "100px", height: "100px" }} // اضافه کردن استایل
                  />
                ) : (
                  <Image
                    src="/images/1.jpg" // Replace with your fallback image path
                    alt="Fallback Image"
                    width={500}
                    height={350}
                    // style={{ objectFit: "cover", width: "400px", height: "250px" }} // اضافه کردن استایل
                  />
                )}

                <h5>{product.name.substring(0, 55)}</h5>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <footer className={styles.footer}>
        {/* Footer content */}
      </footer>
    </div>
  );
}
