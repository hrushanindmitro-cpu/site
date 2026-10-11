// js/site-header.js
// Общая логика шапки и футера для ВСЕХ страниц сайта.
// - меню «Связаться» (контакты из secure-config.js)
// - ссылки логотипа и кнопки HOME всегда ведут на index.html с текущим языком
// - переводы кнопок шапки и футера на 7 языков (работает с любой системой i18n на странице:
//   следит за атрибутом <html lang="..">, который выставляет applyLang каждой страницы)
(function(){
  const TEXTS = {
    ru:{nav_home:"Главная", btn_contact:"Связаться", footer:"© 2026 Dmytro SaaS Web3 Architect. Все права защищены."},
    uk:{nav_home:"Головна", btn_contact:"Зв'язатися", footer:"© 2026 Dmytro SaaS Web3 Architect. Усі права захищені."},
    en:{nav_home:"Home", btn_contact:"Contact", footer:"© 2026 Dmytro SaaS Web3 Architect. All rights reserved."},
    it:{nav_home:"Home", btn_contact:"Contatto", footer:"© 2026 Dmytro SaaS Web3 Architect. Tutti i diritti riservati."},
    fr:{nav_home:"Accueil", btn_contact:"Contact", footer:"© 2026 Dmytro SaaS Web3 Architect. Tous droits réservés."},
    es:{nav_home:"Inicio", btn_contact:"Contacto", footer:"© 2026 Dmytro SaaS Web3 Architect. Todos los derechos reservados."},
    de:{nav_home:"Startseite", btn_contact:"Kontakt", footer:"© 2026 Dmytro SaaS Web3 Architect. Alle Rechte vorbehalten."}
  };
  window.SITE_TEXTS = TEXTS;

  function detectLang(){
    try{
      const q=(new URL(location.href).searchParams.get('lang')||'').toLowerCase();
      if(TEXTS[q]) return q;
      const s=(localStorage.getItem('site_lang')||'').toLowerCase();
      if(TEXTS[s]) return s;
    }catch(e){}
    return 'en';
  }

  function sync(lang){
    lang=(lang||'').toLowerCase();
    if(!TEXTS[lang]) lang=detectLang();
    const t=TEXTS[lang];
    document.querySelectorAll('[data-site-i18n]').forEach(el=>{
      const k=el.getAttribute('data-site-i18n');
      if(t[k]) el.textContent=t[k];
    });
    document.querySelectorAll('[data-site-aria]').forEach(el=>{
      const k=el.getAttribute('data-site-aria');
      if(t[k]) el.setAttribute('aria-label',t[k]);
    });
    document.querySelectorAll('a[data-site-home]').forEach(a=>{
      a.href='index.html?lang='+lang;
    });
  }

  function closeContact(){
    const m=document.getElementById('site-contact-menu');
    if(m){m.classList.add('hidden');m.classList.remove('flex');}
  }
  window.SiteHeader={sync,closeContact};

  function applySecure(){
    const c=window.SECURE_CONFIG;
    if(!c||!c.profiles) return;
    const p=c.profiles;
    document.querySelectorAll('#site-contact-menu a[data-contact]').forEach(a=>{
      const href=p[a.dataset.contact];
      if(href) a.href=href;
    });
  }

  function init(){
    const btn=document.getElementById('site-contact-btn');
    const menu=document.getElementById('site-contact-menu');
    const box=document.getElementById('site-contact');
    if(btn&&menu){
      btn.addEventListener('click',e=>{
        e.stopPropagation();
        const bottom=document.getElementById('contact-menu-bottom');
        if(bottom){bottom.classList.add('hidden');bottom.classList.remove('flex');}
        const lm=document.getElementById('lang-menu');
        if(lm){lm.classList.add('hidden');lm.classList.remove('flex');}
        menu.classList.toggle('hidden');menu.classList.toggle('flex');
        btn.setAttribute('aria-expanded',menu.classList.contains('flex')?'true':'false');
      });
      document.addEventListener('click',e=>{ if(box&&!box.contains(e.target)) closeContact(); });
      document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeContact(); });
    }
    // закрываем меню контактов, когда открывают список языков
    const lb=document.getElementById('lang-btn');
    if(lb) lb.addEventListener('click',closeContact);

    // HOME подсвечиваем только на главной
    const path=location.pathname.toLowerCase();
    const isHome=path==='/'||path.endsWith('/')||path.endsWith('/index.html')||path.endsWith('index.html');
    document.querySelectorAll('a[data-site-home-btn]').forEach(a=>{
      if(isHome){a.setAttribute('aria-current','page');a.classList.add('site-home-active');}
    });

    applySecure();
    sync(detectLang());

    // любая страница при смене языка меняет <html lang>, на это и реагируем
    new MutationObserver(()=>sync(document.documentElement.lang))
      .observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    window.addEventListener('popstate',()=>sync(detectLang()));
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();
