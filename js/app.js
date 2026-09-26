
document.addEventListener('DOMContentLoaded',()=>{
  const langBtn=document.getElementById('lang-btn');
  const langMenu=document.getElementById('lang-menu');
  const cBtn=document.getElementById('contact-btn');
  const cMenu=document.getElementById('contact-menu');
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
  if(cBtn&&cMenu){cBtn.addEventListener('click',e=>{e.stopPropagation();cMenu.classList.toggle('hidden');cMenu.classList.toggle('flex'); if(cMenuB){cMenuB.classList.add('hidden');cMenuB.classList.remove('flex');}});}
  if(cBtnB&&cMenuB){cBtnB.addEventListener('click',e=>{e.stopPropagation();cMenuB.classList.toggle('hidden');cMenuB.classList.toggle('flex'); if(cMenu){cMenu.classList.add('hidden');cMenu.classList.remove('flex');}});}
  document.addEventListener('click',e=>{
    if(!document.getElementById('lang-switcher').contains(e.target)){langMenu.classList.add('hidden');langMenu.classList.remove('flex');}
    const cd=document.getElementById('contact-dropdown-container'); const cdB=document.getElementById('contact-dropdown-container-bottom');
    if(cd&&!cd.contains(e.target)&&cMenu){cMenu.classList.add('hidden');cMenu.classList.remove('flex');}
    if(cdB&&!cdB.contains(e.target)&&cMenuB){cMenuB.classList.add('hidden');cMenuB.classList.remove('flex');}
  });

  currentLang=(getLangFromURL()||localStorage.getItem("site_lang")||"ru").toLowerCase();
  if(!window.LOCALES[currentLang]) currentLang="ru";
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
  const l=getLangFromURL()||(e.state&&e.state.lang)||'ru';
  applyLang(l,false);
});
