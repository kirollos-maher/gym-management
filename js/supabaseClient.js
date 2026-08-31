// ============================================
// Supabase connection settings
// ============================================
const SUPABASE_URL = 'https://cahcohlhmcpqgiusjojr.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_D8O0L6by1Lm1Qkxbe-xvxA_kuopuuae';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================
// DARK MODE
// ============================================
function initDarkMode() {
  const isDark = localStorage.getItem('gym_theme') === 'dark';
  if (isDark) {
    document.body.classList.add('dark-mode');
  }
  
  // تحديث زر التبديل لو موجود في الصفحة
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.checked = isDark;
  }
  
  // تحديث زر التبديل في الـ Nav لو موجود
  const navToggle = document.getElementById('theme-toggle-nav');
  if (navToggle) {
    navToggle.textContent = isDark ? '☀️' : '🌙';
  }
}

function toggleDarkMode() {
  const isDark = document.body.classList.contains('dark-mode');
  if (isDark) {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('gym_theme', 'light');
  } else {
    document.body.classList.add('dark-mode');
    localStorage.setItem('gym_theme', 'dark');
  }
  
  // تحديث الأزرار
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.checked = !isDark;
  }
  
  const navToggle = document.getElementById('theme-toggle-nav');
  if (navToggle) {
    navToggle.textContent = isDark ? '🌙' : '☀️';
  }
}

// ============================================
// CURRENCY HELPERS
// ============================================
let cachedCurrency = 'EGP';
let cachedCurrencySymbol = 'ج.م';

async function getGymCurrency() {
  try {
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return cachedCurrency;
    
    const { data: userData } = await sb
      .from('users')
      .select('gym_id')
      .eq('id', user.id)
      .single();
    
    if (userData?.gym_id) {
      const { data: gym } = await sb
        .from('gym_profiles')
        .select('currency')
        .eq('id', userData.gym_id)
        .single();
      
      if (gym?.currency) {
        cachedCurrency = gym.currency;
        cachedCurrencySymbol = getCurrencySymbol(gym.currency);
      }
    }
    return cachedCurrency;
  } catch (e) {
    return cachedCurrency;
  }
}

function getCurrencySymbol(currency) {
  const symbols = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'EGP': 'ج.م',
    'SAR': 'ر.س'
  };
  return symbols[currency] || currency;
}

async function formatCurrency(amount, currency = null) {
  if (!currency) {
    currency = await getGymCurrency();
  }
  const symbol = getCurrencySymbol(currency);
  return `${symbol}${Number(amount).toFixed(2)}`;
}

async function refreshCurrency() {
  const currency = await getGymCurrency();
  cachedCurrencySymbol = getCurrencySymbol(currency);
  return cachedCurrencySymbol;
}

// ============================================
// Shared helpers
// ============================================
async function getCurrentUser() {
  const { data: { user } } = await sb.auth.getUser();
  return user;
}

async function getCurrentUserWithProfile() {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data: profile } = await sb
    .from('users')
    .select('*, gym:gym_profiles(*)')
    .eq('id', user.id)
    .single();

  return { user, profile };
}

