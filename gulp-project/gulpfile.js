var gulp = require('gulp');                         // Gulp
var concatCss = require('gulp-concat-css');         // Gulp plugin for css concatenation
var browserSync = require('browser-sync').create(); // Browser
var minifyCss = require('gulp-minify-css');         // Gulp plugin for css minification
var minifyJs = require('gulp-minify');              // Gulp plugin for js minification
var minifyImages = require('gulp-imagemin');        // Gulp plugin for image minification
var sass = require('gulp-sass')(require('sass'));   // Gulp plugin for sass compilation
var sourcesmaps = require('gulp-sourcemaps')        // Gulp plugin for css sourcemapping

// Default task
gulp.task('default', function() {
    // Moves all html files to the dist folder
    gulp.src('./src/html/*.*').pipe(gulp.dest('dist'));
    // Compiles all sass files to css and moves them to the css folder
    gulp.src('./src/sass/*.scss').pipe(sass().on('error', sass.logError)).pipe(gulp.dest('./src/css'));
    // Concatenates all css files, minifies the resulting css file and moves it to the dist folder
    gulp.src('./src/css/*.*').pipe(concatCss('super.css')).pipe(minifyCss()).pipe(gulp.dest('dist')).pipe(browserSync.stream());
    // Minifies all js files and moves them to the dist folder
    gulp.src('./src/js/*.js').pipe(minifyJs({noSource: true})).pipe(gulp.dest('dist'));
    // Minifies all images and moves them to the dist/media folder
    gulp.src('./src/media/images/*.*', {encoding: false}).pipe(minifyImages()).pipe(gulp.dest('dist/media'))

    // Initializes browser and checks for any changes
    browserSync.init({
        server:'./dist'
    });
    gulp.watch('./dist/*.*', browserSync.reload);
});

// Sourcemaps task
gulp.task('sourcemaps', function() {
    // Moves all html files to the dist folder
    gulp.src('./src/html/*.*').pipe(gulp.dest('dist'));
    // Compiles all sass files to css and moves them to the css folder
    gulp.src('./src/sass/*.scss').pipe(sass().on('error', sass.logError)).pipe(gulp.dest('./src/css'));
    // Concatenates all css files, creates a sourcemap for the combined css file, minifies it and moves it to the dist folder
    gulp.src('./src/css/*.css').pipe(concatCss('super.css')).pipe(sourcesmaps.init()).pipe(minifyCss()).pipe(sourcesmaps.write()).pipe(gulp.dest('dist')).pipe(browserSync.stream());
    // Minifies all js files and moves them to the dist folder
    gulp.src('./src/js/*.js').pipe(minifyJs({noSource: true})).pipe(gulp.dest('dist'));
    // Minifies all images and moves them to the dist/media folder
    gulp.src('./src/media/images/*.*', {encoding: false}).pipe(minifyImages()).pipe(gulp.dest('dist/media'))

    // Initializes browser and checks for any changes
    browserSync.init({
        server:'./dist'
    });
    gulp.watch('./dist/*.*', browserSync.reload);
});
