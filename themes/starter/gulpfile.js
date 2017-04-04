/*
 * Gulpfile
 *
 */

var
  gulp         = require('gulp'),
  less         = require('gulp-less'),
  bless        = require('gulp-bless'),
  cleancss     = require('gulp-clean-css'),
  uglify       = require('gulp-uglify'),
  rimraf       = require('gulp-rimraf'),
  concat       = require('gulp-concat'),
  pxtorem      = require('gulp-pxtorem'),
  notify       = require('gulp-notify'),
  rename       = require('gulp-rename'),
  path         = require('path'),
  util         = require('gulp-util'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps   = require('gulp-sourcemaps'),
  source       = require('vinyl-source-stream'),
  babelify     = require('babelify'),
  browserify   = require('browserify'),
  livereload   = require('gulp-livereload');

var paths = {
  src:    'src',
  dest:   'assets',
  vendor: 'node_modules'
};

/**
 * Stylesheets:
 *
 * Compiles and minifies stylesheets
 */

gulp.task('css', ['css:compile', 'css:minify']);

gulp.task('css:compile', function() {
  return gulp
    .src(paths.src + '/less/styles.less')
    .pipe(sourcemaps.init())
    .pipe(less().on('error', notify.onError(function (error) {
      return 'Error compiling LESS: ' + error.message;
    })))
    .pipe(pxtorem({
      root_value: 18
    }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dest + '/css'))
    .pipe(notify({ message: 'Successfully compiled LESS' }));
});

gulp.task('css:minify', ['css:compile'], function() {
  return gulp
    .src(paths.dest + '/css/styles.css')
    .pipe(cleancss())
    .pipe(rename(function (path) {
      if(path.extname === '.css') {
        path.basename += '.min';
      }
    }))
    .pipe(bless())
    .pipe(gulp.dest(paths.dest + '/css'))
    .pipe(notify({ message: 'Successfully minified CSS' }));
});


/**
 * Javascript:
 *
 * Concatenates and minifies scripts
 */

gulp.task('js', ['js:browserify', 'js:minify']);

gulp.task('js:browserify', function() {
  var b = browserify({
      entries: paths.src + '/js/app.js',
      debug: true
    });

  return b
    .transform('babelify', { presets: ['es2015'] })
    .bundle()
    .pipe(source('bundle.js'))
    .on('error', util.log)
    .pipe(gulp.dest(paths.dest + '/js'))
    .pipe(notify({ message: 'Successfully compiled js bundle' }));
});

gulp.task('js:minify', ['js:browserify'], function() {
  return gulp
    .src(paths.dest + '/js/bundle.js')
    .pipe(uglify({ outSourceMap: true }))
    .pipe(rename(function (path) {
      if(path.extname === '.js') {
        path.basename += '.min';
      }
    }))
    .pipe(gulp.dest(paths.dest + '/js'))
    .pipe(notify({ message: 'Successfully compiled javascript' }));
});

/**
 * Fonts:
 *
 * Copies fonts to the assets folder
 */

gulp.task('fonts', function() {
  return gulp
    .src([
      // paths.vendor + '/<vendor>/fonts/**/*',
      // paths.src + '/fonts/**/*'
    ])
    .pipe(gulp.dest(paths.dest + '/fonts'))
    .pipe(notify({ message: 'Successfully processed fonts' }));
});


/**
 * Images/Icons:
 *
 * Copies vendor images and icons to the assets folder
 */

gulp.task('images', function() {
  return gulp
    .src([
      // paths.vendor + '/<vendor>/images/*.{png,gif}'
    ])
    .pipe(gulp.dest(paths.dest + '/images/vendor'))
    .pipe(notify({ message: 'Successfully processed images' }));
});


/**
 * Cleanup
 */

gulp.task('rimraf', function() {
  return gulp
    .src([
      paths.dest + '/css',
      paths.dest + '/js',
      paths.dest + '/fonts',
      paths.dest + '/images/vendor'
    ], {read: false})
    .pipe(rimraf());
});


/**
 * Default task
 */

gulp.task('default', ['rimraf'], function() {
  gulp.start('css', 'js', 'fonts', 'images');
});


/**
 * Watch
 */

gulp.task('watch', function() {

  // Watch .less files
  gulp.watch(paths.src + '/less/**/*.less', ['css']);

  // Watch .js files
  gulp.watch(paths.src + '/js/**/*.js', ['js']);

  // Livereload
  livereload.listen();
  gulp.watch(paths.dest + '/**/*').on('change', livereload.changed);
});
