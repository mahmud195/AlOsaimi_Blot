export const SITE_URL = 'https://aalosaimi.com';

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/company/alosaimiconsulting/',
  instagram: 'https://www.instagram.com/alosaimiconsulting/',
  facebook: 'https://www.facebook.com/alosaimiconsulting',
};

export type SiteLanguage = 'en' | 'ar';

type LocalizedText = Record<SiteLanguage, string>;

interface OverviewCard {
  id: string;
  title: LocalizedText;
  body: LocalizedText;
}

interface FaqItem {
  question: LocalizedText;
  answer: LocalizedText;
}

interface ResourceLink {
  href: string;
  label: LocalizedText;
  description: LocalizedText;
}

interface ServiceBrief {
  serviceId: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  audience: LocalizedText;
  deliverables: Record<SiteLanguage, string[]>;
  industries: Record<SiteLanguage, string[]>;
  docPath: string;
}

export const siteCopy = {
  meta: {
    en: {
      siteName: 'Al Osaimi Consulting',
      title: 'Al Osaimi Consulting | Engineering, Architecture, BIM, and Project Delivery in Saudi Arabia',
      description:
        'Al Osaimi Consulting is a Saudi engineering consultancy providing project management, engineering supervision, design services, surveying, architect-of-record support, engineering services, and BIM delivery.',
      locale: 'en_US',
    },
    ar: {
      siteName: 'مكتب العصيمي للاستشارات',
      title: 'مكتب العصيمي للاستشارات | حلول هندسية ومعمارية وBIM وإدارة مشاريع في السعودية',
      description:
        'مكتب العصيمي للاستشارات هو مكتب هندسي في المملكة العربية السعودية يقدم إدارة المشاريع والإشراف الهندسي والخدمات التصميمية وأعمال الرفع المساحي وخدمات مهندس السجل والخدمات الهندسية وحلول BIM.',
      locale: 'ar_SA',
    },
  },
  heroSummary: {
    eyebrow: {
      en: 'Engineering consultancy for built-environment projects in Saudi Arabia',
      ar: 'استشارات هندسية لمشاريع البيئة العمرانية في المملكة العربية السعودية',
    },
    heading: {
      en: 'Al Osaimi Consulting delivers architecture, engineering, project management, and BIM services for complex developments across Saudi Arabia.',
      ar: 'مكتب العصيمي للاستشارات يقدم خدمات العمارة والهندسة وإدارة المشاريع وحلول BIM للمشاريع المتنوعة في المملكة العربية السعودية.',
    },
    body: {
      en: 'We support developers, owners, public-sector entities, and contractors with technically rigorous, code-aware, and delivery-focused consultancy from concept through execution.',
      ar: 'ندعم المطورين والمالكين والجهات الحكومية والمقاولين بخدمات استشارية دقيقة تركز على الامتثال والكفاءة وقابلية التنفيذ من الفكرة وحتى التسليم.',
    },
  },
  overviewCards: [
    {
      id: 'what-we-do',
      title: {
        en: 'What we do',
        ar: 'ماذا نقدم',
      },
      body: {
        en: 'Architectural design, engineering supervision, project management, surveying, architect-of-record services, multidisciplinary engineering, and BIM coordination.',
        ar: 'نقدم التصميم المعماري والإشراف الهندسي وإدارة المشاريع وأعمال الرفع المساحي وخدمات مهندس السجل والخدمات الهندسية متعددة التخصصات وتنسيق BIM.',
      },
    },
    {
      id: 'who-it-is-for',
      title: {
        en: 'Who it is for',
        ar: 'لمن نقدم الخدمة',
      },
      body: {
        en: 'Private clients, developers, owners, institutions, and project teams that need clear engineering guidance, compliant documentation, and dependable delivery support.',
        ar: 'للعملاء الأفراد والمطورين والمالكين والجهات والمؤسسات وفرق المشاريع التي تحتاج إلى توجيه هندسي واضح ووثائق متوافقة ودعم موثوق للتنفيذ.',
      },
    },
    {
      id: 'how-we-work',
      title: {
        en: 'How we work',
        ar: 'كيف نعمل',
      },
      body: {
        en: 'We combine technical planning, stakeholder coordination, code compliance, and digital workflows to reduce execution risk and improve project clarity.',
        ar: 'نجمع بين التخطيط الفني وتنسيق الأطراف والامتثال للأنظمة وسير العمل الرقمي لتقليل المخاطر وتحسين وضوح المشروع.',
      },
    },
    {
      id: 'key-deliverables',
      title: {
        en: 'Key deliverables',
        ar: 'أهم المخرجات',
      },
      body: {
        en: 'Design packages, coordinated models, supervision reports, permit-ready documentation, quantity and scope control, and implementation support.',
        ar: 'حزم تصميمية ونماذج منسقة وتقارير إشراف ووثائق جاهزة للتراخيص وضبط للكميات والنطاق ودعم للتنفيذ.',
      },
    },
  ] satisfies OverviewCard[],
  projectSummary: {
    title: {
      en: 'Project types and sectors',
      ar: 'أنواع المشاريع والقطاعات',
    },
    body: {
      en: 'Featured work includes residential, medical, and mixed-use fuel station developments. The gallery highlights design intent, execution quality, and sector-specific delivery experience.',
      ar: 'تشمل الأعمال المعروضة مشاريع سكنية وطبية ومشاريع محطات وقود متعددة الاستخدامات. ويعرض المعرض خبرتنا في جودة التنفيذ وفهم متطلبات كل قطاع.',
    },
    sectors: {
      en: ['Residential', 'Medical', 'Mixed-use fuel stations'],
      ar: ['سكني', 'طبي', 'محطات وقود متعددة الاستخدامات'],
    },
  },
  contactSummary: {
    title: {
      en: 'Contact and project inquiries',
      ar: 'التواصل وطلبات المشاريع',
    },
    body: {
      en: 'Use the inquiry form to send project details, service requirements, or partnership questions. For machine-readable reference material, review the documentation links below.',
      ar: 'استخدم نموذج التواصل لإرسال تفاصيل المشروع أو متطلبات الخدمة أو أسئلة الشراكة. ولمراجعة المواد المرجعية القابلة للقراءة آلياً، استخدم روابط التوثيق أدناه.',
    },
    note: {
      en: 'Form handling is configured for Netlify deployments. If the site is hosted elsewhere, submission delivery may require host-side form configuration.',
      ar: 'تم إعداد معالجة النموذج لاستضافات Netlify. وإذا تم نشر الموقع على منصة أخرى فقد تحتاج عملية الإرسال إلى إعداد إضافي من جهة الاستضافة.',
    },
  },
  faq: [
    {
      question: {
        en: 'What services does Al Osaimi Consulting provide?',
        ar: 'ما الخدمات التي يقدمها مكتب العصيمي للاستشارات؟',
      },
      answer: {
        en: 'Al Osaimi Consulting provides project management, engineering supervision, design services, surveying works, architect-of-record support, integrated engineering services, and BIM services for projects in Saudi Arabia.',
        ar: 'يقدم مكتب العصيمي للاستشارات إدارة المشاريع والإشراف الهندسي والخدمات التصميمية وأعمال الرفع المساحي وخدمات مهندس السجل والخدمات الهندسية المتكاملة وحلول BIM للمشاريع داخل المملكة العربية السعودية.',
      },
    },
    {
      question: {
        en: 'Who typically works with Al Osaimi Consulting?',
        ar: 'من هم العملاء الذين يعملون عادة مع مكتب العصيمي؟',
      },
      answer: {
        en: 'Typical clients include developers, project owners, institutions, and delivery teams that need coordinated technical documentation, compliance support, and implementation oversight.',
        ar: 'يشمل العملاء عادة المطورين ومالكي المشاريع والجهات المختلفة وفرق التنفيذ التي تحتاج إلى وثائق فنية منسقة ودعم للامتثال وإشراف على التنفيذ.',
      },
    },
    {
      question: {
        en: 'Where does the company operate?',
        ar: 'أين يعمل المكتب؟',
      },
      answer: {
        en: 'The site positions Al Osaimi Consulting as serving projects across the Kingdom of Saudi Arabia, with the capability to support expansion beyond the local market where appropriate.',
        ar: 'يعرض الموقع مكتب العصيمي باعتباره يخدم المشاريع في مختلف أنحاء المملكة العربية السعودية مع القدرة على دعم التوسع خارج السوق المحلي عند الحاجة.',
      },
    },
    {
      question: {
        en: 'How is BIM used in project delivery?',
        ar: 'كيف يتم استخدام BIM في تنفيذ المشاريع؟',
      },
      answer: {
        en: 'BIM is used to coordinate architectural, structural, and MEP disciplines, improve clash detection, support quantity takeoffs, and reduce errors before construction begins.',
        ar: 'يتم استخدام BIM لتنسيق التخصصات المعمارية والإنشائية والميكانيكية والكهربائية والصحية وتحسين كشف التعارضات ودعم حصر الكميات وتقليل الأخطاء قبل بدء التنفيذ.',
      },
    },
    {
      question: {
        en: 'What makes the architect-of-record service important?',
        ar: 'لماذا تعد خدمة مهندس السجل مهمة؟',
      },
      answer: {
        en: 'The architect-of-record service helps move projects from design intent to permit-ready and code-compliant execution by preparing documentation, supporting approvals, and aligning municipal requirements.',
        ar: 'تساعد خدمة مهندس السجل على تحويل الفكرة التصميمية إلى تنفيذ متوافق وجاهز للتراخيص من خلال إعداد الوثائق ودعم الاعتمادات ومواءمة متطلبات الجهات البلدية.',
      },
    },
  ] satisfies FaqItem[],
  resourceLinks: [
    {
      href: '/docs/',
      label: {
        en: 'Documentation Hub',
        ar: 'مركز التوثيق',
      },
      description: {
        en: 'Human and machine-readable resource index for agents, researchers, and project teams.',
        ar: 'فهرس توثيق بشري وآلي للباحثين والأنظمة الذكية وفرق المشاريع.',
      },
    },
    {
      href: '/company-profile.md',
      label: {
        en: 'Company Profile',
        ar: 'الملف التعريفي للشركة',
      },
      description: {
        en: 'Core company facts, leadership reference, service scope, and trust signals in markdown.',
        ar: 'حقائق الشركة الأساسية ومرجع القيادة ونطاق الخدمات ومؤشرات الثقة بصيغة ماركداون.',
      },
    },
    {
      href: '/services-overview.md',
      label: {
        en: 'Services Overview',
        ar: 'نظرة عامة على الخدمات',
      },
      description: {
        en: 'High-level summary of all services, intended users, and project outcomes.',
        ar: 'ملخص عالي المستوى لجميع الخدمات والفئات المستفيدة والنتائج المتوقعة.',
      },
    },
    {
      href: '/projects-overview.md',
      label: {
        en: 'Projects Overview',
        ar: 'نظرة عامة على المشاريع',
      },
      description: {
        en: 'Portfolio categories, project types, and summary language for AI extraction.',
        ar: 'فئات الأعمال وأنواع المشاريع وملخصات مناسبة للاستخراج الآلي.',
      },
    },
    {
      href: '/agent-policy.md',
      label: {
        en: 'Agent Interaction Policy',
        ar: 'سياسة تفاعل الوكلاء',
      },
      description: {
        en: 'Guidance for AI systems, answer engines, and automation tools using this website.',
        ar: 'إرشادات للأنظمة الذكية ومحركات الإجابة وأدوات الأتمتة عند استخدام هذا الموقع.',
      },
    },
    {
      href: '/automation-policy.md',
      label: {
        en: 'Automation and API Status',
        ar: 'حالة الأتمتة وواجهات البرمجة',
      },
      description: {
        en: 'Honest status of APIs, authentication, machine endpoints, and future roadmap items.',
        ar: 'الحالة الفعلية لواجهات البرمجة والمصادقة والنقاط القابلة للقراءة آلياً وخارطة الطريق.',
      },
    },
    {
      href: '/llms.txt',
      label: {
        en: 'llms.txt',
        ar: 'ملف llms.txt',
      },
      description: {
        en: 'Short machine-readable guide to the site and its authoritative resources.',
        ar: 'دليل آلي مختصر للموقع ومصادره المرجعية الأساسية.',
      },
    },
    {
      href: '/llms-full.txt',
      label: {
        en: 'llms-full.txt',
        ar: 'ملف llms-full.txt',
      },
      description: {
        en: 'Expanded machine-readable context with services, FAQs, and documentation references.',
        ar: 'سياق موسع قابل للقراءة آلياً يتضمن الخدمات والأسئلة الشائعة وروابط التوثيق.',
      },
    },
  ] satisfies ResourceLink[],
} as const;

