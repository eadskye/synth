const gulp = require('gulp');
const babel = require('gulp-babel');
const connect = require('gulp-connect');

gulp.task('js', () => {
  gulp.src('js/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(connect.reload());
});

gulp.task('html', () => {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
    
});

gulp.task('watch', () => {
  gulp.watch(['./app/*.html'], ['html']);
  gulp.watch(['./app/*.js'], ['js']);
});

gulp.task('serve', () => {
  connect.server({
    root: 'app',
    livereload: true
  });
});

gulp.task('default', ['connect', 'watch']);
