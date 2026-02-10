/**
 * Project gallery images - dynamically loaded via Vite glob imports.
 * Each project maps to an array of images from its folder (excluding 01.jpg which is the main image).
 */

const allImages = import.meta.glob<{ default: string }>(
    './assets/AlOsaimi_Website_Design 02_Folder/projects/wetransfer_projects-for-website_2026-02-08_1447/Residential Projects/*/!(01).jpg',
    { eager: true }
);

// Map of project key -> array of gallery image URLs (sorted by filename)
function buildGallery(): Record<string, string[]> {
    const gallery: Record<string, string[]> = {};

    for (const [path, mod] of Object.entries(allImages)) {
        // Extract project folder name from path
        const match = path.match(/Residential Projects\/([^/]+)\/(\d+)\.jpg$/);
        if (match) {
            const projectName = match[1];
            if (!gallery[projectName]) {
                gallery[projectName] = [];
            }
            gallery[projectName].push(mod.default);
        }
    }

    // Sort each project's images
    for (const key of Object.keys(gallery)) {
        gallery[key].sort();
    }

    return gallery;
}

export const projectGalleryImages = buildGallery();

// Helper to get gallery images by project key
export function getGalleryImages(projectTitle: string): string[] {
    // Map project titles to folder names
    const titleToFolder: Record<string, string> = {
        'AMARA VILLA': 'Amara Villa',
        'فيلا أمارا': 'Amara Villa',
        'AURA': 'Aura',
        'أورا': 'Aura',
        'AZORA': 'Azora ( Residential )',
        'أزورا': 'Azora ( Residential )',
        'ELEVE': 'Eleve',
        'إليف': 'Eleve',
        'GHOSOUN RESORT': 'Ghosoun Resort',
        'منتجع غصون': 'Ghosoun Resort',
        'LIORA RESIDENTIAL': 'Liora Residential',
        'ليورا السكني': 'Liora Residential',
        'ORLANA VILLA': 'Orlana Villa',
        'فيلا أورلانا': 'Orlana Villa',
        'SQUARE 01': 'Square 01',
        'سكوير ٠١': 'Square 01',
    };

    const folder = titleToFolder[projectTitle];
    return folder ? (projectGalleryImages[folder] || []) : [];
}
