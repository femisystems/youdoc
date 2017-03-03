// Dependencies
import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import dotenv from 'dotenv';
import babel from 'gulp-babel';

dotenv.config({ silent: true });

const serverDir = {
  src: './server',
  dest: './dist'
};

gulp.task('build', () => {
  gulp.src(`${serverDir.src}/**/*.js`)
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest(`${serverDir.dest}`));
});

gulp.task('serve', () => {
  nodemon({
    script: './dist/server.js',
    ext: 'js',
    env: { NODE_ENV: 'development' }
  });
});

gulp.task('watch', () => {
  gulp.watch(`${serverDir.src}/**/*.js`, ['build']);
});

gulp.task('default', ['build', 'serve', 'watch']);
