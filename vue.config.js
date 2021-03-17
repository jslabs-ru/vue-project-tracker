module.exports = {
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'tpl/index.html',
            title: 'Project Tracker'
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
