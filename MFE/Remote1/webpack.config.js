const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin} = require('webpack').container;

module.exports ={
    //Where files should be sent once they are bundled
    output : {
        path: path.join(__dirname, '/dist'),
        filename: 'index.bundle.js'
    },
    // webpack 5 comes with devServer which loads in development mode
    devServer:{
        port: 3001,
        // watchContentBase: true
    },
    // Rules of how webpack will take our files, compile & bundle them for the browser
    module:{
        rules: [
            {
                test:/\.(js|jsx|tsx)$/,
                exclude:/nodeModules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test:/\.css/,
                use:['style-loader','css-loader']
            }
        ]
    },
    resolve:{
        extensions:[".js",".jsx",".tsx"],
    },     
    plugins: [
        new HTMLWebpackPlugin({template: './src/index.html'}),
        new ModuleFederationPlugin({
            name: 'mfe1',
            filename:'remoteEntry.js',
            exposes:{
                './App': './src/App'
            },
            shared:{
                react:{
                    singleton:true,
                    eager:true
                }
            }
        })
    ]
};