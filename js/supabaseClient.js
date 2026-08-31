// ============================================
// Supabase connection settings
// ⚠️ IMPORTANT: fill these in with your own values
// (same values that were in your .env.local file)
// ============================================
const SUPABASE_URL = 'https://cahcohlhmcpqgiusjojr.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_D8O0L6by1Lm1Qkxbe-xvxA_kuopuuae';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---------- Shared helpers used across pages ----------

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

// Redirects to login if not authenticated. Call at the top of any
// protected page. Returns { user, profile } on success.
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

function formatCurrency(amount, currency = 'USD') {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
  } catch {
    return `$${Number(amount).toFixed(2)}`;
  }
}

function daysBetween(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// ---------- Currency helpers (shared across all pages) ----------

const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  EGP: 'ج.م',
  SAR: 'ر.س'
};

// Converts a currency code (e.g. 'EGP') to its display symbol.
function getCurrencySymbol(currency) {
  return CURRENCY_SYMBOLS[currency] || currency || '$';
}

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

// Renders the shared top navigation bar into #app-nav on any page
// that includes a <div id="app-nav"></div> and has loaded a profile.
function renderNav(user, activePage) {
  const el = document.getElementById('app-nav');
  if (!el) return;

  // Get current language from localStorage
  const lang = localStorage.getItem('gym_lang') || 'en';
  
  // Navigation links with proper keys
  const links = [
    { href: 'dashboard.html', label: 'dashboard', key: 'dashboard' },
    { href: 'check-in.html', label: 'checkin', key: 'check-in' },
    { href: 'members.html', label: 'members', key: 'members' },
    { href: 'canteen.html', label: 'canteen', key: 'canteen' },
    { href: 'loyalty.html', label: 'loyalty', key: 'loyalty' },
    { href: 'settings.html', label: 'settings', key: 'settings' }
  ];

  // Get translations for nav items
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
      l.key === activePage ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
    }">${navLabels[l.label]}</a>
  `;

  el.innerHTML = `
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center gap-3">
          <div class="flex items-center gap-8 min-w-0">
            <h1 class="text-lg sm:text-xl font-bold text-gray-800 whitespace-nowrap">${navLabels.gymmanagement}</h1>
            <div class="hidden md:flex items-center gap-1">
              ${links.map((l) => renderLink(l, false)).join('')}
            </div>
          </div>
          <div class="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <span class="hidden sm:inline text-sm text-gray-600 truncate max-w-[160px]">${user.email}</span>
            <button id="lang-toggle" class="px-2.5 py-1 text-xs sm:text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap">
              ${lang === 'ar' ? 'EN' : 'عربي'}
            </button>
            <button id="sign-out-btn" class="text-xs sm:text-sm text-red-600 hover:text-red-800 whitespace-nowrap">${navLabels.signout}</button>
            <button id="mobile-menu-btn" class="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-50" aria-label="Menu">
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
          <div class="sm:hidden px-3 pt-2 text-sm text-gray-500 border-t mt-2">${user.email}</div>
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

  // Language toggle - DIRECT IMPLEMENTATION
  document.getElementById('lang-toggle').addEventListener('click', function(e) {
    e.preventDefault();
    const currentLang = localStorage.getItem('gym_lang') || 'en';
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    
    // Save to localStorage
    localStorage.setItem('gym_lang', newLang);
    
    // Update HTML direction
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
    
    // Reload page to apply all changes
    window.location.reload();
  });

  // Sign out
  document.getElementById('sign-out-btn').addEventListener('click', async () => {
    await sb.auth.signOut();
    window.location.href = 'login.html';
  });
}
