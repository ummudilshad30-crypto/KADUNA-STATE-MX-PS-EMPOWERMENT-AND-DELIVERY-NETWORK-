let currentUser = null;
let isAdmin = false;
let pendingAdverts = [];
let currentLang = 'en';
let currentCategoryFilter = 'all';
let allProducts = [];
let uploadedFiles = [];

const translations = {
    en: {
        headerTitle: "KADUNA STATE MX PS EMPOWERMENT AND DELIVERY NETWORK (KDED)",
        headerSubtitle: "Empowering Local Vendors • Secure Pi Payments • Fast Delivery",
        navMarket: "Marketplace",
        navVendors: "Vendors",
        navAdverts: "Adverts",
        navAdmin: "Admin Dashboard",
        navProfile: "Profile",
        marketTitle: "🛒 Marketplace",
        vendorsTitle: "👤 Vendor Dashboard",
        uploadBtn: "Select Media",
        advertsTitle: "📣 Featured Adverts",
        adminTitle: "🛠️ Admin Dashboard - Approve Adverts",
        profileTitle: "👤 Profile",
        loginBtn: "🔑 Login with Pi",
        welcome: "Welcome",
        buyNow: "Buy with Pi",
        approve: "Approve",
        reject: "Reject",
        paymentSuccess: "Payment successful! Thank you for supporting Kaduna vendors.",
        uploadSuccess: "Upload Successful & Secure!",
        approved: "✅ Advert Approved!",
        rejected: "❌ Advert Rejected"
    },
    ha: {
        headerTitle: "KADUNA STATE MX PS EMPOWERMENT AND DELIVERY NETWORK (KDED)",
        headerSubtitle: "Ƙarfafa 'Yan Kasuwa na Gida • Biyan Pi Mai Aminci • Isarwa Mai Sauri",
        navMarket: "Kasuwa",
        navVendors: "Masu Sayarwa",
        navAdverts: "Tallace-tallace",
        navAdmin: "Dashboard Admin",
        navProfile: "Bayani",
        marketTitle: "🛒 Kasuwa",
        vendorsTitle: "👤 Dashboard na Mai Sayarwa",
        uploadBtn: "Zaɓi Media",
        advertsTitle: "📣 Tallace-tallace Masu Amfani",
        adminTitle: "🛠️ Dashboard na Admin",
        profileTitle: "👤 Bayani",
        loginBtn: "🔑 Shiga da Pi",
        welcome: "Barka da zuwa",
        buyNow: "Sayi da Pi",
        approve: "Yarda",
        reject: "Ƙin yarda",
        paymentSuccess: "Biya ya yi nasara!",
        uploadSuccess: "Upload ya yi lafiya!",
        approved: "✅ An yarda!",
        rejected: "❌ An ƙin!"
    },
    fr: {
        headerTitle: "RÉSEAU D'AUTONOMISATION ET DE LIVRAISON DE L'ÉTAT DE KADUNA (KDED)",
        headerSubtitle: "Autonomisation des vendeurs locaux • Paiements Pi sécurisés • Livraison rapide",
        navMarket: "Marché",
        navVendors: "Vendeurs",
        navAdverts: "Publicités",
        navAdmin: "Tableau de bord Admin",
        navProfile: "Profil",
        marketTitle: "🛒 Marché",
        vendorsTitle: "👤 Tableau de bord Vendeur",
        uploadBtn: "Sélectionner Média",
        advertsTitle: "📣 Publicités en vedette",
        adminTitle: "🛠️ Tableau de bord Admin",
        profileTitle: "👤 Profil",
        loginBtn: "🔑 Connexion avec Pi",
        welcome: "Bienvenue",
        buyNow: "Acheter avec Pi",
        approve: "Approuver",
        reject: "Rejeter",
        paymentSuccess: "Paiement réussi !",
        uploadSuccess: "Upload réussi et sécurisé !",
        approved: "✅ Publicité Approuvée !",
        rejected: "❌ Publicité Rejetée"
    },
    ar: {
        headerTitle: "شبكة تمكين وتوصيل ولاية كادونا (KDED)",
        headerSubtitle: "تمكين البائعين المحليين • مدفوعات Pi الآمنة • التوصيل السريع",
        navMarket: "السوق",
        navVendors: "البائعون",
        navAdverts: "الإعلانات",
        navAdmin: "لوحة الإدارة",
        navProfile: "الملف الشخصي",
        marketTitle: "🛒 السوق",
        vendorsTitle: "👤 لوحة تحكم البائع",
        uploadBtn: "اختر الوسائط",
        advertsTitle: "📣 الإعلانات المميزة",
        adminTitle: "🛠️ لوحة تحكم الإدارة",
        profileTitle: "👤 الملف الشخصي",
        loginBtn: "🔑 تسجيل الدخول بـ Pi",
        welcome: "مرحبا",
        buyNow: "شراء بـ Pi",
        approve: "موافقة",
        reject: "رفض",
        paymentSuccess: "تم الدفع بنجاح!",
        uploadSuccess: "تم الرفع بنجاح وأمان!",
        approved: "✅ تمت الموافقة!",
        rejected: "❌ تم الرفض!"
    },
    yo: {
        headerTitle: "KADUNA STATE MX PS EMPOWERMENT AND DELIVERY NETWORK (KDED)",
        headerSubtitle: "Agbára àwọn olùtajà agbègbè • Ìsanwó Pi ààbò • Ìfijíṣẹ́ yára",
        navMarket: "Ọjà",
        navVendors: "Àwọn olùtajà",
        navAdverts: "Ìpolówó",
        navAdmin: "Dashboard Admin",
        navProfile: "Profaili",
        marketTitle: "🛒 Ọjà",
        vendorsTitle: "👤 Dashboard Olùtajà",
        uploadBtn: "Yan Media",
        advertsTitle: "📣 Àwọn Ìpolówó",
        adminTitle: "🛠️ Dashboard Admin",
        profileTitle: "👤 Profaili",
        loginBtn: "🔑 Wọlé pẹ̀lú Pi",
        welcome: "Ẹ kú àbọ̀",
        buyNow: "Ra pẹ̀lú Pi",
        approve: "Fọwọ́ sí",
        reject: "Kọ",
        paymentSuccess: "Ìsanwó ti ṣe!",
        uploadSuccess: "Upload ti ṣe ààbò!",
        approved: "✅ Ìpolówó ti fọwọ́ sí!",
        rejected: "❌ Ìpolówó ti kọ̀"
    },
    ig: {
        headerTitle: "KADUNA STATE MX PS EMPOWERMENT AND DELIVERY NETWORK (KDED)",
        headerSubtitle: "Ime ike ndị na-ere ahịa • Akwụ ụgwọ Pi nchekwa • Ozi ngwa ngwa",
        navMarket: "Ahịa",
        navVendors: "Ndị na-ere ahịa",
        navAdverts: "Mkpọsa",
        navAdmin: "Dashboard Admin",
        navProfile: "Profaịlụ",
        marketTitle: "🛒 Ahịa",
        vendorsTitle: "👤 Dashboard Onye na-ere ahịa",
        uploadBtn: "Họrọ Media",
        advertsTitle: "📣 Mkpọsa ndị a ma ama",
        adminTitle: "🛠️ Dashboard Admin",
        profileTitle: "👤 Profaịlụ",
        loginBtn: "🔑 Banye na Pi",
        welcome: "Nnọọ",
        buyNow: "Zụọ na Pi",
        approve: "Kwenye",
        reject: "Jụ",
        paymentSuccess: "Ịkwụ ụgwọ ọma!",
        uploadSuccess: "Upload mere nke ọma na nchekwa!",
        approved: "✅ Mkpọsa akwadoro!",
        rejected: "❌ Mkpọsa ajụrụ"
    }
};

