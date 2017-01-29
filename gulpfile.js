// Dependencies
const gulp = require('gulp');
const bSync = require('browser-sync').create();
const sass = require('gulp-sass');
const webpack = require('webpack-stream');
const nodemon = require('gulp-nodemon');

// File dependencies
const webpackConfig = require('./webpack.config.js');

// Global vars
const sassOpts = { outputStyle: 'compressed', errLogToConsole: true };
const bSyncOpts = {
  proxy: 'localhost:5001'
};
const nodemonOpts = {
  script: './server/server.js',
  ext: 'js',
  env: {
    NODE_ENV: 'development'
  },
  watch: './server/**.*.js'
};

gulp.task('sass', () => {
  return gulp.src('./client/src/sass/*.scss')
    .pipe(sass(sassOpts).on('error', sass.logError))
    .pipe(gulp.dest('./client/css/'))
    .pipe(bSync.stream());
});

gulp.task('build', ['sass'], () => {
  return gulp.src('./client/src/app.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./client/build/'));
});

gulp.task('watch', () => {
  gulp.watch('./client/src/sass/*.scss', ['sass']);
  gulp.watch('./client/css/*.css').on('change', bSync.reload);
  gulp.watch('./client/build/*.js').on('change', bSync.reload);
  gulp.watch('./client/js/*.js').on('change', bSync.reload);
});

gulp.task('serve', () => {
  return nodemon(nodemonOpts)
    .on('restart', () => {
      console.log('App restarted...');
    })
    .on('crash', () => {
      console.error('App crashed. Restarting in 5sec');
    });
});

gulp.task('start', ['serve'], () => { bSync.init(bSyncOpts); });

gulp.task('default', ['watch', 'build', 'start']);
