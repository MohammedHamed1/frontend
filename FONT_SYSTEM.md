# نظام الخطوط الموحد - PayPass

## نظرة عامة

تم إنشاء نظام خطوط موحد لحل مشكلة تعارض الخطوط في المشروع بالكامل. النظام الجديد يضمن اتساق الخطوط عبر جميع المكونات والشاشات المختلفة.

## الملفات المحدثة

### 1. `src/index.css`
- إضافة متغيرات CSS للأحجام والأوزان والمسافات
- تعريف نظام خطوط موحد
- تحسين التجاوب مع الشاشات المختلفة

### 2. `src/mobile.css`
- إزالة التعريفات المكررة للخطوط
- استخدام المتغيرات الجديدة
- تحسين الأداء على الهواتف

### 3. `src/components/common/styles.css`
- نظام خطوط خاص بالمكونات
- فئات مساعدة للخطوط
- تحسينات الأداء

### 4. `tailwind.config.js`
- تحديث إعدادات الخطوط
- إضافة مكونات مخصصة
- تحسين التكامل مع Tailwind

## المتغيرات الجديدة

### أحجام الخطوط
```css
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */
--text-6xl: 3.75rem;     /* 60px */
```

### أوزان الخطوط
```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### المسافات بين الأسطر
```css
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

## الخطوط المستخدمة

### الخط الأساسي: Cairo
- خط عربي حديث ومقروء
- يدعم جميع الأوزان (200-900)
- متوافق مع جميع المتصفحات

### الخطوط الاحتياطية
1. Tajawal - خط عربي بديل
2. Segoe UI - خط نظام Windows
3. Arial - خط نظام عام
4. sans-serif - خط عام

## التجاوب مع الشاشات

### الشاشات الكبيرة (1400px+)
- العناوين: أحجام كبيرة
- النصوص: مقروءة ومريحة

### التابلت (768px - 1024px)
- العناوين: متوسطة
- النصوص: مناسبة للقراءة

### الهواتف الكبيرة (480px - 768px)
- العناوين: صغيرة نسبياً
- النصوص: مقروءة على الشاشات الصغيرة

### الهواتف الصغيرة (320px - 480px)
- العناوين: صغيرة جداً
- النصوص: مخصصة للهواتف

## الفئات المساعدة

### أحجام الخطوط
```css
.text-xs, .text-sm, .text-base, .text-lg, .text-xl
.text-2xl, .text-3xl, .text-4xl, .text-5xl, .text-6xl
```

### أوزان الخطوط
```css
.font-light, .font-normal, .font-medium
.font-semibold, .font-bold, .font-extrabold
```

### المسافات بين الأسطر
```css
.leading-tight, .leading-normal, .leading-relaxed
```

### حالات خاصة
```css
.text-micro, .text-giant, .text-emphasis
.text-muted, .text-important, .text-success
```

## كيفية الاستخدام

### في المكونات
```jsx
// استخدام الفئات المساعدة
<h1 className="text-3xl font-bold">عنوان رئيسي</h1>
<p className="text-base leading-normal">نص عادي</p>
<button className="text-sm font-semibold">زر</button>

// استخدام المتغيرات مباشرة
<div style={{ fontSize: 'var(--text-lg)' }}>نص مخصص</div>
```

### في CSS المخصص
```css
.my-component h1 {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
}

.my-component p {
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
}
```

## تحسينات الأداء

### تحسين عرض الخطوط
```css
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-rendering: optimizeLegibility;
```

### تحسين التحميل
```css
@supports (font-display: swap) {
  @font-face {
    font-family: 'Cairo';
    font-display: swap;
  }
}
```

## حل المشاكل الشائعة

### مشكلة: خطوط مختلفة في مكونات مختلفة
**الحل**: استخدام الفئات المساعدة أو المتغيرات الموحدة

### مشكلة: أحجام خطوط غير متسقة
**الحل**: استخدام المتغيرات `--text-*` بدلاً من القيم المباشرة

### مشكلة: خطوط لا تظهر على الهواتف
**الحل**: التأكد من تحميل الخطوط الاحتياطية

### مشكلة: أداء بطيء
**الحل**: استخدام `font-display: swap` وتحسين التحميل

## أفضل الممارسات

1. **استخدم المتغيرات**: دائماً استخدم `var(--text-*)` بدلاً من القيم المباشرة
2. **استخدم الفئات المساعدة**: استفد من الفئات الجاهزة في Tailwind
3. **اختبر على جميع الأجهزة**: تأكد من ظهور الخطوط بشكل صحيح
4. **حافظ على التسلسل الهرمي**: استخدم أحجام مناسبة للعناوين والنصوص
5. **اهتم بالأداء**: استخدم الخطوط الاحتياطية و`font-display: swap`

## المراقبة والصيانة

### فحص دوري
- مراقبة تحميل الخطوط
- فحص الأداء على الأجهزة المختلفة
- التأكد من عدم وجود تعارضات جديدة

### التحديثات
- تحديث الخطوط عند الحاجة
- إضافة خطوط جديدة عند الضرورة
- تحسين الأداء باستمرار

## الدعم

لأي استفسارات أو مشاكل متعلقة بنظام الخطوط، يرجى التواصل مع فريق التطوير. 