function t(key) {
    return translations[currentLang]?.[key] || translations.en[key] || key;
}

// Pi SDK
function initPiSDK() {
    if (typeof Pi !== 'undefined') {
        Pi.init({ version: "2.0" });
    }
}

async function authenticateWithPi() {
    if (typeof Pi === 'undefined') {
        alert('Please open this app in Pi Browser');
        return;
    }
    try {
        const auth = await Pi.authenticate(['username', 'payments'], () => {});
        currentUser = auth;
        isAdmin = auth.user.username?.toLowerCase().includes('admin') || auth.user.username?.toLowerCase().includes('kaduna');
        document.getElementById('nav-admin').style.display = isAdmin ? 'block' : 'none';
        document.getElementById('user-info').innerHTML = `<div class="card"><p><strong>${t('welcome')}, ${auth.user.username}!</strong></p></div>`;
        showSection('marketplace');
    } catch (e) {
        console.error(e);
    }
}

// Menu Functions
function toggleMenu() {
    document.getElementById('side-menu').classList.toggle('open');
}

function navigateTo(section) {
    if (section === 'admin' && !isAdmin) {
        alert("Admin access only!");
        return;
    }
    showSection(section);
}

function showSection(section) {
    document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
    const target = document.getElementById(section);
    if (target) target.style.display = 'block';
}

function changeLanguage() {
    currentLang = document.getElementById('language').value;
    document.getElementById('header-title').textContent = t('headerTitle') || 'KDED';
}

