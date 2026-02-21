// ========================================================
// KLIKOO STORE — app.js
// Charger APRÈS products.json dans le HTML
// ========================================================

// --------------------------------------------------------
// ÉTAT GLOBAL
// --------------------------------------------------------
var cart          = JSON.parse(localStorage.getItem('klikoo_cart') || '[]');
var wishlist      = JSON.parse(localStorage.getItem('klikoo_wish') || '[]');
var currentCat    = 'Tous';
var filteredProds = [];
var toastTimer    = null;

// --------------------------------------------------------
// INITIALISATION
// --------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {

  if (typeof PRODUCTS === 'undefined' || !Array.isArray(PRODUCTS) || PRODUCTS.length === 0) {
    console.error('KLIKOO : products.json non chargé ou vide !');
    var g = document.getElementById('prodsGrid');
    if (g) g.innerHTML = '<p style="padding:40px;text-align:center;color:red">Erreur : products.json manquant.</p>';
    return;
  }

  filteredProds = PRODUCTS.slice();
  renderHeroProds();
  renderCats();
  applyFilterAndSort();
  updateBadges();
  startTimer();

  window.addEventListener('scroll', function () {
    var hdr = document.getElementById('siteHeader');
    if (hdr) hdr.classList.toggle('scrolled', window.scrollY > 8);
  });
});

// --------------------------------------------------------
// HERO — 3 premiers produits
// --------------------------------------------------------
function renderHeroProds() {
  var el = document.getElementById('heroProds');
  if (!el) return;

  var top3 = PRODUCTS.slice(0, 3);
  var html = '';

  for (var i = 0; i < top3.length; i++) {
    var p = top3[i];
    var cls = i === 0 ? 'hero-prod-card first' : 'hero-prod-card';
    html +=
      '<div class="' + cls + '" onclick="openQuick(' + p.id + ')">' +
        '<img class="hero-prod-img"' +
          ' src="' + p.images[0] + '"' +
          ' alt="' + p.name + '"' +
          ' onerror="this.src=\'https://via.placeholder.com/200x130/ff8716/fff?text=KLIKO\'">' +
        '<div class="hero-prod-name">' + p.name + '</div>' +
        '<div class="hero-prod-price">' + p.price + ' DH</div>' +
      '</div>';
  }
  el.innerHTML = html;
}

// --------------------------------------------------------
// CATÉGORIES
// --------------------------------------------------------
function renderCats() {
  var el = document.getElementById('catsGrid');
  if (!el) return;

  var html = '';
  for (var i = 0; i < CATEGORIES.length; i++) {
    var c     = CATEGORIES[i];
    var isSel = c.name === currentCat;
    var count = 0;

    if (c.name === 'Tous') {
      count = PRODUCTS.length;
    } else {
      for (var j = 0; j < PRODUCTS.length; j++) {
        if (PRODUCTS[j].category === c.name) count++;
      }
    }

    html +=
      '<div class="cat-card' + (isSel ? ' sel' : '') + '" onclick="setCat(\'' + c.name + '\')">' +
        '<div class="cat-icon">' +
          '<i class="' + c.icon + '" style="color:' + (isSel ? '#fff' : 'var(--pr)') + '"></i>' +
        '</div>' +
        '<h3>' + c.name + '</h3>' +
        '<p>' + count + ' produit' + (count > 1 ? 's' : '') + '</p>' +
      '</div>';
  }
  el.innerHTML = html;
}

