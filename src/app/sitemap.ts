import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://omnis-tech-v3.netlify.app'

    const products = [
        'omnis-ring-titanium',
        'omnis-lens-smart',
        'omnis-aura-lamp'
    ]

    const productEntries = products.map((handle) => ({
        url: `${baseUrl}/products/${handle}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        ...productEntries,
    ]
}
