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
var connect = require('gulp-connect');
var clean = require('gulp-clean');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('dev', function() {
    browserSync.init({
        server: {
            baseDir: ["public/dist"],
            index: "views/layouts/index.html"
        }
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



var sassConfig = [{
  watch: 'public/src/scss/**/*.scss',
  paths: ['public/src/scss/app-main.scss', 'public/src/scss/webfonts/**.scss'],
  output: 'public/dist/css/',
  name: 'app-main.css',
  excludedFiles: 'public/src/css/webfonts/**.scss',
  compileOptions : {
    'style': 'expanded',
    'unixNewlines': true,
    'cacheLocation': '_scss/.sass_cache'    
  }
}];


var filePaths = {
 src: 'public/src',
 dist: 'public/dist/',
 js: ['scripts/**/*.js', '!scripts/libs/**/*.js'],
 libs: ['scripts/libs/jquery/dist/jquery.js', 'scripts/libs/underscore/underscore.js', 'scripts/backbone/backbone.js'],
 styles: ['styles/**/*.css'],
 views: "public/src/views/**/**.html",
 viewsTarget : "public/dist/views/",
 images: "public/src/images/**/**",
 imagesTarget:"public/dist/images/",
 fonts : "public/src/fonts/**/**",
 fontsTarget :"public/dist/fonts/",
 extras: ['crossdomain.xml', 'humans.txt', 'manifest.appcache', 'robots.txt', 'favicon.ico']
};




gulp.task('clean', function() {
 return gulp.src(filePaths.dist)
 .pipe(clean());
});


gulp.task("copysource",["clean"],function(){
  
  gulp.src(filePaths.views)
  .pipe(gulp.dest(filePaths.viewsTarget));
  gulp.src(filePaths.images)
  .pipe(gulp.dest(filePaths.imagesTarget));
  gulp.src(filePaths.fonts)
  .pipe(gulp.dest(filePaths.fontsTarget));

})

gulp.task('sass',["clean"], function() {
  return sass(sassConfig[0].paths, sassConfig[0].compileOptions)    
    .pipe(cssBase64({
      maxWeightResource: 1000000
    }))
    .pipe(gulp.dest(sassConfig[0].output))
    //.pipe(gulpIgnore.exclude(condition))
   /* .pipe(concatCss("app-main.css"))
    .pipe(gulp.dest(sassConfig[0].output))
    .pipe(minifycss())    
    .pipe(rename({
      suffix: '.min'
    }))    
    .pipe(gulp.dest(sassConfig[0].output+"/min"));*/
});



gulp.task("default" , ["clean", "copysource", "sass"]);
