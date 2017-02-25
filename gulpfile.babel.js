// Dependencies
import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import childProcess from 'child_process';
import webpack from 'webpack-stream';
import nodemon from 'gulp-nodemon';
import dotenv from 'dotenv';
import babel from 'gulp-babel';

dotenv.config({ silent: true });

// File dependencies
const webpackConfig = require('./webpack.config.js');

// Front-end entry point
const dir = {
  src: './client',
  dest: './client/build'
};

const serverDir = {
  src: './es6',
  dest: './server'
};

// Sass options
const sassOpts = { outputStyle: 'compressed' };
const sassPaths = {
  src: `${dir.src}/scss/app.scss`,
  dest: `${dir.dest}/css/`
};

// Bsync options
// const bsyncOpts = { proxy: `localhost:${process.env.PORT}` };

gulp.task('sass', () => {
  gulp.src(sassPaths.src)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOpts).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(sassPaths.dest));
    // .pipe(bsync.reload({ stream: true }));
});

gulp.task('transpile', () => {
  gulp.src(`${serverDir.src}/**/*.js`)
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest(`${serverDir.dest}`));
});

gulp.task('build', ['sass'], () => {
  gulp.src('./client/src/app.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(dir.dest));
});

gulp.task('watch', () => {
  gulp.watch(sassPaths.src, ['sass']);
  gulp.watch(`${dir.src}/**/*.js`, ['build']);
  // gulp.watch(`${dir.src}/js/*.js`).on('change', bsync.reload);
  // gulp.watch(`${dir.dest}/*.js`).on('change', bsync.reload);
  gulp.watch(`${serverDir.src}/**/*.js`, ['transpile']);
});

// gulp.task('serve', () => childProcess.exec('babel -w ./server/Server.js'));
gulp.task('serve', () => {
  nodemon({
    script: './server/server.js',
    ext: 'js',
    env: { NODE_ENV: 'development' }
  });
});

// gulp.task('start', ['serve'], () => bsync.init(bsyncOpts));
gulp.task('start', ['transpile', 'serve']);
gulp.task('default', ['transpile', 'build', 'start', 'watch']);
