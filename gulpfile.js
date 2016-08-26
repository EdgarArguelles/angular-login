'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect'); // Runs a local dev server
var open = require('gulp-open'); // Open a URL in a web browser
var less = require('gulp-less'); // Compiles LESS files
var minifyCSS = require('gulp-minify-css'); // Minify CSS
var browserify = require('browserify'); // Bundles JS
var debowerify = require('debowerify'); // Allow to use Bower component with browserify
var ngHtml2Js = require('browserify-ng-html2js'); // Compile angular templates into angular modules
var ngAnnotate = require('browserify-ngannotate'); // Add dependency injection annotations to your AngularJS source
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var buffer = require('vinyl-buffer'); // Use conventional text buffer with Gulp
var argv = require('yargs').argv; // Allows send args to gulp tasks
var gulpif = require('gulp-if'); // Conditions the execution of a task
var uglify = require('gulp-uglify'); // Uglify JS code
var jshint = require('gulp-jshint'); // Lint JS files
var KarmaServer = require('karma').Server; // Start test server
var drakov = require('drakov'); // Mock API
var runSequence = require('run-sequence'); // Run tasks in sequence

var config = {
  port: 9005,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './src/index.html',
    less: './src/**/*.less',
    js: './src/app/**/*.js',
    tpl: './src/app/**/*.tpl.html',
    dist: './dist',
    mainLess: './src/main.less',
    mainJs: './src/app/app.js'
  }
};

// Start a local development server
gulp.task('connect', function () {
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true
  });
});

// Open a URL in a web browser
gulp.task('open', function () {
  gulp.src('dist/index.html')
    .pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
});

// Move to dist folder HTML files
gulp.task('html', function () {
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
});

// Move assets to dist folder
gulp.task('assets', function () {
  gulp.src(['src/assets/**'])
    .pipe(gulp.dest(config.paths.dist + '/css'));
});

// Compile, bundle and move to dist LESS files
gulp.task('css', function () {
  gulp.src(config.paths.mainLess)
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest(config.paths.dist + '/css'))
    .pipe(connect.reload());
});

// Transform, bundle and move to dist JS code
gulp.task('js', function () {
  browserify(config.paths.mainJs, {debug: true})
    .transform(debowerify)
    .transform(ngHtml2Js)
    .transform(ngAnnotate)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulp.dest(config.paths.dist + '/scripts'))
    .pipe(connect.reload());
});

// Evaluate JS code with jshint rules
gulp.task('jshint', function () {
  gulp.src(config.paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Run tests
gulp.task('test', function (done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

// Watch changes and rebuild
gulp.task('watch', function () {
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['build-js']);
  gulp.watch(config.paths.tpl, ['js']);
  gulp.watch(config.paths.less, ['css']);
});

// Mock API
gulp.task('mock', function () {
  var argv = {
    sourceFiles: './api/**/**.md',
    serverPort: 3030,
    disableCORS: false,
    autoOptions: true,
    delay: 500,
    method: ['HEAD', 'GET', 'PUT', 'DELETE', 'OPTIONS', 'POST', 'PATCH']
  };
  drakov.run(argv);
});

gulp.task('build-js', function () {
  runSequence(
    'jshint',
    'test',
    'js');
});

gulp.task('build', function () {
  runSequence(
    'html',
    'assets',
    'css',
    'build-js');
});

gulp.task('default', function () {
  runSequence(
    'mock',
    'html',
    'assets',
    'css',
    'jshint',
    'test',
    'js',
    'connect',
    'open',
    'watch');
});
