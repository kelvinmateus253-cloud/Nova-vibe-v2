/* =====================================================
   NOVA VIBE — script.js (Vanilla JS)
   ===================================================== */
'use strict';

/* ---------- CONFIGURAÇÃO ----------
   >>> Coloque aqui o número real de WhatsApp, só dígitos, com indicativo.
   >>> Exemplo: '244900000000'. Enquanto estiver vazio, nenhuma encomenda é enviada. */
const WHATSAPP_NUMBER = '';

/* ---------- DADOS (ilustrativos) ----------
   `image`: coloque as suas fotos na pasta images/. Se o ficheiro não existir,
   é mostrada uma ilustração de substituição gerada neste ficheiro. */
const PRODUCTS = [
  { id: 1, name: 'Vestido Elegance',  category: 'Vestuário',  price: 35000, image: 'images/vestido-elegance.jpg',
    desc: 'Vestido midi preto com decote quadrado e saia cruzada. Um clássico versátil para o dia e para a noite.' },
  { id: 2, name: 'Bolsa Nova Classic', category: 'Bolsas',     price: 28000, image: 'images/bolsa-nova-classic.jpg',
    desc: 'Bolsa estruturada em tom bege com fecho dourado e duas alças. Elegância discreta para todas as ocasiões.' },
  { id: 3, name: 'Sapatilha Urban',   category: 'Calçados',   price: 42000, image: 'images/sapatilha-urban.jpg',
    desc: 'Sapatilha branca minimalista, confortável e fácil de combinar com qualquer visual.' },
  { id: 4, name: 'Relógio Vibe Gold', category: 'Acessórios', price: 25000, image: 'images/relogio-vibe-gold.jpg',
    desc: 'Relógio dourado com mostrador branco e bracelete em aço. Um toque de brilho no pulso.' },
  { id: 5, name: 'Óculos Milano',     category: 'Acessórios', price: 18000, image: 'images/oculos-milano.jpg',
    desc: 'Óculos de sol com lentes escuras e hastes douradas. Estilo e proteção.' },
  { id: 6, name: 'Carteira Classic',  category: 'Bolsas',     price: 15000, image: 'images/carteira-classic.jpg',
    desc: 'Carteira compacta preta com fecho dourado, ideal para o essencial.' }
];
const CATEGORIES = ['Vestuário', 'Calçados', 'Bolsas', 'Acessórios'];
const CATEGORY_SAMPLE = { 'Vestuário': 1, 'Calçados': 3, 'Bolsas': 2, 'Acessórios': 4 };

