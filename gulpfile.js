//*********** IMPORTS *****************//
var gulp = require('gulp'),
  sass = require('gulp-ruby-sass'),
  minifycss = require('gulp-minify-css'),
  cssBase64 = require('gulp-css-base64'),
  gutil = require('gulp-util'),
  rename = require("gulp-rename"),
  map = require("map-stream"),
  livereload = require("gulp-livereload"),
  concat = require("gulp-concat"),
  uglify = require('gulp-uglify'),
  watch = require('gulp-watch'),
  gulpIgnore = require('gulp-ignore'),
  concatCss = require('gulp-concat-css'),
  gulpCopy = require('gulp-copy'),
  autoprefixer = require('gulp-autoprefixer'),
  connect = require('gulp-connect'),
  clean = require('gulp-clean'),
  browserSync = require('browser-sync').create(),
  sourcemaps = require('gulp-sourcemaps'),
  add = require('gulp-add'),
  browserify = require('browserify'),
  vsource = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  babelify = require('babelify');
  open = require('gulp-open'),
  gls = require('gulp-live-server'),
  watchify = require('watchify');

var env = process.env.NODE_ENV || 'development',
  gConfig = require("./config/gulpConfig_"+env);

var gServer = gls.new('app.js'),
serverPromise;

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
  compileOptions: {
    'style': 'expanded',   // expanded compressed
    'unixNewlines': true,
    'cacheLocation': './.sass_cache',
    'sourcemap': true
  }
}];

var filePaths = {
  src: 'public/src',
  dist: 'public/dist/',
  js: ['scripts/**/*.js', '!scripts/libs/**/*.js'],
  libs: ['public/src/js/lib/**/*.js'],
  libsTarget: 'public/dist/js/lib/',
  styles: ['styles/**/*.css'],
  views: "public/src/views/layouts/index.html",
  viewsTarget: "public/dist/",
  images: "public/src/images/**/**",
  imagesTarget: "public/dist/images/",
  fonts: "public/src/fonts/**/**",
  fontsTarget: "public/dist/fonts/",
  extras: ['crossdomain.xml', 'humans.txt', 'manifest.appcache', 'robots.txt', 'favicon.ico']
};

gulp.task('clean', function() {
  return gulp.src(filePaths.dist)
    .pipe(clean());
});

gulp.task("copysource",function() {
  gulp.src(filePaths.images)
    .pipe(gulp.dest(filePaths.imagesTarget));
  gulp.src(filePaths.fonts)
    .pipe(gulp.dest(filePaths.fontsTarget));
})


gulp.task('sass', function() {  
  sass(sassConfig[0].paths[1], sassConfig[0].compileOptions)
   .pipe(gulp.dest(sassConfig[0].output))  

  return sass(sassConfig[0].paths[0], sassConfig[0].compileOptions)
    .on('error', sass.logError)
    .pipe(sourcemaps.write())
    .pipe(cssBase64({
      baseDir: "./public",
      maxWeightResource: 1000000
    }))
   .pipe(gulp.dest(sassConfig[0].output))   
});

gulp.task('server', function() {
    var serverPromise = gServer.start();
    serverPromise.then(function(){
    });

    /*Available app options*/
    /*'google-chrome' // Linux 
    'chrome' // Windows 
    'google chrome' or 'Google Chrome' // OSX 
    'firefox'*/

    gulp.src('./public/views/layouts/index.html')
    .pipe(open({
      uri: 'http://localhost:'+gConfig.port,
      app: gConfig.browser || 'chrome'
    }));

    gulp.watch(['./public/views/**/*.html','./public/dist/css/**/*.css','./public/dist/js/**/*.js'],function(file){
      gServer.notify.call(gServer, file);
    });

    gulp.watch('app.js', function() {
      gServer.start.bind(gServer)()
    });
});

/*****Browserify task module*****/

var browserifyHandler = function() {
  return browserify(
          {
            entries: 'public/src/js/main.jsx',
            extensions: ['.jsx','.js'],           
            debug: true,
            compact: false,
            cache: {},
            packageCache: {},
            paths : ["public/src/js"]
          })
          .transform(babelify, {
            presets : ["es2015",'stage-0',"react"]
          });
};

var watchifyHandler = watchify(browserifyHandler());
watchifyHandler.on('log', gutil.log);

function bundle(pkg) {
      
    return pkg.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(vsource('bundleApp.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./public/dist/js'));  
}

gulp.task("browserify", bundle.bind(null, browserifyHandler()));

gulp.task('watch', function () {
  gulp.watch(['./public/src/scss/**/*.scss'], ['sass']);
  bundle(watchifyHandler);
  watchifyHandler.on('update', bundle.bind(null, watchifyHandler));
  console.log("Listening to Scss, Script changes");
});

gulp.task("build", [ "copysource","sass","browserify"]);
gulp.task("default", [ "copysource","sass","browserify"]);


