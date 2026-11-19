# گزارش اجرای ممیزی تصویری — بسته ۱

**تاریخ:** 2026-11-19  
**مخزن:** `nimah69/CCTV-Academy-Pro`  
**شاخه اجرا:** `audit/visual-implementation-batch-01`  
**مبنای تغییر:** Commit ادغام ممیزی `27ae1c2294ae8a5c8e22d34812c7b092eb6bf5f7`  
**فایل اجرایی تغییرکرده:** `index.html`

## 1. دامنه بسته

این بسته، اولین گروه از شکاف‌های تصویری مفهومی شبکه را پوشش می‌دهد. فقط کاتالوگ تصویر و نگاشت موضوع‌ها تغییر کرده‌اند. متن درس‌ها، شناسه موضوع‌ها، پیوست‌ها، SVGهای داخلی و منطق اصلی نمایش گالری دست‌کاری نشده‌اند.

## 2. موضوع‌های متصل‌شده

| شناسه | موضوع | تصویر افزوده‌شده |
|---|---|---|
| t7 | Subnet Mask | دیاگرام Subnet |
| t9 | DNS | توالی پرس‌وجوی مرحله‌ای DNS |
| t13 | ARP | نمونه تصویری ARP Request |
| t16 | مدل OSI — هفت لایه | دیاگرام هفت‌لایه OSI |
| t24 | Unicast، Multicast، Broadcast و IGMP | اینفوگرافیک انواع ارسال + دیاگرام IGMP Snooping |
| t29 | VLAN | تصویر 802.1Q VLAN |
| t31 | Trunk و Access Port | دیاگرام VLAN Trunk + تصویر 802.1Q |

**محدودیت‌های محتوایی این بسته:**
- تصویر ARP افزوده‌شده نمونه ARP Request است؛ برای نمایش کامل Request/Reply باید تصویر پاسخ ARP نیز اضافه شود.
- دیاگرام OSI دارای برچسب‌های آلمانی است؛ برای آموزش فارسی، جایگزینی با نسخه فارسی یا ساخت دیاگرام اختصاصی در اولویت بعدی است.
- تصویر VLAN با عنوان 802.1-Q انتخاب شده است؛ جزئیات تفکیک Access و Trunk در متن درس باید همچنان معیار آموزش باشد و تصویر به‌تنهایی مرجع تنظیمات تجهیز نیست.
- تصاویر فقط به‌عنوان مرجع بصری هستند؛ مقادیر پیکربندی یا دستورالعمل اجرایی از روی آن‌ها استخراج نمی‌شود.

## 3. منابع و مجوزها

| کلید کاتالوگ | فایل | پدیدآورنده | مجوز | صفحه منبع |
|---|---|---|---|---|
| subnetDiagram | Subnet diagram.svg | Mancini و Stannered | CC BY-SA 1.0 | https://commons.wikimedia.org/wiki/File:Subnet_diagram.svg |
| dnsIterative | Example of an iterative DNS resolver.svg | Lion Kimbro | Public domain | https://commons.wikimedia.org/wiki/File:Example_of_an_iterative_DNS_resolver.svg |
| osiModel | ISO OSI-Modell.svg | Michael von Brandenburg | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:ISO_OSI-Modell.svg |
| arpRequest | Arp Request.jpg | Borja.hernandezm | CC BY-SA 3.0 | https://commons.wikimedia.org/wiki/File:Arp_Request.jpg |
| castingTypes | What is Casting? Difference between unicast multicast and broadcast.png | Satyendrasingh00 | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:What_is_Casting%3F_Difference_between_unicast_multicast_and_broadcast.png |
| igmpSnooping | IGMP Snooping Example - en.png | Michel Bakni | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:IGMP_Snooping_Example_-_en.png |
| vlan8021q | 802.1-Q VLAN.jpg | Acorletti | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:802.1-Q_VLAN.jpg |
| vlanTrunk | VLAN trunk links.svg | Luca Ghio | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:VLAN_trunk_links.svg |

در کاتالوگ، برای هر رکورد نام فایل، عنوان فارسی، متن جایگزین، پدیدآورنده، مجوز، نشانی مجوز و صفحه منبع ثبت شده است. نمایش تصویر از سازوکار موجود Wikimedia Commons `Special:FilePath` استفاده می‌کند.

## 4. راستی‌آزمایی ساختاری

| آزمون | نتیجه |
|---|---|
| تعداد موضوع‌های HTML | 363 |
| تعداد کلیدهای تصویر | 93 (از 85 به 93) |
| موضوع‌های دارای نگاشت | 298 (از 291 به 298) |
| موضوع‌های فاقد نگاشت | 65 (از 72 به 65) |
| کلید تصویری ارجاع‌شده ولی تعریف‌نشده | 0 |
| شناسه موضوع نامعتبر در نگاشت | 0 |
| شناسه موضوع تکراری | 0 |
| کلید تصویری تعریف‌شده ولی استفاده‌نشده | 0 |

این آزمون‌ها با بازخوانی محتوای فایل و بررسی ساختار کاتالوگ و نگاشت انجام شده‌اند.

## 5. وضعیت آزمون‌های بصری و اجرایی

در این بسته، آزمون واقعی مرورگر، بارگذاری تصویر روی دستگاه اندرویدی، بررسی ظاهر همه تصاویر در گالری و آزمون صفحه‌خوان اجرا نشده است. بنابراین:
- صحت ثبت منبع و مجوز در صفحات Commons بررسی شده است.
- وجود و یکتایی رکوردها و اتصال شناسه‌ها بررسی شده است.
- بارگذاری نهایی همه تصاویر در مرورگر هنوز **تأیید نشده** است.
- کیفیت و خوانایی تصویر OSI و سایر تصاویر در صفحه موبایل باید در آزمون بصری بررسی شود.

## 6. گام بعدی

گروه بعدی باید موضوع‌های شبکه باقی‌مانده را پوشش دهد: MAC و IP، VLAN و امنیت جداسازی، QoS، MTU، Jitter، پورت‌های CCTV، CIA، MFA، Firewall و VPN. برای هر موضوع باید تصویر مرتبط و دارای منبع معتبر پیدا شود؛ در نبود تصویر مناسب، نباید تصویر نامرتبط به آن متصل شود.