/* ---------- UTILITÁRIOS ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const formatKz = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' Kz';
const normalize = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const svgUri = svg => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);

/* ---------- IMAGENS DE SUBSTITUIÇÃO (SVG) ---------- */
function productArt(p) {
  const shapes = {
    1: '<path d="M100 40 q0-14 10-14" fill="none" stroke="#8a6b3f" stroke-width="3"/><path d="M60 62l40-22 40 22" fill="none" stroke="#222" stroke-width="3"/><path d="M70 64h12v30l-8 8 8 130h46l8-130-8-8V64h12v36l-8 14 6 100-18 20H78l-8-30z" fill="#171717"/>',
    2: '<path d="M70 110q0-50 30-50t30 50" fill="none" stroke="#b79d72" stroke-width="9"/><path d="M42 120h116l12 70q0 12-12 12H42q-12 0-12-12z" fill="#cdb48a"/><rect x="92" y="126" width="16" height="22" rx="3" fill="#c9a24a"/>',
    3: '<path d="M30 160q0-30 20-35l30-20 14 14 40 8q26 6 30 24v20H30z" fill="#fff" stroke="#d8d2c8" stroke-width="3"/><path d="M30 178h140" stroke="#d8d2c8" stroke-width="6"/>',
    4: '<rect x="82" y="20" width="36" height="50" fill="#d4af5a"/><rect x="82" y="180" width="36" height="50" fill="#d4af5a"/><circle cx="100" cy="125" r="48" fill="#d4af5a"/><circle cx="100" cy="125" r="38" fill="#fff"/><path d="M100 125V100M100 125l18 10" stroke="#c9a24a" stroke-width="3" stroke-linecap="round"/>',
    5: '<circle cx="62" cy="130" r="30" fill="#1b1b1b"/><circle cx="138" cy="130" r="30" fill="#1b1b1b"/><path d="M92 126q8-8 16 0M32 122l-14-10M168 122l14-10" fill="none" stroke="#c9a24a" stroke-width="4" stroke-linecap="round"/>',
    6: '<rect x="45" y="100" width="110" height="80" rx="8" fill="#161616"/><rect x="88" y="130" width="14" height="20" rx="3" fill="#c9a24a"/>'
  };
  return svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"><rect width="200" height="250" fill="#f3ece1"/><g transform="translate(20 25) scale(.8)">${shapes[p.id] || ''}</g></svg>`);
}
const HERO_ART = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="w" x1="0" x2="1"><stop offset="0" stop-color="#d9cdbd"/><stop offset="1" stop-color="#efe6d8"/></linearGradient></defs><rect width="400" height="300" fill="url(#w)"/><path d="M0 220l400-30v110H0z" fill="#e6ddd3"/><path d="M240 40h150" stroke="#8a6b3f" stroke-width="3"/><g fill="#a89078"><path d="M255 48l14 90h-28z"/><path d="M290 48l16 110h-30z" fill="#d8c9b4"/><path d="M330 48l14 100h-28z" fill="#bca68d"/><path d="M366 48l14 105h-28z" fill="#8c7258"/></g><path d="M95 205q-4-50 30-50t30 50z" fill="#b59b73"/><rect x="85" y="190" width="80" height="45" rx="6" fill="#bda27a"/><rect x="118" y="196" width="14" height="10" fill="#c9a24a"/><ellipse cx="60" cy="250" rx="45" ry="10" fill="#f7f2ea"/><circle cx="55" cy="245" r="9" fill="none" stroke="#c9a24a" stroke-width="3"/></svg>`);

/** Aplica imagem com substituição automática se o ficheiro não existir. */
function setImage(img, src, fallback) {
  img.onerror = () => { img.onerror = null; img.src = fallback; };
  img.src = src;
}

/* ---------- ESTADO ---------- */
let activeFilter = 'Todos';
let searchTerm = '';
let cart = [];            // [{ id, qty }]
try { cart = JSON.parse(localStorage.getItem('novaVibeCart')); } catch (e) { cart = []; }
if (!Array.isArray(cart)) cart = [];
cart = cart.filter(i => i && PRODUCTS.some(p => p.id === i.id) && Number.isInteger(i.qty) && i.qty > 0);
let lastFocus = null;

/* Bloqueia o scroll da página quando modal/carrinho estão abertos */
const syncScrollLock = () => document.body.classList.toggle('no-scroll',
  !$('#product-modal').hidden || $('#cart-drawer').classList.contains('is-open'));

/* Mantém o foco do teclado dentro do modal ou do carrinho */
function trapFocus(e, container) {
  if (e.key !== 'Tab') return;
  const f = $$('button, input, a[href]', container).filter(el => !el.disabled && el.offsetParent !== null);
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

const saveCart = () => { try { localStorage.setItem('novaVibeCart', JSON.stringify(cart)); } catch (e) { /* ignorar */ } };

/* ---------- CATEGORIAS ---------- */
function renderCategories() {
  const grid = $('#category-grid');
  CATEGORIES.forEach(cat => {
    const sample = PRODUCTS.find(p => p.id === CATEGORY_SAMPLE[cat]);
    const card = document.createElement('article');
    card.className = 'category-card';
    card.innerHTML = '<div class="art"><img alt="" loading="lazy"></div><h3></h3><button class="btn btn-outline btn-small">Ver peças</button>';
    setImage($('img', card), sample.image, productArt(sample));
    $('h3', card).textContent = cat;
    $('button', card).addEventListener('click', () => {
      setFilter(cat);
      $('#produtos').scrollIntoView({ behavior: 'smooth' });
    });
    grid.appendChild(card);
  });
}

/* ---------- CATÁLOGO ---------- */
function setFilter(cat) {
  activeFilter = cat;
  $$('.chip').forEach(c => c.classList.toggle('is-active', c.dataset.filter === cat));
  renderProducts();
}

function renderProducts() {
  const grid = $('#product-grid');
  const term = normalize(searchTerm.trim());
  const list = PRODUCTS.filter(p =>
    (activeFilter === 'Todos' || p.category === activeFilter) && normalize(p.name).includes(term));
  grid.innerHTML = '';
  list.forEach(p => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="thumb"><img alt="" loading="lazy"></div>
      <p class="cat"></p><h3></h3><p class="price"></p>
      <button class="btn btn-outline js-view">Ver produto</button>
      <button class="btn btn-dark js-add">+ Adicionar</button>`;
    const img = $('img', card);
    img.alt = p.name;
    setImage(img, p.image, productArt(p));
    $('.cat', card).textContent = p.category;
    $('h3', card).textContent = p.name;
    $('.price', card).textContent = formatKz(p.price);
    $('.js-view', card).addEventListener('click', () => openModal(p));
    $('.js-add', card).addEventListener('click', () => addToCart(p.id));
    grid.appendChild(card);
  });
  $('#result-count').textContent = list.length === 1 ? '1 produto encontrado' : `${list.length} produtos encontrados`;
  $('#empty-msg').hidden = list.length > 0;
}

