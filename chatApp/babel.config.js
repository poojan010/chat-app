module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins : [
    [
      'module-resolver',
      {
        root : ['./src'],
        alias : {
            asset : './src/asset',
            components : './src/components',
            constanst : './src/constanst',
            container : './src/container',
            navigator : './src/navigator',
            store : './src/store',
            utils : './src/utils',
        }
      }
    ]
  ]

};