function setCat(cat) {
  currentCat = cat;
  renderCats();
  applyFilterAndSort();
  var sec = document.getElementById('products');
  if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// --------------------------------------------------------
// FILTRE + TRI (fonction centrale)
// --------------------------------------------------------
function applyFilterAndSort() {
  var searchEl = document.getElementById('searchInput');
  var srch = searchEl ? searchEl.value.toLowerCase().trim() : '';

  // --- Filtrage ---
  filteredProds = [];
  for (var i = 0; i < PRODUCTS.length; i++) {
    var p = PRODUCTS[i];
    var okCat  = (currentCat === 'Tous') || (p.category === currentCat);
    var okSrch = !srch ||
      p.name.toLowerCase().indexOf(srch) !== -1 ||
      p.category.toLowerCase().indexOf(srch) !== -1;
    if (okCat && okSrch) filteredProds.push(p);
  }

  // --- Tri ---
  var sortEl = document.getElementById('sortSelect');
  if (sortEl) {
    var sort = sortEl.value;
    if (sort === 'price-asc') {
      filteredProds.sort(function (a, b) { return a.price - b.price; });
    } else if (sort === 'price-desc') {
      filteredProds.sort(function (a, b) { return b.price - a.price; });
    } else if (sort === 'rating') {
      filteredProds.sort(function (a, b) { return b.rating - a.rating; });
    } else if (sort === 'discount') {
      filteredProds.sort(function (a, b) { return b.discount - a.discount; });
    }
  }

  renderProds();
}

// Alias utilisés dans le HTML via onchange / oninput
function sortProducts() { applyFilterAndSort(); }
function liveSearch()   { applyFilterAndSort(); }

// --------------------------------------------------------
// AFFICHAGE DES PRODUITS
// --------------------------------------------------------
function renderProds() {
  var grid = document.getElementById('prodsGrid');
  if (!grid) return;

  // Compteur
  var countEl = document.getElementById('prodsCount');
  if (countEl) {
    countEl.textContent = filteredProds.length + ' produit' + (filteredProds.length > 1 ? 's' : '');
  }

  // Titre
  var titleEl = document.getElementById('prodsTitle');
  if (titleEl) {
    var searchEl = document.getElementById('searchInput');
    var srch = searchEl ? searchEl.value.trim() : '';
    if (currentCat !== 'Tous') {
      titleEl.textContent = currentCat;
    } else if (srch) {
      titleEl.textContent = 'Résultats pour "' + srch + '"';
    } else {
      titleEl.textContent = 'Tous nos produits';
    }
  }

  // Aucun produit
  if (filteredProds.length === 0) {
    grid.innerHTML =
      '<div style="grid-column:1/-1;text-align:center;padding:60px 20px">' +
        '<i class="fas fa-box-open" style="font-size:52px;color:#ddd;display:block;margin-bottom:16px"></i>' +
        '<h3 style="font-size:20px;font-weight:700;color:#0f0f12;margin-bottom:8px">Aucun produit trouvé</h3>' +
        '<p style="color:#7a7a8c">Essayez une autre catégorie ou un autre mot-clé.</p>' +
      '</div>';
    return;
  }

  // Cartes produits
  var html = '';
  for (var i = 0; i < filteredProds.length; i++) {
    var p = filteredProds[i];

    var inCart = false;
    for (var ci = 0; ci < cart.length; ci++) {
      if (cart[ci].id === p.id) { inCart = true; break; }
    }

    var inWish = wishlist.indexOf(p.id) !== -1;

    // Badge
    var badgeHTML = '';
    if      (p.badge === 'sale') badgeHTML = '<span class="prod-badge badge-sale">-' + p.discount + '%</span>';
    else if (p.badge === 'new')  badgeHTML = '<span class="prod-badge badge-new">Nouveau</span>';
    else if (p.badge === 'hot')  badgeHTML = '<span class="prod-badge badge-hot">&#x1F525; Top</span>';

    var wishCls  = inWish ? 'prod-wish active' : 'prod-wish';
    var wishIco  = inWish ? 'fas fa-heart'     : 'far fa-heart';
    var cartCls  = inCart ? 'prod-add-btn in-cart' : 'prod-add-btn';
    var cartIco  = inCart ? 'fa-check'         : 'fa-cart-plus';
    var cartTxt  = inCart ? 'Ajouté'           : 'Ajouter au panier';
    var stockCls = p.stock > 5 ? 'in-stock'    : 'low-stock';
    var stockTxt = p.stock > 5 ? 'En stock'    : 'Plus que ' + p.stock + ' !';
    var oldHTML  = p.oldPrice  ? '<span class="prod-old">'      + p.oldPrice  + ' DH</span>' : '';
    var discHTML = p.discount  ? '<span class="prod-discount">-' + p.discount + '%</span>'   : '';

    html +=
      '<div class="prod-card">' +

        // Image + badge + wishlist + aperçu
        '<div class="prod-img-wrap" onclick="openQuick(' + p.id + ')">' +
          '<img src="' + p.images[0] + '" alt="' + p.name + '" loading="lazy"' +
            ' onerror="this.src=\'https://via.placeholder.com/300x200/ff8716/fff?text=KLIKO\'">' +
          badgeHTML +
          '<button class="' + wishCls + '"' +
            ' onclick="event.stopPropagation();toggleWish(' + p.id + ',this)">' +
            '<i class="' + wishIco + '"></i>' +
          '</button>' +
          '<div class="prod-quick" onclick="openQuick(' + p.id + ')">' +
            '<i class="fas fa-eye"></i> Aperçu rapide' +
          '</div>' +
        '</div>' +

        // Corps
        '<div class="prod-body">' +
          '<div class="prod-cat-tag">'  + p.category + '</div>' +
          '<div class="prod-name" onclick="openQuick(' + p.id + ')">' + p.name + '</div>' +

          '<div class="prod-stars">' +
            '<div class="stars">' + renderStars(p.rating) + '</div>' +
            '<span class="prod-reviews">(' + p.reviews + ')</span>' +
          '</div>' +

          '<div class="prod-stock">' +
            '<i class="fas fa-circle ' + stockCls + '" style="font-size:8px"></i>' +
            '<span class="' + stockCls + '">' + stockTxt + '</span>' +
          '</div>' +

          '<div class="prod-price-row">' +
            '<span class="prod-price">' + p.price + ' DH</span>' +
            oldHTML + discHTML +
          '</div>' +

          '<button class="' + cartCls + '" onclick="addToCart(' + p.id + ')">' +
            '<i class="fas ' + cartIco + '"></i> ' + cartTxt +
          '</button>' +
        '</div>' +

      '</div>';
  }

  grid.innerHTML = html;
}

// --------------------------------------------------------
// ÉTOILES
// --------------------------------------------------------
function renderStars(rating) {
  var html = '';
  for (var i = 1; i <= 5; i++) {
    if (rating >= i) {
      html += '<i class="fas fa-star"></i>';
    } else if (rating >= i - 0.5) {
      html += '<i class="fas fa-star-half-stroke"></i>';
    } else {
      html += '<i class="far fa-star"></i>';
    }
  }
  return html;
}

// --------------------------------------------------------
// PANIER — GESTION
// --------------------------------------------------------
function addToCart(id, qty) {
  qty = (qty && parseInt(qty, 10) > 0) ? parseInt(qty, 10) : 1;

  var p = null;
  for (var i = 0; i < PRODUCTS.length; i++) {
    if (PRODUCTS[i].id === id) { p = PRODUCTS[i]; break; }
  }
  if (!p) return;

  var found = false;
  for (var j = 0; j < cart.length; j++) {
    if (cart[j].id === id) {
      cart[j].qty += qty;
      found = true;
      break;
    }
  }
  if (!found) {
    cart.push({ id: p.id, qty: qty, name: p.name, price: p.price, img: p.images[0] });
  }

  saveCart();
  renderProds();
  showToast('✓ ' + p.name.substring(0, 40) + ' ajouté au panier');
}

function removeFromCart(id) {
  var newCart = [];
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id !== id) newCart.push(cart[i]);
  }
  cart = newCart;
  saveCart();
  renderCartPanel();
}