/* ---------- MODAL ---------- */
let modalProduct = null;
function openModal(p) {
  modalProduct = p;
  lastFocus = document.activeElement;
  const img = $('#modal-img');
  img.alt = p.name;
  setImage(img, p.image, productArt(p));
  $('#modal-cat').textContent = p.category;
  $('#modal-title').textContent = p.name;
  $('#modal-price').textContent = formatKz(p.price);
  $('#modal-desc').textContent = p.desc;
  $('#modal-overlay').hidden = false;
  $('#product-modal').hidden = false;
  syncScrollLock();
  $('#modal-close').focus();
}
function closeModal() {
  $('#modal-overlay').hidden = true;
  $('#product-modal').hidden = true;
  syncScrollLock();
  if (lastFocus) lastFocus.focus();
}

/* ---------- CARRINHO ---------- */
function addToCart(id) {
  const item = cart.find(i => i.id === id);
  if (item) item.qty += 1; else cart.push({ id, qty: 1 });
  saveCart(); renderCart();
  showToast(PRODUCTS.find(p => p.id === id));
}
function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  saveCart(); renderCart();
}
function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart(); renderCart();
}
const cartTotal = () => cart.reduce((s, i) => s + i.qty * PRODUCTS.find(p => p.id === i.id).price, 0);

