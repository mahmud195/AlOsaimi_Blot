/**
 * Project gallery images - dynamically loaded via Vite glob imports.
 * Uses lazy loading to avoid bundling all images in the initial load.
 */

// Lazy glob import: returns Record<string, () => Promise<{ default: string }>>
const allImages = import.meta.glob<{ default: string }>(
    './assets/AlOsaimi_Website_Design 02_Folder/projects/wetransfer_projects-for-website_2026-02-08_1447/Residential Projects/*/!(01).jpg'
);



// Re-build gallery with sorting logic
function buildSortedGallery(): Record<string, (() => Promise<{ default: string }>)[]> {
    const tempGallery: Record<string, { path: string; loader: () => Promise<{ default: string }> }[]> = {};

    for (const [path, loader] of Object.entries(allImages)) {
        const match = path.match(/Residential Projects\/([^/]+)\/(\d+)\.jpg$/);
        if (match) {
            const projectName = match[1];
            if (!tempGallery[projectName]) {
                tempGallery[projectName] = [];
            }
            tempGallery[projectName].push({ path, loader });
        }
    }

    const gallery: Record<string, (() => Promise<{ default: string }>)[]> = {};
    for (const [key, items] of Object.entries(tempGallery)) {
        items.sort((a, b) => a.path.localeCompare(b.path));
        gallery[key] = items.map(item => item.loader);
    }
    return gallery;
}

export const projectGalleryImages = buildSortedGallery();

// Helper to get gallery image loaders by project key
export function getGalleryImages(projectTitle: string): (() => Promise<{ default: string }>)[] {
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

