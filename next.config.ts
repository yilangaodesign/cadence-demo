import type { NextConfig } from "next";
import { join } from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    // Configure sass to resolve ~ prefix to node_modules
    includePaths: [join(process.cwd(), 'node_modules')],
  },
  // Add empty turbopack config to silence the error, but we'll use webpack via --webpack flag
  turbopack: {},
  webpack: (config) => {
    // Fix for Carbon font resolution: Add alias to resolve ~ prefix to node_modules
    config.resolve.alias = {
      ...config.resolve.alias,
      '~': join(process.cwd(), 'node_modules'),
    };

    // Find and configure sass-loader to handle ~ prefix in url() functions
    const oneOfRule = config.module.rules.find((rule: any) => rule.oneOf);
    if (oneOfRule) {
      oneOfRule.oneOf.forEach((rule: any) => {
        if (rule.test && rule.test.toString().includes('scss|sass')) {
          if (rule.use && Array.isArray(rule.use)) {
            const sassLoader = rule.use.find((loader: any) => 
              loader && (loader.loader?.includes('sass-loader') || loader === 'sass-loader')
            );
            
            if (sassLoader) {
              const loaderOptions = typeof sassLoader === 'string' ? {} : (sassLoader.options || {});
              sassLoader.options = {
                ...loaderOptions,
                sassOptions: {
                  ...(loaderOptions.sassOptions || {}),
                  includePaths: [
                    ...(loaderOptions.sassOptions?.includePaths || []),
                    join(process.cwd(), 'node_modules'),
                  ],
                },
              };
            }
          }
        }
      });
    }

    return config;
  },
};

export default nextConfig;
