
// js/i18n.js - uses LOCALES from /locales/*.js
window.LOCALES = window.LOCALES || {};
const flags={ru:"🇷🇺",uk:"🇺🇦",en:"🇬🇧",it:"🇮🇹",fr:"🇫🇷",es:"🇪🇸",de:"🇩🇪"};
const codes={ru:"RU",uk:"UA",en:"EN",it:"IT",fr:"FR",es:"ES",de:"DE"};

function getLangFromURL(){
  try{
    const u=new URL(window.location.href);
    let l=u.searchParams.get('lang');
    if(l && window.LOCALES[l.toLowerCase()]) return l.toLowerCase();
    const p=u.pathname.toLowerCase();
    for(const k of Object.keys(window.LOCALES)){
      if(p===`/${k}`||p===`/${k}/`||p.startsWith(`/${k}/`)) return k;
    }
  }catch(e){}
  return null;
}
let currentLang=(getLangFromURL()||localStorage.getItem("site_lang")||"ru").toLowerCase();
if(!window.LOCALES[currentLang]) currentLang="ru";

function updateLinks(lang){
  document.querySelectorAll('a[data-i18n="btn_discuss"], #btn-discuss-link').forEach(a=>{
    try{
      const url=new URL(a.href, window.location.origin);
      url.searchParams.set('lang',lang);
      a.href=url.pathname+url.search;
    }catch(e){ a.href=`brief.html?lang=${lang}`; }
  });
  const regBtn=document.getElementById('btn-registrar');
  if(regBtn){
    try{
      const url=new URL(regBtn.href, window.location.origin);
      url.searchParams.set('lang',lang);
      regBtn.href=url.pathname+url.search;
    }catch(e){ regBtn.href=`register-bot.html?lang=${lang}`; }
  }
  const scanBtn=document.getElementById('btn-scanqr');
  if(scanBtn){
    try{
      const url=new URL(scanBtn.href, window.location.origin);
      url.searchParams.set('lang',lang);
      scanBtn.href=url.pathname+url.search;
    }catch(e){ scanBtn.href=`scanqr-dine.html?lang=${lang}`; }
  }
}

function applyLang(lang,push=true){
  lang=(lang||'ru').toLowerCase();
  if(!window.LOCALES[lang]) lang='ru';
  currentLang=lang;
  const d=window.LOCALES[lang];
  if(!d) return;
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const k=el.getAttribute("data-i18n");
    if(k.endsWith('_full')) return;
    if(k==='p3_full'){ if(d[k]) el.innerHTML=d[k]; return; }
    if(d[k]) el.textContent=d[k];
  });
  [1,2,3,4,5].forEach(id=>{
    const el=document.getElementById(`article-${id}-details`);
    if(el&&d[`a${id}_full`]) el.innerHTML=d[`a${id}_full`];
  });
  if(d.title) document.title=d.title;
  const meta=document.getElementById('meta-description'); if(meta&&d.desc) meta.setAttribute('content',d.desc);
  document.getElementById("lang-current-flag").textContent=flags[lang]||"🌐";
  document.getElementById("lang-current-code").textContent=codes[lang]||lang.toUpperCase();
  document.documentElement.lang=lang;
  localStorage.setItem("site_lang",lang);
  updateLinks(lang);
  document.querySelectorAll(".lang-option").forEach(b=>b.classList.toggle("lang-active",b.dataset.lang===lang));
  [1,2,3,4,5].forEach(id=>{
    const det=document.getElementById(`article-${id}-details`);
    const btn=document.getElementById(`btn-${id}`);
    if(!det||!btn) return;
    btn.textContent=det.classList.contains('hidden')?d.read_more:d.read_less;
  });
  if(push){
    try{
      const url=new URL(window.location.href);
      url.searchParams.set('lang',lang);
      history.pushState({lang},'',url.toString());
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link=>{
        const hl=link.getAttribute('hreflang');
        if(hl==='x-default') return;
        link.href=`${window.location.origin}${window.location.pathname}?lang=${hl}`;
      });
    }catch(e){}
  }
}

function toggleArticle(id){
  const det=document.getElementById(`article-${id}-details`);
  const btn=document.getElementById(`btn-${id}`);
  if(!det) return;
  const willOpen=det.classList.contains('hidden');
  det.classList.toggle('hidden');
  const d=window.LOCALES[currentLang];
  if(btn&&d) btn.textContent=willOpen?d.read_less:d.read_more;
}

function applySecureConfig(){
  if(typeof SECURE_CONFIG==='undefined'||!SECURE_CONFIG.profiles) return;
  const p=SECURE_CONFIG.profiles;
  document.querySelectorAll('#contact-menu a, #contact-menu-bottom a').forEach(a=>{
    const txt=(a.textContent||'').toLowerCase();
    const href=a.getAttribute('href')||'';
    if(txt.includes('telegram')||href.includes('t.me')) a.href=p.telegram;
    else if(txt.includes('instagram')) a.href=p.instagram;
    else if(txt.includes('facebook')) a.href=p.facebook;
    else if(txt.includes('github')) a.href=p.github;
    else if(txt.includes('linkedin')) a.href=p.linkedin;
    else if(txt.includes('email')||href.startsWith('mailto:')) a.href=p.email;
  });
}
