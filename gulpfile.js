const { src, dest } = require("gulp");
const { watch, series } = require('gulp');

const gulp = require("gulp");
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const sync = require("browser-sync").create();

function sassToCss() {
    return src('./public/stylesheets/sass/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("./public/stylesheets/dist"));
}

exports.start = () => {
    watch('./public/stylesheets/sass/**/*.scss', sassToCss);
};
