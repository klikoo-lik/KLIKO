// ═══════════════════════════════════════════════════════════════
// KLIKOO STORE - MAIN JAVASCRIPT - VERSION CORRIGÉE
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// CATÉGORIES (20 catégories complètes)
// ═══════════════════════════════════════════════════════════════
const CATEGORIES = [
  { name: 'Tous', icon: 'fas fa-th-large' },
  { name: 'Électronique', icon: 'fas fa-microchip' },
  { name: 'Hommes', icon: 'fas fa-person' },
  { name: 'Femmes', icon: 'fas fa-person-dress' },
  { name: 'Enfants', icon: 'fas fa-children' },
  { name: 'Sport', icon: 'fas fa-dumbbell' },
  { name: 'Beauté', icon: 'fas fa-spa' },
  { name: 'Santé', icon: 'fas fa-heart-pulse' },
  { name: 'Bijoux', icon: 'fas fa-gem' },
  { name: 'Sacs', icon: 'fas fa-bag-shopping' },
  { name: 'Jouets', icon: 'fas fa-gamepad' },
  { name: 'Bureau', icon: 'fas fa-briefcase' },
  { name: 'Ménage', icon: 'fas fa-broom' },
  { name: 'Électroménager', icon: 'fas fa-blender' },
  { name: 'Automobiles', icon: 'fas fa-car' },
  { name: 'Artisanat', icon: 'fas fa-hammer' },
  { name: 'Industrie', icon: 'fas fa-industry' },
  { name: 'Musique', icon: 'fas fa-music' },
  { name: 'Nourriture', icon: 'fas fa-utensils' },
  { name: 'Livres', icon: 'fas fa-book' }
];