function renderCart() {
  const box = $('#cart-items');
  box.innerHTML = '';
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const badge = $('#cart-count');
  badge.textContent = count; badge.hidden = count === 0;

  if (!cart.length) {
    box.innerHTML = '<p class="cart-empty">O seu carrinho está vazio.</p>';
  }
  cart.forEach(({ id, qty }) => {
    const p = PRODUCTS.find(x => x.id === id);
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <div class="thumb"><img alt=""></div>
      <div>
        <div class="ci-top"><h4></h4>
          <button class="trash" aria-label="Remover"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg></button></div>
        <p class="ci-unit"></p>
        <div class="ci-bottom">
          <div class="qty"><button class="js-minus" aria-label="Diminuir quantidade">−</button><span></span><button class="js-plus" aria-label="Aumentar quantidade">+</button></div>
          <span class="ci-sub"></span>
        </div>
      </div>`;
    const img = $('img', row);
    img.alt = p.name;
    setImage(img, p.image, productArt(p));
    $('h4', row).textContent = p.name;
    $('.ci-unit', row).textContent = formatKz(p.price) + ' / un.';
    $('.qty span', row).textContent = qty;
    $('.ci-sub', row).textContent = formatKz(p.price * qty);
    $('.trash', row).addEventListener('click', () => removeItem(id));
    $('.js-minus', row).addEventListener('click', () => changeQty(id, -1));
    $('.js-plus', row).addEventListener('click', () => changeQty(id, 1));
    box.appendChild(row);
  });
  $('#cart-total').textContent = formatKz(cartTotal());
}

function openCart() {
  lastFocus = document.activeElement;
  $('#cart-overlay').hidden = false;
  const d = $('#cart-drawer');
  d.classList.add('is-open'); d.setAttribute('aria-hidden', 'false');
  syncScrollLock();
  $('#cart-close').focus();
}
function closeCart() {
  $('#cart-overlay').hidden = true;
  const d = $('#cart-drawer');
  d.classList.remove('is-open'); d.setAttribute('aria-hidden', 'true');
  syncScrollLock();
  if (lastFocus) lastFocus.focus();
}

function showToast(p) {
  const wrap = $('#toasts');
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = '<div><strong>Produto adicionado ao carrinho ✓</strong><small></small></div><button>Ver carrinho</button>';
  $('small', t).textContent = `1 × ${p.name}`;
  $('button', t).addEventListener('click', () => { t.remove(); openCart(); });
  wrap.appendChild(t);
  while (wrap.children.length > 3) wrap.firstChild.remove();
  setTimeout(() => t.remove(), 3500);
}
function showNotice(msg) {
  const wrap = $('#toasts');
  const t = document.createElement('div');
  t.className = 'toast notice';
  t.setAttribute('role', 'alert');
  t.textContent = msg;
  wrap.appendChild(t);
  setTimeout(() => t.remove(), 5000);
}

/* ---------- ENCOMENDA POR WHATSAPP ---------- */
function showCartError(msg) {
  const e = $('#cart-error');
  e.textContent = msg; e.hidden = !msg;
}
function checkout() {
  const name = $('#customer-name').value.trim();
  // Validações antes de gerar a encomenda
  if (!cart.length) return showCartError('Adicione pelo menos um produto ao carrinho.');
  if (name.length < 2) { $('#customer-name').focus(); return showCartError('Indique o seu nome para continuar.'); }
  if (!/^\d{8,15}$/.test(WHATSAPP_NUMBER)) {
    return showCartError('O número de WhatsApp da loja ainda não foi configurado (variável WHATSAPP_NUMBER em script.js).');
  }
  showCartError('');
  const lines = cart.map(({ id, qty }) => {
    const p = PRODUCTS.find(x => x.id === id);
    return `• ${qty} × ${p.name} — ${formatKz(p.price * qty)}`;
  });
  const text = `Olá! Gostaria de fazer a seguinte encomenda na Nova Vibe:\n\n${lines.join('\n')}\n\nTotal: ${formatKz(cartTotal())}\nNome: ${name}`;
  // Apenas abre o WhatsApp com a mensagem preparada. A encomenda só é enviada quando o cliente carregar em "Enviar" no WhatsApp.
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
}

/* ---------- LIGAÇÕES GERAIS DE WHATSAPP ---------- */
function setupWhatsAppLinks() {
  const valid = /^\d{8,15}$/.test(WHATSAPP_NUMBER);
  $$('.js-whatsapp').forEach(a => {
    if (valid) {
      a.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre a Nova Vibe.')}`;
    } else {
      a.addEventListener('click', e => {
        e.preventDefault();
        showNotice('O número de WhatsApp ainda não foi configurado. Edite a variável WHATSAPP_NUMBER em script.js.');
      });
    }
  });
}

/* ---------- MENU MÓVEL ---------- */
function setupMenu() {
  const btn = $('#menu-toggle'), nav = $('#main-nav');
  const setOpen = open => { nav.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', open); };
  btn.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  $$('a', nav).forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('click', e => { if (!nav.contains(e.target) && !btn.contains(e.target)) setOpen(false); });
}

/* ---------- INICIALIZAÇÃO ---------- */
document.addEventListener('DOMContentLoaded', () => {
  setImage($('#hero-img'), 'images/hero.jpg', HERO_ART);
  renderCategories();
  renderProducts();
  renderCart();
  setupMenu();
  setupWhatsAppLinks();

  $('#search').addEventListener('input', e => { searchTerm = e.target.value; renderProducts(); });
  $$('.chip').forEach(c => c.addEventListener('click', () => setFilter(c.dataset.filter)));

  $('#modal-close').addEventListener('click', closeModal);
  $('#modal-overlay').addEventListener('click', closeModal);
  $('#modal-add').addEventListener('click', () => { addToCart(modalProduct.id); closeModal(); });

  $('#cart-toggle').addEventListener('click', openCart);
  $('#cart-close').addEventListener('click', closeCart);
  $('#cart-overlay').addEventListener('click', closeCart);
  $('#checkout-btn').addEventListener('click', checkout);
  $('#customer-name').addEventListener('input', () => showCartError(''));

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (!$('#product-modal').hidden) closeModal();
    else if ($('#cart-drawer').classList.contains('is-open')) closeCart();
  });
  $('#product-modal').addEventListener('keydown', e => trapFocus(e, $('#product-modal')));
  $('#cart-drawer').addEventListener('keydown', e => trapFocus(e, $('#cart-drawer')));

  $('#year').textContent = new Date().getFullYear();
});
