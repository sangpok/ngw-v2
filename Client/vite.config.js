import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@API', replacement: '/src/API' },
      { find: '@Components', replacement: '/src/Components' },
      { find: '@Font', replacement: '/src/Font' },
      { find: '@Hooks', replacement: '/src/Hooks' },
      { find: '@Icon', replacement: '/src/Icon' },
      { find: '@Store', replacement: '/src/Store' },
      { find: '@Utils', replacement: '/src/Utils' },
      { find: '@View', replacement: '/src/View' },
      { find: '@', replacement: '/src' },
    ],
  },
});
