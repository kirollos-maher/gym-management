// js/language.js
// Language translations for the gym management system

const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.checkin': 'Check-In',
    'nav.members': 'Members',
    'nav.loyalty': 'Loyalty',
    'nav.settings': 'Settings',
    'nav.signout': 'Sign Out',
    'nav.gymmanagement': '🏋️ Gym Management',
    
    // Index Page
    'index.subtitle': 'Complete solution for gym check-in, loyalty points, and notifications',
    'index.checkin.desc': 'QR Code & Manual',
    'index.loyalty.desc': 'Earn & Redeem',
    'index.notifications': 'Notifications',
    'index.notifications.desc': 'WhatsApp, SMS, Email',
    
    // Check-In Page
    'checkin.title': 'Member Check-In',
    'checkin.manual': 'Manual Check-In',
    'checkin.search': 'Search by name, email, or phone number',
    'checkin.search.placeholder': 'Search by name, email, or phone...',
    'checkin.searching': 'Searching...',
    'checkin.noresults': 'No members found. Try a different search term.',
    'checkin.change': 'Change Member',
    'checkin.checkin': 'Check In',
    'checkin.active': 'Active Member',
    'checkin.inactive': 'Inactive',
    'checkin.success': 'Check-In Successful!',
    'checkin.failed': 'Check-In Failed',
    'checkin.new': 'New Check-In',
    'checkin.tryagain': 'Try Again',
    'checkin.already': 'This member is already checked in.',
    'checkin.noactive': 'Member does not have an active subscription.',
    'checkin.unknown': 'Unknown Member',
    'checkin.noemail': 'No email',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': "Welcome back! Here's what's happening with your gym today.",
    'dashboard.refresh': 'Refresh',
    'dashboard.total.members': 'Total Members',
    'dashboard.active.members': 'Active Members',
    'dashboard.today.checkins': "Today's Check-Ins",
    'dashboard.monthly.revenue': 'Monthly Revenue',
    'dashboard.revenue.overview': 'Revenue Overview',
    'dashboard.attendance.activity': 'Check-in Activity',
    'dashboard.member.distribution': 'Member Distribution',
    'dashboard.upcoming.renewals': 'Upcoming Renewals',
    'dashboard.renewals.desc': 'Members expiring in the next 7 days',
    'dashboard.recent.activity': 'Recent Activity',
    'dashboard.no.renewals': 'No upcoming renewals',
    'dashboard.no.activity': 'No recent activity',
    'dashboard.urgent': 'Urgent',
    'dashboard.days.remaining': 'days remaining',
    'dashboard.checked.in': 'Checked In',
    'dashboard.of.total': 'of total',
    'dashboard.total': 'Total',
    'dashboard.nogym': 'No gym linked to this account yet.',
    
    // Members
    'members.title': 'Members',
    'members.desc': 'Manage your gym members and their subscriptions',
    'members.search': 'Search by name, email, or phone...',
    'members.refresh': 'Refresh',
    'members.noresults': 'No members found',
    'members.showing': 'Showing {count} of {total} members',
    'members.active': 'Active',
    'members.inactive': 'Inactive',
    'members.expires': 'Expires {date}',
    'members.unknown': 'Unknown Member',
    'members.noemail': 'No email',
    
    // Loyalty
    'loyalty.title': 'Loyalty Program',
    'loyalty.desc': 'Manage loyalty points settings and view member activity',
    'loyalty.my.title': 'My Loyalty Points',
    'loyalty.my.desc': 'Track your points and redeem rewards',
    'loyalty.points': 'Loyalty Points',
    'loyalty.earn': '⭐ Earn points with check-ins',
    'loyalty.redeem': 'Redeem Points',
    'loyalty.redeem.placeholder': 'Points to redeem',
    'loyalty.redeem.btn': 'Redeem',
    'loyalty.insufficient': 'Insufficient points. Available: {amount}',
    'loyalty.enter.valid': 'Enter a valid amount',
    'loyalty.redeem.success': 'Points redeemed successfully!',
    'loyalty.redeem.failed': 'Failed to redeem points',
    'loyalty.history': 'Transaction History',
    'loyalty.history.desc': 'Recent loyalty point activity',
    'loyalty.earned': 'Earned',
    'loyalty.redeemed': 'Redeemed',
    'loyalty.no.history': 'No loyalty transactions yet',
    'loyalty.settings.title': 'Loyalty Points Settings',
    'loyalty.settings.desc': 'Configure how members earn and redeem loyalty points',
    'loyalty.settings.checkin': 'Points per Check-in',
    'loyalty.settings.renewal': 'Points per Currency Unit on Renewal',
    'loyalty.settings.canteen': 'Points per Currency Unit on Canteen Purchase',
    'loyalty.settings.redemption': 'Points Redemption Rate',
    'loyalty.settings.save': 'Save Settings',
    'loyalty.settings.saved': 'Settings saved successfully!',
    'loyalty.settings.failed': 'Failed to save settings',
    'loyalty.noaccess': "You don't have access to loyalty features",
    
    // Settings
    'settings.title': 'Settings',
    'settings.desc': 'Manage your gym profile and preferences',
    'settings.gym.profile': 'Gym Profile',
    'settings.gym.name': 'Gym Name',
    'settings.address': 'Address',
    'settings.phone': 'Phone Number',
    'settings.email': 'Email',
    'settings.currency': 'Currency',
    'settings.save': 'Save Settings',
    'settings.saved': 'Settings saved successfully!',
    'settings.failed': 'Failed to save settings',
    'settings.language': 'Language',
    
    // Sign In / Sign Up
    'auth.signin': 'Sign In',
    'auth.signup': 'Create Account',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirm.password': 'Confirm Password',
    'auth.fullname': 'Your Full Name',
    'auth.gymname': 'Gym Name',
    'auth.noaccount': "Don't have an account?",
    'auth.haveaccount': 'Already have an account?',
    'auth.create': 'Create one',
    'auth.signin.link': 'Sign in',
    'auth.password.min': 'At least 6 characters',
    'auth.enter.email': 'Enter your email',
    'auth.enter.password': 'Enter your password',
    'auth.enter.fullname': 'Enter your full name',
    'auth.enter.gymname': "Enter your gym's name",
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success!',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.close': 'Close',
    'common.unknown': 'Unknown Member',
    'common.noemail': 'No email',
    'common.member': 'Member',
    'common.active': 'Active',
    'common.inactive': 'Inactive',
  },
  ar: {
    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.checkin': 'تسجيل الحضور',
    'nav.members': 'الأعضاء',
    'nav.loyalty': 'برنامج الولاء',
    'nav.settings': 'الإعدادات',
    'nav.signout': 'تسجيل الخروج',
    'nav.gymmanagement': '🏋️ إدارة الجيم',
    
    // Index Page
    'index.subtitle': 'حل متكامل لتسجيل الحضور ونقاط الولاء والإشعارات في الجيم',
    'index.checkin.desc': 'رمز QR وتسجيل يدوي',
    'index.loyalty.desc': 'اكسب واستبدل',
    'index.notifications': 'الإشعارات',
    'index.notifications.desc': 'واتساب، رسائل نصية، بريد إلكتروني',
    
    // Check-In Page
    'checkin.title': 'تسجيل حضور العضو',
    'checkin.manual': 'تسجيل الحضور يدويًا',
    'checkin.search': 'ابحث بالاسم أو البريد الإلكتروني أو رقم الهاتف',
    'checkin.search.placeholder': 'ابحث بالاسم أو البريد الإلكتروني أو رقم الهاتف...',
    'checkin.searching': 'جاري البحث...',
    'checkin.noresults': 'لم يتم العثور على أعضاء. حاول البحث بكلمة مختلفة.',
    'checkin.change': 'تغيير العضو',
    'checkin.checkin': 'تسجيل الحضور',
    'checkin.active': 'عضو نشط',
    'checkin.inactive': 'غير نشط',
    'checkin.success': 'تم تسجيل الحضور بنجاح!',
    'checkin.failed': 'فشل تسجيل الحضور',
    'checkin.new': 'تسجيل حضور جديد',
    'checkin.tryagain': 'حاول مرة أخرى',
    'checkin.already': 'هذا العضو مسجل الحضور بالفعل.',
    'checkin.noactive': 'العضو ليس لديه اشتراك نشط.',
    'checkin.unknown': 'عضو غير معروف',
    'checkin.noemail': 'لا يوجد بريد إلكتروني',
    
    // Dashboard
    'dashboard.title': 'لوحة التحكم',
    'dashboard.welcome': 'مرحبًا بعودتك! إليك ما يحدث في جيمك اليوم.',
    'dashboard.refresh': 'تحديث',
    'dashboard.total.members': 'إجمالي الأعضاء',
    'dashboard.active.members': 'الأعضاء النشطون',
    'dashboard.today.checkins': 'تسجيلات اليوم',
    'dashboard.monthly.revenue': 'الإيرادات الشهرية',
    'dashboard.revenue.overview': 'نظرة عامة على الإيرادات',
    'dashboard.attendance.activity': 'نشاط الحضور',
    'dashboard.member.distribution': 'توزيع الأعضاء',
    'dashboard.upcoming.renewals': 'التجديدات القادمة',
    'dashboard.renewals.desc': 'الأعضاء الذين تنتهي اشتراكاتهم خلال 7 أيام',
    'dashboard.recent.activity': 'النشاط الأخير',
    'dashboard.no.renewals': 'لا توجد تجديدات قادمة',
    'dashboard.no.activity': 'لا يوجد نشاط حديث',
    'dashboard.urgent': 'عاجل',
    'dashboard.days.remaining': 'يوم متبقي',
    'dashboard.checked.in': 'تم تسجيل الحضور',
    'dashboard.of.total': 'من الإجمالي',
    'dashboard.total': 'الإجمالي',
    'dashboard.nogym': 'لا يوجد جيم مرتبط بهذا الحساب حتى الآن.',
    
    // Members
    'members.title': 'الأعضاء',
    'members.desc': 'إدارة أعضاء الجيم واشتراكاتهم',
    'members.search': 'ابحث بالاسم أو البريد الإلكتروني أو رقم الهاتف...',
    'members.refresh': 'تحديث',
    'members.noresults': 'لم يتم العثور على أعضاء',
    'members.showing': 'عرض {count} من {total} عضو',
    'members.active': 'نشط',
    'members.inactive': 'غير نشط',
    'members.expires': 'ينتهي في {date}',
    'members.unknown': 'عضو غير معروف',
    'members.noemail': 'لا يوجد بريد إلكتروني',
    
    // Loyalty
    'loyalty.title': 'برنامج الولاء',
    'loyalty.desc': 'إدارة إعدادات نقاط الولاء وعرض نشاط الأعضاء',
    'loyalty.my.title': 'نقاط الولاء الخاصة بي',
    'loyalty.my.desc': 'تتبع نقاطك واستبدل المكافآت',
    'loyalty.points': 'نقاط الولاء',
    'loyalty.earn': '⭐ اكسب نقاط مع تسجيل الحضور',
    'loyalty.redeem': 'استبدال النقاط',
    'loyalty.redeem.placeholder': 'النقاط المراد استبدالها',
    'loyalty.redeem.btn': 'استبدال',
    'loyalty.insufficient': 'نقاط غير كافية. المتاح: {amount}',
    'loyalty.enter.valid': 'أدخل مبلغًا صالحًا',
    'loyalty.redeem.success': 'تم استبدال النقاط بنجاح!',
    'loyalty.redeem.failed': 'فشل استبدال النقاط',
    'loyalty.history': 'سجل المعاملات',
    'loyalty.history.desc': 'نشاط نقاط الولاء الأخير',
    'loyalty.earned': 'مكتسب',
    'loyalty.redeemed': 'مستبدل',
    'loyalty.no.history': 'لا توجد معاملات ولاء حتى الآن',
    'loyalty.settings.title': 'إعدادات نقاط الولاء',
    'loyalty.settings.desc': 'تكوين كيفية كسب الأعضاء واستبدال نقاط الولاء',
    'loyalty.settings.checkin': 'نقاط لكل تسجيل حضور',
    'loyalty.settings.renewal': 'نقاط لكل وحدة عملة عند التجديد',
    'loyalty.settings.canteen': 'نقاط لكل وحدة عملة عند شراء من الكافتيريا',
    'loyalty.settings.redemption': 'معدل استبدال النقاط',
    'loyalty.settings.save': 'حفظ الإعدادات',
    'loyalty.settings.saved': 'تم حفظ الإعدادات بنجاح!',
    'loyalty.settings.failed': 'فشل حفظ الإعدادات',
    'loyalty.noaccess': 'ليس لديك صلاحية للوصول إلى ميزات الولاء',
    
    // Settings
    'settings.title': 'الإعدادات',
    'settings.desc': 'إدارة ملف الجيم الخاص بك وتفضيلاتك',
    'settings.gym.profile': 'ملف الجيم',
    'settings.gym.name': 'اسم الجيم',
    'settings.address': 'العنوان',
    'settings.phone': 'رقم الهاتف',
    'settings.email': 'البريد الإلكتروني',
    'settings.currency': 'العملة',
    'settings.save': 'حفظ الإعدادات',
    'settings.saved': 'تم حفظ الإعدادات بنجاح!',
    'settings.failed': 'فشل حفظ الإعدادات',
    'settings.language': 'اللغة',
    
    // Sign In / Sign Up
    'auth.signin': 'تسجيل الدخول',
    'auth.signup': 'إنشاء حساب',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.confirm.password': 'تأكيد كلمة المرور',
    'auth.fullname': 'الاسم الكامل',
    'auth.gymname': 'اسم الجيم',
    'auth.noaccount': 'ليس لديك حساب؟',
    'auth.haveaccount': 'لديك حساب بالفعل؟',
    'auth.create': 'أنشئ واحدًا',
    'auth.signin.link': 'تسجيل الدخول',
    'auth.password.min': 'على الأقل 6 أحرف',
    'auth.enter.email': 'أدخل بريدك الإلكتروني',
    'auth.enter.password': 'أدخل كلمة المرور',
    'auth.enter.fullname': 'أدخل اسمك الكامل',
    'auth.enter.gymname': 'أدخل اسم الجيم الخاص بك',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.success': 'تم بنجاح!',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.close': 'إغلاق',
    'common.unknown': 'عضو غير معروف',
    'common.noemail': 'لا يوجد بريد إلكتروني',
    'common.member': 'عضو',
    'common.active': 'نشط',
    'common.inactive': 'غير نشط',
  }
};

