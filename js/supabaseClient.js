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

  const links = [
    { href: 'dashboard.html', label: 'dashboard', key: 'dashboard' },
    { href: 'check-in.html', label: 'checkin', key: 'check-in' },
    { href: 'members.html', label: 'members', key: 'members' },
    { href: 'loyalty.html', label: 'loyalty', key: 'loyalty' },
    { href: 'settings.html', label: 'settings', key: 'settings' }
  ];

  const lang = localStorage.getItem('gym_lang') || 'en';
  
  el.innerHTML = `
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center flex-wrap gap-3">
          <div class="flex items-center gap-8">
            <h1 class="text-xl font-bold text-gray-800" data-i18n="nav.gymmanagement">🏋️ Gym Management</h1>
            <div class="hidden md:flex items-center gap-1">
              ${links
                .map(
                  (l) => `
                <a href="${l.href}" class="px-3 py-2 rounded-md text-sm font-medium ${
                    l.key === activePage
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }" data-i18n="nav.${l.label}">${l.label}</a>
              `
                )
                .join('')}
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">${user.email}</span>
            <button id="lang-toggle" class="px-3 py-1 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              ${lang === 'ar' ? 'EN' : 'عربي'}
            </button>
            <button id="sign-out-btn" class="text-sm text-red-600 hover:text-red-800" data-i18n="nav.signout">Sign Out</button>
          </div>
        </div>
      </div>
    </nav>
  `;

  // Language toggle - use the function from language.js if available
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      if (typeof setLanguage === 'function') {
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        setLanguage(newLang);
      } else {
        const newLang = localStorage.getItem('gym_lang') === 'ar' ? 'en' : 'ar';
        localStorage.setItem('gym_lang', newLang);
        window.location.reload();
      }
    });
  }

  // Sign out
  document.getElementById('sign-out-btn').addEventListener('click', async () => {
    await sb.auth.signOut();
    window.location.href = 'login.html';
  });

  // Apply translations if language.js is loaded
  if (typeof updatePageLanguage === 'function') {
    setTimeout(updatePageLanguage, 50);
  }
}
