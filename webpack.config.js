const path = require('path')

module.exports = {
    mode: "development",
    entry: "./src/test.tsx",
    module: {
        rules: [
            {
                use:"ts-loader",
                test: /\.tsx?$/,
            }
        ]
    },
    resolve: {
        extensions: [".tsx",".ts",".js"]
    },
    output:{
        filename:"index.js",
        path: path.resolve(__dirname,"dist")
    }

}