import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        tailwindcss(),
        {
            name: 'html-transform',
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    if (req.url && !req.url.includes('.') && req.url !== '/') {
                        const htmlPage = resolve(__dirname, `pages${req.url}.html`);
                        if (fs.existsSync(htmlPage)) {
                            req.url = `/pages${req.url}.html`;
                        }
                    }
                    next();
                });
            },
        },
    ],
    build: {

    },
});