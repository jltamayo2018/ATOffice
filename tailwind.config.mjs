/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                crema: '#F8F7F4',
                negro: '#111111',
                salvia: '#7A8C6E',
                gris: '#888888',
                'gris-claro': '#E2E0DA'
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Cormorant Garamond', 'serif']
            }
        }
    },
    plugins: []
};