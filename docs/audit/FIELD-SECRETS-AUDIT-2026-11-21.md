# بازسازی بخش «اسرار میدانی» به بانک چالش‌ها — 2026-11-21

## تصمیم اصلاحی

بازخورد کاربر درست تشخیص داد که نسخه قبلی مجموعه‌ای از توصیه‌های آموزشی بود، نه چالش عیب‌یابی. بنابراین بخش قدیمی در `index.html`، پیوست `apE`، به‌طور کامل جایگزین شد؛ نکات قبلی در این بخش نگه داشته نشدند.

## ساختار جدید

- عنوان: «۱۰۰ چالش میدانی و راه‌حل در CCTV و شبکه»
- ۱۰ گروه، هر گروه ۱۰ سناریو (دقیقاً ۱۰۰ چالش)
- دسته‌ها: برق/PoE، کابل/اتصال، IP/DHCP/VLAN، سوئیچ/uplink، NVR/codec/stream، آنالوگ/coax، لنز/نور/IR، HDD/ضبط/رویداد، دسترسی راه دور/امنیت، محیط/نصب/تحویل.
- هر گروه شامل روش تشخیص، راه‌حل و پیشگیری است؛ هر سناریو یک موقعیت مشخص برای بازتولید و ثبت نتیجه دارد.
- محتوای سایر موضوع‌ها، شناسه پیوست `apE`، شناسه‌های موضوع‌ها و داده‌های آموزشی حفظ شدند.

## مبنای پژوهش و حدود ادعا

سناریوها از الگوهای تکرارشونده در منابع فنی و گزارش‌های تکنسین‌ها انتخاب و با زبان آموزشی بازنویسی شدند. بحث‌های انجمنی برای شناسایی مسئله و پیشنهاد آزمون مفیدند؛ اما گزارش فردی به‌تنهایی علت قطعی یا راه‌حل عمومی را اثبات نمی‌کند. مقادیر، استانداردها و سازگاری باید با مدل دستگاه و شرایط محل سنجیده شوند.

### منابع بررسی‌شده

1. Reddit، بحث نصب PoE با رفتار غیرعادی چند پورت و دوربین‌ها، 27 اکتبر 2026: https://www.reddit.com/r/SecurityCamera/comments/1xh8pv8/ip_cameras_intermittent_connectivity/
2. Reddit، بحث دوربین‌های offline و آزمون کابل/پورت/منبع، ژانویه–فوریه 2025: https://www.reddit.com/r/SecurityCamera/comments/1iegusl
3. Reddit، بحث flicker، منبع تغذیه، ground loop و مسیر کابل، ژوئیه 2025: https://www.reddit.com/r/cctv/comments/1m7pv5z
4. Security Info Watch، عیب‌یابی سیستم‌های CCTV روی UTP؛ ground loop، crosstalk، ghosting و termination: https://www.securityinfowatch.com/video-surveillance/article/10523128/troubleshooting-utp-cctv-systems
5. Alcatel-Lucent Enterprise / Stone Security، white paper درباره چالش‌های سیستم IP video، رشد ظرفیت، moisture protection و طراحی شبکه: https://www.al-enterprise.com/api/media/file/problem-solving-ip-video-system-challenges-whitepaper-en.pdf
6. Security Wholesalers، راهنمای نصب IP camera/NVR و مشکلات activation، ضبط، uplink و شب: https://www.securitywholesalers.com.au/guides/technical-support-guides/cctv-networking/ip-camera-and-nvr-installation-guide/
7. IDEAL Networks، روش‌های تست شبکه در نصب CCTV و ثبت proof of performance: https://www.idealnetworks.net/wp-content/uploads/2019/05/How-to-Apply-Network-Testing-Practices-to-CCTV-System-Installations-1.pdf

## آزمون

- آزمون ایستا به‌روزرسانی شد تا دقیقاً ۱۰۰ کارت `field-challenge` را بشمارد.
- آزمون بررسی می‌کند که عنوان جدید وجود دارد و محتوای قدیمی «نکته تکمیلی» در بانک چالش‌ها باقی نمانده است.
- اجرای CI و بررسی نهایی صفحه روی Android باید پس از بازشدن PR تأیید شود؛ تا پیش از آن نتیجه آزمون را موفق اعلام نمی‌کنیم.
