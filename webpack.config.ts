const path = require('path');

module.exports = {
    // ... các cấu hình khác của webpack
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'] // Thêm các phần mở rộng cần thiết
    }
};
