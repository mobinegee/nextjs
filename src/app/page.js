'use client'; // اضافه کردن این خط برای مشخص کردن اینکه این یک Client Component است

import Image from "next/image";
import styles from "./page.module.css";
import Header from "./components/Header/Header";
import Link from "next/link";
import { useEffect, useState } from "react";

const articles = [
  { title: "مقاله 1", description: "توضیحات مختصر درباره مقاله 1", link: "#" },
  { title: "مقاله 2", description: "توضیحات مختصر درباره مقاله 2", link: "#" },
  // Add more articles here
];



export default function Home() {
  const [products, setprodcuts] = useState([])
  const [articles, setarticles] = useState([])

  function getallproducts() {
    fetch(`https://backendnext.vercel.app/api/products/get5lastproducts`, {
      method: 'GET',
    }).then(res => res.json()).then(result => {
      setprodcuts(result)
      // alert('seccessfuly')

    })
  }
  function getarticle() {
    fetch(`https://backendnext.vercel.app/api/products/get5lastarticle`, {
      method: 'GET',
    }).then(res => res.json()).then(result => {
      setarticles(result)
      // alert('seccessfuly')

    })
  }
  useEffect(() => {
    getallproducts()
    getarticle()

  }, [])

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
          {articles.map((article) => (
            <>
              <Link href={`/Article/${article.id}`}>
                <div key={article.id} className={styles.articleCard}>
                <h5>{article.name.substring(0, 55)}</h5>
                </div>
              </Link>
            </>
          ))}
        </div>
        <div className={styles.qasSection}>
          <h2>پرسش و پاسخ</h2>
          {products.map((product) => (
            <>
              <Link href={`/Product/${product.id}`}>
                <div key={product.id} className={styles.qaCard}>
                <h5>{product.name.substring(0, 55)}</h5>
                </div>
              </Link>
            </>
          ))}
        </div>
      </div>
      <footer className={styles.footer}>
        {/* Footer content */}
      </footer>
    </div>
  );
}
