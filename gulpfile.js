const { src, dest } = require("gulp");
const { watch, series } = require('gulp');

const gulp = require("gulp");
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const imagemin = require("gulp-imagemin");
const sync = require("browser-sync").create();

function sassToCss() {
    return src('./public/stylesheets/sass/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/stylesheets/dist'));
}

function minifyImg() {
    return gulp
        .src('./bigImages/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/images'));
}

//Zoekt naar nieuwe bestanden in de bigImages map
gulp.task("minifyImg", () => {
    gulp.watch('./bigImages/*', minifyImg);
});

//Zoekt naar veranderingen in alle sass (scss) files
exports.start = () => {
    watch('./public/stylesheets/sass/**/*.scss', sassToCss);
};
