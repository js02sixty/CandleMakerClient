'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

var nib = require('nib');
var lost = require('lost');
var rupture = require('rupture');
var bootstrap = require('bootstrap-styl');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

module.exports = function(options) {
  gulp.task('styles', function () {

    var injectFiles = gulp.src([
      options.src + '/app/**/*.styl',
      '!' + options.src + '/app/index.styl',
      '!' + options.src + '/app/vendor.styl'
    ], { read: false });

    var injectOptions = {
      transform: function(filePath) {
        filePath = filePath.replace(options.src + '/app/', '');
        return '@import \'' + filePath + '\';';
      },
      starttag: '// injector',
      endtag: '// endinjector',
      addRootSlash: false
    };

    var indexFilter = $.filter('index.styl');
    var vendorFilter = $.filter('vendor.styl');

    return gulp.src([
      options.src + '/app/index.styl',
      options.src + '/app/vendor.styl'
    ])
      .pipe(indexFilter)
      .pipe($.inject(injectFiles, injectOptions))
      .pipe(indexFilter.restore())
      .pipe(vendorFilter)
      .pipe(wiredep(options.wiredep))
      .pipe(vendorFilter.restore())
      .pipe($.sourcemaps.init())
      .pipe($.stylus({ use: [nib(), lost(), rupture(), bootstrap()]})).on('error', options.errorHandler('Stylus'))
      .pipe($.autoprefixer()).on('error', options.errorHandler('Autoprefixer'))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest(options.tmp + '/serve/app/'))
      .pipe(browserSync.reload({ stream: true }));
  });
};
