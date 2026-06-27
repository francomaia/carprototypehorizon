/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Imagens do protótipo são servidas a partir do postimg.cc.
    // Para usar imagens locais depois, basta apontar os caminhos em src/data/cars.ts
    // para arquivos em /public e remover/ajustar estes remotePatterns.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.postimg.cc",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