function changeQty(id, delta) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].qty = Math.max(1, cart[i].qty + delta);
      break;
    }
  }
  saveCart();
  renderCartPanel();
}

function saveCart() {
  localStorage.setItem('kliko_cart', JSON.stringify(cart));
  updateBadges();
}

// --------------------------------------------------------
// PANIER — PANNEAU LATÉRAL
// --------------------------------------------------------
function renderCartPanel() {
  var el     = document.getElementById('cartItems');
  var footer = document.getElementById('cartFooter');
  if (!el || !footer) return;

  // Panier vide
  if (cart.length === 0) {
    el.innerHTML =
      '<div class="cart-empty">' +
        '<i class="fas fa-cart-shopping"></i>' +
        '<h4>Votre panier est vide</h4>' +
        '<p>Ajoutez des produits pour commencer</p>' +
      '</div>';
    footer.style.display = 'none';
    return;
  }

  // Liste des articles
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].qty;
  }

  var html = '';
  for (var j = 0; j < cart.length; j++) {
    var c = cart[j];
    html +=
      '<div class="cart-item">' +
        '<img class="cart-item-img" src="' + c.img + '" alt="' + c.name + '"' +
          ' onerror="this.src=\'https://via.placeholder.com/68x68/ff8716/fff?text=K\'">' +
        '<div class="cart-item-info">' +
          '<div class="cart-item-name">'  + c.name + '</div>' +
          '<div class="cart-item-price">' + (c.price * c.qty) + ' DH</div>' +
          '<div class="cart-item-controls">' +
            '<div class="ci-qty">' +
              '<button class="ci-q-btn" onclick="changeQty(' + c.id + ',-1)">&#8722;</button>' +
              '<span class="ci-q-val">' + c.qty + '</span>' +
              '<button class="ci-q-btn" onclick="changeQty(' + c.id + ',1)">&#43;</button>' +
            '</div>' +
            '<button class="ci-del" onclick="removeFromCart(' + c.id + ')">' +
              '<i class="fas fa-trash"></i>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  }
  el.innerHTML = html;

  var totEl  = document.getElementById('cartTotal');
  var shipEl = document.getElementById('cartShipping');
  if (totEl)  totEl.textContent  = total + ' DH';
  if (shipEl) shipEl.textContent = total >= 300 ? 'GRATUITE' : '30 DH';

  footer.style.display = 'block';
}

