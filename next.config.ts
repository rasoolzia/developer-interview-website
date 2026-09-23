import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  cacheComponents: true,
};

const withNextIntl = createNextIntlPlugin(
  "./src/shared/config/i18n/request.ts",
);
export default withNextIntl(nextConfig);
