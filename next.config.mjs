/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
      ignoreBuildErrors: true, // Keeps other TypeScript errors visible
      tsconfigPath: './tsconfig.json', // Explicitly use your tsconfig.json
    },

  };
  
  export default nextConfig;
  