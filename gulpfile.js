const { src, dest, watch } = require("gulp");

const gulp = require("gulp");
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const imagemin = require("gulp-imagemin");
const cleanCSS = require('gulp-clean-css');

function sassToCss() {
    return gulp
        .src('./public/stylesheets/sass/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/stylesheets/dist'));
}

function minifyImg() {
    return gulp
        .src('./bigImages/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/images'));
}

function minifyCss() {
    return gulp
        .src('./public/stylesheets/dist/app.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./public/stylesheets/clean_css'));
}

exports.start = () => {
    watch('./public/stylesheets/sass/**/*.scss', sassToCss);
    gulp.watch('./bigImages/*', minifyImg);
    gulp.watch('./public/stylesheets/dist/app.css', minifyCss);
};
