import react from '@vitejs/plugin-react'
export default {
  base: './',
  plugins: [react()],
  build: {
    outDir: 'C:/Users/HP/AppData/Local/Temp/claude/d--fiverr-ultacx-website/cbf9b29d-fd44-4037-875c-6a958e609915/scratchpad/probe-dist',
    emptyOutDir: true,
    rollupOptions: { input: './__probe.html' },
  },
}
