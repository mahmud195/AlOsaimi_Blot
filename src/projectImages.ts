/**
 * Project gallery images - dynamically loaded via Vite glob imports.
 * Each project maps to an array of images from its folder (excluding 01.jpg which is the main image).
 * Uses lazy loading (non-eager) so images are only fetched when the modal is opened.
 */

// Residential project gallery images (lazy-loaded)
const residentialImages = import.meta.glob<{ default: string }>(
    './assets/AlOsaimi_Website_Design 02_Folder/projects/wetransfer_projects-for-website_2026-02-08_1447/Residential Projects/*/!(01).jpg'
);

// Medical project gallery images (lazy-loaded)
const medicalImages = import.meta.glob<{ default: string }>(
    './assets/AlOsaimi_Website_Design 02_Folder/projects/wetransfer_projects-for-website_2026-02-08_1447/Medical Projects/*/!(01).jpg'
);

// Gas station project gallery images (lazy-loaded)
const gasStation01Images = import.meta.glob<{ default: string }>(
    './assets/AlOsaimi_Website_Design 02_Folder/projects/wetransfer_projects-for-website_2026-02-08_1447/2 gas stations mixed use/01/!(01).jpg'
);

const gasStation02Images = import.meta.glob<{ default: string }>(
    './assets/AlOsaimi_Website_Design 02_Folder/projects/wetransfer_projects-for-website_2026-02-08_1447/2 gas stations mixed use/02/!(01).jpg'
);

// Cache for resolved gallery images
const galleryCache: Record<string, string[]> = {};

// Resolve a single glob map into a gallery keyed by project folder
async function resolveGlob(
    globMap: Record<string, () => Promise<{ default: string }>>,
    regex: RegExp,
    gallery: Record<string, string[]>,
    fixedKey?: string
) {
    const entries = Object.entries(globMap);
    const resolved = await Promise.all(
        entries.map(async ([path, loader]) => {
            const mod = await loader();
            return { path, url: mod.default };
        })
    );
    for (const { path, url } of resolved) {
        if (fixedKey) {
            if (!gallery[fixedKey]) gallery[fixedKey] = [];
            gallery[fixedKey].push(url);
        } else {
            const match = path.match(regex);
            if (match) {
                const projectName = match[1];
                if (!gallery[projectName]) gallery[projectName] = [];
                gallery[projectName].push(url);
            }
        }
    }
}

// Build gallery on demand (lazy - only loads images when called)
async function buildGallery(): Promise<Record<string, string[]>> {
    if (Object.keys(galleryCache).length > 0) return galleryCache;

    const gallery: Record<string, string[]> = {};

    await Promise.all([
        resolveGlob(residentialImages, /Residential Projects\/([^/]+)\/(\d+)\.jpg$/, gallery),
        resolveGlob(medicalImages, /Medical Projects\/([^/]+)\/(\d+)\.jpg$/, gallery),
        resolveGlob(gasStation01Images, /\/(\d+)\.jpg$/, gallery, 'Gas Station 01'),
        resolveGlob(gasStation02Images, /\/(\d+)\.jpg$/, gallery, 'Gas Station 02'),
    ]);

    // Sort each project's images
    for (const key of Object.keys(gallery)) {
        gallery[key].sort();
        galleryCache[key] = gallery[key];
    }

    return gallery;
}

// Helper to get gallery images by project key (lazy-loaded with caching)
export async function getGalleryImages(projectTitle: string): Promise<string[]> {
    // Map project titles to folder names
    const titleToFolder: Record<string, string> = {
        'PRIVATE VILLA': 'Amara Villa',
        'فيلا خاصة': 'Amara Villa',
        'RESIDENTIAL BUILDING 1': 'Aura',
        'مبنى سكني 1': 'Aura',
        'VILLA 1': 'Azora ( Residential )',
        'فيلا 1': 'Azora ( Residential )',
        'RESIDENTIAL BUILDING 2': 'Eleve',
        'مبنى سكني 2': 'Eleve',
        'GHOSOUN RESORT': 'Ghosoun Resort',
        'منتجع غصون': 'Ghosoun Resort',
        'LUXURY RESIDENTIAL BUILDING 3': 'Liora Residential',
        'مبنى سكني فاخر 3': 'Liora Residential',
        'VILLA 3': 'Orlana Villa',
        'فيلا 3': 'Orlana Villa',
        'SQUARE 01': 'Square 01',
        'سكوير ٠١': 'Square 01',
        'CURE MEDICAL BUILDING': 'Cure Medical Building',
        'مبنى كيور الطبي': 'Cure Medical Building',
        'GAS STATION 01': 'Gas Station 01',
        'محطة وقود ٠١': 'Gas Station 01',
        'GAS STATION 02': 'Gas Station 02',
        'محطة وقود ٠٢': 'Gas Station 02',
    };

    const folder = titleToFolder[projectTitle];
    if (!folder) return [];

    const gallery = await buildGallery();
    return gallery[folder] || [];
}

