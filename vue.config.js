const BASE_PAGE_TITLE = 'Project Tracker';

module.exports = {
    chainWebpack: config => {
        config.plugin('define').tap(definitions => {
            definitions[0] = Object.assign(definitions[0], {
                BASE_PAGE_TITLE: JSON.stringify(BASE_PAGE_TITLE)
            })
            return definitions;
        })
    },
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'tpl/index.html',
            title: BASE_PAGE_TITLE
        }
    },
    devServer: {
        proxy: {
            '^/api/v1': {
                target: 'https://jsonplaceholder.typicode.com',
                pathRewrite: { '^/api/v1': '/' }
            },
            '^/api/v2': {
                target: 'http://localhost:3001/'
            }
        }
    },
    pluginOptions: {
        moment: {
            locales: ['en']
        }
    }
}