function openCart() {
  renderCartPanel();
  var ov = document.getElementById('cartOv');
  if (ov) { ov.classList.add('open'); document.body.style.overflow = 'hidden'; }
}

function closeCart() {
  var ov = document.getElementById('cartOv');
  if (ov) { ov.classList.remove('open'); document.body.style.overflow = ''; }
}

function checkout() {
  if (cart.length === 0) {
    showToast('Votre panier est vide !');
    return;
  }

  var total = 0;
  for (var i = 0; i < cart.length; i++) total += cart[i].price * cart[i].qty;

  var msg = 'Bonjour KLIKOO Store, je voudrais commander :\n\n';
  for (var j = 0; j < cart.length; j++) {
    var c = cart[j];
    msg += '- ' + c.name + ' x' + c.qty + ' = ' + (c.price * c.qty) + ' DH\n';
  }
  msg += '\nTotal : ' + total + ' DH';
  msg += '\nLivraison : ' + (total >= 300 ? 'GRATUITE' : '30 DH');

  window.open('https://wa.me/212774011555?text=' + encodeURIComponent(msg), '_blank');
}

// --------------------------------------------------------
// WISHLIST
// --------------------------------------------------------
function toggleWish(id, btn) {
  var idx = wishlist.indexOf(id);
  if (idx === -1) {
    wishlist.push(id);
    if (btn) {
      btn.classList.add('active');
      var ico = btn.querySelector('i');
      if (ico) ico.className = 'fas fa-heart';
    }
    showToast('Ajouté à votre liste de souhaits');
  } else {
    wishlist.splice(idx, 1);
    if (btn) {
      btn.classList.remove('active');
      var ico2 = btn.querySelector('i');
      if (ico2) ico2.className = 'far fa-heart';
    }
    showToast('Retiré de votre liste');
  }
  localStorage.setItem('klikoo_wish', JSON.stringify(wishlist));
  updateBadges();
}

function toggleWishFromModal(id, btn) {
  var idx = wishlist.indexOf(id);
  if (idx === -1) {
    wishlist.push(id);
    if (btn) btn.innerHTML = '<i class="fas fa-heart"></i> Dans ma liste';
    showToast('Ajouté à votre liste de souhaits');
  } else {
    wishlist.splice(idx, 1);
    if (btn) btn.innerHTML = '<i class="far fa-heart"></i> Ajouter à ma liste';
    showToast('Retiré de votre liste');
  }
  localStorage.setItem('kliko_wish', JSON.stringify(wishlist));
  updateBadges();
  renderProds();
}

// --------------------------------------------------------
// BADGES HEADER (panier + wishlist)
// --------------------------------------------------------
function updateBadges() {
  var cartCount = 0;
  for (var i = 0; i < cart.length; i++) cartCount += cart[i].qty;
  var wishCount = wishlist.length;

  var cb = document.getElementById('cartBadge');
  var wb = document.getElementById('wishBadge');

  if (cb) {
    cb.textContent = cartCount;
    if (cartCount > 0) cb.classList.add('show'); else cb.classList.remove('show');
  }
  if (wb) {
    wb.textContent = wishCount;
    if (wishCount > 0) wb.classList.add('show'); else wb.classList.remove('show');
  }
}

