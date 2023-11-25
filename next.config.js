/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: "out",
    output: "export",
    images: { unoptimized: true },
    trailingSlash: true,
}

module.exports = nextConfig