// ═══════════════════════════════════════════════════════════════
// PRODUITS (Distribution sur toutes les catégories)
// ═══════════════════════════════════════════════════════════════
const PRODUCTS = [
  // ÉLECTRONIQUE
  {
    id: 1,
    name: 'Balance Intelligente Connectée',
    description: 'Balance de précision avec connexion Bluetooth et application mobile. Suivi du poids, IMC, masse grasse et musculaire.',
    price: 299,
    oldPrice: 499,
    stock: 15,
    images: ['https://images.unsplash.com/photo-1576678927484-cc907957c65d?w=500'],
    category: 'Électronique',
    rating: 4.7,
    reviews: 89,
    badge: 'sale',
    discount: 40
  },
  {
    id: 2,
    name: 'Serrure Connectée RFID',
    description: 'Serrure intelligente avec carte RFID et application smartphone. Installation facile, sécurité maximale.',
    price: 899,
    oldPrice: 1299,
    stock: 8,
    images: ['https://images.unsplash.com/photo-1558002038-1055907df827?w=500'],
    category: 'Électronique',
    rating: 4.6,
    reviews: 67,
    badge: 'hot',
    discount: 31
  },
  {
    id: 3,
    name: 'Clavier Sans Fil Bluetooth',
    description: 'Clavier ergonomique sans fil, compatible PC, Mac, tablettes. Autonomie 6 mois.',
    price: 189,
    oldPrice: 299,
    stock: 45,
    images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500'],
    category: 'Électronique',
    rating: 4.5,
    reviews: 167,
    badge: 'new',
    discount: 37
  },
  {
    id: 4,
    name: 'Souris Gamer RGB',
    description: 'Souris gaming haute précision, 7 boutons programmables, LED RGB personnalisable.',
    price: 219,
    oldPrice: 349,
    stock: 31,
    images: ['https://images.unsplash.com/photo-1527814050087-3793815479db?w=500'],
    category: 'Électronique',
    rating: 4.8,
    reviews: 234,
    badge: 'hot',
    discount: 37
  },
  
  // HOMMES
  {
    id: 5,
    name: 'Montre Homme Élégante',
    description: 'Montre classique pour homme, bracelet en cuir véritable, mouvement quartz de qualité.',
    price: 450,
    oldPrice: 750,
    stock: 22,
    images: ['https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500'],
    category: 'Hommes',
    rating: 4.6,
    reviews: 98,
    badge: 'sale',
    discount: 40
  },
  {
    id: 6,
    name: 'Portefeuille Cuir Homme',
    description: 'Portefeuille en cuir véritable, multiple compartiments, design élégant et durable.',
    price: 199,
    oldPrice: 299,
    stock: 35,
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=500'],
    category: 'Hommes',
    rating: 4.7,
    reviews: 145,
    badge: 'new',
    discount: 33
  },
  
  // FEMMES
  {
    id: 7,
    name: 'Sac à Main Femme Luxe',
    description: 'Sac à main élégant en similicuir de qualité, plusieurs compartiments, idéal pour toutes occasions.',
    price: 349,
    oldPrice: 599,
    stock: 18,
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500'],
    category: 'Femmes',
    rating: 4.8,
    reviews: 203,
    badge: 'hot',
    discount: 42
  },
  {
    id: 8,
    name: 'Écharpe Femme Premium',
    description: 'Écharpe douce et chaude, tissu de qualité supérieure, design moderne et coloré.',
    price: 129,
    oldPrice: 199,
    stock: 45,
    images: ['https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500'],
    category: 'Femmes',
    rating: 4.5,
    reviews: 87,
    badge: 'sale',
    discount: 35
  },
  
  // ENFANTS
  {
    id: 9,
    name: 'Cartable Scolaire Enfant',
    description: 'Cartable ergonomique pour enfants, bretelles rembourrées, plusieurs poches, design amusant.',
    price: 249,
    oldPrice: 399,
    stock: 28,
    images: ['https://images.unsplash.com/photo-1577741314755-048d8525d31e?w=500'],
    category: 'Enfants',
    rating: 4.7,
    reviews: 165,
    badge: 'new',
    discount: 38
  },
  {
    id: 10,
    name: 'Puzzle Éducatif 100 Pièces',
    description: 'Puzzle coloré pour développer la logique et la concentration des enfants, thème animaux.',
    price: 79,
    oldPrice: 129,
    stock: 56,
    images: ['https://images.unsplash.com/photo-1587760762563-e9cf9b5e04d7?w=500'],
    category: 'Enfants',
    rating: 4.6,
    reviews: 112,
    badge: 'hot',
    discount: 39
  },
  
  // SPORT
  {
    id: 11,
    name: 'Tapis de Yoga Antidérapant',
    description: 'Tapis de yoga épais et confortable, surface antidérapante, facile à nettoyer et transporter.',
    price: 169,
    oldPrice: 259,
    stock: 34,
    images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500'],
    category: 'Sport',
    rating: 4.8,
    reviews: 189,
    badge: 'sale',
    discount: 35
  },
  {
    id: 12,
    name: 'Haltères Réglables 20kg',
    description: 'Set d\'haltères réglables, poids ajustables de 5 à 20kg, idéal pour musculation à domicile.',
    price: 499,
    oldPrice: 799,
    stock: 12,
    images: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500'],
    category: 'Sport',
    rating: 4.7,
    reviews: 134,
    badge: 'hot',
    discount: 38
  },
  
  // BEAUTÉ
  {
    id: 13,
    name: 'Kit Maquillage Professionnel',
    description: 'Coffret maquillage complet avec palettes d\'ombres, rouges à lèvres, pinceaux de qualité.',
    price: 299,
    oldPrice: 499,
    stock: 25,
    images: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500'],
    category: 'Beauté',
    rating: 4.9,
    reviews: 278,
    badge: 'hot',
    discount: 40
  },
  {
    id: 14,
    name: 'Crème Visage Anti-Âge',
    description: 'Crème hydratante anti-rides, formule enrichie en vitamines, peau visiblement plus jeune.',
    price: 189,
    oldPrice: 299,
    stock: 42,
    images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500'],
    category: 'Beauté',
    rating: 4.6,
    reviews: 156,
    badge: 'sale',
    discount: 37
  },
  
  // SANTÉ
  {
    id: 15,
    name: 'Thermomètre Infrarouge Sans Contact',
    description: 'Thermomètre médical professionnel, mesure instantanée en 1 seconde. Idéal pour toute la famille.',
    price: 149,
    oldPrice: 249,
    stock: 42,
    images: ['https://images.unsplash.com/photo-1584515933487-779824d29309?w=500'],
    category: 'Santé',
    rating: 4.8,
    reviews: 156,
    badge: 'hot',
    discount: 40
  },
  {
    id: 16,
    name: 'Pèse-Personne Digital LCD',
    description: 'Balance électronique haute précision avec grand écran LCD rétroéclairé. Capacité jusqu\'à 180kg.',
    price: 199,
    oldPrice: 299,
    stock: 23,
    images: ['https://images.unsplash.com/photo-1605734458739-d81a4d93e986?w=500'],
    category: 'Santé',
    rating: 4.5,
    reviews: 203,
    badge: 'new',
    discount: 33
  },
  
  // BIJOUX
  {
    id: 17,
    name: 'Collier Or 18 Carats',
    description: 'Collier élégant en or jaune 18 carats, pendentif cœur, chaîne fine et délicate.',
    price: 1299,
    oldPrice: 1899,
    stock: 5,
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500'],
    category: 'Bijoux',
    rating: 4.9,
    reviews: 67,
    badge: 'hot',
    discount: 32
  },
  {
    id: 18,
    name: 'Balance Bijoux Haute Précision',
    description: 'Balance de précision 0.01g pour bijoux, or, poudres. Écran LCD, calibration automatique.',
    price: 159,
    oldPrice: 249,
    stock: 19,
    images: ['https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=500'],
    category: 'Bijoux',
    rating: 4.7,
    reviews: 142,
    badge: 'sale',
    discount: 36
  },
  
  // SACS
  {
    id: 19,
    name: 'Sac à Dos Ordinateur',
    description: 'Sac à dos imperméable avec compartiment laptop 15.6", port USB, design moderne et pratique.',
    price: 279,
    oldPrice: 449,
    stock: 31,
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'],
    category: 'Sacs',
    rating: 4.7,
    reviews: 198,
    badge: 'sale',
    discount: 38
  },
  {
    id: 20,
    name: 'Sac de Voyage Grande Capacité',
    description: 'Sac de voyage spacieux et résistant, plusieurs poches, bandoulière ajustable, idéal voyages.',
    price: 399,
    oldPrice: 649,
    stock: 15,
    images: ['https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500'],
    category: 'Sacs',
    rating: 4.8,
    reviews: 156,
    badge: 'hot',
    discount: 39
  },
  
  // JOUETS
  {
    id: 21,
    name: 'Drone Caméra HD',
    description: 'Mini drone avec caméra HD 1080p, contrôle par smartphone, vol stable, idéal débutants.',
    price: 599,
    oldPrice: 999,
    stock: 18,
    images: ['https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500'],
    category: 'Jouets',
    rating: 4.6,
    reviews: 143,
    badge: 'hot',
    discount: 40
  },
  {
    id: 22,
    name: 'Robot Éducatif Programmable',
    description: 'Robot interactif pour enfants, apprentissage programmation, commande vocale, très ludique.',
    price: 449,
    oldPrice: 699,
    stock: 22,
    images: ['https://images.unsplash.com/photo-1561144257-e32e6f6d8e4c?w=500'],
    category: 'Jouets',
    rating: 4.8,
    reviews: 187,
    badge: 'new',
    discount: 36
  },
  
  // BUREAU
  {
    id: 23,
    name: 'Tablette d\'Écriture LCD 10 pouces',
    description: 'Tablette d\'écriture électronique LCD pour enfants et adultes. Écologique, réutilisable à l\'infini.',
    price: 89,
    oldPrice: 149,
    stock: 67,
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500'],
    category: 'Bureau',
    rating: 4.4,
    reviews: 89,
    badge: 'new',
    discount: 40
  },
  {
    id: 24,
    name: 'Balance Postale Numérique',
    description: 'Balance de précision pour colis et courrier. Écran LED, pesée jusqu\'à 50kg, fonction hold.',
    price: 249,
    oldPrice: 379,
    stock: 12,
    images: ['https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500'],
    category: 'Bureau',
    rating: 4.6,
    reviews: 54,
    badge: 'sale',
    discount: 34
  },
  
  // MÉNAGE
  {
    id: 25,
    name: 'Balance de Cuisine Digitale',
    description: 'Balance de cuisine professionnelle précise au gramme près. Écran tactile, fonction tare, 5kg max.',
    price: 129,
    oldPrice: 199,
    stock: 34,
    images: ['https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=500'],
    category: 'Ménage',
    rating: 4.9,
    reviews: 412,
    badge: 'hot',
    discount: 35
  },
  {
    id: 26,
    name: 'Aspirateur Robot Intelligent',
    description: 'Robot aspirateur autonome, navigation intelligente, programmable, idéal tous types sols.',
    price: 1499,
    oldPrice: 2299,
    stock: 8,
    images: ['https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500'],
    category: 'Ménage',
    rating: 4.7,
    reviews: 234,
    badge: 'hot',
    discount: 35
  },
  
  // ÉLECTROMÉNAGER
  {
    id: 27,
    name: 'Blender Multifonction 1000W',
    description: 'Blender puissant avec bol en verre, plusieurs vitesses, idéal smoothies et soupes.',
    price: 499,
    oldPrice: 799,
    stock: 14,
    images: ['https://images.unsplash.com/photo-1585515320310-259814833e62?w=500'],
    category: 'Électroménager',
    rating: 4.8,
    reviews: 178,
    badge: 'sale',
    discount: 38
  },
  {
    id: 28,
    name: 'Cafetière Expresso Automatique',
    description: 'Machine à café expresso avec broyeur intégré, pression 15 bars, système mousseur lait.',
    price: 1899,
    oldPrice: 2799,
    stock: 6,
    images: ['https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500'],
    category: 'Électroménager',
    rating: 4.9,
    reviews: 145,
    badge: 'hot',
    discount: 32
  },
  
  // AUTOMOBILES
  {
    id: 29,
    name: 'Chargeur Voiture USB Rapide',
    description: 'Chargeur allume-cigare double USB, charge rapide QC 3.0, compatible tous smartphones.',
    price: 89,
    oldPrice: 149,
    stock: 78,
    images: ['https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=500'],
    category: 'Automobiles',
    rating: 4.5,
    reviews: 267,
    badge: 'new',
    discount: 40
  },
  {
    id: 30,
    name: 'Support Téléphone Voiture',
    description: 'Support magnétique universel pour smartphone, fixation ventilation ou tableau bord.',
    price: 79,
    oldPrice: 129,
    stock: 92,
    images: ['https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500'],
    category: 'Automobiles',
    rating: 4.6,
    reviews: 312,
    badge: 'hot',
    discount: 39
  },
  
  // ARTISANAT
  {
    id: 31,
    name: 'Kit Peinture Artistique',
    description: 'Coffret complet peinture acrylique, pinceaux variés, toiles, chevalet, palette pro.',
    price: 349,
    oldPrice: 599,
    stock: 16,
    images: ['https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500'],
    category: 'Artisanat',
    rating: 4.7,
    reviews: 98,
    badge: 'sale',
    discount: 42
  },
  {
    id: 32,
    name: 'Machine à Coudre Électrique',
    description: 'Machine à coudre multifonction, 12 programmes, écran LCD, idéale débutants et experts.',
    price: 899,
    oldPrice: 1399,
    stock: 9,
    images: ['https://images.unsplash.com/photo-1597199219851-e7d3d5e55f9b?w=500'],
    category: 'Artisanat',
    rating: 4.8,
    reviews: 134,
    badge: 'hot',
    discount: 36
  },
  
  // INDUSTRIE
  {
    id: 33,
    name: 'Perceuse Visseuse Sans Fil',
    description: 'Perceuse professionnelle 18V, batterie lithium longue durée, mallette accessoires complète.',
    price: 799,
    oldPrice: 1199,
    stock: 11,
    images: ['https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=500'],
    category: 'Industrie',
    rating: 4.9,
    reviews: 189,
    badge: 'hot',
    discount: 33
  },
  {
    id: 34,
    name: 'Meuleuse d\'Angle 2000W',
    description: 'Meuleuse professionnelle puissante, disque 230mm, poignée ergonomique, sécurité renforcée.',
    price: 649,
    oldPrice: 999,
    stock: 13,
    images: ['https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500'],
    category: 'Industrie',
    rating: 4.7,
    reviews: 156,
    badge: 'sale',
    discount: 35
  },
  
  // MUSIQUE
  {
    id: 35,
    name: 'Radio Coranique MP3',
    description: 'Radio numérique avec récitation du Coran complet, plusieurs récitateurs. Batterie longue durée.',
    price: 179,
    oldPrice: 259,
    stock: 28,
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500'],
    category: 'Musique',
    rating: 4.9,
    reviews: 321,
    badge: 'hot',
    discount: 31
  },
  {
    id: 36,
    name: 'Enceinte Bluetooth Portable',
    description: 'Haut-parleur sans fil puissant, son 360°, waterproof, autonomie 20h, basses profondes.',
    price: 349,
    oldPrice: 599,
    stock: 24,
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500'],
    category: 'Musique',
    rating: 4.8,
    reviews: 267,
    badge: 'sale',
    discount: 42
  },
  
  // NOURRITURE
  {
    id: 37,
    name: 'Miel Bio Pur 1kg',
    description: 'Miel naturel 100% pur, produit localement, riche en nutriments, goût authentique.',
    price: 149,
    oldPrice: 229,
    stock: 45,
    images: ['https://images.unsplash.com/photo-1587049352846-4a222e784466?w=500'],
    category: 'Nourriture',
    rating: 4.9,
    reviews: 287,
    badge: 'hot',
    discount: 35
  },
  {
    id: 38,
    name: 'Huile d\'Argan Bio 250ml',
    description: 'Huile d\'argan vierge bio, pressée à froid, cosmétique et alimentaire, origine Maroc.',
    price: 199,
    oldPrice: 299,
    stock: 38,
    images: ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500'],
    category: 'Nourriture',
    rating: 4.8,
    reviews: 234,
    badge: 'sale',
    discount: 33
  },
  
  // LIVRES
  {
    id: 39,
    name: 'Coran Luxe avec Traduction',
    description: 'Saint Coran avec traduction française, reliure cuir, dorure sur tranche, très belle qualité.',
    price: 299,
    oldPrice: 499,
    stock: 19,
    images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500'],
    category: 'Livres',
    rating: 4.9,
    reviews: 412,
    badge: 'hot',
    discount: 40
  },
  {
    id: 40,
    name: 'Livre Cuisine Marocaine',
    description: 'Recettes traditionnelles marocaines illustrées, 200 plats authentiques, reliure cartonnée.',
    price: 179,
    oldPrice: 279,
    stock: 27,
    images: ['https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500'],
    category: 'Livres',
    rating: 4.7,
    reviews: 156,
    badge: 'sale',
    discount: 36
  }
];

