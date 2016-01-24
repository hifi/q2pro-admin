'use strict';

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');
var argv = require('yargs').argv;
var templateCache = require('gulp-angular-templatecache');

var scriptsPath = __dirname + '/assets/js';
var sassPath = __dirname + '/assets/sass';

gulp.task('js', function() {
	return gulp.src(scriptsPath + '/app.js')
	.pipe(browserify({
		insertGlobals: true,
		debug: !argv.production
	}))
	.pipe(gulp.dest('./js'));
});

gulp.task('templates', function() {
	return gulp.src(scriptsPath + '/**/*.html')
	.pipe(templateCache({
		module: 'app',
	}))
	.pipe(gulp.dest('./js'));
});

gulp.task('sass', function() {
	return gulp.src(sassPath + '/**/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({
		outputStyle: argv.production ? 'compressed' : '',
	}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./css'));
});

gulp.task('lint', function() {
	return gulp.src([
		'gulpfile.js',
		scriptsPath + '/**/*.js'
	]).pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'))
	.on('error', function() {
	});
});

gulp.task('watch', ['js', 'sass'], function() {
	livereload({
		start: true,
	});

	gulp.watch([
		scriptsPath + '/**/*.js',
	], ['lint', 'js']);

	gulp.watch([
		scriptsPath + '/**/*.html',
	], ['templates']);


	gulp.watch([
		sassPath + '/**/*.scss',
	], ['sass']);
});


gulp.task('default', ['lint', 'js', 'templates', 'sass']);
