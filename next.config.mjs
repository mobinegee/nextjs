/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/nextjs', // نام مخزن شما در GitHub
  assetPrefix: '/nextjs/', // برای تنظیم صحیح مسیر فایل‌های استاتیک

  images: {
    domains: ['res.cloudinary.com', 'localhost'], // اضافه کردن 'localhost' برای اجازه دادن به تصاویر لوکال
  },
};

export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export',  // برای خروجی گرفتن استاتیک
//   basePath: '/nextjs',  // نام مخزن شما
//   assetPrefix: '/nextjs/',  // برای درست کردن مسیر فایل‌های استاتیک
//   images: {
//     unoptimized: true,  // به دلیل خروجی استاتیک باید از تصاویر بهینه نشده استفاده کنید
//   },
// };

// export default nextConfig;
