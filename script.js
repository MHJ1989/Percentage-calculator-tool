// ======= تفعيل PWA ======= 
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('✅ PWA فعالة! شكرًا لك MHJ!'))
      .catch(err => console.log('❌ خطأ في التفعيل:', err));
  });
}