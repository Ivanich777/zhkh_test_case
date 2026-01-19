import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],

  server: {
    proxy: {
      '/api': {
        target: 'http://showroom.eis24.me',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/c300/api/v4/test'),
      },
    },
  },
});
