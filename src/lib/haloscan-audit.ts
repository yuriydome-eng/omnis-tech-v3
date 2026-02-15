/**
 * OMNIS TECH - HaloScan SEO Tracking Integration
 * Daily keyword position monitoring via HaloScan API
 */

const HALOSCAN_API_KEY = process.env.HALOSCAN_API_KEY;
const DOMAIN = 'omnis-tech-v3.netlify.app';

const TARGET_KEYWORDS = [
    "Bague connectée titane",
    "Smart ring biohacking",
    "Lunettes réalité augmentée",
    "Smart glasses HUD",
    "Lunettes AR magnésium",
    "Affichage tête haute",
    "Éclairage circadien",
    "Human Centric Lighting",
    "Bague interface neurale"
];

export async function trackKeywordPositions() {
    if (!HALOSCAN_API_KEY) {
        console.warn('HaloScan API Key missing. Skipping position tracking.');
        return null;
    }

    try {
        const response = await fetch('https://api.haloscan.com/api/domains/positions', {
            method: 'POST',
            headers: {
                'haloscan-api-key': HALOSCAN_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                input: DOMAIN,
                keywords: TARGET_KEYWORDS
            })
        });

        if (!response.ok) {
            throw new Error(`HaloScan API error: ${response.status}`);
        }

        const data = await response.json();

        // Log results for the dashboard
        console.log('[SEO AUDIT] Daily positions tracked:', data);
        return data;
    } catch (error) {
        console.error('[SEO AUDIT] Failed to track positions:', error);
        return null;
    }
}

export async function getDomainOverview() {
    if (!HALOSCAN_API_KEY) return null;

    try {
        const response = await fetch('https://api.haloscan.com/api/domains/overview', {
            method: 'POST',
            headers: {
                'haloscan-api-key': HALOSCAN_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                input: DOMAIN,
                requested_data: ["positions", "visibility", "top_pages"]
            })
        });

        const data = await response.json();
        console.log('[SEO AUDIT] Domain visibility overview:', data);
        return data;
    } catch (error) {
        console.error('[SEO AUDIT] Failed to fetch overview:', error);
        return null;
    }
}