export const serviceBriefs: ServiceBrief[] = [
  {
    serviceId: 'projectManagement',
    slug: 'project-management',
    title: {
      en: 'Project Management',
      ar: 'إدارة المشاريع',
    },
    summary: {
      en: 'Project management services focused on schedule discipline, resource planning, scope control, and quality-led delivery.',
      ar: 'خدمات إدارة مشاريع تركز على الانضباط الزمني وتخطيط الموارد وضبط النطاق وجودة التنفيذ.',
    },
    audience: {
      en: 'For owners, developers, and stakeholders who need structured delivery oversight from project kickoff through completion.',
      ar: 'موجهة للمالكين والمطورين والجهات التي تحتاج إلى إشراف منظم على التنفيذ من بداية المشروع حتى اكتماله.',
    },
    deliverables: {
      en: ['Project planning', 'Budget and scope tracking', 'Schedule monitoring', 'Stakeholder coordination'],
      ar: ['تخطيط المشروع', 'متابعة الميزانية والنطاق', 'مراقبة الجدول الزمني', 'تنسيق الأطراف'],
    },
    industries: {
      en: ['Residential', 'Commercial', 'Institutional'],
      ar: ['سكني', 'تجاري', 'مؤسسي'],
    },
    docPath: '/service-briefs/project-management.md',
  },
  {
    serviceId: 'engineeringSupervision',
    slug: 'engineering-supervision',
    title: {
      en: 'Engineering Supervision',
      ar: 'الإشراف الهندسي',
    },
    summary: {
      en: 'Engineering supervision that aligns drawings, agreements, bills of quantities, and on-site execution with project objectives.',
      ar: 'إشراف هندسي يربط بين المخططات والعقود وجداول الكميات والتنفيذ الموقعي بما يحقق أهداف المشروع.',
    },
    audience: {
      en: 'For projects that require close technical follow-up, issue resolution, and quality assurance during implementation.',
      ar: 'مناسبة للمشاريع التي تحتاج إلى متابعة فنية دقيقة وحل للمشكلات وضمان للجودة أثناء التنفيذ.',
    },
    deliverables: {
      en: ['Technical reviews', 'Execution monitoring', 'Contractor coordination', 'Quality observations'],
      ar: ['مراجعات فنية', 'متابعة التنفيذ', 'تنسيق المقاولين', 'ملاحظات الجودة'],
    },
    industries: {
      en: ['Residential', 'Medical', 'Mixed-use'],
      ar: ['سكني', 'طبي', 'متعدد الاستخدامات'],
    },
    docPath: '/service-briefs/engineering-supervision.md',
  },
  {
    serviceId: 'designServices',
    slug: 'design-services',
    title: {
      en: 'Design Services',
      ar: 'الخدمات التصميمية',
    },
    summary: {
      en: 'Integrated design services combining architecture, interiors, landscape, structure, and electromechanical planning.',
      ar: 'خدمات تصميم متكاملة تجمع بين العمارة والتصميم الداخلي واللاندسكيب والإنشاء والتخطيط الكهروميكانيكي.',
    },
    audience: {
      en: 'For clients who need concept development, coordinated design thinking, and function-driven built environments.',
      ar: 'موجهة للعملاء الذين يحتاجون إلى تطوير مفاهيم تصميمية متكاملة وبيئات مبنية تجمع بين الجمال والوظيفة.',
    },
    deliverables: {
      en: ['Architectural design', 'Interior design', 'Landscape and urban design', 'Structural and MEP coordination'],
      ar: ['تصميم معماري', 'تصميم داخلي', 'تصميم حضري ولاندسكيب', 'تنسيق إنشائي وكهروميكانيكي'],
    },
    industries: {
      en: ['Residential', 'Hospitality', 'Commercial'],
      ar: ['سكني', 'ضيافة', 'تجاري'],
    },
    docPath: '/service-briefs/design-services.md',
  },
  {
    serviceId: 'surveyingWorks',
    slug: 'surveying-works',
    title: {
      en: 'Surveying Works',
      ar: 'أعمال الرفع المساحي',
    },
    summary: {
      en: 'Surveying services that provide accurate site data for design development, land planning, and infrastructure decision-making.',
      ar: 'خدمات رفع مساحي توفر بيانات دقيقة للموقع لدعم التصميم والتخطيط العقاري والبنية التحتية.',
    },
    audience: {
      en: 'For teams that need dependable measurement, land information, and site intelligence before or during delivery.',
      ar: 'مناسبة للفرق التي تحتاج إلى قياسات موثوقة وبيانات أرض دقيقة وفهم واضح للموقع قبل التنفيذ أو أثناءه.',
    },
    deliverables: {
      en: ['Topographic data', 'Site measurement', 'Land and infrastructure support', 'Survey coordination'],
      ar: ['بيانات طبوغرافية', 'قياسات موقعية', 'دعم للأراضي والبنية التحتية', 'تنسيق أعمال المساحة'],
    },
    industries: {
      en: ['Land development', 'Infrastructure', 'Construction'],
      ar: ['تطوير الأراضي', 'البنية التحتية', 'الإنشاءات'],
    },
    docPath: '/service-briefs/surveying-works.md',
  },
  {
    serviceId: 'architectOfRecord',
    slug: 'architect-of-record',
    title: {
      en: 'Architect of Record',
      ar: 'مهندس السجل',
    },
    summary: {
      en: 'Architect-of-record support for permit-ready documentation, authority coordination, and compliance with Saudi municipal requirements and building code expectations.',
      ar: 'خدمة مهندس السجل لإعداد وثائق جاهزة للاعتماد والتنسيق مع الجهات والامتثال للمتطلبات البلدية وكود البناء السعودي.',
    },
    audience: {
      en: 'For clients that need approvals, permit support, and a reliable route from design intent to compliant execution.',
      ar: 'موجهة للعملاء الذين يحتاجون إلى الاعتمادات والتراخيص ومسار واضح من الفكرة التصميمية إلى تنفيذ متوافق.',
    },
    deliverables: {
      en: ['Permit documentation', 'Municipal compliance review', 'Authority coordination', 'Code-aware design support'],
      ar: ['وثائق التراخيص', 'مراجعة الامتثال البلدي', 'التنسيق مع الجهات', 'دعم تصميمي متوافق مع الكود'],
    },
    industries: {
      en: ['Residential', 'Commercial', 'Institutional'],
      ar: ['سكني', 'تجاري', 'مؤسسي'],
    },
    docPath: '/service-briefs/architect-of-record.md',
  },
  {
    serviceId: 'engineeringServices',
    slug: 'engineering-services',
    title: {
      en: 'Engineering Services',
      ar: 'الخدمات الهندسية',
    },
    summary: {
      en: 'Integrated engineering services covering structural, MEP, and infrastructure systems through coordinated digital workflows.',
      ar: 'خدمات هندسية متكاملة تشمل الإنشاء والميكانيكا والكهرباء والصحة والبنية التحتية من خلال سير عمل رقمي منسق.',
    },
    audience: {
      en: 'For projects that need coordinated engineering packages, clash reduction, and technically buildable solutions.',
      ar: 'مناسبة للمشاريع التي تحتاج إلى حزم هندسية منسقة وتقليل التعارضات وحلول قابلة للتنفيذ.',
    },
    deliverables: {
      en: ['Structural systems', 'MEP coordination', 'Infrastructure planning', 'Buildable technical models'],
      ar: ['أنظمة إنشائية', 'تنسيق MEP', 'تخطيط البنية التحتية', 'نماذج فنية قابلة للتنفيذ'],
    },
    industries: {
      en: ['Masterplanning', 'Buildings', 'Infrastructure'],
      ar: ['المخططات الرئيسية', 'المباني', 'البنية التحتية'],
    },
    docPath: '/service-briefs/engineering-services.md',
  },
  {
    serviceId: 'bimServices',
    slug: 'bim-services',
    title: {
      en: 'BIM Services',
      ar: 'خدمات BIM',
    },
    summary: {
      en: 'BIM services for 3D coordination, clash detection, quantity takeoffs, and digitally verified project delivery.',
      ar: 'خدمات BIM للتنسيق ثلاثي الأبعاد وكشف التعارضات وحصر الكميات والتحقق الرقمي من المشروع قبل التنفيذ.',
    },
    audience: {
      en: 'For design, construction, and operations teams that need clearer coordination and fewer downstream errors.',
      ar: 'موجهة لفرق التصميم والتنفيذ والتشغيل التي تحتاج إلى تنسيق أوضح وتقليل الأخطاء في المراحل اللاحقة.',
    },
    deliverables: {
      en: ['3D models', 'Clash detection', 'Quantity takeoffs', 'LOD-based deliverables'],
      ar: ['نماذج ثلاثية الأبعاد', 'كشف التعارضات', 'حصر الكميات', 'مخرجات حسب مستويات التفاصيل'],
    },
    industries: {
      en: ['Architecture', 'Engineering', 'Construction'],
      ar: ['العمارة', 'الهندسة', 'الإنشاء'],
    },
    docPath: '/service-briefs/bim-services.md',
  },
];

export function getLocalizedText(text: LocalizedText, language: SiteLanguage) {
  return text[language];
}

