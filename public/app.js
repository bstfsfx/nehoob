const dialog = document.querySelector('#site-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const dialogContent = document.querySelector('#dialog-content');
const products = [
  { id: 'blush', title: '溫柔心意', subtitle: '粉紅與白玫瑰花束', image: 'budget300', budget: '300', keywords: '玫瑰 粉紅 白色 生日 慰問' },
  { id: 'sunshine', title: '陽光祝福', subtitle: '明亮向日葵花束', image: 'budget600', budget: '600', keywords: '向日葵 黃色 生日 畢業 祝賀' },
  { id: 'pink', title: '浪漫花語', subtitle: '精緻粉紅玫瑰花束', image: 'budget1000', budget: '1000', keywords: '玫瑰 粉紅 紀念日 求婚' },
  { id: 'red', title: '永恆摯愛', subtitle: '奢華紅玫瑰花束', image: 'budgetluxury', budget: 'luxury', keywords: '玫瑰 紅色 紀念日 求婚 開張' }
];
const budgetNames = { '300': 'HK$300 以下', '600': 'HK$300 – 600', '1000': 'HK$600 – 1,000', 'luxury': 'HK$1,000 以上' };
const occasionNames = { birthday: '生日祝福', anniversary: '紀念日・求婚', comfort: '探病慰問', graduation: '畢業送禮', opening: '開張誌慶' };
let favorites = [];
try { favorites = JSON.parse(localStorage.getItem('bloom-city-favorites') || '[]').filter(id => products.some(p => p.id === id)); } catch { favorites = []; }

function updateFavorites() {
  document.querySelector('.cart-count').textContent = String(favorites.length);
  try { localStorage.setItem('bloom-city-favorites', JSON.stringify(favorites)); } catch { /* Storage can be unavailable in an embedded preview. */ }
}
function toast(message) {
  const target = document.querySelector('.toast');
  target.textContent = message;
  target.classList.add('visible');
  window.setTimeout(() => target.classList.remove('visible'), 2500);
}
function openDialog(title, content) {
  dialogTitle.textContent = title;
  dialogContent.innerHTML = content;
  if (!dialog.open) dialog.showModal();
}
function productMarkup(list) {
  if (!list.length) return '<p class="search-empty">暫未找到相符花束，試試「玫瑰」、「粉紅」或「向日葵」。</p>';
  return `<div class="dialog-grid">${list.map(product => `<article class="dialog-product"><img src="/assets/${product.image}.webp" alt="${product.subtitle}"><h3>${product.title}</h3><p>${budgetNames[product.budget]}<br>${product.subtitle}</p><button class="button button-outline" data-favorite="${product.id}">${favorites.includes(product.id) ? '移除收藏' : '收藏花束'} <svg><use href="#i-heart"/></svg></button></article>`).join('')}</div>`;
}
function openCollection(title, list = products) {
  openDialog(title, `<p>讓花朵替你傳遞心意，探索適合這份祝福的花束。</p>${productMarkup(list)}<p class="dialog-note" style="margin-top:20px">這是花束設計展示。收藏只儲存於此瀏覽器；網站不處理訂單或付款。</p>`);
}
const info = {
  about: { title: '關於 Bloom & City', content: '<p>把心意送到香港每一個角落。</p><p>我們相信，每一束花都承載著一份獨一無二的心意。從生日祝福到紀念日驚喜，從日常小確幸到重要時刻，Bloom & City 以細膩花藝，陪你傳遞真摯情感。</p>' },
  news: { title: '最新花藝消息', content: '<p>讓鮮花成為生活的一部分。</p><p>探索季節花材、送花靈感與日常花瓶佈置。想收到新的花藝資訊？可於首頁訂閱區留下你的偏好。</p><p class="dialog-note">目前為網站設計展示，未連接最新消息或電子報服務。</p>' },
  contact: { title: '聯絡我們', content: '<p>無論是一份小驚喜，還是重要場合的花藝佈置，我們都樂意聆聽你的心意。</p><p>訂花時可先準備：送花日期、收件地區、場合、預算，以及想寫在賀卡上的祝福。</p><p class="dialog-note">此為前端設計展示。正式電話、電郵及 WhatsApp 聯絡資料尚未提供。</p>' },
  consult: { title: 'WhatsApp 訂花', content: '<p>告訴花藝師你的場合、預算和送花日期，讓每一份心意恰到好處。</p><p>建議準備：<br>・送花日期與收件地區<br>・喜歡的花材或顏色<br>・預算與賀卡祝福</p><p class="dialog-note">WhatsApp 聯絡號碼尚未設定。這是前端設計展示，不會傳送訊息或建立訂單。</p>' },
  account: { title: '你的花束心意', content: '<p>收藏喜愛的花束，慢慢挑選最適合的那一份心意。</p><p class="dialog-note">此展示網站無需登入，收藏會保存在此瀏覽器中。</p><button class="button button-filled" data-show-favorites>查看我的收藏</button>' },
  corporate: { title: '企業及商業花藝服務', content: '<p>讓每個空間，綻放品牌的獨特氣質。</p><p>開張花籃、品牌活動、辦公室鮮花佈置及企業送禮，以精緻花藝為重要場合增添美麗與祝福。</p><p>規劃企業花藝時，請準備活動日期、場地、佈置範圍、品牌風格及預算。</p><p class="dialog-note">本頁為服務設計展示，尚未連接預約或報價系統。</p>' },
  subscription: { title: '定期鮮花訂閱', content: '<p>每週、每兩週或每月配送，讓鮮花為生活帶來更多美好。</p><div class="dialog-choices"><button data-frequency="每週">每週</button><button data-frequency="每兩週">每兩週</button><button data-frequency="每月">每月</button></div><p id="frequency-feedback">選擇你喜歡的配送頻率。</p><p class="dialog-note">本頁為訂閱設計展示，選擇頻率不會建立訂閱或產生費用。</p>' },
  delivery: { title: '送花須知及配送範圍', content: '<p>全港市區配送・讓心意準時送達。</p><p>即日送花服務視乎地區、花材供應及截單時間。每束花均可附上心意賀卡，寫下你的真摯祝福。</p><p>下單前請確認收件人姓名、地址、聯絡方法及期望送花日期。</p><p class="dialog-note">實際配送範圍、運費及截單時間需由花店確認。</p>' },
  faq: { title: '常見問題', content: '<p><strong>每束花都可以附上賀卡嗎？</strong><br>參考設計提供附送心意賀卡服務，可寫下你的祝福。</p><p><strong>可以即日送花嗎？</strong><br>視乎地區、花材供應及截單時間。</p><p><strong>如何選擇合適花束？</strong><br>可按場合、喜愛的顏色或預算瀏覽，再收藏心儀的花束。</p><p class="dialog-note">此為前端展示，未提供實際訂單服務。</p>' },
  social: { title: '與我們分享花藝日常', content: '<p>鮮花，讓每個平凡日子多一點美好。</p><p class="dialog-note">品牌社交帳號連結尚未提供；此為設計展示。</p>' }
};

updateFavorites();
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close(); } });
const menuButton = document.querySelector('.menu-toggle');
menuButton.addEventListener('click', () => {
  const isOpen = document.querySelector('#main-nav').classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? '關閉選單' : '開啟選單');
});
document.querySelectorAll('#main-nav a').forEach(link => link.addEventListener('click', () => {
  document.querySelector('#main-nav').classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  document.querySelectorAll('.nav-dropdown').forEach(drop => drop.classList.remove('is-open'));
}));
document.querySelectorAll('.nav-dropdown > button').forEach(button => button.addEventListener('click', () => {
  const isOpen = button.parentElement.classList.toggle('is-open');
  button.setAttribute('aria-expanded', String(isOpen));
}));
document.addEventListener('click', event => {
  const information = event.target.closest('[data-info]');
  if (information) {
    const key = information.dataset.info;
    if (key === 'cart') openCollection('你的花束收藏', products.filter(product => favorites.includes(product.id)));
    else if (key === 'occasions') openDialog('為每個重要時刻選花', `<p>不同場合，同一份真摯心意。</p><div class="dialog-choices">${Object.entries(occasionNames).map(([id, name]) => `<button data-occasion="${id}">${name}</button>`).join('')}</div>`);
    else if (info[key]) openDialog(info[key].title, info[key].content);
  }
  const occasion = event.target.closest('[data-occasion]');
  if (occasion) {
    const key = occasion.dataset.occasion;
    const selection = { birthday: ['blush', 'sunshine', 'pink'], anniversary: ['pink', 'red'], comfort: ['blush', 'sunshine'], graduation: ['sunshine', 'blush'], opening: ['sunshine', 'red'] }[key];
    openCollection(occasionNames[key], products.filter(product => selection.includes(product.id)));
  }
  const budget = event.target.closest('[data-budget]');
  if (budget) openCollection(budgetNames[budget.dataset.budget], products.filter(product => product.budget === budget.dataset.budget));
  const favorite = event.target.closest('[data-favorite]');
  if (favorite) {
    const id = favorite.dataset.favorite;
    const existing = favorites.includes(id);
    favorites = existing ? favorites.filter(item => item !== id) : [...favorites, id];
    updateFavorites();
    favorite.innerHTML = `${existing ? '收藏花束' : '移除收藏'} <svg><use href="#i-heart"/></svg>`;
    toast(existing ? '已移除收藏花束' : '已加入你的花束收藏');
  }
  if (event.target.closest('[data-show-favorites]')) openCollection('你的花束收藏', products.filter(product => favorites.includes(product.id)));
  const frequency = event.target.closest('[data-frequency]');
  if (frequency) document.querySelector('#frequency-feedback').textContent = `已選擇 ${frequency.dataset.frequency} 配送（展示選項，尚未建立訂閱）。`;
});
document.querySelector('#search-button').addEventListener('click', () => {
  openDialog('尋找你的心意花束', `<div class="search-field"><svg><use href="#i-search"/></svg><input id="flower-search" type="search" placeholder="搜尋花材、顏色或場合…" aria-label="搜尋花束"></div><div id="search-results">${productMarkup(products)}</div>`);
  const input = document.querySelector('#flower-search');
  input.focus();
  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    const filtered = products.filter(product => `${product.title} ${product.subtitle} ${product.keywords} ${budgetNames[product.budget]}`.toLowerCase().includes(query));
    document.querySelector('#search-results').innerHTML = productMarkup(filtered);
  });
});
document.querySelector('#newsletter-form').addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('#newsletter-email');
  if (!input.checkValidity()) { input.reportValidity(); return; }
  try { localStorage.setItem('bloom-city-newsletter-email', input.value.trim()); } catch { /* Local saving is optional. */ }
  document.querySelector('#newsletter-feedback').textContent = '已記錄於此瀏覽器。展示網站尚未連接電子報服務。';
  input.value = '';
});
