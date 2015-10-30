//*********** IMPORTS *****************
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var gutil = require('gulp-util');
var rename = require("gulp-rename");
var map = require("map-stream");
var livereload = require("gulp-livereload");
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
global.errorMessage = '';

//Configuration - Change me
var sassFiles = [
	{
		watch: 'public/src/scss/**/*.scss',
		sass: 'public/src/scss/app-main.scss',
		output: 'public/src/css',
		name: 'app-main.css',
	}
];
var jsFiles = [
	{
		watch: '_assets/admin/*.js',
		output: './www/app/View/Themed/Admin/webroot/js/',
		name: 'admin.js',
		nameMin: 'admin.min.js'
	},
	{
		watch: 'html/js/*.js',
		output: './www/app/View/Themed/Site/webroot/js/',
		name: 'site.js',
		nameMin: 'site.min.js'
	}
];
//END configuration


var sassOptions = {
	'style': 'compressed',
	'unixNewlines': true,
	'cacheLocation': '_scss/.sass_cache'
};



gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});