//*********** IMPORTS *****************//
var gulp = require('gulp');


//************CSS PLUGINS**************//
var sass = require('gulp-ruby-sass');
var minifycss = require('gulp-minify-css');
var cssBase64 = require('gulp-css-base64');
var gutil = require('gulp-util');
var rename = require("gulp-rename");
var map = require("map-stream");
var livereload = require("gulp-livereload");
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var gulpIgnore = require('gulp-ignore');
var concatCss = require('gulp-concat-css');
var gulpCopy = require('gulp-copy');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();


gulp.task('browser-sync', function() {
    browserSync.init({
        // server: {
        //     baseDir: "./public",
        //     index: "./views/layouts/index.html"
        // },
        proxy: "localhost:3000",
        port: 8888
    });
});


global.errorMessage = '';

//build datestamp for cache busting
var getStamp = function() {
  var stampDate = new Date();
  var stampYear = stampDate.getFullYear().toString();
  var stampMonth = ('0' + (stampDate.getMonth() + 1)).slice(-2);
  var stampDay = ('0' + stampDate.getDate()).slice(-2);
  var stampSeconds = stampDate.getSeconds().toString();
  var stampFullDate = stampYear + stampMonth + stampDay + stampSeconds;
  return stampFullDate;
};

//Configuration - Change me
var sassFiles = [{
  watch: 'public/src/scss/**/*.scss',
  sass: ['public/src/scss/app-main.scss', 'public/src/scss/webfonts/**.scss'],
  output: 'public/src/css/',
  name: 'app-main.css',
  excludedFiles: 'public/src/css/webfonts/**.scss'
}];


var jsFiles = [{
  watch: '_assets/admin/*.js',
  output: './www/app/View/Themed/Admin/webroot/js/',
  name: 'admin.js',
  nameMin: 'admin.min.js'
}, {
  watch: 'html/js/*.js',
  output: './www/app/View/Themed/Site/webroot/js/',
  name: 'site.js',
  nameMin: 'site.min.js'
}];
//END configuration

var sassOptions = {
  'style': 'compressed',
  'unixNewlines': true,
  'cacheLocation': '_scss/.sass_cache'
};



//gulp.task('sass', function () {
//  gulp.src('./sass/**/*.scss')
//   .pipe(sass().on('error', sass.logError))
//  .pipe(gulp.dest('./css'));
// });

// gulp.task('sass:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass']);
// });



gulp.task('sass', function() {
  return sass(sassFiles[0].sass, {
      style: 'expanded'
    })
    .pipe(gulp.dest(sassFiles[0].output))
    .pipe(cssBase64({
      maxWeightResource: 1000000
    }))
    .pipe(gulp.dest(sassFiles[0].output))
    .pipe(gulpIgnore.exclude(sassFiles[0].excludedFiles))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minifycss())
    .pipe(minifycss())
    .pipe(gulp.dest(sassFiles[0].output + "/min"));
});


gulp.task('compressme', function() {
  return gulp.src(sassFiles[0].output + sassFiles[0].name)
    .pipe(cssBase64())
    .pipe(gulp.dest(sassFiles[0].output));
});

gulp.task('build', function() {
  return gulp.src(sassFiles[0].output + sassFiles[0].name)
    .pipe(base64())
    .pipe(gulp.dest('dist'));
});