import type { NextConfig } from "next";
/*
module.exports = {
  devIndicators: {
    buildActivity: false,
  },
}
*/
const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: "/home/louis/Projekte/BlockchainVotingSystem/election-system/nextFE/bvs",
  },
};

export default nextConfig;
