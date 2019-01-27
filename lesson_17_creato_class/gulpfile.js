'use strict';

const gulp = require('gulp'),
// plugins = require('gulp-load-plugins')(),
autoprefixer = require('gulp-autoprefixer'),
notify = require('gulp-notify'),
sass = require('gulp-sass'),
sourcemaps = require('gulp-sourcemaps'),
clean = require('gulp-clean'),
babel = require('gulp-babel'),
uglify = require('gulp-uglify'),
imgmin = require('gulp-imagemin'),
htmlmin = require('gulp-htmlmin'),
browserSync = require('browser-sync').create();


gulp.task('sass:dev', () => {
  return setTimeout(() => {
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
  }, 500);
});


gulp.task('sass:prod', () => {
  return setTimeout(() => {
    return gulp.src('src/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', notify.onError("SASS-Error: <%= error.message %>")))
    .pipe(autoprefixer({
     browsers: ['last 2 versions'],
     cascade: false
   }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
  }, 500);
});

gulp.task('html:dev', () => {
 return gulp.src('src/index.html')
 .pipe(gulp.dest('app/'))
 .pipe(browserSync.stream());
});

gulp.task('html:prod', () => {
 return gulp.src('src/index.html')
 .pipe(htmlmin({ collapseWhitespace: true }))
 .pipe(gulp.dest('app/'))
 .pipe(browserSync.stream());
});


gulp.task('js:dev', () => {
 return gulp.src('src/js/**/*.js')
 .pipe(sourcemaps.init())
 .pipe(babel({
  presets: ['@babel/env']
}).on('error', notify.onError("JS-babel-Error: <%= error.message %>")))
 // .pipe(uglify().on('error', notify.onError("JS-uglify-Error: <%= error.message %>")))
 .pipe(sourcemaps.write())
 .pipe(gulp.dest('app/js'))
 .pipe(browserSync.stream());
});

gulp.task('js:prod', () => {
 return gulp.src('src/js/**/*.js')
 .pipe(sourcemaps.init())
 .pipe(babel({
  presets: ['@babel/env']
}).on('error', notify.onError("JS-babel-Error: <%= error.message %>")))
 .pipe(uglify().on('error', notify.onError("JS-uglify-Error: <%= error.message %>")))
 .pipe(sourcemaps.write())
 .pipe(gulp.dest('app/js'))
 .pipe(browserSync.stream());
});

gulp.task('img:dev', () => {
 return gulp.src('src/img/**/*.*')
 .pipe(gulp.dest('app/img'))
 .pipe(browserSync.stream());
});

gulp.task('img:prod', () => {
 return gulp.src('src/img/**/*.*')
 .pipe(imgmin())
 .pipe(gulp.dest('app/img'))
 .pipe(browserSync.stream());
});

gulp.task('libs', () => {
 return gulp.src('src/libs/**/*.*')
 .pipe(gulp.dest('app/libs'))
 .pipe(browserSync.stream());
});

gulp.task('fonts', () => {
 return gulp.src('src/fonts/**/*.*')
 .pipe(gulp.dest('app/fonts'))
 .pipe(browserSync.stream());
});

gulp.task('watch', () => {
 gulp.watch('src/scss/**/*.scss', ['sass']),
 gulp.watch('src/index.html',['html']),
 gulp.watch('src/js/**/*.js',['js']),
 gulp.watch('src/img/**/*.*',['img']),
 gulp.watch('src/fonts/**/*.*',['fonts'])
 const htmlmin = require('gulp-htmlmin');
});

gulp.task('connect', () => {
 browserSync.init({
   server: {
     baseDir: "app",
     open: true
   }
 });
});

gulp.task('clean', () => {
  return gulp.src('app')
  .pipe(clean({
    force: true,
    read: false
  }));
});

gulp.task('developing', ['watch', 'html:dev', 'js:dev', 'libs', 'img:dev', 'fonts', 'sass:dev', 'connect']);

gulp.task('prod', ['watch', 'html:prod', 'js:prod', 'libs', 'img:prod', 'fonts', 'sass:prod', 'connect']);

gulp.task('default', ['clean'], () => {
  gulp.start('developing');
});