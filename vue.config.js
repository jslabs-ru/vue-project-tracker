module.exports = {
    devServer: {
        proxy: {
            '^/api/v1': {
                target: 'https://jsonplaceholder.typicode.com',
                pathRewrite: { '^/api/v1': '/' }
            }
        }
    }
}
