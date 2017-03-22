/**
 * Gulpfile
 *
 */

var
  gulp         = require('gulp'),
  less         = require('gulp-less'),
  bless        = require('gulp-bless'),
  minifycss    = require('gulp-minify-css'),
  uglify       = require('gulp-uglify'),
  rimraf       = require('gulp-rimraf'),
  concat       = require('gulp-concat'),
  pxtorem      = require('gulp-pxtorem'),
  notify       = require('gulp-notify'),
  rename       = require('gulp-rename'),
  path         = require('path'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps   = require('gulp-sourcemaps'),
  livereload   = require('gulp-livereload');

var paths = {
  src:   'src',
  dest:  'assets',
  vendor: 'node_modules'
};


/*
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
      root_value: 16
    }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dest + '/css'))
    .pipe(notify({ message: 'Successfully compiled LESS' }));
});

gulp.task('css:minify', ['css:compile'], function() {
  return gulp
    .src(paths.dest + '/css/styles.css')
    .pipe(minifycss({
      processImport: false
    }))
    .pipe(rename(function (path) {
      if(path.extname === '.css') {
        path.basename += '.min';
      }
    }))
    .pipe(bless())
    .pipe(gulp.dest(paths.dest + '/css'))
    .pipe(notify({ message: 'Successfully minified CSS' }));
});


/*
 * Javascript:
 *
 * Concatenates and minifies scripts
 */

gulp.task('js', function() {
  var scripts = [
    paths.vendor + '/jquery/dist/jquery.js',
    paths.vendor + '/bootstrap/dist/js/bootstrap.js',
    paths.src + '/js/plugins.js',
    paths.src + '/js/main.js'
  ];

  return gulp
    .src(scripts)
    .pipe(concat('script.js'))
    .pipe(gulp.dest(paths.dest + '/js'))
    .pipe(uglify({ outSourceMap: true }))
    .pipe(rename(function (path) {
      if(path.extname === '.js') {
        path.basename += '.min';
      }
    }))
    .pipe(gulp.dest(paths.dest + '/js'))
    .pipe(notify({ message: 'Successfully compiled javascript' }));
});


/*
 * Fonts:
 *
 * Copies fonts to the assets folder
 */

gulp.task('fonts', function() {
  return gulp
    .src([
      'src/fonts/**/*'
    ])
    .pipe(gulp.dest(paths.dest + '/fonts'))
    .pipe(notify({ message: 'Successfully processed fonts' }));
});


/*
 * Favicons:
 *
 * Copies favicons to the assets folder
 */

gulp.task('favicons', function() {
  return gulp
    .src(paths.src + '/ico/**/*')
    .pipe(gulp.dest(paths.dest + '/ico'))
    .pipe(notify({ message: 'Successfully processed favicons' }));
});


/*
 * Cleanup
 */

gulp.task('rimraf', function() {
  return gulp
    .src([
      paths.dest + '/css',
      paths.dest + '/js',
      paths.dest + '/ico',
      paths.dest + '/fonts'
    ], {read: false})
    .pipe(rimraf());
});


/*
 * Default task
 */

gulp.task('default', ['rimraf'], function() {
  gulp.start('css', 'js', 'fonts', 'favicons');
});


/*
 * Watch
 */

gulp.task('watch', function() {
  // Watch LESS and JS files
  gulp.watch('src/less/**/*.less', ['css']);
  gulp.watch('src/js/**/*.js', ['js']);

  // Livereload
  livereload.listen();
  gulp.watch(paths.dest + '/**/*').on('change', livereload.changed);
});
