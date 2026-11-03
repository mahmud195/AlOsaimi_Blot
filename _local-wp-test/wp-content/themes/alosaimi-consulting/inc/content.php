<?php
/**
 * Source-of-truth content migrated from the React translations/assets.
 */

if (!defined('ABSPATH')) {
    exit;
}

function aoc_default_site_data(): array
{
    $base = 'AlOsaimi_Website_Design 02_Folder';
    $logos = $base . '/Used Elements/Logos';
    $clients = $base . '/AlOsaimi_Clients/AlOsaimi_Clients';
    $certs = $base . '/AlOsaimi_Certificates/AlOsaimi_Certificates';
    $services = $base . '/Pics For Website_Our Services';
    $projects = $base . '/projects/wetransfer_projects-for-website_2026-02-08_1447';

    return [
        'media' => [
            'favicon' => 'favicon.png',
            'logo_white' => $logos . '/AOC Logo White.png',
            'logo_mobile' => $logos . '/AOCMobile.png',
            'befound' => $logos . '/BeFound Sigment.png',
            'hero_video' => $base . '/Used Elements/Video/AOC_hero.mp4',
            'hero_poster' => 'video_poster.jpg',
            'about_image' => 'asset_16.png',
            'project_section_images' => [
                $base . '/projects/picutres for section project/IMG-20250906-WA0059 (1).jpg.jpeg',
                $base . '/projects/picutres for section project/IMG-20250906-WA0060 (1).jpg.jpeg',
                $base . '/projects/picutres for section project/IMG-20250906-WA0061 (1).jpg.jpeg',
            ],
        ],
        'social' => [
            'linkedin' => 'https://www.linkedin.com/company/alosaimiconsulting/',
            'instagram' => 'https://www.instagram.com/alosaimiconsulting/',
            'facebook' => 'https://www.facebook.com/alosaimiconsulting',
            'befound' => 'https://www.befound.design/',
        ],
        'nav_items' => [
            ['id' => 'home', 'href' => '#home'],
            ['id' => 'about', 'href' => '#about'],
            ['id' => 'services', 'href' => '#services'],
            ['id' => 'projects', 'href' => '#projects'],
            ['id' => 'contact', 'href' => '#contact'],
        ],
        'translations' => [
            'en' => [
                'nav' => [
                    'home' => 'Home',
                    'about' => 'About',
                    'services' => 'Services',
                    'projects' => 'Projects',
                    'contact' => 'Contact',
                ],
                'hero' => [
                    'title' => 'PRECISION   •   INNOVATION   •   TRUST   •   PRECISION   •   INNOVATION   •   TRUST   •   ',
                    'words' => ['PRECISION', '•', 'INNOVATION', '•', 'TRUST', '•', 'PRECISION', '•', 'INNOVATION', '•', 'TRUST', '•'],
                ],
                'about' => [
                    'title' => "ABOUT\nUS",
                    'paragraph1' => 'Al Osaimi Consulting Office is a trusted partner dedicated to advancing the future of urban development and engineering. Guided by extensive expertise and an ambitious vision, we strive to build stronger connections with our clients while reinforcing our presence in the Kingdom of Saudi Arabia and pursuing continuous expansion beyond its borders.',
                    'paragraph2' => 'At Al Osaimi Consulting, we place quality and innovation at the core of everything we do, delivering engineering solutions that exceed standards and meet the aspirations of our clients, affirming our mission to lead in the world of engineering consultancy.',
                    'ceoSpeechTitle' => "CEO'S\nSPEECH",
                    'ceoName' => "ENG. ABDULLAH\nMOHAMMED HAMDAN",
                    'ceoTitle' => 'CHIEF EXECUTIVE OFFICER & HEAD OF DEVELOPMENT',
                    'ceoSpeech' => [
                        'At Al Osaimi Consulting, we take pride in a legacy built through perseverance and a commitment to excellence.',
                        'The principles that guided our foundation hard work, precision, and reliability, remain the cornerstone of our continued growth and success.',
                        'As we move forward, our focus is on developing this legacy through innovation, expanding our expertise, and maintaining the same level of dedication that has defined us since the beginning.',
                        'Each project we undertake is a new opportunity to reaffirm our standards, strengthen our relationships, and create lasting value for our clients and communities.',
                        'Our journey is one of continuous growth grounded in the belief that progress is achieved through consistent effort and an unwavering pursuit of quality.',
                        'At Al Osaimi Consulting, we honor our foundation not by looking back, but by building forward with the same determination that brought us here.',
                    ],
                ],
                'services' => [
                    'title' => "OUR\nSERVICES",
                    'locationPrefix' => 'Location: ',
                    'scroll' => 'Scroll',
                    'readMore' => 'Read More',
                    'creativePartner' => 'With our Creative Partner',
                    'accreditations' => 'Accreditations & Classifications',
                    'builtOn' => 'Built on a solid foundation of trust and driven by a relentless passion for excellence, we create innovative solutions that contribute to building a sustainable future.',
                    'intro' => 'We provide comprehensive architectural and engineering solutions tailored to transform your vision into exceptional built environments. Our services span from conceptual design through project delivery, combining innovative thinking with technical excellence.',
                ],
                'projectsGallery' => [
                    'sectionTitle' => 'OUR PROJECTS',
                    'learnMore' => 'LEARN MORE',
                    'categories' => [
                        ['key' => 'RESIDENTIAL', 'label' => 'RESIDENTIAL'],
                        ['key' => 'MEDICAL', 'label' => 'MEDICAL'],
                        ['key' => 'GAS_STATIONS', 'label' => 'GAS STATIONS'],
                    ],
                ],
                'contact' => [
                    'title' => "CONTACT\nUS",
                    'firstName' => 'FIRST NAME',
                    'lastName' => 'LAST NAME',
                    'email' => 'EMAIL',
                    'message' => 'MESSAGE',
                    'send' => 'SEND MESSAGE',
                ],
                'language' => 'EN',
            ],
            'ar' => [
                'nav' => [
                    'home' => 'الرئيسية',
                    'about' => 'حول',
                    'services' => 'الخدمات',
                    'projects' => 'المشاريع',
                    'contact' => 'اتصل',
                ],
                'hero' => [
                    'title' => 'الدقة                                                          •                                                          الابتكار                                                          •                                                          الثقة                                                          •                                                          ',
                    'words' => ['الثقة', '•', 'الابتكار', '•', 'الدقة', '•', 'الثقة', '•', 'الابتكار', '•', 'الدقة', '•', 'الثقة', '•', 'الابتكار', '•', 'الدقة', '•'],
                ],
                'about' => [
                    'title' => "من\nنحن",
                    'paragraph1' => 'مكتب العصيمي للاستشارات شريك موثوق مكرس للنهوض بمستقبل التنمية العمرانية والهندسة. مسترشدين بخبرة واسعة ورؤية طموحة، نسعى لبناء روابط أقوى مع عملائنا مع تعزيز حضورنا في المملكة العربية السعودية ومتابعة التوسع المستمر خارج حدودها.',
                    'paragraph2' => 'في العصيمي للاستشارات، نضع الجودة والابتكار في صميم كل ما نقوم به، ونقدم حلولاً هندسية تتجاوز المعايير وتلبي تطلعات عملائنا، مؤكدين على مهمتنا في الريادة في عالم الاستشارات الهندسية.',
                    'ceoSpeechTitle' => "كلمة\nالرئيس التنفيذي",
                    'ceoName' => "م. عبدالله\nمحمد حمدان",
                    'ceoTitle' => 'الرئيس التنفيذي ورئيس التطوير',
                    'ceoSpeech' => [
                        'في الاستشارات، نفتخر بإرث تم بناؤه من خلال المثابرة والالتزام بالتميز.',
                        'المبادئ التي وجهت أساسنا من العمل الجاد والدقة والموثوقية، تظل حجر الزاوية في نمونا المستمر ونجاحنا.',
                        'بينما نمضي قدماً، ينصب تركيزنا على تطوير هذا الإرث من خلال الابتكار، وتوسيع خبراتنا، والحفاظ على نفس المستوى من التفاني الذي ميزنا منذ البداية.',
                        'كل مشروع نتولاه هو فرصة جديدة للتأكيد على معاييرنا، وتعزيز علاقاتنا، وخلق قيمة دائمة لعملائنا ومجتمعاتنا.',
                        'رحلتنا هي رحلة نمو مستمر يرتكز على الإيمان بأن التقدم يتحقق من خلال الجهد المستمر والسعي الدؤوب لتحقيق الجودة.',
                        'في الاستشارات، لا نكرم أساسنا من خلال النظر إلى الوراء، ولكن من خلال البناء إلى الأمام بنفس التصميم الذي أوصلنا إلى هنا.',
                    ],
                ],
                'services' => [
                    'title' => 'خدماتنا',
                    'locationPrefix' => 'الموقع: ',
                    'scroll' => 'تصفح',
                    'readMore' => 'اقرأ المزيد',
                    'creativePartner' => 'مع شريكنا الإبداعي',
                    'accreditations' => 'الاعتمادات والتصنيفات',
                    'builtOn' => 'بُنيت على أساس متين من الثقة ومدفوعة بشغف لا هوادة فيه للتميز، نعمل على إيجاد حلول مبتكرة تساهم في بناء مستقبل مستدام.',
                    'intro' => 'نقدم حلولاً معمارية وهندسية شاملة مصممة خصيصاً لتحويل رؤيتك إلى بيئات مبنية استثنائية. تمتد خدماتنا من التصميم الأولي حتى تسليم المشروع، حيث نجمع بين التفكير المبتكر والتميز التقني.',
                ],
                'projectsGallery' => [
                    'sectionTitle' => 'مشاريعنا',
                    'learnMore' => 'اعرف المزيد',
                    'categories' => [
                        ['key' => 'RESIDENTIAL', 'label' => 'سكني'],
                        ['key' => 'MEDICAL', 'label' => 'طبي'],
                        ['key' => 'GAS_STATIONS', 'label' => 'محطات وقود'],
                    ],
                ],
                'contact' => [
                    'title' => 'اتصل بنا',
                    'firstName' => 'الاسم الأول',
                    'lastName' => 'الاسم الأخير',
                    'email' => 'البريد الإلكتروني',
                    'message' => 'الرسالة',
                    'send' => 'إرسال الرسالة',
                ],
                'language' => 'AR',
            ],
        ],
        'services' => [
            [
                'id' => 'projectManagement',
                'image' => $services . '/project_management.png',
                'en' => [
                    'title' => 'PROJECT MANAGEMENT',
                    'description' => 'Efficiently organizing and utilizing available resources to ensure the highest levels of performance and quality in project execution.',
                    'place' => 'Kingdom of Saudi Arabia',
                    'fullDescription' => 'At Al Osaimi Consulting, we place great emphasis on achieving the core objectives of project management by efficiently organizing and utilizing available resources—both human and financial—to ensure the highest levels of performance and quality in project execution. We are committed to fulfilling all aspects of project management, including precise goal setting, adherence to schedules, budget control, and scope management, guaranteeing the success of each project from concept to reality.',
                ],
                'ar' => [
                    'title' => 'إدارة المشاريع',
                    'description' => 'تنظيم واستخدام الموارد المتاحة بكفاءة لضمان أعلى مستويات الأداء والجودة في تنفيذ المشاريع.',
                    'place' => 'المملكة العربية السعودية',
                    'fullDescription' => 'في مكتب العصيمي للاستشارات، نولي أهمية كبيرة لتحقيق الأهداف الجوهرية لإدارة المشاريع من خلال التنظيم الفعّال واستخدام الموارد المتاحة — البشرية والمالية — لضمان أعلى مستويات الأداء والجودة في تنفيذ المشاريع. نحن ملتزمون بتحقيق جميع جوانب إدارة المشاريع، بما في ذلك تحديد الأهداف بدقة، والالتزام بالجداول الزمنية، ومراقبة الميزانية، وإدارة النطاق، لضمان نجاح كل مشروع من المفهوم إلى الواقع.',
                ],
            ],
            [
                'id' => 'engineeringSupervision',
                'image' => $services . '/Engineering Supervision.jpg.jpeg',
                'en' => [
                    'title' => 'ENGINEERING SUPERVISION',
                    'description' => 'Comprehensive technical support by overseeing project planning, managing contractor agreements, drawings and bills of quantities.',
                    'place' => 'Kingdom of Saudi Arabia',
                    'fullDescription' => 'Providing engineering supervision services is one of the key pillars in ensuring that projects achieve their objectives and deliver maximum value. We offer comprehensive technical support by overseeing project planning, managing contractor agreements, and drawings and bills of quantities. We closely monitor all phases of project execution and deliver timely solutions to any challenges or obstacles that may occur during implementation. Throughout the process, we remain fully committed to maintaining quality standards and fostering collaboration among all stakeholders—contractors, supervising authorities, and owners alike.',
                ],
                'ar' => [
                    'title' => 'الإشراف الهندسي',
                    'description' => 'دعم تقني شامل من خلال الإشراف على تخطيط المشاريع وإدارة عقود المقاولين والرسومات وجداول الكميات.',
                    'place' => 'المملكة العربية السعودية',
                    'fullDescription' => 'تقديم خدمات الإشراف الهندسي يعد من الركائز الأساسية لضمان تحقيق المشاريع لأهدافها وتقديم أقصى قيمة. نقدم دعمًا تقنيًا شاملاً من خلال الإشراف على تخطيط المشاريع وإدارة عقود المقاولين والرسومات وجداول الكميات. نراقب عن كثب جميع مراحل تنفيذ المشروع ونقدم حلولاً في الوقت المناسب لأي تحديات أو عقبات قد تظهر أثناء التنفيذ. خلال هذه العملية، نظل ملتزمين تمامًا بالحفاظ على معايير الجودة وتعزيز التعاون بين جميع الأطراف المعنية — المقاولين والجهات الإشرافية والملاك.',
                ],
            ],
            [
                'id' => 'designServices',
                'image' => $services . '/Design Services.jpg',
                'en' => [
                    'title' => 'DESIGN SERVICES',
                    'description' => 'Integrated design solutions that blend creativity with sustainability, transforming visions into exceptional architectural spaces.',
                    'place' => 'Kingdom of Saudi Arabia',
                    'fullDescription' => 'At Al Osaimi Consulting, we deliver integrated design solutions that blend creativity with sustainability, transforming our clients\' visions into exceptional architectural spaces. We carefully balance natural elements with thoughtful planning, colors, and lighting to create innovative buildings that harmonize beauty and functionality. At the same time, we ensure the highest levels of safety and stability through advanced structural design. Our services include: Urban and Landscape Design, Architectural Design, Interior Design, Furniture and Fit-Outs, Structural Design, and Electromechanical Design.',
                ],
                'ar' => [
                    'title' => 'خدمات التصميم',
                    'description' => 'حلول تصميم متكاملة تمزج بين الإبداع والاستدامة، محولة الرؤى إلى فضاءات معمارية استثنائية.',
                    'place' => 'المملكة العربية السعودية',
                    'fullDescription' => 'في مكتب العصيمي للاستشارات، نقدم حلول تصميم متكاملة تمزج بين الإبداع والاستدامة، محولين رؤى عملائنا إلى فضاءات معمارية استثنائية. نوازن بعناية بين العناصر الطبيعية والتخطيط المدروس والألوان والإضاءة لإنشاء مبانٍ مبتكرة تجمع بين الجمال والوظيفة. في الوقت نفسه، نضمن أعلى مستويات السلامة والاستقرار من خلال التصميم الإنشائي المتقدم. تشمل خدماتنا: التصميم الحضري والمناظر الطبيعية، التصميم المعماري، التصميم الداخلي والأثاث والتشطيبات، التصميم الإنشائي، والتصميم الكهروميكانيكي.',
                ],
            ],
            [
                'id' => 'surveyingWorks',
                'image' => $services . '/Surveying_.jpg',
                'en' => [
                    'title' => 'SURVEYING WORKS',
                    'description' => 'Accurate surveying data for construction and design projects, supporting the development of projects, land, and infrastructure.',
                    'place' => 'Kingdom of Saudi Arabia',
                    'fullDescription' => 'Surveying services form a cornerstone in providing accurate data for construction and design projects, while also supporting the development of projects, land, and infrastructure. Over the past eight years, we have delivered surveying solutions of exceptional quality and precision, contributing to the success of numerous projects across the Kingdom.',
                ],
                'ar' => [
                    'title' => 'أعمال المساحة',
                    'description' => 'بيانات مساحية دقيقة لمشاريع البناء والتصميم، تدعم تطوير المشاريع والأراضي والبنية التحتية.',
                    'place' => 'المملكة العربية السعودية',
                    'fullDescription' => 'تشكل خدمات المساحة حجر الأساس في توفير بيانات دقيقة لمشاريع البناء والتصميم، مع دعم تطوير المشاريع والأراضي والبنية التحتية. على مدار السنوات الثماني الماضية، قدمنا حلول مساحية بجودة ودقة استثنائية، مساهمين في نجاح العديد من المشاريع في أنحاء المملكة.',
                ],
            ],
            [
                'id' => 'architectOfRecord',
                'image' => $services . '/A.O.R.jpg',
                'en' => [
                    'title' => 'ARCHITECT OF RECORD',
                    'description' => 'Preparing design plans, securing building permits, and delivering effective solutions in the shortest possible time.',
                    'place' => 'Kingdom of Saudi Arabia',
                    'fullDescription' => 'At Al Osaimi Consulting, we are dedicated to meeting all our clients\' needs, from preparing design plans to securing building permits and delivering effective solutions in the shortest possible time. We remain fully committed to reviewing and fulfilling all municipal requirements while ensuring strict compliance with the Saudi Building Code.',
                ],
                'ar' => [
                    'title' => 'المهندس المعتمد',
                    'description' => 'إعداد مخططات التصميم والحصول على تراخيص البناء وتقديم حلول فعالة في أقصر وقت ممكن.',
                    'place' => 'المملكة العربية السعودية',
                    'fullDescription' => 'في مكتب العصيمي للاستشارات، نحرص على تلبية جميع احتياجات عملائنا، من إعداد مخططات التصميم إلى الحصول على تراخيص البناء وتقديم حلول فعالة في أقصر وقت ممكن. نظل ملتزمين تمامًا بمراجعة واستيفاء جميع متطلبات البلدية مع ضمان الامتثال الصارم لكود البناء السعودي.',
                ],
            ],
            [
                'id' => 'engineeringServices',
                'image' => $services . '/Engineering Services.png',
                'en' => [
                    'title' => 'ENGINEERING SERVICES',
                    'description' => 'A unified technical foundation integrating Structural, MEP, and Infrastructure disciplines through a single high-performance BIM workflow.',
                    'place' => 'Kingdom of Saudi Arabia',
                    'fullDescription' => 'At Al-Osaimi, our engineering services provide a unified technical foundation that ensures structural integrity, system efficiency, and infrastructure precision. By integrating Structural, MEP, and Infrastructure disciplines into a single high-performance BIM workflow, we deliver buildable solutions that adhere to the highest international standards and MENA region codes. Our structural expertise in concrete and steel systems ensures clash-free designs, while our MEP engineering optimizes HVAC, electrical, and plumbing systems for maximum energy efficiency and spatial coordination. We extend this technical rigor to the surrounding environment, managing road networks, utility coordination, and grading to create data-rich models for complex masterplans. By merging these engineering specializations through advanced digital technology, Al-Osaimi identifies and resolves conflicts virtually before construction begins, significantly reducing on-site errors and accelerating project timelines.',
                ],
                'ar' => [
                    'title' => 'الخدمات الهندسية',
                    'description' => 'أساس تقني موحد يدمج تخصصات الإنشاء والميكانيكا والكهرباء والسباكة والبنية التحتية في سير عمل BIM عالي الأداء.',
                    'place' => 'المملكة العربية السعودية',
                    'fullDescription' => 'في مكتب العصيمي، تقدم خدماتنا الهندسية أساسًا تقنيًا موحدًا يضمن السلامة الإنشائية وكفاءة الأنظمة ودقة البنية التحتية. من خلال دمج تخصصات الإنشاء والميكانيكا والكهرباء والسباكة والبنية التحتية في سير عمل BIM عالي الأداء، نقدم حلولاً قابلة للتنفيذ تلتزم بأعلى المعايير الدولية ومتطلبات منطقة الشرق الأوسط وشمال أفريقيا. تضمن خبرتنا الإنشائية في أنظمة الخرسانة والصلب تصاميم خالية من التعارضات، بينما تُحسّن هندسة الميكانيكا والكهرباء والسباكة أنظمة التكييف والكهرباء والسباكة لتحقيق أقصى كفاءة في الطاقة والتنسيق المكاني. نمتد بهذا الصرامة التقنية إلى البيئة المحيطة، من خلال إدارة شبكات الطرق وتنسيق المرافق والتسوية لإنشاء نماذج غنية بالبيانات للمخططات الرئيسية المعقدة.',
                ],
            ],
            [
                'id' => 'bimServices',
                'image' => $services . '/BIM Services Picture.jpg.jpeg',
                'en' => [
                    'title' => 'BIM SERVICES',
                    'description' => 'Comprehensive BIM solutions spanning architectural, structural, and MEP disciplines to empower projects through precision and seamless collaboration.',
                    'place' => 'Kingdom of Saudi Arabia',
                    'fullDescription' => 'At El Osaimi, we provide comprehensive BIM services designed to empower your projects through precision, seamless collaboration, and operational efficiency. Whether you are in the design, construction, or operation phase, our team utilizes advanced BIM workflows to improve coordination, minimize errors, and optimize project timelines. Our BIM solutions span architectural, structural, and MEP disciplines, ensuring integrated communication between all stakeholders. From 3D modeling and clash detection to quantity takeoffs and LOD-specific deliverables, we ensure your project is fully realized digitally before a single stone is laid on-site.',
                ],
                'ar' => [
                    'title' => 'خدمات BIM',
                    'description' => 'خدمات BIM شاملة تمتد عبر تخصصات العمارة والإنشاء والميكانيكا والكهرباء والسباكة لتمكين مشاريعكم بدقة وتعاون سلس.',
                    'place' => 'المملكة العربية السعودية',
                    'fullDescription' => 'في مكتب العصيمي، نقدم خدمات BIM شاملة مصممة لتمكين مشاريعكم من خلال الدقة والتعاون السلس والكفاءة التشغيلية. سواء كنتم في مرحلة التصميم أو البناء أو التشغيل، يستخدم فريقنا سير عمل BIM المتقدمة لتحسين التنسيق وتقليل الأخطاء وتحسين الجداول الزمنية للمشاريع. تمتد حلول BIM لدينا عبر تخصصات العمارة والإنشاء والميكانيكا والكهرباء والسباكة، مما يضمن التواصل المتكامل بين جميع الأطراف المعنية. من النمذجة ثلاثية الأبعاد وكشف التعارضات إلى حصر الكميات والتسليمات المحددة بمستوى التفاصيل، نضمن أن مشروعكم محقق رقميًا بالكامل قبل وضع أول حجر على الموقع.',
                ],
            ],
        ],
        'certificates' => [
            ['name' => 'Saudi Council Of Engineers', 'url' => 'https://www.saudieng.sa', 'image' => $certs . '/Saudi Council Of Engineers.png'],
            ['name' => 'Ministry of Municipal, Rural Affairs & Housing', 'url' => 'https://www.momah.gov.sa', 'image' => $certs . '/Ministry Of Municipal Rural Affairs & Housing.png'],
            ['name' => 'Ministry of Justice', 'url' => 'https://www.moj.gov.sa', 'image' => $certs . '/Ministry Of Justice.png'],
            ['name' => 'Jeddah Municipality', 'url' => 'https://www.jeddah.gov.sa', 'image' => $certs . '/Jeddah Municipality.png'],
            ['name' => 'National Water Company', 'url' => 'https://www.nwc.com.sa', 'image' => $certs . '/National Water Company.png'],
            ['name' => 'Modon', 'url' => 'https://www.modon.gov.sa', 'image' => $certs . '/Modon.png'],
            ['name' => 'Saudi Electricity Company', 'url' => 'https://www.se.com.sa', 'image' => $certs . '/Saudi Electricity Company.png'],
            ['name' => 'Etimad', 'url' => 'https://etimad.sa', 'image' => $certs . '/Etimad.png'],
            ['name' => 'Khibrah Platform', 'url' => 'https://khibrah.com.sa', 'image' => $certs . '/Khibrah Platform.png'],
        ],
        'clients' => [
            ['alt' => 'Al-Wisam World', 'url' => '', 'image' => $clients . '/Al-Wisam World.png'],
            ['alt' => 'AlKhalid Transportation', 'url' => '', 'image' => $clients . '/AlKhalid Transportation.png'],
            ['alt' => 'AlQodsi', 'url' => '', 'image' => $clients . '/AlQodsi.png'],
            ['alt' => 'Alyamama', 'url' => '', 'image' => $clients . '/Alyamama.png'],
            ['alt' => 'Araa Real Estate', 'url' => '', 'image' => $clients . '/Araa Real Estate.png'],
            ['alt' => 'Bait Alarab', 'url' => '', 'image' => $clients . '/Bait Alarab.png'],
            ['alt' => 'Bauer Foundation', 'url' => 'https://www.bauer.de', 'image' => $clients . '/Bauer Foundation.png'],
            ['alt' => 'Bin Dajam Ltd', 'url' => '', 'image' => $clients . '/Bin Dajam Ltd.png'],
            ['alt' => 'Bin Dawood', 'url' => 'https://www.bindawood.com', 'image' => $clients . '/Bin Dawood.png'],
            ['alt' => 'Eco Construction', 'url' => '', 'image' => $clients . '/Eco Construction.png'],
            ['alt' => 'Hayat Alomran', 'url' => '', 'image' => $clients . '/Hayat Alomran.png'],
            ['alt' => 'Jamal Baghlaf Holding', 'url' => '', 'image' => $clients . '/Jamal Baghlaf Holding.png'],
            ['alt' => 'Kayan Almasya', 'url' => '', 'image' => $clients . '/Kayan Almasya.png'],
            ['alt' => 'Keller', 'url' => 'https://www.keller.com', 'image' => $clients . '/Keller.png'],
            ['alt' => 'Ministry Of Islamic Affairs', 'url' => 'https://www.moia.gov.sa', 'image' => $clients . '/Ministry Of Islamic Affairs, Dawah & Guidance.png'],
            ['alt' => 'Musheera', 'url' => '', 'image' => $clients . '/Musheera.png'],
            ['alt' => 'Naft', 'url' => '', 'image' => $clients . '/Naft.png'],
            ['alt' => 'Petro Min', 'url' => '', 'image' => $clients . '/Petro min.png'],
            ['alt' => 'Pure In', 'url' => '', 'image' => $clients . '/Pure In.png'],
            ['alt' => 'Rasiat', 'url' => '', 'image' => $clients . '/Rasiat.png'],
            ['alt' => 'SACO', 'url' => 'https://www.saco.sa', 'image' => $clients . '/SACO.png'],
            ['alt' => 'Sans', 'url' => '', 'image' => $clients . '/Sans.png'],
            ['alt' => 'Tamimi Markets', 'url' => 'https://www.tamimimarkets.com', 'image' => $clients . '/Tamimi Markets.png'],
            ['alt' => 'Zahran', 'url' => 'https://www.zahran.com', 'image' => $clients . '/Zahran.png'],
        ],
        'projects' => [
            [
                'category' => 'RESIDENTIAL',
                'folder' => $projects . '/Residential Projects/Amara Villa',
                'image' => $projects . '/Residential Projects/Amara Villa/01.jpg',
                'en' => ['title' => 'PRIVATE VILLA', 'year' => '2024', 'location' => 'Saudi Arabia', 'description' => 'This project represents our vision in delivering innovative architectural solutions that combine beauty and functionality. We always strive to achieve the highest standards of quality and sustainability in every project we undertake.'],
                'ar' => ['title' => 'فيلا خاصة', 'year' => '2024', 'location' => 'السعودية', 'description' => 'هذا المشروع يمثل رؤيتنا في تقديم حلول معمارية مبتكرة تجمع بين الجمال والوظيفة. نسعى دائماً لتحقيق أعلى معايير الجودة والاستدامة في كل مشروع نقوم به.'],
            ],
            [
                'category' => 'RESIDENTIAL',
                'folder' => $projects . '/Residential Projects/Aura',
                'image' => $projects . '/Residential Projects/Aura/01.jpg',
                'en' => ['title' => 'RESIDENTIAL BUILDING 1', 'year' => '2024', 'location' => 'Saudi Arabia', 'description' => 'This project represents our vision in delivering innovative architectural solutions that combine beauty and functionality. We always strive to achieve the highest standards of quality and sustainability in every project we undertake.'],
                'ar' => ['title' => 'مبنى سكني 1', 'year' => '2024', 'location' => 'السعودية', 'description' => 'هذا المشروع يمثل رؤيتنا في تقديم حلول معمارية مبتكرة تجمع بين الجمال والوظيفة. نسعى دائماً لتحقيق أعلى معايير الجودة والاستدامة في كل مشروع نقوم به.'],
            ],
            [
                'category' => 'RESIDENTIAL',
                'folder' => $projects . '/Residential Projects/Azora ( Residential )',
                'image' => $projects . '/Residential Projects/Azora ( Residential )/01.jpg',
                'en' => ['title' => 'VILLA 1', 'year' => '2024', 'location' => 'Saudi Arabia', 'description' => 'This project represents our vision in delivering innovative architectural solutions that combine beauty and functionality. We always strive to achieve the highest standards of quality and sustainability in every project we undertake.'],
                'ar' => ['title' => 'فيلا 1', 'year' => '2024', 'location' => 'السعودية', 'description' => 'هذا المشروع يمثل رؤيتنا في تقديم حلول معمارية مبتكرة تجمع بين الجمال والوظيفة. نسعى دائماً لتحقيق أعلى معايير الجودة والاستدامة في كل مشروع نقوم به.'],
            ],
            [
                'category' => 'RESIDENTIAL',
                'folder' => $projects . '/Residential Projects/Eleve',
                'image' => $projects . '/Residential Projects/Eleve/01.jpg',
                'en' => ['title' => 'RESIDENTIAL BUILDING 2', 'year' => '2024', 'location' => 'Saudi Arabia', 'description' => 'This project represents our vision in delivering innovative architectural solutions that combine beauty and functionality. We always strive to achieve the highest standards of quality and sustainability in every project we undertake.'],
                'ar' => ['title' => 'مبنى سكني 2', 'year' => '2024', 'location' => 'السعودية', 'description' => 'هذا المشروع يمثل رؤيتنا في تقديم حلول معمارية مبتكرة تجمع بين الجمال والوظيفة. نسعى دائماً لتحقيق أعلى معايير الجودة والاستدامة في كل مشروع نقوم به.'],
            ],
            [
                'category' => 'RESIDENTIAL',
                'folder' => $projects . '/Residential Projects/Ghosoun Resort',
                'image' => $projects . '/Residential Projects/Ghosoun Resort/01.jpg',
                'en' => ['title' => 'GHOSOUN RESORT', 'year' => '2024', 'location' => 'Saudi Arabia', 'description' => 'This project represents our vision in delivering innovative architectural solutions that combine beauty and functionality. We always strive to achieve the highest standards of quality and sustainability in every project we undertake.'],
                'ar' => ['title' => 'منتجع غصون', 'year' => '2024', 'location' => 'السعودية', 'description' => 'هذا المشروع يمثل رؤيتنا في تقديم حلول معمارية مبتكرة تجمع بين الجمال والوظيفة. نسعى دائماً لتحقيق أعلى معايير الجودة والاستدامة في كل مشروع نقوم به.'],
            ],
            [
                'category' => 'RESIDENTIAL',
                'folder' => $projects . '/Residential Projects/Liora Residential',
                'image' => $projects . '/Residential Projects/Liora Residential/01.jpg',
                'en' => ['title' => 'LUXURY RESIDENTIAL BUILDING 3', 'year' => '2024', 'location' => 'Saudi Arabia', 'description' => 'This project represents our vision in delivering innovative architectural solutions that combine beauty and functionality. We always strive to achieve the highest standards of quality and sustainability in every project we undertake.'],
                'ar' => ['title' => 'مبنى سكني فاخر 3', 'year' => '2024', 'location' => 'السعودية', 'description' => 'هذا المشروع يمثل رؤيتنا في تقديم حلول معمارية مبتكرة تجمع بين الجمال والوظيفة. نسعى دائماً لتحقيق أعلى معايير الجودة والاستدامة في كل مشروع نقوم به.'],
            ],
            [
                'category' => 'RESIDENTIAL',
                'folder' => $projects . '/Residential Projects/Orlana Villa',
                'image' => $projects . '/Residential Projects/Orlana Villa/01.jpg',
                'en' => ['title' => 'VILLA 3', 'year' => '2024', 'location' => 'Saudi Arabia', 'description' => 'This project represents our vision in delivering innovative architectural solutions that combine beauty and functionality. We always strive to achieve the highest standards of quality and sustainability in every project we undertake.'],
                'ar' => ['title' => 'فيلا 3', 'year' => '2024', 'location' => 'السعودية', 'description' => 'هذا المشروع يمثل رؤيتنا في تقديم حلول معمارية مبتكرة تجمع بين الجمال والوظيفة. نسعى دائماً لتحقيق أعلى معايير الجودة والاستدامة في كل مشروع نقوم به.'],
            ],
            [
                'category' => 'RESIDENTIAL',
                'folder' => $projects . '/Residential Projects/Square 01',
                'image' => $projects . '/Residential Projects/Square 01/01.jpg',
                'en' => ['title' => 'SQUARE 01', 'year' => '2024', 'location' => 'Saudi Arabia', 'description' => 'This project represents our vision in delivering innovative architectural solutions that combine beauty and functionality. We always strive to achieve the highest standards of quality and sustainability in every project we undertake.'],
                'ar' => ['title' => 'سكوير ٠١', 'year' => '2024', 'location' => 'السعودية', 'description' => 'هذا المشروع يمثل رؤيتنا في تقديم حلول معمارية مبتكرة تجمع بين الجمال والوظيفة. نسعى دائماً لتحقيق أعلى معايير الجودة والاستدامة في كل مشروع نقوم به.'],
            ],
            [
                'category' => 'MEDICAL',
                'folder' => $projects . '/Medical Projects/Cure Medical Building',
                'image' => $projects . '/Medical Projects/Cure Medical Building/01.jpg',
                'en' => ['title' => 'CURE MEDICAL BUILDING', 'year' => '2024', 'location' => 'Saudi Arabia', 'description' => 'A landmark mixed-use development conceived as a contemporary commercial destination that balances scale, functionality, and visitor experience. Strategically located to serve both local and regional demand, the project integrates retail, leisure, and public spaces within a coherent architectural framework.'],
                'ar' => ['title' => 'مبنى كيور الطبي', 'year' => '2024', 'location' => 'السعودية', 'description' => 'مشروع تطوير بارز متعدد الاستخدامات تم تصوره كوجهة تجارية معاصرة توازن بين الحجم والوظيفة وتجربة الزائر. يقع في موقع استراتيجي لخدمة الطلب المحلي والإقليمي.'],
            ],
            [
                'category' => 'GAS_STATIONS',
                'folder' => $projects . '/2 gas stations mixed use/01',
                'image' => $projects . '/2 gas stations mixed use/01/01.jpg',
                'en' => ['title' => 'GAS STATION 01', 'year' => '2024', 'location' => 'Saudi Arabia', 'description' => 'A landmark mixed-use development conceived as a contemporary commercial destination that balances scale, functionality, and visitor experience. Strategically located to serve both local and regional demand, the project integrates retail, leisure, and public spaces within a coherent architectural framework.'],
                'ar' => ['title' => 'محطة وقود ٠١', 'year' => '2024', 'location' => 'السعودية', 'description' => 'مشروع تطوير بارز متعدد الاستخدامات تم تصوره كوجهة تجارية معاصرة توازن بين الحجم والوظيفة وتجربة الزائر. يقع في موقع استراتيجي لخدمة الطلب المحلي والإقليمي.'],
            ],
            [
                'category' => 'GAS_STATIONS',
                'folder' => $projects . '/2 gas stations mixed use/02',
                'image' => $projects . '/2 gas stations mixed use/02/01.jpg',
                'en' => ['title' => 'GAS STATION 02', 'year' => '2024', 'location' => 'Saudi Arabia', 'description' => 'A landmark mixed-use development conceived as a contemporary commercial destination that balances scale, functionality, and visitor experience. Strategically located to serve both local and regional demand, the project integrates retail, leisure, and public spaces within a coherent architectural framework.'],
                'ar' => ['title' => 'محطة وقود ٠٢', 'year' => '2024', 'location' => 'السعودية', 'description' => 'مشروع تطوير بارز متعدد الاستخدامات تم تصوره كوجهة تجارية معاصرة توازن بين الحجم والوظيفة وتجربة الزائر. يقع في موقع استراتيجي لخدمة الطلب المحلي والإقليمي.'],
            ],
        ],
    ];
}

function aoc_site_data(): array
{
    $data = aoc_default_site_data();
    $override = get_option('aoc_site_content_json', '');

    if (is_string($override) && '' !== trim($override)) {
        $decoded = json_decode($override, true);
        if (is_array($decoded)) {
            $data = array_replace_recursive($data, $decoded);
        }
    }

    return apply_filters('aoc_site_data', $data);
}

function aoc_lang_data(array $data, ?string $language = null): array
{
    $language = $language ?: aoc_current_language();
    return $data['translations'][$language] ?? $data['translations']['en'];
}

function aoc_tracking_options(): array
{
    $defaults = [
        'gtm_id' => '',
        'ga_id' => '',
        'search_console_verification' => '',
        'bing_verification' => '',
        'clarity_id' => '',
    ];

    $saved = get_option('aoc_tracking_options', []);
    return array_merge($defaults, is_array($saved) ? $saved : []);
}