async function requireAuth() {
  const result = await getCurrentUserWithProfile();
  if (!result || !result.user) {
    window.location.href = 'login.html';
    return null;
  }
  return result;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function formatDateTime(date) {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function daysBetween(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

// ============================================================
// RENDER NAVIGATION WITH DARK MODE SUPPORT
// ============================================================
function renderNav(user, activePage) {
  const el = document.getElementById('app-nav');
  if (!el) return;

  const lang = localStorage.getItem('gym_lang') || 'en';
  const isDark = localStorage.getItem('gym_theme') === 'dark';
  
  const links = [
    { href: 'dashboard.html', label: 'dashboard', key: 'dashboard' },
    { href: 'check-in.html', label: 'checkin', key: 'check-in' },
    { href: 'members.html', label: 'members', key: 'members' },
    { href: 'canteen.html', label: 'canteen', key: 'canteen' },
    { href: 'loyalty.html', label: 'loyalty', key: 'loyalty' },
    { href: 'settings.html', label: 'settings', key: 'settings' }
  ];

  const navLabels = {
    dashboard: lang === 'ar' ? 'لوحة التحكم' : 'Dashboard',
    checkin: lang === 'ar' ? 'تسجيل الحضور' : 'Check-In',
    members: lang === 'ar' ? 'الأعضاء' : 'Members',
    canteen: lang === 'ar' ? 'الكانتين' : 'Canteen',
    loyalty: lang === 'ar' ? 'برنامج الولاء' : 'Loyalty',
    settings: lang === 'ar' ? 'الإعدادات' : 'Settings',
    gymmanagement: lang === 'ar' ? '🏋️ إدارة الجيم' : '🏋️ Gym Management',
    signout: lang === 'ar' ? 'تسجيل الخروج' : 'Sign Out'
  };

  const renderLink = (l, mobile) => `
    <a href="${l.href}" class="${mobile ? 'block px-3 py-2 rounded-md text-base' : 'px-3 py-2 rounded-md text-sm'} font-medium ${
      l.key === activePage ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
    }">${navLabels[l.label]}</a>
  `;

  el.innerHTML = `
    <nav class="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center gap-3">
          <div class="flex items-center gap-8 min-w-0">
            <h1 class="text-lg sm:text-xl font-bold text-gray-800 dark:text-white whitespace-nowrap">${navLabels.gymmanagement}</h1>
            <div class="hidden md:flex items-center gap-1">
              ${links.map((l) => renderLink(l, false)).join('')}
            </div>
          </div>
          <div class="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <button id="theme-toggle-nav" class="px-2.5 py-1 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap" title="${lang === 'ar' ? 'تبديل الوضع' : 'Toggle Theme'}">
              ${isDark ? '☀️' : '🌙'}
            </button>
            <span class="hidden sm:inline text-sm text-gray-600 dark:text-gray-400 truncate max-w-[160px]">${user.email}</span>
            <button id="lang-toggle" class="px-2.5 py-1 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors whitespace-nowrap">
              ${lang === 'ar' ? 'EN' : 'عربي'}
            </button>
            <button id="sign-out-btn" class="text-xs sm:text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 whitespace-nowrap">${navLabels.signout}</button>
            <button id="mobile-menu-btn" class="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700" aria-label="Menu">
              <svg id="menu-icon-open" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg id="menu-icon-close" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div id="mobile-menu" class="md:hidden hidden pb-3 space-y-1">
          ${links.map((l) => renderLink(l, true)).join('')}
          <div class="sm:hidden px-3 pt-2 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 mt-2">${user.email}</div>
        </div>
      </div>
    </nav>
  `;

  // Mobile menu toggle
  document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    const menu = document.getElementById('mobile-menu');
    const openIcon = document.getElementById('menu-icon-open');
    const closeIcon = document.getElementById('menu-icon-close');
    menu.classList.toggle('hidden');
    openIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
  });

  // Theme toggle in nav
  document.getElementById('theme-toggle-nav').addEventListener('click', function(e) {
    e.preventDefault();
    toggleDarkMode();
    // تحديث شكل الزر
    const isDark = document.body.classList.contains('dark-mode');
    this.textContent = isDark ? '☀️' : '🌙';
  });

  // Language toggle
  document.getElementById('lang-toggle').addEventListener('click', function(e) {
    e.preventDefault();
    const currentLang = localStorage.getItem('gym_lang') || 'en';
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('gym_lang', newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
    window.location.reload();
  });

  // Sign out
  document.getElementById('sign-out-btn').addEventListener('click', async () => {
    await sb.auth.signOut();
    window.location.href = 'login.html';
  });
  
  // تطبيق Dark Mode على الـ Nav
  if (isDark) {
    document.body.classList.add('dark-mode');
  }
}

// ============================================================
// تشغيل Dark Mode تلقائياً عند تحميل الصفحة
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  initDarkMode();
});

// ============================================================
// EXPORT FUNCTIONS
// ============================================================
window.initDarkMode = initDarkMode;
window.toggleDarkMode = toggleDarkMode;
window.getGymCurrency = getGymCurrency;
window.getCurrencySymbol = getCurrencySymbol;
window.formatCurrency = formatCurrency;
window.refreshCurrency = refreshCurrency;
window.getCurrentUser = getCurrentUser;
window.getCurrentUserWithProfile = getCurrentUserWithProfile;
window.requireAuth = requireAuth;
window.formatDate = formatDate;
window.formatDateTime = formatDateTime;
window.daysBetween = daysBetween;
window.getInitials = getInitials;
window.renderNav = renderNav;
