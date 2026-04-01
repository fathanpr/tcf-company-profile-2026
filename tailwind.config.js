import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                display: ['Outfit', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                brand: {
                    primary: 'var(--brand-primary)',
                    secondary: 'var(--brand-secondary)',
                    accent: 'var(--brand-accent)',
                    surface: 'var(--brand-surface)',
                    'surface-soft': 'var(--brand-surface-soft)',
                    text: 'var(--brand-text)',
                    'text-muted': 'var(--brand-text-muted)',
                    border: 'var(--brand-border)',
                },
            },
        },
    },

    plugins: [forms],
};
