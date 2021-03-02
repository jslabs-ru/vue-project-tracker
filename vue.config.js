module.exports = {
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
    }
}
