export default function robots() {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://your-vercel-domain.vercel.app';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/api/', // Block indexing of API routes
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
