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
    'nav.canteen': 'Canteen',
    
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
    'members.expired': 'Expired',
    'members.expires': 'Expires',
    'members.unknown': 'Unknown Member',
    'members.noemail': 'No email',
    'members.add': 'Add Member',
    'members.plan': 'Plan',
    'members.status': 'Status',
    'members.points': 'Loyalty Points',
    'members.qr': 'QR Code',
    'members.qr.download': 'Download QR',
    'members.card.title': 'Membership Card',
    'members.card.view': 'Full Card',
    'members.card.download': 'Download Card',
    'members.subscription.details': 'Subscription Details',
    'members.recent.checkins': 'Recent Check-ins',
    'members.no.checkins': 'No check-ins yet',
    
    // Canteen
    'canteen.title': 'Canteen Management',
    'canteen.desc': 'Manage products, track sales, and process QR code purchases',
    'canteen.scan': 'Scan QR',
    'canteen.add.product': 'Add Product',
    'canteen.products': 'Products',
    'canteen.inventory': 'Inventory',
    'canteen.sales': 'Sales',
    'canteen.member.qr': 'Member QR',
    'canteen.print.qr': 'Print QR',
    'canteen.search': 'Search products...',
    'canteen.all.categories': 'All Categories',
    'canteen.print.all.qr': 'Print All QR',
    'canteen.no.products': 'No products found',
    'canteen.available': 'available',
    'canteen.sold': 'sold',
    'canteen.total': 'total',
    'canteen.qr.codes': 'QR Codes',
    'canteen.delete': 'Delete',
    'canteen.inventory.status': 'Inventory Status',
    'canteen.track.inventory': 'Track available, sold, and reserved items',
    'canteen.total.items': 'Total Items',
    'canteen.available.items': 'Available',
    'canteen.sold.items': 'Sold',
    'canteen.reserved.items': 'Reserved',
    'canteen.no.items': 'No items in inventory',
    'canteen.recent.sales': 'Recent Sales',
    'canteen.track.sales': 'Track all customer purchases',
    'canteen.no.sales': 'No sales yet',
    'canteen.member.qr.codes': 'Member QR Codes',
    'canteen.generate.manage': 'Generate and manage member QR codes for check-in',
    'canteen.select.member': 'Select a member',
    'canteen.generate.qr': 'Generate QR',
    'canteen.print': 'Print',
    'canteen.print.qr.codes': 'Print QR Codes',
    'canteen.select.products': 'Select products to print their QR codes',
    'canteen.select.all': 'Select All',
    'canteen.deselect.all': 'Deselect All',
    'canteen.print.selected': 'Print Selected',
    'canteen.download.pdf': 'Download PDF',
    'canteen.no.products.available': 'No products available',
    'canteen.available.qr.codes': 'available QR codes',
    'canteen.print.all': 'Print All',
    'canteen.add.new.product': 'Add New Product',
    'canteen.product.name': 'Product Name',
    'canteen.description': 'Description',
    'canteen.price': 'Price',
    'canteen.category': 'Category',
    'canteen.quantity': 'Quantity',
    'canteen.each.item.unique.qr': 'Each item will get a unique QR code',
    'canteen.cancel': 'Cancel',
    'canteen.add.product.btn': 'Add Product',
    'canteen.scan.qr.code': 'Scan QR Code',
    'canteen.flash': 'Flash',
    'canteen.align.qr': 'Align the QR code within the frame to scan',
    'canteen.enter.manual': 'Or enter QR code manually...',
    'canteen.process': 'Process',
    'canteen.product.items': 'Product Items',
    'canteen.select.member.purchase': 'Choose the member who is purchasing this item',
    'canteen.confirm.purchase': 'Confirm Purchase',
    
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
    'settings.logo': 'Gym Logo',
    'settings.logo.desc': 'Appears on member cards',
    'settings.logo.upload': 'Upload your gym logo to display on member cards instead of the gym name text.',
    'settings.upload.logo': 'Upload Logo',
    'settings.remove.logo': 'Remove Logo',
    'settings.card.templates': 'Card Templates',
    'settings.choose.template': 'Choose member card style',
    'settings.template.desc': 'Select a template for member QR cards. This will be used when printing from the Canteen page.',
    'settings.save.template': 'Save Template Selection',
    'settings.membership.plans': 'Membership Plans',
    'settings.manage.plans': 'Manage subscription plans',
    'settings.add.plan': 'Add New Plan',
    'settings.plan.name': 'Plan Name',
    'settings.plan.months': 'Months',
    'settings.plan.price': 'Price',
    'settings.plan.perks': 'Perks (comma separated)',
    'settings.add.plan.btn': 'Add Plan',
    'settings.no.plans': 'No membership plans yet. Add one below!',
    'settings.save.all': 'Save All Settings',

    // Settings - Import Data
    'settings.import.title': 'Import Data',
    'settings.import.badge': 'Bring data from an old system',
    'settings.import.desc': "Have a gym's old member list somewhere else (Excel, another app, paper records typed up)? Follow the steps below to bring it into this system.",
    'settings.import.steps.title': 'How to use it:',
    'settings.import.step1': "Click \"Download CSV Template\" to get an empty file with the right columns.",
    'settings.import.step2': "Open that file in Excel (or Google Sheets) and fill in one row per member: name, email, phone, membership plan, join date.",
    'settings.import.step3': "Save the file, then click \"Choose CSV File\" and select the file you just filled in.",
    'settings.import.step4': "Check the preview that appears — it shows the first few members read from your file, so you can make sure everything looks right.",
    'settings.import.step5': "Click \"Start Import\" and leave it running. It will create a real account, QR code, and subscription for every member on its own, and show you which ones succeeded and which had a problem.",
    'settings.import.download.template': 'Download CSV Template',
    'settings.import.choose.file': 'Choose CSV File',
    'settings.import.found.count': 'Found {count} members. Preview of the first rows:',
    'settings.import.start': 'Start Import',
    'settings.import.importing': 'Importing...',
    'settings.import.progress': '{done} / {total} — ✅ {success} imported, ❌ {failed} failed',
    'settings.import.row.success': '{name} imported',
    'settings.import.row.failed.generic': '{name} failed',
    'settings.import.finished': 'Import finished: {success} imported, {failed} failed',
    'settings.import.hint': 'Not sure yet how your old system exports data? Most systems have an "Export" or "Reports" button that gives you CSV or Excel — check there first. Once you see it, we can also add attendance history, loyalty points, and canteen sales import to match its exact columns.',

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
    'nav.canteen': 'الكانتين',
    
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
    'members.expired': 'منتهي',
    'members.expires': 'ينتهي',
    'members.qr.download': 'تحميل QR',
    'members.card.title': 'بطاقة العضوية',
    'members.card.view': 'البطاقة كاملة',
    'members.card.download': 'تحميل البطاقة',
    'members.unknown': 'عضو غير معروف',
    'members.noemail': 'لا يوجد بريد إلكتروني',
    'members.add': 'إضافة عضو',
    'members.plan': 'الخطة',
    'members.status': 'الحالة',
    'members.points': 'نقاط الولاء',
    'members.qr': 'رمز QR',
    'members.subscription.details': 'تفاصيل الاشتراك',
    'members.recent.checkins': 'آخر تسجيلات الحضور',
    'members.no.checkins': 'لا توجد تسجيلات حضور',
    
    // Canteen
    'canteen.title': 'إدارة الكانتين',
    'canteen.desc': 'إدارة المنتجات وتتبع المبيعات ومعالجة مشتريات QR',
    'canteen.scan': 'مسح QR',
    'canteen.add.product': 'إضافة منتج',
    'canteen.products': 'المنتجات',
    'canteen.inventory': 'المخزون',
    'canteen.sales': 'المبيعات',
    'canteen.member.qr': 'QR العضو',
    'canteen.print.qr': 'طباعة QR',
    'canteen.search': 'ابحث عن منتجات...',
    'canteen.all.categories': 'جميع الفئات',
    'canteen.print.all.qr': 'طباعة كل QR',
    'canteen.no.products': 'لا توجد منتجات',
    'canteen.available': 'متاح',
    'canteen.sold': 'تم البيع',
    'canteen.total': 'الإجمالي',
    'canteen.qr.codes': 'رموز QR',
    'canteen.delete': 'حذف',
    'canteen.inventory.status': 'حالة المخزون',
    'canteen.track.inventory': 'تتبع العناصر المتاحة والمباعة والمحجوزة',
    'canteen.total.items': 'إجمالي العناصر',
    'canteen.available.items': 'متاح',
    'canteen.sold.items': 'تم البيع',
    'canteen.reserved.items': 'محجوز',
    'canteen.no.items': 'لا توجد عناصر في المخزون',
    'canteen.recent.sales': 'آخر المبيعات',
    'canteen.track.sales': 'تتبع جميع مشتريات العملاء',
    'canteen.no.sales': 'لا توجد مبيعات حتى الآن',
    'canteen.member.qr.codes': 'رموز QR للأعضاء',
    'canteen.generate.manage': 'إنشاء وإدارة رموز QR للأعضاء لتسجيل الحضور',
    'canteen.select.member': 'اختر عضوًا',
    'canteen.generate.qr': 'إنشاء QR',
    'canteen.print': 'طباعة',
    'canteen.print.qr.codes': 'طباعة رموز QR',
    'canteen.select.products': 'اختر المنتجات لطباعة رموز QR الخاصة بها',
    'canteen.select.all': 'تحديد الكل',
    'canteen.deselect.all': 'إلغاء تحديد الكل',
    'canteen.print.selected': 'طباعة المحدد',
    'canteen.download.pdf': 'تحميل PDF',
    'canteen.no.products.available': 'لا توجد منتجات متاحة',
    'canteen.available.qr.codes': 'رموز QR متاحة',
    'canteen.print.all': 'طباعة الكل',
    'canteen.add.new.product': 'إضافة منتج جديد',
    'canteen.product.name': 'اسم المنتج',
    'canteen.description': 'الوصف',
    'canteen.price': 'السعر',
    'canteen.category': 'الفئة',
    'canteen.quantity': 'الكمية',
    'canteen.each.item.unique.qr': 'كل عنصر سيحصل على رمز QR فريد',
    'canteen.cancel': 'إلغاء',
    'canteen.add.product.btn': 'إضافة منتج',
    'canteen.scan.qr.code': 'مسح رمز QR',
    'canteen.flash': 'فلاش',
    'canteen.align.qr': 'قم بمحاذاة رمز QR داخل الإطار للمسح',
    'canteen.enter.manual': 'أو أدخل رمز QR يدويًا...',
    'canteen.process': 'معالجة',
    'canteen.product.items': 'عناصر المنتج',
    'canteen.select.member.purchase': 'اختر العضو الذي يشتري هذا العنصر',
    'canteen.confirm.purchase': 'تأكيد الشراء',
    
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
    'loyalty.settings.canteen': 'نقاط لكل وحدة عملة عند شراء من الكانتين',
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
    'settings.logo': 'شعار الجيم',
    'settings.logo.desc': 'يظهر على بطاقات الأعضاء',
    'settings.logo.upload': 'ارفع شعار الجيم ليظهر على بطاقات الأعضاء بدلاً من اسم الجيم النصي.',
    'settings.upload.logo': 'رفع الشعار',
    'settings.remove.logo': 'حذف الشعار',
    'settings.card.templates': 'قوالب البطاقات',
    'settings.choose.template': 'اختر نمط بطاقة العضو',
    'settings.template.desc': 'اختر قالبًا لبطاقات QR الخاصة بالأعضاء. سيتم استخدام هذا عند الطباعة من صفحة الكانتين.',
    'settings.save.template': 'حفظ اختيار القالب',
    'settings.membership.plans': 'خطط العضوية',
    'settings.manage.plans': 'إدارة خطط الاشتراك',
    'settings.add.plan': 'إضافة خطة جديدة',
    'settings.plan.name': 'اسم الخطة',
    'settings.plan.months': 'الأشهر',
    'settings.plan.price': 'السعر',
    'settings.plan.perks': 'المميزات (مفصولة بفواصل)',
    'settings.add.plan.btn': 'إضافة خطة',
    'settings.no.plans': 'لا توجد خطط عضوية حتى الآن. أضف واحدة أدناه!',
    'settings.save.all': 'حفظ جميع الإعدادات',

    // Settings - Import Data
    'settings.import.title': 'استيراد البيانات',
    'settings.import.badge': 'انقل بيانات من نظام قديم',
    'settings.import.desc': 'عندك قايمة أعضاء جيم قديمة في مكان تاني (ملف إكسل، برنامج تاني، أو حتى مكتوبة وحطيتها في ملف)؟ اتبع الخطوات دي عشان تنقلها للنظام ده.',
    'settings.import.steps.title': 'إزاي تستخدمها:',
    'settings.import.step1': 'دوس على "تحميل نموذج CSV" عشان تاخد ملف فاضي فيه الأعمدة المطلوبة بالظبط.',
    'settings.import.step2': 'افتح الملف ده على Excel (أو Google Sheets) واملأ صف لكل عضو: الاسم، الإيميل، رقم التليفون، اسم باقة الاشتراك، وتاريخ الانضمام.',
    'settings.import.step3': 'احفظ الملف، وبعدين دوس على "اختر ملف CSV" واختار نفس الملف اللي ملأته.',
    'settings.import.step4': 'هتلاقي معاينة ظاهرة قدامك بتوريك أول شوية أعضاء اتقروا من الملف، عشان تتأكد إن كل حاجة صح.',
    'settings.import.step5': 'دوس على "بدء الاستيراد" وسيبها شغالة. هي هتعمل لوحدها حساب وQR code واشتراك لكل عضو، وهتوريك مين اتضاف بنجاح ومين حصله مشكلة.',
    'settings.import.download.template': 'تحميل نموذج CSV',
    'settings.import.choose.file': 'اختر ملف CSV',
    'settings.import.found.count': 'تم العثور على {count} عضو. معاينة أول الصفوف:',
    'settings.import.start': 'بدء الاستيراد',
    'settings.import.importing': 'جاري الاستيراد...',
    'settings.import.progress': '{done} / {total} — ✅ تم استيراد {success}، ❌ فشل {failed}',
    'settings.import.row.success': 'تم استيراد {name}',
    'settings.import.row.failed.generic': 'فشل استيراد {name}',
    'settings.import.finished': 'اكتمل الاستيراد: تم استيراد {success}، وفشل {failed}',
    'settings.import.hint': 'مش عارف لسه إزاي النظام القديم بيصدّر البيانات؟ معظم الأنظمة فيها زرار "Export" أو "Reports" بيديك CSV أو Excel — دور عليه الأول. لما تلاقيه، هنقدر كمان نضيف استيراد سجل الحضور، ونقاط الولاء، ومبيعات الكانتين بنفس أعمدته بالظبط.',

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