// --------------------------------------------------------
// QUICK VIEW MODAL
// --------------------------------------------------------
function openQuick(id) {
  var p = null;
  for (var i = 0; i < PRODUCTS.length; i++) {
    if (PRODUCTS[i].id === id) { p = PRODUCTS[i]; break; }
  }
  if (!p) return;

  var innerEl = document.getElementById('modalInner');
  if (!innerEl) return;

  var inWish  = wishlist.indexOf(p.id) !== -1;
  var savings = p.oldPrice ? (p.oldPrice - p.price) : 0;
  var stars   = renderStars(p.rating);

  // Miniatures (si plusieurs images)
  var thumbsHTML = '';
  if (p.images.length > 1) {
    thumbsHTML = '<div class="modal-thumbs">';
    for (var t = 0; t < p.images.length; t++) {
      thumbsHTML +=
        '<img class="modal-thumb' + (t === 0 ? ' active' : '') + '"' +
          ' src="' + p.images[t] + '" alt=""' +
          ' onclick="switchImg(this,\'' + p.images[t] + '\')"' +
          ' onerror="this.style.display=\'none\'">';
    }
    thumbsHTML += '</div>';
  }

  // Description
  var descHTML = '';
  if (Array.isArray(p.description) && p.description.length) {
    descHTML = '<ul class="modal-desc">';
    for (var d = 0; d < p.description.length; d++) {
      descHTML += '<li>' + p.description[d] + '</li>';
    }
    descHTML += '</ul>';
  } else if (p.description) {
    descHTML = '<p class="modal-desc">' + p.description + '</p>';
  }

  var oldPriceHTML = p.oldPrice ? '<span class="modal-old">' + p.oldPrice + ' DH</span>' : '';
  var savingsHTML  = savings    ? '<span class="modal-savings">Économisez ' + savings + ' DH</span>' : '';
  var stockColor   = p.stock > 5 ? 'var(--green)' : '#f59e0b';
  var stockLabel   = p.stock > 5 ? 'En stock'     : p.stock + ' restants';
  var wishLabel    = inWish ? 'Dans ma liste'    : 'Ajouter à ma liste';
  var wishIcoClass = inWish ? 'fas fa-heart'     : 'far fa-heart';

  innerEl.innerHTML =
    // Colonne images
    '<div class="modal-imgs">' +
      '<img class="modal-main-img" id="modalMainImg"' +
        ' src="' + p.images[0] + '" alt="' + p.name + '"' +
        ' onerror="this.src=\'https://via.placeholder.com/400x400/ff8716/fff?text=KLIKO\'">' +
      thumbsHTML +
    '</div>' +

    // Colonne infos
    '<div class="modal-info">' +
      '<div class="modal-cat">' + p.category + '</div>' +
      '<h2 class="modal-name">' + p.name + '</h2>' +

      '<div class="modal-stars">' +
        '<div class="stars">' + stars + '</div>' +
        '<span style="font-size:13px;color:var(--gr);margin-left:6px">' +
          p.rating + '/5 (' + p.reviews + ' avis)' +
        '</span>' +
      '</div>' +

      '<div class="modal-price-row">' +
        '<span class="modal-price">' + p.price + ' DH</span>' +
        oldPriceHTML +
        savingsHTML +
      '</div>' +

      descHTML +

      '<div class="modal-qty-row">' +
        '<span class="modal-qty-label">Quantité :</span>' +
        '<div class="qty-control">' +
          '<button class="qty-btn" onclick="changeModalQty(-1)">&#8722;</button>' +
          '<input class="qty-val" id="modalQty" type="number" value="1" min="1" max="' + p.stock + '">' +
          '<button class="qty-btn" onclick="changeModalQty(1)">&#43;</button>' +
        '</div>' +
        '<span style="font-size:12px;font-weight:700;color:' + stockColor + '">' + stockLabel + '</span>' +
      '</div>' +

      '<button class="modal-cart-btn" onclick="addFromModal(' + p.id + ')">' +
        '<i class="fas fa-cart-plus"></i> Ajouter au panier' +
      '</button>' +

      '<button class="modal-wish-btn" onclick="toggleWishFromModal(' + p.id + ',this)">' +
        '<i class="' + wishIcoClass + '"></i> ' + wishLabel +
      '</button>' +
    '</div>';

  var modal = document.getElementById('quickModal');
  if (modal) { modal.classList.add('open'); document.body.style.overflow = 'hidden'; }
}

// Ajouter depuis le modal (lit la quantité choisie)
function addFromModal(id) {
  var qtyEl = document.getElementById('modalQty');
  var qty   = qtyEl ? parseInt(qtyEl.value, 10) : 1;
  if (isNaN(qty) || qty < 1) qty = 1;
  addToCart(id, qty);
  closeModal();
}

