'use client'; // اضافه کردن این خط برای مشخص کردن اینکه این یک Client Component است

import { useState } from 'react';
import Swal from 'sweetalert2';
import Header from '../components/Header/Header';
import styles from './styles.module.css';

export default function AdminPanel() {
    const [statusform, setstatusform] = useState(true)
    function showarticle() {
        setstatusform(false)
    }
    function showquestion() {
        setstatusform(true)

    }


    return (
        <div className={styles.main}>
            <Header />
            {statusform ? (
                <>
                    <ShowQuestion />
                    <button className={styles.button1} onClick={showarticle}>فرم مقالعه</button>
                </>
            )
                :
                (
                    <>
                        <ShowArticle />
                            <button className={styles.button1} onClick={showquestion}>فرم پرسش و پاسخ</button>
                    </>
                )}
        </div>
    );
}


function ShowQuestion() {
    const [form, setForm] = useState({
        name: '',
        description: '',
        image: null,
        category: '',
        code: '',
        answer: '',
    });

    function handleInputChange(event) {
        const { name, value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    }

    function handleImageUpload(event) {
        setForm((prevForm) => ({
            ...prevForm,
            image: event.target.files[0],
        }));
    }

    async function onSubmit(event) {
        event.preventDefault();
        console.log('Form data before sending:', form);

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('code', form.code);
        formData.append('answer', form.answer);
        formData.append('description', form.description);
        formData.append('category_id', form.category || '');
        formData.append('image', form.image);
        formData.append('created_at', new Date().toISOString());
        formData.append('updated_at', new Date().toISOString());

        try {
            const response = await fetch('https://backendnext.vercel.app/api/products/post', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            // نمایش پیغام موفقیت با SweetAlert2
            await Swal.fire({
                title: 'محصول با موفقیت ثبت شد!',
                icon: 'success',
                confirmButtonText: 'باشه',
            });
            console.log(result);

            // Reset form
            setForm({
                name: '',
                description: '',
                image: null,
                category: '',
                code: '',
                answer: '',
            });
        } catch (error) {
            console.error('Error:', error);

            // نمایش پیغام خطا با SweetAlert2
            await Swal.fire({
                title: 'خطا در ثبت محصول!',
                text: 'لطفاً دوباره تلاش کنید.',
                icon: 'error',
                confirmButtonText: 'باشه',
            });
        }
    }

    function onReset(event) {
        event.preventDefault();
        setForm({
            name: '',
            description: '',
            code: '',
            image: null,
            category: '',
        });
    }
    return (
        <div className={`${styles.body} , ${styles.body1}`}>
            <div className={styles.maincontent}>
                <div className={styles.container}>
                    <form onSubmit={onSubmit}>
                        <div className={styles.formgroup}>
                            <label htmlFor="name">پرسش :</label>
                            <input
                                type="text"
                                className={styles.input}

                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleInputChange}
                                placeholder="پرسش  خود را وارد کنید"
                                required
                            />
                        </div>

                        <div className={styles.formgroup}>
                            <label htmlFor="description">توضیحات درباره پرسش :</label>
                            <textarea
                                id="description"
                                name="description"
                                className={styles.input1}
                                value={form.description}
                                onChange={handleInputChange}
                                placeholder="توضیحات"
                                rows="5" // تعداد سطرها برای ارتفاع باکس
                                cols="50" // تعداد ستون‌ها برای عرض باکس
                            />
                        </div>
                        <div className={styles.formgroup}>
                            <label htmlFor="description">جواب پرسش  :</label>
                            <textarea
                                id="answer"
                                name="answer"
                                className={styles.input1}
                                value={form.answer}
                                onChange={handleInputChange}
                                placeholder="جواب"

                                rows="5" // تعداد سطرها برای ارتفاع باکس
                                cols="50" // تعداد ستون‌ها برای عرض باکس
                            />
                        </div>
                        <div className={styles.formgroup}>
                            <label htmlFor="description">کد :</label>
                            <textarea
                                id="code"
                                name="code"
                                className={styles.input1}
                                value={form.code}
                                onChange={handleInputChange}
                                placeholder="کد"

                                rows="5" // تعداد سطرها برای ارتفاع باکس
                                cols="50" // تعداد ستون‌ها برای عرض باکس
                            />
                        </div>


                        <div className={styles.formgroup}>
                            <label htmlFor="image">انتخاب عکس:</label>
                            <input
                                type="file"
                                id="image"
                                className={styles.input}

                                onChange={handleImageUpload}
                                accept="image/*"

                            />
                        </div>

                        <div className={styles.formgroup}>
                            <label htmlFor="category" className={styles.label}>دسته‌ بندی:</label>
                            <select
                                id="category"
                                className={styles.select}
                                name="category"
                                value={form.category}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">یک گزینه انتخاب کنید</option>
                                <option value="javascript">جاوا اسکریپت</option>
                                <option value="python">پایتون</option>
                                <option value="java">جاوا</option>
                                <option value="c#">سی شارپ </option>
                                <option value="php">پی اچ پی</option>
                                <option value="android">اندروید</option>
                            </select>
                        </div>

                        <button type="submit" className={`${styles.submitbtn} ${styles.button}`}>ثبت محصول</button>
                        <button type="reset" className={`${styles.resetbtn} ${styles.button}`} onClick={onReset}>
                            بازنشانی
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
function ShowArticle() {
    const [form, setForm] = useState({
        name: '',
        image: null,
        description: '',
        category: '',
    });

    function handleInputChange(event) {
        const { name, value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    }

    function handleImageUpload(event) {
        setForm((prevForm) => ({
            ...prevForm,
            image: event.target.files[0],
        }));
    }

    async function onSubmit(event) {
        event.preventDefault();
        console.log('Form data before sending:', form);

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('description', form.description);
        formData.append('category_id', form.category || '');
        formData.append('image', form.image);
        formData.append('created_at', new Date().toISOString());
        formData.append('updated_at', new Date().toISOString());

        try {
            const response = await fetch('https://backendnext.vercel.app/api/products/postArticle', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            // نمایش پیغام موفقیت با SweetAlert2
            await Swal.fire({
                title: 'محصول با موفقیت ثبت شد!',
                icon: 'success',
                confirmButtonText: 'باشه',
            });
            console.log(result);

            // Reset form
            setForm({
                name: '',
                description: '',
                image: null,
                category: '',
            });
        } catch (error) {
            console.error('Error:', error);

            // نمایش پیغام خطا با SweetAlert2
            await Swal.fire({
                title: 'خطا در ثبت محصول!',
                text: 'لطفاً دوباره تلاش کنید.',
                icon: 'error',
                confirmButtonText: 'باشه',
            });
        }
    }

    function onReset(event) {
        event.preventDefault();
        setForm({
            name: '',
            description: '',
            code: '',
            image: null,
            category: '',
        });
    }
    return (
        <div className={`${styles.body} , ${styles.body1}`}>
            <div className={styles.maincontent}>
                <div className={styles.container}>
                    <form onSubmit={onSubmit}>
                        <div className={styles.formgroup}>
                            <label htmlFor="name">پرسش :</label>
                            <input
                                type="text"
                                className={styles.input}

                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleInputChange}
                                placeholder="پرسش  خود را وارد کنید"
                                required
                            />
                        </div>

                        <div className={styles.formgroup}>
                            <label htmlFor="description">توضیحات درباره پرسش :</label>
                            <textarea
                                id="description"
                                name="description"
                                className={styles.input1}
                                value={form.description}
                                onChange={handleInputChange}
                                placeholder="توضیحات"
                                rows="5" // تعداد سطرها برای ارتفاع باکس
                                cols="50" // تعداد ستون‌ها برای عرض باکس
                            />
                        </div>
                        <div className={styles.formgroup}>
                            <label htmlFor="image">انتخاب عکس:</label>
                            <input
                                type="file"
                                id="image"
                                className={styles.input}

                                onChange={handleImageUpload}
                                accept="image/*"

                            />
                        </div>
                        <div className={styles.formgroup}>
                            <label htmlFor="category" className={styles.label}>دسته‌ بندی:</label>
                            <select
                                id="category"
                                className={styles.select}
                                name="category"
                                value={form.category}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">یک گزینه انتخاب کنید</option>
                                <option value="javascript">جاوا اسکریپت</option>
                                <option value="python">پایتون</option>
                                <option value="java">جاوا</option>
                                <option value="c#">سی شارپ </option>
                                <option value="php">پی اچ پی</option>
                                <option value="android">اندروید</option>
                            </select>
                        </div>

                        <button type="submit" className={`${styles.submitbtn} ${styles.button}`}>ثبت محصول</button>
                        <button type="reset" className={`${styles.resetbtn} ${styles.button}`} onClick={onReset}>
                            بازنشانی
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}