// ═══════════════════════════════════════════════════════════════
// VARIABLES GLOBALES
// ═══════════════════════════════════════════════════════════════
let selectedCat = 'Tous';
let filteredProds = [...PRODUCTS];
let cart = JSON.parse(localStorage.getItem('kliko_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('kliko_wishlist')) || [];

// ═══════════════════════════════════════════════════════════════
// INITIALISATION
// ═══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  renderCats();
  renderProds();
  updateBadges();
  renderHeroProds();
  startPromoTimer();
  initScrollEffect();
});

// ═══════════════════════════════════════════════════════════════
// RENDU DES CATÉGORIES
// ═══════════════════════════════════════════════════════════════
function renderCats() {
  const grid = document.getElementById('catsGrid');
  if (!grid) return;
  
  grid.innerHTML = CATEGORIES.map(cat => {
    const count = cat.name === 'Tous' 
      ? PRODUCTS.length 
      : PRODUCTS.filter(p => p.category === cat.name).length;
    
    const isSelected = cat.name === selectedCat;
    
    return `
      <div class="cat-card ${isSelected ? 'sel' : ''}" onclick="setCat('${cat.name}')">
        <div class="cat-icon"><i class="${cat.icon}"></i></div>
        <h3>${cat.name}</h3>
        <p>${count} produit${count > 1 ? 's' : ''}</p>
      </div>
    `;
  }).join('');
}

