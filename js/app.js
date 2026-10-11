
document.addEventListener('DOMContentLoaded',()=>{
  const langBtn=document.getElementById('lang-btn');
  const langMenu=document.getElementById('lang-menu');
  const cBtnB=document.getElementById('contact-btn-bottom');
  const cMenuB=document.getElementById('contact-menu-bottom');

  if(langBtn&&langMenu){
    langBtn.addEventListener('click',e=>{e.stopPropagation();langMenu.classList.toggle('hidden');langMenu.classList.toggle('flex');});
    langMenu.addEventListener('click',e=>{
      const btn=e.target.closest('.lang-option');
      if(!btn) return;
      applyLang(btn.dataset.lang,true);
      langMenu.classList.add('hidden');langMenu.classList.remove('flex');
    });
  }
  if(cBtnB&&cMenuB){cBtnB.addEventListener('click',e=>{e.stopPropagation();cMenuB.classList.toggle('hidden');cMenuB.classList.toggle('flex'); if(window.SiteHeader){SiteHeader.closeContact();}});}
  document.addEventListener('click',e=>{
    if(!document.getElementById('lang-switcher').contains(e.target)){langMenu.classList.add('hidden');langMenu.classList.remove('flex');}
    const cdB=document.getElementById('contact-dropdown-container-bottom');
    if(cdB&&!cdB.contains(e.target)&&cMenuB){cMenuB.classList.add('hidden');cMenuB.classList.remove('flex');}
  });

  currentLang=(getLangFromURL()||localStorage.getItem("site_lang")||"en").toLowerCase();
  if(!window.LOCALES[currentLang]) currentLang="en";
  applyLang(currentLang,false);
  applySecureConfig();

  const discussLink=document.getElementById('btn-discuss-link');
  if(discussLink){
    discussLink.addEventListener('click',e=>{e.preventDefault(); window.location.href=`brief.html?lang=${currentLang}`;});
  }
  const regBtn=document.getElementById('btn-registrar');
  if(regBtn){
    regBtn.addEventListener('click',e=>{e.preventDefault(); window.location.href=`register-bot.html?lang=${currentLang}`;});
  }
});
window.addEventListener('popstate',e=>{
  const l=getLangFromURL()||(e.state&&e.state.lang)||'en';
  applyLang(l,false);
});
