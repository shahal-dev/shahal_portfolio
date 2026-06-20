import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  eslint: {
    // Lint via `yarn lint` (works again with eslint 8). Don't let template/content
    // lint debt — e.g. apostrophes in content.js — fail production builds.
    ignoreDuringBuilds: true,
  },
};

export default withMDX(nextConfig);
