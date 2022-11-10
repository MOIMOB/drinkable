import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        baseUrl: 'http://localhost:8080',
        viewportWidth: 414,
        viewportHeight: 736,
        video: false
    }
});
