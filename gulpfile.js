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
  nodemon = require('gulp-nodemon'),
  open = require('gulp-open'),
  gls = require('gulp-live-server');


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




  gulp.task('serve', function() {
    //1. run your script as a server
    var server = gls.new('app.js');
    server.start();
    //use gulp.watch to trigger server actions(notify, start or stop)
    gulp.watch('./public/views/**/*.html',function(file){
      server.notify.call(server, file);
    });
//    gulp.watch('app.js', server.start.bind(server)); //restart my server

    // Note: try wrapping in a function if getting an error like `TypeError: Bad argument at TypeError (native) at ChildProcess.spawn`
    gulp.watch('app.js', function() {
      server.start.bind(server)()
    });
});



















var sassConfig = [{
  watch: 'public/src/scss/**/*.scss',
  paths: ['public/src/scss/app-main.scss', 'public/src/scss/webfonts/**.scss'],
  output: 'public/dist/css/',
  name: 'app-main.css',
  excludedFiles: 'public/src/css/webfonts/**.scss',
  compileOptions: {
    'style': 'expanded',
    'unixNewlines': true,
    'cacheLocation': '_scss/.sass_cache',
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

gulp.task("copysource", ["clean"], function() {
  gulp.src(filePaths.images)
    .pipe(gulp.dest(filePaths.imagesTarget));
  gulp.src(filePaths.fonts)
    .pipe(gulp.dest(filePaths.fontsTarget));
})


gulp.task('sass', ["clean", "webfonts"], function() {
  return sass(sassConfig[0].paths[0], sassConfig[0].compileOptions)
    .pipe(sourcemaps.write())
    .pipe(cssBase64({
      baseDir: "./public",
      maxWeightResource: 1000000
    }))
    .pipe(gulp.dest(sassConfig[0].output))
    .pipe(minifycss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(sassConfig[0].output));
});


gulp.task('webfonts', ["clean"], function() {
  return sass(sassConfig[0].paths[1], sassConfig[0].compileOptions)
    .pipe(gulp.dest(sassConfig[0].output))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(sassConfig[0].output));
});

// Static server
gulp.task('dev', function() {
  browserSync.init({    
    server: {
      baseDir: ["public"],
      index: "views/layouts/index.html"
    }    
  });
});

gulp.task('browserify',["clean"], function(){
  return browserify(
          {
            entries: 'public/src/js/main.js',
            extensions: ['.jsx','.js'],           
            debug: true
          })
          .transform(babelify, {
            presets : ["es2015",'stage-0', "react"]
          })
        .bundle()      
        .pipe(vsource('bundleApp.js'))
        .pipe(buffer())
          .pipe(uglify())
        .pipe(gulp.dest('public/dist/js'));
});

gulp.task('start', function () {
  nodemon({
    script: 'app.js',
    ext: 'js html scss',
    env: { 'NODE_ENV': 'development' }
  })
  .on('start',function(){
    console.log("started");
/*    gulp.src('./public/views/layouts/index.html')
    .pipe(open({
      uri: 'localhost:5000',
      app: 'firefox'
    }));*/

  })
  .on('restart', function(){
    console.log("restarted")
  })
  .on('exit',function(){
    console.log("done")
  });

});

gulp.task("build", ["clean", "copysource", "sass","browserify"]);
