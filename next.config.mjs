/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack: (config, { isServer }) => {
  //   // Exclude bcrypt from webpack processing
  //   if (isServer) {
  //     config.externals.push("bcrypt");
  //   }

  //   return config;
  // },
  // externals: {
  //   bcrypt: "commonjs bcrypt",
  // },
  images: {
    domains: ["halton-police-project.s3.ca-central-1.amazonaws.com"],
  },
};

export default nextConfig;
