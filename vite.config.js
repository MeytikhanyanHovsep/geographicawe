import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        tailwindcss(),

    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about.html'),
                blog: resolve(__dirname, 'blog.html'),
                blogArticle: resolve(__dirname, 'blog-article.html'),
                contacts: resolve(__dirname, 'contacts.html'),
                delivery: resolve(__dirname, 'delevery.html'), // проверьте опечатку в названии файла
                product: resolve(__dirname, 'product.html'),
                services: resolve(__dirname, 'services.html'),
                stone: resolve(__dirname, 'stone-catalog.html'),
            },
        },
    },
});