function closeModal() {
  var modal = document.getElementById('quickModal');
  if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
}

function switchImg(el, src) {
  var main = document.getElementById('modalMainImg');
  if (main) main.src = src;
  var thumbs = document.querySelectorAll('.modal-thumb');
  for (var i = 0; i < thumbs.length; i++) thumbs[i].classList.remove('active');
  el.classList.add('active');
}

function changeModalQty(delta) {
  var input = document.getElementById('modalQty');
  if (!input) return;
  var val = parseInt(input.value, 10);
  if (isNaN(val)) val = 1;
  input.value = Math.max(1, val + delta);
}

// --------------------------------------------------------
// TOAST NOTIFICATION
// --------------------------------------------------------
function showToast(msg) {
  var t    = document.getElementById('toast');
  var span = document.getElementById('toastMsg');
  if (!t || !span) return;
  span.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { t.classList.remove('show'); }, 3000);
}

// --------------------------------------------------------
// MENU MOBILE
// --------------------------------------------------------
function toggleMob() {
  var mob = document.getElementById('mobMenu');
  if (mob) mob.classList.toggle('open');
}

// --------------------------------------------------------
// COMPTE À REBOURS
// --------------------------------------------------------
function startTimer() {
  var end = new Date().getTime() + 24 * 60 * 60 * 1000;

  function tick() {
    var diff = end - new Date().getTime();
    if (diff < 0) diff = 0;

    var h = Math.floor(diff / 3600000);
    var m = Math.floor((diff % 3600000) / 60000);
    var s = Math.floor((diff % 60000) / 1000);

    var th = document.getElementById('t-h');
    var tm = document.getElementById('t-m');
    var ts = document.getElementById('t-s');

    if (th) th.textContent = (h < 10 ? '0' : '') + h;
    if (tm) tm.textContent = (m < 10 ? '0' : '') + m;
    if (ts) ts.textContent = (s < 10 ? '0' : '') + s;
  }

  tick();
  setInterval(tick, 1000);
}

// --------------------------------------------------------
// CLAVIER — touche Échap
// --------------------------------------------------------
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal();
    closeCart();
    closeQRModal();
  }
});

// ========================================================
// QR CODE GENERATOR — VERSION CORRIGÉE
// ========================================================

/**
 * Ouvre le modal QR Code du site
 */
