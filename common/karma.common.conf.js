
// Karma configuration
// Generated on Fri Apr 06 2018 08:14:17 GMT+0200 (Mitteleuropäische Sommerzeit)

/**
 * 
 * @param {*} webpack This is the webpack module loaded in the karma.conf of the package.
 * @param {*} config This is the config to extend.
 */
module.exports = function(webpack, config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    plugins: [
      'karma-chrome-launcher',
      'karma-webpack',
      'karma-jasmine',
      'karma-spec-reporter'
    ],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'webpack'],

    // add mime type for typescript so chrome will load it
    mime: {
      'text/x-typescript': ['ts','tsx']
    },

    // list of files / patterns to load in the browser
    files: [
      'spec/**/*Spec.ts'
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // add webpack as preprocessor
      'spec/**/*Spec.ts': [ 'webpack' ]
    },

    webpack: {
      // karma watches the test entry points
      // (you don't need to specify the entry option)
      // webpack watches dependencies

      // webpack configuration
      // node: {
      //   fs: 'empty'
      // },
      mode: "development",
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
          }
        ]
      },
      plugins: [
        // existing plugins go here
        new webpack.SourceMapDevToolPlugin({
          filename: null, // if no value is provided the sourcemap is inlined
          test: /\.(ts|js)($|\?)/i // process .js and .ts files only
        })
      ],
      resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
      },
      devtool: 'inline-source-map',
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    //reporters: ["spec", "trx"],
    reporters: ["spec"],

    //trxReporter: { outputFile: 'typescript.trx', shortTestName: false },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //browsers: ["Chrome", "PhantomJS"],
    browsers: ["Chrome"],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}