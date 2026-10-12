// البيانات التجريبية للمقالات والبرامج
const postsData = [
  {
    id: 1,
    title: "أفضل الممارسات لإنشاء مواقع ويب سريعة في 2026",
    category: "articles",
    categoryName: "مقالات",
    date: "12 أكتوبر 2026",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600",
    summary: "تعرف على أهم التقنيات الحديثة لتحسين أداء مواقع الويب وزيادة سرعة التحميل.",
    content: "سرعة تحميل المواقع أصبحت خياراً مصيرياً لتجربة المستخدم ومحركات البحث SEO. في هذا المقال نناقش تقنيات الضغط الحديثة واستخدام الصور بصيغة WebP وتقليل استدعاء المكاتب الخارجية..."
  },
  {
    id: 2,
    title: "تحميل برنامج Visual Studio Code أحدث إصدار",
    category: "software",
    categoryName: "برامج وألعاب",
    date: "10 أكتوبر 2026",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600",
    summary: "محرر الأكواد الأقوى والأشهر عالمياً للمطورين مع دعم كافة اللغات والـ Extensions.",
    version: "v1.95.0",
    size: "95 MB",
    downloadUrl: "https://code.visualstudio.com/",
    content: "يعتبر VS Code الخيار الأول لغالبية المبرمجين بفضل خفته وسرعته والآلاف من الإضافات المتاحة له. يتميز بدعم متكامل للذكاء الاصطناعي وتتبع الأخطاء."
  },
  {
    id: 3,
    title: "إطلاق نماذج ذكاء اصطناعي جديدة فائقة السرعة",
    category: "news",
    categoryName: "أخبار",
    date: "08 أكتوبر 2026",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600",
    summary: "أعلنت شركات التقنية الكبرى عن الجيل الجديد من النماذج الذكية الموجهة للهواتف.",
    content: "شهد هذا الأسبوع إعلانات متتالية من كبرى شركات التكنولوجيا حول تطوير نماذج ذكاء اصطناعي تعمل محلياً على الأجهزة دون الحاجة لاتصال دائم بالإنترنت..."
  }
];

// عناصر DOM
const postsGrid = document.getElementById('posts-grid');
const searchInput = document.getElementById('search-input');
const filterBtns = document.querySelectorAll('.filter-btn');
const themeToggleBtn = document.getElementById('theme-toggle');
const modal = document.getElementById('article-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');
const postsCount = document.getElementById('posts-count');
const noResults = document.getElementById('no-results');

let currentCategory = 'all';

// عرض المنشورات
function renderPosts(posts) {
  postsGrid.innerHTML = '';
  postsCount.textContent = `${posts.length} منشورات`;

  if (posts.length === 0) {
    noResults.classList.remove('hidden');
    return;
  } else {
    noResults.classList.add('hidden');
  }

  posts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${post.image}" alt="${post.title}" class="card-img" loading="lazy">
      <div class="card-body">
        <span class="card-tag">${post.categoryName}</span>
        <h3 class="card-title">${post.title}</h3>
        <p class="card-text">${post.summary}</p>
        <div class="card-footer">
          <small>${post.date}</small>
          <button class="btn-read" onclick="openModal(${post.id})">
            ${post.category === 'software' ? 'تحميل' : 'قراءة'}
          </button>
        </div>
      </div>
    `;
    postsGrid.appendChild(card);
  });
}

// تصفية المحتوى والبحث
function filterPosts() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const filtered = postsData.filter(post => {
    const matchesCategory = currentCategory === 'all' || post.category === currentCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm) || post.summary.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });
  renderPosts(filtered);
}

// أزرار التصفية
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.category;
    filterPosts();
  });
});

searchInput.addEventListener('input', filterPosts);

// فتح النافذة المنبثقة
window.openModal = function(id) {
  const post = postsData.find(p => p.id === id);
  if (!post) return;

  modalBody.innerHTML = `
    <h2>${post.title}</h2>
    <p><small style="color:var(--text-secondary)">📅 ${post.date} | ${post.categoryName}</small></p>
    <img src="${post.image}" style="width:100%; border-radius:8px; margin: 1rem 0;">
    <p>${post.content}</p>
    ${post.downloadUrl ? `
      <div style="margin-top:1.5rem; text-align:center;">
        <p><strong>حجم الملف:</strong> ${post.size \vert{}\vert{} 'غير محدد'} \vert{} <strong>الإصدار:</strong> ${post.version || 'الأخير'}</p>
        <a href="${post.downloadUrl}" target="_blank" class="download-btn-large">📥 تحميل الآن برابط مباشر</a>
      </div>
    ` : ''}
  `;
  modal.classList.remove('hidden');
};

// إغلاق النافذة
function closeModal() { modal.classList.add('hidden'); }
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// تبديل الوضع الليلي
themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  themeToggleBtn.querySelector('.theme-icon').textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// التشغيل المبدئي
renderPosts(postsData);