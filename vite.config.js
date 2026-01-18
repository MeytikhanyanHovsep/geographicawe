import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        tailwindcss(),
    ],
    server: {
        port: 3000,
        open: true,
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about.html'),
                blog: resolve(__dirname, 'blog.html'),
                'blog-article': resolve(__dirname, 'blog-article.html'),
                contacts: resolve(__dirname, 'contacts.html'),
                delevery: resolve(__dirname, 'delevery.html'), // исправлено под ваше имя файла
                product: resolve(__dirname, 'product.html'),
                services: resolve(__dirname, 'services.html'),
                'stone-catalog': resolve(__dirname, 'stone-catalog.html'),
            },
        },
    },
});