// Current language - stored in localStorage
let currentLang = localStorage.getItem('gym_lang') || 'en';

// Function to get translation
function t(key, params = {}) {
  const translation = translations[currentLang]?.[key];
  if (!translation) {
    // Fallback to English
    const fallback = translations.en[key];
    if (!fallback) return key;
    return replaceParams(fallback, params);
  }
  return replaceParams(translation, params);
}

function replaceParams(text, params) {
  let result = text;
  for (const [key, value] of Object.entries(params)) {
    result = result.replace(new RegExp(`{${key}}`, 'g'), value);
  }
  return result;
}

// Function to set language
function setLanguage(lang) {
  if (translations[lang]) {
    currentLang = lang;
    localStorage.setItem('gym_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    updatePageLanguage();
    updateLanguageToggle();
  }
}

// Function to get current language
function getLanguage() {
  return currentLang;
}

// Function to update language toggle button
function updateLanguageToggle() {
  const toggles = document.querySelectorAll('#lang-toggle');
  toggles.forEach(toggle => {
    if (toggle) {
      toggle.textContent = currentLang === 'ar' ? 'EN' : 'عربي';
    }
  });
}

// Function to update all translatable elements on the page
function updatePageLanguage() {
  // Update elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = t(key);
    if (translation) {
      el.textContent = translation;
    }
  });

  // Update placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const translation = t(key);
    if (translation) {
      el.placeholder = translation;
    }
  });

  // Update title attributes
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    const translation = t(key);
    if (translation) {
      el.title = translation;
    }
  });

  // Update aria-label attributes
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    const translation = t(key);
    if (translation) {
      el.setAttribute('aria-label', translation);
    }
  });

  // Update value attributes for buttons/inputs
  document.querySelectorAll('[data-i18n-value]').forEach(el => {
    const key = el.getAttribute('data-i18n-value');
    const translation = t(key);
    if (translation) {
      el.value = translation;
    }
  });

  updateLanguageToggle();
}

// Auto-initialize language when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
    updatePageLanguage();
  });
} else {
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = currentLang;
  updatePageLanguage();
}