function generateQRCode() {
  // Éviter les doublons
  var existing = document.getElementById('qrModal');
  if (existing) existing.remove();

  var siteURL = window.location.href;

  var modal = document.createElement('div');
  modal.id = 'qrModal';
  modal.style.cssText = [
    'position:fixed',
    'top:0',
    'left:0',
    'width:100%',
    'height:100%',
    'background:rgba(0,0,0,0.8)',
    'z-index:10000',
    'display:flex',
    'align-items:center',
    'justify-content:center',
    'animation:fadeIn 0.3s ease',
    'padding:1rem'
  ].join(';');

  modal.innerHTML =
    '<style>' +
      '@keyframes fadeIn{from{opacity:0}to{opacity:1}}' +
      '@keyframes scaleIn{from{transform:scale(0.85);opacity:0}to{transform:scale(1);opacity:1}}' +
    '</style>' +
    '<div style="' +
      'background:#fff;' +
      'border-radius:1.25rem;' +
      'padding:2.5rem 2rem;' +
      'max-width:420px;' +
      'width:100%;' +
      'text-align:center;' +
      'animation:scaleIn 0.35s cubic-bezier(.4,0,.2,1);' +
      'box-shadow:0 24px 80px rgba(0,0,0,0.35);' +
      'position:relative' +
    '">' +

      // Bouton fermer
      '<button onclick="closeQRModal()" style="' +
        'position:absolute;top:14px;right:14px;' +
        'width:34px;height:34px;border-radius:50%;' +
        'background:#f0f0f0;border:none;cursor:pointer;' +
        'font-size:18px;display:flex;align-items:center;justify-content:center;' +
        'transition:background .2s' +
      '" onmouseover="this.style.background=\'#ff8716\';this.style.color=\'#fff\'"' +
         ' onmouseout="this.style.background=\'#f0f0f0\';this.style.color=\'#333\'">' +
        '&#x2715;' +
      '</button>' +

      // Icône
      '<div style="margin-bottom:1rem">' +
        '<div style="' +
          'width:64px;height:64px;border-radius:16px;' +
          'background:linear-gradient(135deg,#ff8716,#e06500);' +
          'display:flex;align-items:center;justify-content:center;' +
          'margin:0 auto;font-size:30px' +
        '">&#128247;</div>' +
      '</div>' +

      // Titre
      '<h3 style="' +
        'font-family:\'Syne\',sans-serif;' +
        'font-size:1.5rem;' +
        'color:#0f0f12;' +
        'margin-bottom:0.5rem;' +
        'font-weight:800' +
      '">Code QR KLIKO</h3>' +

      '<p style="color:#7a7a8c;margin-bottom:1.5rem;font-size:0.9rem">' +
        'Scannez pour accéder au site depuis votre mobile' +
      '</p>' +

      // Image QR Code
      '<div style="' +
        'background:#f9f9fc;' +
        'padding:1.25rem;' +
        'border-radius:0.875rem;' +
        'margin-bottom:1.25rem;' +
        'border:1.5px solid #e8e8f0;' +
        'display:flex;justify-content:center' +
      '">' +
        '<img ' +
          'src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&color=0f0f12&bgcolor=f9f9fc&data=' + encodeURIComponent(siteURL) + '" ' +
          'alt="QR Code KLIKO Store" ' +
          'style="width:220px;height:220px;border-radius:0.5rem;display:block" ' +
          'onerror="this.parentElement.innerHTML=\'<p style=\\\'color:red;font-size:13px\\\'>Erreur de chargement du QR Code</p>\'"' +
        '>' +
      '</div>' +

      // URL affichée
      '<div style="' +
        'margin-bottom:1.5rem;' +
        'padding:0.75rem 1rem;' +
        'background:#fff4ea;' +
        'border-radius:0.5rem;' +
        'border:1px solid rgba(255,135,22,.25)' +
      '">' +
        '<p style="color:#e06500;font-size:0.75rem;word-break:break-all;margin:0;font-weight:600">' +
          siteURL +
        '</p>' +
      '</div>' +

      // Boutons
      '<div style="display:flex;gap:0.625rem">' +
        '<button onclick="downloadQRCode()" style="' +
          'flex:1;padding:0.875rem 1rem;' +
          'background:linear-gradient(135deg,#ff8716,#e06500);' +
          'color:#fff;border:none;border-radius:0.625rem;' +
          'font-weight:700;cursor:pointer;font-size:0.9rem;' +
          'display:flex;align-items:center;justify-content:center;gap:0.5rem;' +
          'transition:transform .2s,box-shadow .2s' +
        '" onmouseover="this.style.transform=\'translateY(-2px)\';this.style.boxShadow=\'0 8px 20px rgba(255,135,22,.4)\'"' +
           ' onmouseout="this.style.transform=\'\';this.style.boxShadow=\'\'">' +
          '&#11015; Télécharger' +
        '</button>' +

        '<button onclick="closeQRModal()" style="' +
          'flex:1;padding:0.875rem 1rem;' +
          'background:#f0f0f0;color:#333;' +
          'border:none;border-radius:0.625rem;' +
          'font-weight:700;cursor:pointer;font-size:0.9rem;' +
          'transition:background .2s' +
        '" onmouseover="this.style.background=\'#e0e0e0\'"' +
           ' onmouseout="this.style.background=\'#f0f0f0\'">' +
          'Fermer' +
        '</button>' +
      '</div>' +
    '</div>';

  document.body.appendChild(modal);

  // Fermer en cliquant sur l'overlay
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeQRModal();
  });
}

/**
 * Télécharge le QR Code en PNG haute résolution
 */
function downloadQRCode() {
  var siteURL = window.location.href;
  var qrURL   = 'https://api.qrserver.com/v1/create-qr-code/?size=600x600&color=0f0f12&bgcolor=FFFFFF&data=' + encodeURIComponent(siteURL);

  // Créer un lien temporaire pour le téléchargement
  var link       = document.createElement('a');
  link.href      = qrURL;
  link.download  = 'kliko-store-qr-code.png';
  link.target    = '_blank'; // fallback si le navigateur bloque le download cross-origin
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('✅ QR Code téléchargé avec succès !');
}

/**
 * Ferme le modal QR Code
 */
function closeQRModal() {
  var modal = document.getElementById('qrModal');
  if (modal) {
    modal.style.animation = 'fadeIn 0.2s ease reverse';
    setTimeout(function () {
      if (modal.parentNode) modal.parentNode.removeChild(modal);
    }, 180);
  }
}