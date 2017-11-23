'use strict';

var gulp = require('gulp'),
watch = require('gulp-watch'),
prefixer = require('gulp-autoprefixer'),
uglify = require('gulp-uglify'),
sass = require('gulp-sass'),
sourcemaps = require('gulp-sourcemaps'),
rigger = require('gulp-rigger'),
cssmin = require('gulp-minify-css'),
imagemin = require('gulp-imagemin'),
pngquant = require('imagemin-pngquant'),
rimraf = require('rimraf'),
uncss = require('gulp-uncss'),
rsync = require('gulp-rsync');

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        js: 'www/js/',
        css: 'www/css/',
        img: 'www/images/',
        fonts: 'www/fonts/',
        html: 'www/',
    },
    src: {
        js: 'src/js/script.js',
        styles: 'src/styles/style.scss',
        stylesPartials: 'src/',
        spriteTemplate: 'src/sass.template.mustache',
        img: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*',
        sprite: 'src/sprite/*.*',
        html: 'src/*.php',
    },
    watch: {
        js: 'src/js/partials/*.js',
        css: 'src/styles/partials/**/*.scss',
        image: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*',
        html: 'src/**/*.php',
    },
    clean: './www'
};

gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
    .pipe(rigger()) //Прогоним через rigger
    .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
});


gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
    .pipe(rigger()) //Прогоним через rigger
    .pipe(uglify()) //Сожмем наш js
    .pipe(gulp.dest(path.build.js));
});

gulp.task('css:build', function () {
    gulp.src(path.src.styles) //Выберем наш main.scss
    .pipe(sass()) //Скомпилируем
    .pipe(prefixer()) //Добавим вендорные префиксы
    .pipe(cssmin()) //Сожмем
    .pipe(gulp.dest(path.build.css));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
    .pipe(gulp.dest(path.build.img));
});

gulp.task('font:build', function () {
    gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts));
});

gulp.task('build', [
    'font:build',
    'js:build',
    'css:build',
    'html:build',
    'image:build'
]);

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('watch', function(){
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('font:build');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('css:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.image], function(event, cb) {
        gulp.start('image:build');
    });
});

gulp.task('bw', [
    'build',
    'watch'
]);