const gulp       = require('gulp');
const connect    = require('gulp-connect');
const clean      = require('gulp-clean');
const sass       = require('gulp-sass');
const rename     = require('gulp-rename');
const source     = require('vinyl-source-stream');
const browserify = require('browserify');
const babelify   = require('babelify');

let SRC  = `${__dirname}/app/`;
let DEST = `${__dirname}/dist/`;
let TEMP = `${__dirname}/.tmp`;

let jsTask = () => {
  return browserify({
      entries: `${SRC}js/main.js`,
      extensions: ['.js'],
      debug: true,
      paths: [`${SRC}/js/`]
    })
    .transform('babelify', {presets: ['es2015', 'react']})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(TEMP))
    .pipe(connect.reload());
};

let sassTask = () => {
  return gulp.src(`${SRC}styles/*.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(TEMP))
    .pipe(connect.reload());
};

let htmlTask = () => {
  return gulp.src(`${SRC}*.html`)
    .pipe(gulp.dest(TEMP))
    .pipe(connect.reload());
};

gulp.task('clean', () => {
  // returning the stream indicates this task is async
  return gulp.src(TEMP, {read: false})
    .pipe(clean());
});

gulp.task('clean-dist', () => {
  return gulp.src(DIST, {read: false})
    .pipe(clean());
});

gulp.task('js', ['clean'], jsTask);
gulp.task('js-watch', jsTask);

gulp.task('sass', ['clean'], sassTask);
gulp.task('sass-watch', sassTask);

gulp.task('html', ['clean'], htmlTask);
gulp.task('html-watch', htmlTask);

gulp.task('watch', () => {
  gulp.watch(`${SRC}*.html`, ['html-watch']);
  gulp.watch(`${SRC}js/**/*.js`, ['js-watch']);
  gulp.watch(`${SRC}styles/**/*.scss`, ['sass-watch']);
});

gulp.task('build', ['js', 'html', 'sass'], () => {
  return gulp.src(`${TEMP}/**/*`)
    .pipe(gulp.dest(DEST));
});

gulp.task('serve', () => {
  connect.server({
    root: TEMP,
    livereload: true
  });
});


gulp.task('default', ['js', 'html', 'sass', 'serve', 'watch']);
