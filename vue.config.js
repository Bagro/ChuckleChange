module.exports = {
    devServer: {
        proxy: {
            '/': {
                target: 'https://localhost:7227',
                changeOrigin: true
            }
        }
    }
}