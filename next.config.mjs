/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: '/nextjs', // نام مخزن شما در GitHub
  // assetPrefix: '/nextjs/', // برای تنظیم صحیح مسیر فایل‌های استاتیک

  images: {
    domains: ['res.cloudinary.com', 'localhost'], // اضافه کردن 'localhost' برای اجازه دادن به تصاویر لوکال
  },
};

export default nextConfig;


