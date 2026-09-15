
// БЛОК: Навигация и кнопки
// Кнопка "Обсудить задачу" должна вести на форму, а не в подвал
function updateDiscussButtons(lang){
  document.querySelectorAll('a[data-i18n="btn_discuss"]').forEach(a=>{
    a.href = `brief.html?lang=${lang}`;
  });
  const bottom = document.getElementById('contact-btn-bottom');
  if(bottom){
    // bottom is button with dropdown, we keep dropdown but also make link to brief
    // If you want bottom to be direct link, change to <a>
  }
}
// Вызывается из applyLang
