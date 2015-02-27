'use strict';

var gulp = require('gulp'),
    merge = require('merge-stream'),
    pf = require('./js/paramFiles'),
    sourcemaps = require('gulp-sourcemaps'),
    // css
    csscomb = require('gulp-csscomb'),
    autoprefixer = require('autoprefixer-core'),
    csswring = require('csswring'),
    postcss = require('gulp-postcss'),
    // js
    react = require('gulp-react'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
    webpack = require('gulp-webpack'),
    // CONSTANTS
    SCSS_PATH = 'css',
    JS_PATH = 'js',
    COMPONENT_PATH = 'components',
    PUBLIC_CSS = 'public/css',
    PUBLIC_JS = 'public/js',
    JS_ENTRY_POINT = JS_PATH + '/main.js';

/**
 * Linting SCSS files
 * Possible send files to param -files=...
 */
gulp.task('csslint', function() {
  var files = pf.paramFiles(),
      stream,
      global,
      components;

  if (files) {
    stream = gulp.src(files)
      .pipe(csscomb(__dirname + '/.csscomb.json'))
      .pipe(gulp.dest('./'));

  } else {
    global = gulp.src(pf.scss(SCSS_PATH))
      .pipe(csscomb(__dirname + '/.csscomb.json'))
      .pipe(gulp.dest(SCSS_PATH));

    components = gulp.src(pf.scss(COMPONENT_PATH))
      .pipe(csscomb(__dirname + '/.csscomb.json'))
      .pipe(gulp.dest(COMPONENT_PATH));

    stream = merge(global, components);
  }

  return stream;
});

/**
 * Processing SCSS files
 */
gulp.task('css', ['csslint'], function() {
  var processors = [
    autoprefixer({
      browsers: ['last 1 version']
    }),
    csswring({
      removeAllComments: true
    })
  ];

  return gulp.src([pf.scss(SCSS_PATH), pf.scss(COMPONENT_PATH)])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write(PUBLIC_CSS + '/map'))
    .pipe(gulp.dest(PUBLIC_CSS));
});

/**
 * Linting JS files
 * Possible send files to param -files=...
 */
gulp.task('jslint', function() {
  var files = pf.paramFiles();

  if (!files) {
    files = [pf.js(JS_PATH), pf.js(COMPONENT_PATH)];
  }

  return gulp.src(files)
    .pipe(jscs()).on('error', errorHandler)
    .pipe(react()).on('error', errorHandler)
    .pipe(jshint.extract()).on('error', errorHandler)
    .pipe(jshint()).on('error', errorHandler)
    .pipe(jshint.reporter('default')).on('error', errorHandler)
    .pipe(jshint.reporter('fail')).on('error', errorHandler);
});

/**
 * Processing JS files
 */
gulp.task('js', ['jslint'], function() {
  var watchOn = (process.argv.indexOf('--watch') !== -1);
  
  return gulp.src(JS_ENTRY_POINT)
    .pipe(webpack({
      watch: watchOn,
      output: {
        filename: 'bundle.js'
      },
      module: {
        loaders: [
          { test: /\.js/, loader: 'babel' }
        ]
      }
    }))
    .pipe(gulp.dest(PUBLIC_JS));
});

gulp.task('default', ['js', 'css']);

// Handle the error
function errorHandler (error) {
  console.log(error.toString());
  this.emit('end');
}
