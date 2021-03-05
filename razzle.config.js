const scss = require('./build-config/razzleScss');

module.exports = {
    plugins: [scss],
    modifyWebpackConfig(opts) {
        const config = opts.webpackConfig;

        if (opts.env.target === 'web' && opts.env.dev) {
            config.devServer.quiet = false;
            config.devServer.public = 'frontend.local.dronehandelen.no:443';
            config.devServer.proxy = {
                context: () => true,
                target: 'http://localhost:3000',
            };
        }

        return config;
    },
};
