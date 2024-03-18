'use strict';

// 公開パス
const PUBLIC = "./public/";
const SRC = "./src/";
const START = 'test/'

// コンパイル元
const scssPath = "**/*.scss";
const ejsPath = "**/*.ejs";
const imgDefPath = "**/*";
const jsDefPath = "**/*.ts"

// コンパイル先
const htmlPath = PUBLIC;
const cssPath = "";
const imgPath = "";
const jsPath = "";

// プラグイン読み込み
import gulp from 'gulp';
import browserSyncBase from 'browser-sync';
const browserSync = browserSyncBase.create();
import ssi from 'browsersync-ssi';
import sassModule from 'gulp-sass';
import sassCompiler from 'sass';
const sass = sassModule(sassCompiler);
import ejs from 'gulp-ejs';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';

// TS
import ts from 'gulp-typescript';
const tsProject = ts.createProject('./tsconfig.json')


// 画像圧縮プラグイン
import imagemin from 'gulp-imagemin';
import mozjpeg from 'imagemin-mozjpeg';
import pngquant from 'imagemin-pngquant';
import changed from 'gulp-changed';

// ブラウザシンク
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: PUBLIC
        },
        "middleware": ssi({
          baseDir: 'htdocs',
          ext: '.html',
        }),
        startPath: START
    });
});

// sass
gulp.task('sass-task', function() {
  return(
    gulp.src(SRC + scssPath)
    .pipe(
      sass({
        outputStyle: "compressed",
        includePaths: ['./src/']
      })
    )
    .pipe(gulp.dest(PUBLIC + cssPath))
    .pipe(browserSync.stream())
  )
})

// HTMLコンパイル
gulp.task('ejs-task', function() {
    return(
      gulp.src(SRC + ejsPath)
      .pipe(plumber())
      .pipe(ejs())
      .pipe(rename({extname: ".html"}))
      .pipe(gulp.dest(htmlPath))
      .pipe(browserSync.stream())
    )
})

// TypeScriptコンパイル
gulp.task('ts-task', function() {
  return(
    gulp.src(SRC + jsDefPath)
    .pipe(tsProject())
    .pipe(gulp.dest(PUBLIC + jsPath))
    .pipe(browserSync.stream())
  )
})

// 画像圧縮
gulp.task('img-task', function () {
  return (
    gulp.src(SRC + imgDefPath + ".{png,jpg}")
    .pipe(changed(PUBLIC+ imgPath)) // srcImg と distImg を比較して異なるものだけ圧縮する
    .pipe(
      imagemin([
        pngquant({
          quality: [.7, .85], // 画質
          speed: 1 // スピード
        }),
        mozjpeg({
          quality: 85, // 画質
          progressive: true
        })
      ])
    )
    .pipe(gulp.dest(PUBLIC+ imgPath))
    .pipe(browserSync.stream())
  )
})

// ファイル監視タスク
gulp.task('watch', function() {
  // HTML
  gulp.watch(SRC + ejsPath, gulp.series('ejs-task'));
  // CSS
  gulp.watch(SRC + scssPath, gulp.series('sass-task'));
  // TS
  gulp.watch(SRC + jsDefPath, gulp.series('ts-task'));


  // ブラウザシンク
  gulp.watch(SRC + "**/*").on('change', browserSync.reload);
});

// デフォルトタスク
gulp.task('default', gulp.parallel('browser-sync', 'watch'));