// ═══════════════════════════════════════════════════════════════
// FILTRER PAR CATÉGORIE
// ═══════════════════════════════════════════════════════════════
function setCat(catName) {
  selectedCat = catName;
  
  // Mettre à jour le titre
  const title = document.getElementById('prodsTitle');
  const subtitle = document.getElementById('prodsSubtitle');
  
  if (catName === 'Tous') {
    title.textContent = 'Tous nos produits';
    subtitle.textContent = 'Sélection de produits de qualité';
  } else {
    title.textContent = catName;
    subtitle.textContent = `Découvrez notre collection ${catName.toLowerCase()}`;
  }
  
  // Réinitialiser le tri
  document.getElementById('sortSelect').value = 'default';
  
  // Réappliquer les filtres
  applyFilterAndSort();
  
  // Re-render les catégories pour mettre à jour la sélection
  renderCats();
  
  // Scroll vers les produits
  document.getElementById('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ═══════════════════════════════════════════════════════════════
// RECHERCHE EN DIRECT
// ═══════════════════════════════════════════════════════════════
function liveSearch(query) {
  const searchTerm = query.toLowerCase().trim();
  applyFilterAndSort(searchTerm);
}

// ═══════════════════════════════════════════════════════════════
// APPLIQUER FILTRE ET TRI
// ═══════════════════════════════════════════════════════════════
function applyFilterAndSort(searchQuery = '') {
  // Filtrer par catégorie
  let prods = selectedCat === 'Tous' 
    ? [...PRODUCTS] 
    : PRODUCTS.filter(p => p.category === selectedCat);
  
  // Filtrer par recherche
  if (searchQuery) {
    prods = prods.filter(p => 
      p.name.toLowerCase().includes(searchQuery) ||
      p.description.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery)
    );
  }
  
  // Appliquer le tri
  const sortValue = document.getElementById('sortSelect')?.value || 'default';
  
  switch(sortValue) {
    case 'price-asc':
      prods.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      prods.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      prods.sort((a, b) => b.rating - a.rating);
      break;
    case 'discount':
      prods.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      break;
  }
  
  filteredProds = prods;
  renderProds();
}

// ═══════════════════════════════════════════════════════════════
// TRI DES PRODUITS
// ═══════════════════════════════════════════════════════════════
function sortProducts() {
  applyFilterAndSort();
}

// ═══════════════════════════════════════════════════════════════
// RENDU DES PRODUITS
// ═══════════════════════════════════════════════════════════════
function renderProds() {
  const grid = document.getElementById('prodsGrid');
  const count = document.getElementById('prodsCount');
  
  if (!grid) return;
  
  if (count) {
    count.textContent = `${filteredProds.length} produit${filteredProds.length > 1 ? 's' : ''} trouvé${filteredProds.length > 1 ? 's' : ''}`;
  }
  
  if (filteredProds.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--gr)">
        <i class="fas fa-box-open" style="font-size:48px;opacity:0.3;margin-bottom:16px"></i>
        <h3 style="font-size:18px;font-weight:700;color:var(--dk);margin-bottom:8px">Aucun produit trouvé</h3>
        <p>Essayez une autre catégorie ou recherche</p>
      </div>
    `;
    return;
  }
  
  grid.innerHTML = filteredProds.map(p => {
    const inCart = cart.some(c => c.id === p.id);
    const inWish = wishlist.includes(p.id);
    const stars = '★'.repeat(Math.floor(p.rating)) + '☆'.repeat(5 - Math.floor(p.rating));
    
    return `
      <div class="prod-card" data-id="${p.id}">
        <div class="prod-img-wrap" onclick="openQuick(${p.id})">
          <img src="${p.images[0]}" alt="${p.name}">
          ${p.badge ? `<span class="prod-badge badge-${p.badge}">${p.badge === 'sale' ? 'SOLDE' : p.badge === 'new' ? 'NOUVEAU' : 'POPULAIRE'}</span>` : ''}
          <button class="prod-wish ${inWish ? 'active' : ''}" onclick="event.stopPropagation(); toggleWish(${p.id})">
            <i class="fa${inWish ? 's' : 'r'} fa-heart"></i>
          </button>
          <div class="prod-quick" onclick="event.stopPropagation(); openQuick(${p.id})">
            <i class="fas fa-eye"></i> Aperçu rapide
          </div>
        </div>
        <div class="prod-body">
          <div class="prod-cat-tag">${p.category}</div>
          <h3 class="prod-name" onclick="openQuick(${p.id})">${p.name}</h3>
          <div class="prod-stars">
            <div class="stars">${'<i class="fas fa-star"></i>'.repeat(Math.floor(p.rating))}${p.rating % 1 ? '<i class="fas fa-star-half-alt"></i>' : ''}${'<i class="far fa-star"></i>'.repeat(5 - Math.ceil(p.rating))}</div>
            <span class="prod-reviews">(${p.reviews})</span>
          </div>
          <div class="prod-price-row">
            <span class="prod-price">${p.price} DH</span>
            ${p.oldPrice ? `<span class="prod-old">${p.oldPrice} DH</span>` : ''}
            ${p.discount ? `<span class="prod-discount">-${p.discount}%</span>` : ''}
          </div>
          <div class="prod-stock ${p.stock > 10 ? 'in-stock' : 'low-stock'}">
            <i class="fas fa-circle"></i>
            ${p.stock > 10 ? 'En stock' : `Plus que ${p.stock} en stock`}
          </div>
          <button class="prod-add-btn ${inCart ? 'in-cart' : ''}" onclick="${inCart ? '' : `addToCart(${p.id}, 1)`}">
            <i class="fas fa-${inCart ? 'check' : 'cart-plus'}"></i>
            ${inCart ? 'Dans le panier' : 'Ajouter au panier'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// ═══════════════════════════════════════════════════════════════
// MODAL APERÇU RAPIDE
// ═══════════════════════════════════════════════════════════════
function openQuick(id) {
  const p = PRODUCTS.find(pr => pr.id === id);
  if (!p) return;
  
  const modal = document.getElementById('quickModal');
  const inner = document.getElementById('modalInner');
  const inWish = wishlist.includes(p.id);
  
  inner.innerHTML = `
    <div class="modal-imgs">
      <img src="${p.images[0]}" alt="${p.name}" class="modal-main-img" id="modalMainImg">
      <div class="modal-thumbs">
        ${p.images.map((img, i) => `<img src="${img}" class="modal-thumb ${i === 0 ? 'active' : ''}" onclick="changeModalImg('${img}', event)">`).join('')}
      </div>
    </div>
    <div class="modal-info">
      <div class="modal-cat">${p.category}</div>
      <h2 class="modal-name">${p.name}</h2>
      <div class="modal-stars">
        <div class="stars">${'<i class="fas fa-star"></i>'.repeat(Math.floor(p.rating))}${p.rating % 1 ? '<i class="fas fa-star-half-alt"></i>' : ''}${'<i class="far fa-star"></i>'.repeat(5 - Math.ceil(p.rating))}</div>
        <span>(${p.reviews} avis)</span>
      </div>
      <div class="modal-price-row">
        <span class="modal-price">${p.price} DH</span>
        ${p.oldPrice ? `<span class="modal-old">${p.oldPrice} DH</span>` : ''}
        ${p.discount ? `<span class="modal-savings">Économisez ${p.discount}%</span>` : ''}
      </div>
      <p class="modal-desc">${p.description}</p>
      <div class="modal-qty-row">
        <span class="modal-qty-label">Quantité :</span>
        <div class="qty-control">
          <button class="qty-btn" onclick="changeQty(-1)">−</button>
          <input type="number" class="qty-val" id="modalQty" value="1" min="1" max="${p.stock}" readonly>
          <button class="qty-btn" onclick="changeQty(1)">+</button>
        </div>
      </div>
      <button class="modal-cart-btn" onclick="addToCart(${p.id}, parseInt(document.getElementById('modalQty').value)); closeModal()">
        <i class="fas fa-cart-plus"></i> Ajouter au panier
      </button>
      <button class="modal-wish-btn ${inWish ? 'active' : ''}" onclick="toggleWish(${p.id}); this.classList.toggle('active')">
        <i class="fa${inWish ? 's' : 'r'} fa-heart"></i>
        ${inWish ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      </button>
    </div>
  `;
  
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('quickModal');
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function changeModalImg(src, e) {
  document.getElementById('modalMainImg').src = src;
  document.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
  e.target.classList.add('active');
}

function changeQty(delta) {
  const input = document.getElementById('modalQty');
  const newVal = parseInt(input.value) + delta;
  const max = parseInt(input.max);
  if (newVal >= 1 && newVal <= max) {
    input.value = newVal;
  }
}

function handleModalClick(event) {
  if (event.target.id === 'quickModal') {
    closeModal();
  }
}

// ═══════════════════════════════════════════════════════════════
// GESTION PANIER
// ═══════════════════════════════════════════════════════════════
function addToCart(id, qty = 1) {
  const p = PRODUCTS.find(pr => pr.id === id);
  if (!p) return;
  
  const existing = cart.find(c => c.id === id);
  
  if (existing) {
    existing.qty = Math.min(existing.qty + qty, p.stock);
  } else {
    cart.push({ id, qty: Math.min(qty, p.stock) });
  }
  
  saveCart();
  updateBadges();
  renderProds();
  showToast(`✅ ${p.name} ajouté au panier`);
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  updateBadges();
  renderCartItems();
  renderProds();
}

function updateCartQty(id, delta) {
  const item = cart.find(c => c.id === id);
  const prod = PRODUCTS.find(p => p.id === id);
  
  if (!item || !prod) return;
  
  item.qty += delta;
  
  if (item.qty <= 0) {
    removeFromCart(id);
  } else if (item.qty > prod.stock) {
    item.qty = prod.stock;
  } else {
    saveCart();
    renderCartItems();
  }
}

function saveCart() {
  localStorage.setItem('kliko_cart', JSON.stringify(cart));
}

function openCart() {
  document.getElementById('cartOv').classList.add('open');
  renderCartItems();
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartOv').classList.remove('open');
  document.body.style.overflow = '';
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <i class="fas fa-shopping-cart"></i>
        <h4>Votre panier est vide</h4>
        <p>Commencez vos achats maintenant !</p>
      </div>
    `;
    footer.style.display = 'none';
    return;
  }
  
  footer.style.display = 'block';
  
  let total = 0;
  
  container.innerHTML = cart.map(item => {
    const p = PRODUCTS.find(pr => pr.id === item.id);
    if (!p) return '';
    
    const subtotal = p.price * item.qty;
    total += subtotal;
    
    return `
      <div class="cart-item">
        <img src="${p.images[0]}" alt="${p.name}" class="cart-item-img">
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">${p.price} DH × ${item.qty}</div>
          <div class="cart-item-controls">
            <div class="ci-qty">
              <button class="ci-q-btn" onclick="updateCartQty(${item.id}, -1)">−</button>
              <input type="text" class="ci-q-val" value="${item.qty}" readonly>
              <button class="ci-q-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
            </div>
            <button class="ci-del" onclick="removeFromCart(${item.id})" title="Supprimer">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  document.getElementById('cartTotal').textContent = `${total} DH`;
  document.getElementById('cartShipping').textContent = total >= 300 ? 'Gratuite' : 'Calculée à la commande';
  document.getElementById('cartShipping').className = total >= 300 ? 'free' : '';
}

// ═══════════════════════════════════════════════════════════════
// CHECKOUT WHATSAPP
// ═══════════════════════════════════════════════════════════════
function checkout() {
  if (cart.length === 0) return;
  
  let message = '🛒 *Nouvelle Commande KLIKOO*\n\n';
  let total = 0;
  
  cart.forEach(item => {
    const p = PRODUCTS.find(pr => pr.id === item.id);
    if (p) {
      const subtotal = p.price * item.qty;
      total += subtotal;
      message += `✅ *${p.name}*\n`;
      message += `   Prix: ${p.price} DH\n`;
      message += `   Quantité: ${item.qty}\n`;
      message += `   Sous-total: ${subtotal} DH\n\n`;
    }
  });
  
  message += `💰 *Total: ${total} DH*\n`;
  message += total >= 300 ? '🚚 Livraison: GRATUITE ✨\n' : '🚚 Livraison: À calculer\n';
  message += '\n📞 Merci de confirmer votre commande !';
  
  const whatsappUrl = `https://wa.me/212774011555?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}

// ═══════════════════════════════════════════════════════════════
// GESTION WISHLIST
// ═══════════════════════════════════════════════════════════════
function toggleWish(id) {
  const index = wishlist.indexOf(id);
  const p = PRODUCTS.find(pr => pr.id === id);
  
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast(`💔 ${p.name} retiré des favoris`);
  } else {
    wishlist.push(id);
    showToast(`❤️ ${p.name} ajouté aux favoris`);
  }
  
  localStorage.setItem('klikoo_wishlist', JSON.stringify(wishlist));
  updateBadges();
  renderProds();
}

// ═══════════════════════════════════════════════════════════════
// MISE À JOUR BADGES
// ═══════════════════════════════════════════════════════════════
function updateBadges() {
  const cartBadge = document.getElementById('cartBadge');
  const wishBadge = document.getElementById('wishBadge');
  
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  
  if (cartBadge) {
    cartBadge.textContent = cartCount;
    cartBadge.classList.toggle('show', cartCount > 0);
  }
  
  if (wishBadge) {
    wishBadge.textContent = wishlist.length;
    wishBadge.classList.toggle('show', wishlist.length > 0);
  }
}

// ═══════════════════════════════════════════════════════════════
// TOAST NOTIFICATION
// ═══════════════════════════════════════════════════════════════
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  
  toastMsg.textContent = msg;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ═══════════════════════════════════════════════════════════════
// HERO PRODUITS
// ═══════════════════════════════════════════════════════════════
function renderHeroProds() {
  const container = document.getElementById('heroProds');
  if (!container) return;
  
  const featured = PRODUCTS.slice(0, 3);
  
  container.innerHTML = featured.map(p => `
    <div class="hero-prod-card" onclick="openQuick(${p.id})">
      <img src="${p.images[0]}" alt="${p.name}" class="hero-prod-img">
      <div class="hero-prod-name">${p.name}</div>
      <div class="hero-prod-price">${p.price} DH</div>
    </div>
  `).join('');
}

// ═══════════════════════════════════════════════════════════════
// TIMER PROMO
// ═══════════════════════════════════════════════════════════════
function startPromoTimer() {
  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);
  
  function updateTimer() {
    const now = new Date();
    const diff = endDate - now;
    
    if (diff <= 0) {
      endDate.setDate(endDate.getDate() + 1);
      return;
    }
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    const hEl = document.getElementById('t-h');
    const mEl = document.getElementById('t-m');
    const sEl = document.getElementById('t-s');
    
    if (hEl) hEl.textContent = hours.toString().padStart(2, '0');
    if (mEl) mEl.textContent = minutes.toString().padStart(2, '0');
    if (sEl) sEl.textContent = seconds.toString().padStart(2, '0');
  }
  
  updateTimer();
  setInterval(updateTimer, 1000);
}

// ═══════════════════════════════════════════════════════════════
// EFFET SCROLL HEADER
// ═══════════════════════════════════════════════════════════════
function initScrollEffect() {
  const header = document.getElementById('siteHeader');
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ═══════════════════════════════════════════════════════════════
// MENU MOBILE
// ═══════════════════════════════════════════════════════════════
function toggleMob() {
  const menu = document.getElementById('mobMenu');
  if (menu) {
    menu.classList.toggle('open');
  }
}