// Apply language direction immediately
document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
document.documentElement.lang = currentLang;

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
    if (translation && translation !== key) {
      el.textContent = translation;
    }
  });

  // Update placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const translation = t(key);
    if (translation && translation !== key) {
      el.placeholder = translation;
    }
  });

  // Update title attributes
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    const translation = t(key);
    if (translation && translation !== key) {
      el.title = translation;
    }
  });

  // Update aria-label attributes
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    const translation = t(key);
    if (translation && translation !== key) {
      el.setAttribute('aria-label', translation);
    }
  });

  // Update value attributes for buttons/inputs
  document.querySelectorAll('[data-i18n-value]').forEach(el => {
    const key = el.getAttribute('data-i18n-value');
    const translation = t(key);
    if (translation && translation !== key) {
      el.value = translation;
    }
  });

  // تحديث زر اللغة
  updateLanguageToggle();
}

// Auto-initialize language when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    updatePageLanguage();
  });
} else {
  updatePageLanguage();
}

// ============================================
// استماع لتغيرات اللغة من أي مكان
// ============================================
window.addEventListener('storage', function(e) {
  if (e.key === 'gym_lang') {
    const newLang = e.newValue || 'en';
    if (translations[newLang]) {
      currentLang = newLang;
      document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = newLang;
      updatePageLanguage();
      updateLanguageToggle();
    }
  }
});
