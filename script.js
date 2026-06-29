let currentUser = null;
let pendingAdverts = [];
let currentLang = 'en';
let currentCategoryFilter = 'all';
let allProducts = [];

const translations = {
    en: { headerTitle: "KADUNA STATE MX PS EMPOWERMENT AND DELIVERY NETWORK (KDED)", headerSubtitle: "Empowering Local Vendors • Secure Pi Payments • Fast Delivery", navMarket: "Marketplace", navVendors: "Vendors", navAdverts: "Adverts", navAdmin: "Admin", navProfile: "Profile", marketTitle: "🛒 Marketplace", vendorsTitle: "👤 Vendor Dashboard", uploadBtn: "📸 Upload Advert (Photos/Videos)", advertsTitle: "📣 Featured Adverts", adminTitle: "🛠️ Admin Dashboard - Approve Adverts", profileTitle: "👤 Profile", loginBtn: "🔑 Login with Pi", welcome: "Welcome", buyNow: "Buy with Pi", approve: "Approve", reject: "Reject", paymentSuccess: "Payment successful! Thank you for supporting Kaduna vendors.", uploadSuccess: "Advert uploaded! Pending admin review.", approved: "✅ Advert Approved!", rejected: "❌ Advert Rejected" },
    ha: { /* ... same as before ... */ },
    fr: { /* ... same as before ... */ },
    ar: { /* ... same as before ... */ },
    yo: { /* ... same as before ... */ },
    ig: { /* ... same as before ... */ }
    // (Full translations object from previous response - paste all language objects here)
};

function t(key) {
    return translations[currentLang]?.[key] || translations.en[key] || key;
}

// Pi SDK
function initPiSDK() {
    if (typeof Pi !== 'undefined') Pi.init({ version: "2.0" });
}

async function authenticateWithPi() {
    if (typeof Pi === 'undefined') return alert('Open in Pi Browser');
    try {
        const auth = await Pi.authenticate(['username', 'payments'], () => {});
        currentUser = auth;
        document.getElementById('user-info').innerHTML = `<div class="card"><p><strong>${t('welcome')}, ${auth.user.username}!</strong></p></div>`;
    } catch(e){}
}

async function makePayment(amount, memo) {
    if (!currentUser) return alert('Login with Pi first');
    const callbacks = {
        onReadyForServerApproval: (id) => approvePaymentServer(id),
        onReadyForServerCompletion: () => alert(t('paymentSuccess')),
        onCancel: () => {}, onError: () => {}
    };
    Pi.createPayment({amount, memo, metadata: {app: 'KDED'}}, callbacks);
}

async function approvePaymentServer(paymentId) {
    try { await fetch('/api/approve-payment', {method: 'POST', body: JSON.stringify({paymentId})}); } catch(e){}
}

function showSection(section) {
    document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
    document.getElementById(section).style.display = 'block';
    document.querySelectorAll('.nav button').forEach(b => b.classList.remove('active'));
    const btn = Array.from(document.querySelectorAll('.nav button')).find(b => b.getAttribute('onclick').includes(section));
    if (btn) btn.classList.add('active');
}

function updateTranslations() {
    // Update all translatable elements (same as previous)
    document.getElementById('header-title').textContent = t('headerTitle');
    // ... repeat for all IDs as in previous version
}

function changeLanguage() {
    currentLang = document.getElementById('language').value;
    updateTranslations();
    renderProducts(allProducts);
}

// Category Filter
function filterByCategory(cat) {
    currentCategoryFilter = cat;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`cat-${cat === 'all' ? 'all' : cat}`).classList.add('active');
    
    const filtered = cat === 'all' ? allProducts : allProducts.filter(p => p.category === cat);
    renderProducts(filtered);
}

function loadMockProducts() {
    allProducts = [
        {id:1, title:"Fresh Tomatoes", price:5, category:"FoodDrink", image:"https://picsum.photos/id/20/300/200", memo:"Tomatoes"},
        {id:2, title:"Leather Bag", price:20, category:"Shopping", image:"https://picsum.photos/id/106/300/200", memo:"Leather Bag"},
        {id:3, title:"Fitness Training", price:15, category:"Health", image:"https://picsum.photos/id/201/300/200", memo:"Fitness"},
        {id:4, title:"Business Course", price:25, category:"Education", image:"https://picsum.photos/id/201/300/200", memo:"Course"},
        // Add more as needed
    ];
    renderProducts(allProducts);
}

function renderProducts(products) {
    const container = document.getElementById('products');
    let html = '';
    products.forEach(p => {
        html += `
            <div class="product-card card">
                <img src="\( {p.image}" alt=" \){p.title}">
                <h3>${p.title}</h3>
                <p>${p.price} Pi</p>
                <button onclick="makePayment(\( {p.price}, ' \){p.memo}')">${t('buyNow')}</button>
            </div>`;
    });
    container.innerHTML = html;
}

// Vendor & Admin functions (uploadAdvert, renderPendingAdverts, etc.) - same as previous versions
// Paste the full vendor/admin code from earlier responses here

window.onload = () => {
    initPiSDK();
    loadMockProducts();
    showSection('marketplace');
    updateTranslations();
};