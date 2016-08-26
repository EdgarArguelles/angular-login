// Karma configuration
module.exports = function (config) {
  var istanbul = require('browserify-istanbul');
  var isparta = require('isparta');

  config.set({

    // Frameworks to use
    frameworks: ['browserify', 'jasmine'],

    // List of files / patterns to load in the browser
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'src/app/**/*.js',
      'src/app/**/*.tpl.html'
    ],

    // Plugins to use
    plugins: [
      'karma-browserify',
      'karma-coverage',
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-spec-reporter'
    ],

    // Test results reporter to use
    // Possible values: 'dots', 'progress'
    reporters: ['spec', 'coverage'],

    // Processors before test
    preprocessors: {
      'src/app/**/*.{js,tpl.html}': ['browserify']
    },

    // Browserify configuration
    browserify: {
      debug: true,
      transform: ['browserify-ng-html2js', 'debowerify', istanbul({instrumenter: isparta})]
    },

    // Optionally, configure the reporter
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },

    // Web server port
    port: 9876,

    // Start these browsers
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // If true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