// Products
function loadMockProducts() {
    allProducts = [
        {id:1, title:"Fresh Tomatoes (Kaduna Farms)", price:5, category:"FoodDrink", image:"https://picsum.photos/id/20/300/200", memo:"Tomatoes"},
        {id:2, title:"Handcrafted Leather Bag", price:20, category:"Shopping", image:"https://picsum.photos/id/106/300/200", memo:"Leather Bag"},
        {id:3, title:"Pure Local Honey", price:8, category:"FoodDrink", image:"https://picsum.photos/id/180/300/200", memo:"Honey"},
        {id:4, title:"Fitness Training", price:15, category:"Health", image:"https://picsum.photos/id/201/300/200", memo:"Fitness"},
        {id:5, title:"Business Course", price:25, category:"Education", image:"https://picsum.photos/id/201/300/200", memo:"Course"}
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
    container.innerHTML = html || '<p class="card">No products found.</p>';
}

function filterByCategory(cat) {
    currentCategoryFilter = cat;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`cat-${cat === 'all' ? 'all' : cat}`).classList.add('active');
    const filtered = cat === 'all' ? allProducts : allProducts.filter(p => p.category === cat);
    renderProducts(filtered);
}

async function makePayment(amount, memo) {
    if (!currentUser) {
        alert('Please login with Pi first');
        showSection('profile');
        return;
    }
    const callbacks = {
        onReadyForServerApproval: (id) => approvePaymentServer(id),
        onReadyForServerCompletion: () => alert(t('paymentSuccess')),
        onCancel: () => {},
        onError: () => {}
    };
    Pi.createPayment({amount, memo, metadata: {app: 'KDED'}}, callbacks);
}

async function approvePaymentServer(paymentId) {
    try {
        await fetch('/api/approve-payment', {
            method: 'POST',
            body: JSON.stringify({paymentId})
        });
    } catch(e) {}
}

// Safe Upload
function triggerUpload() {
    document.getElementById('mediaUpload').click();
}

function handleFileUpload(e) {
    const files = e.target.files;
    const preview = document.getElementById('upload-preview');
    preview.innerHTML = '';
    Array.from(files).forEach((file) => {
        if (file.size > 50 * 1024 * 1024) {
            alert('File too large! Max 50MB allowed.');
            return;
        }
        if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
            alert('Only images and videos allowed.');
            return;
        }
        uploadedFiles.push(file);
        const reader = new FileReader();
        reader.onload = (ev) => {
            const div = document.createElement('div');
            div.className = 'preview-item';
            if (file.type.startsWith('image/')) {
                div.innerHTML = `<img src="\( {ev.target.result}" alt=" \){file.name}"><button onclick="removePreview(this)">×</button>`;
            } else {
                div.innerHTML = `<video src="${ev.target.result}" controls></video><button onclick="removePreview(this)">×</button>`;
            }
            preview.appendChild(div);
        };
        reader.readAsDataURL(file);
    });
}

function removePreview(btn) {
    btn.parentElement.remove();
}

function uploadAdvert() {
    if (uploadedFiles.length === 0) {
        alert('Please select files first');
        return;
    }
    const advert = {
        id: Date.now(),
        title: `Media Upload ${new Date().toLocaleDateString()}`,
        mediaCount: uploadedFiles.length,
        status: 'pending',
        vendor: currentUser ? currentUser.user.username : 'Vendor'
    };
    pendingAdverts.push(advert);
    document.getElementById('vendor-status').innerHTML = `<div class="card" style="background:#d4edda;color:#155724;">✅ ${t('uploadSuccess')} ${uploadedFiles.length} file(s) uploaded safely.</div>`;
    uploadedFiles = [];
    document.getElementById('upload-preview').innerHTML = '';
    renderPendingAdverts();
    renderAdverts();
}

function renderPendingAdverts() {
    const container = document.getElementById('pending-adverts');
    let html = '';
    pendingAdverts.filter(a => a.status === 'pending').forEach(adv => {
        html += `
            <div class="card">
                <h3>${adv.title}</h3>
                <p>Vendor: ${adv.vendor}</p>
                <button onclick="approveAdvert(\( {adv.id})"> \){t('approve')}</button>
                <button onclick="rejectAdvert(\( {adv.id})" style="background:#dc3545;"> \){t('reject')}</button>
            </div>`;
    });
    container.innerHTML = html || '<p class="card">No pending adverts.</p>';
}

function approveAdvert(id) {
    const adv = pendingAdverts.find(a => a.id === id);
    if (adv) adv.status = 'approved';
    alert(t('approved'));
    renderPendingAdverts();
    renderAdverts();
}

function rejectAdvert(id) {
    pendingAdverts = pendingAdverts.filter(a => a.id !== id);
    alert(t('rejected'));
    renderPendingAdverts();
    renderAdverts();
}

function renderAdverts() {
    const container = document.getElementById('adverts-list');
    let html = '';
    pendingAdverts.filter(a => a.status === 'approved').forEach(adv => {
        html += `<div class="card"><h3>${adv.title}</h3><p>From: ${adv.vendor}</p></div>`;
    });
    container.innerHTML = html || '<p class="card">No approved adverts yet.</p>';
}

// Initialize
window.onload = () => {
    initPiSDK();
    loadMockProducts();
    showSection('profile'); // Only login visible at first
    document.getElementById('mediaUpload').addEventListener('change', handleFileUpload);
};