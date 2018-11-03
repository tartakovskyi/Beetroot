'use strict';

const   gulp = require('gulp'),
autoprefixer = require('gulp-autoprefixer'),
notify = require('gulp-notify'),
sass = require('gulp-sass'),
sourcemaps = require('gulp-sourcemaps'),
clean = require('gulp-clean'),
browserSync = require('browser-sync').create();


gulp.task('sass', () => {
 return gulp.src('src/scss/**/*.scss')
 .pipe(sourcemaps.init())
 .pipe(sass().on('error', notify.onError("SASS-Error: <%= error.message %>")))
 .pipe(autoprefixer({
   browsers: ['last 2 versions'],
   cascade: false
 }))
 .pipe(sourcemaps.write())
 .pipe(gulp.dest('app/css'))
 .pipe(browserSync.stream());
});

gulp.task('html', () => {
 return gulp.src('src/index.html')
 .pipe(gulp.dest('app/'))
 .pipe(browserSync.stream());
});

gulp.task('img', () => {
 return gulp.src('src/img/**/*.*')
 .pipe(gulp.dest('app/img'))
 .pipe(browserSync.stream());
});

gulp.task('watch', () => {
 gulp.watch('src/scss/**/*.scss', ['sass']),
 gulp.watch('src/index.html',['html']),
 gulp.watch('src/img/*.*',['img'])
});

gulp.task('connect', function() {
 browserSync.init({
   server: {
     baseDir: "app",
     open: true
   }
 });
});

gulp.task('clean', function () {
  return gulp.src('app')
  .pipe(clean({
    force: true,
    read: false
  }));
});

gulp.task('developing', ['watch', 'html', 'img', 'sass', 'connect']);

gulp.task('default', ['clean'], () => {
  gulp.start('developing');
});