'use strict';

/* --------- plugins --------- */
const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const rename = require("gulp-rename");
const plumber = require('gulp-plumber');
const useref = require('gulp-useref');
const gulpif = require('gulp-if');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const urlAdjuster = require('gulp-css-url-adjuster');
const concat = require('gulp-concat');
const reload = browserSync.reload;

/* --------- paths --------- */
const SRC_PATH = 'src';
const DIST_PATH = 'docs';

var paths = {
    pug: {
        src: SRC_PATH + '/html/**/*.pug',
        pages: SRC_PATH + '/html/pages/*.pug',
        dist: DIST_PATH
    },

    scss: {
        src: SRC_PATH + '/css/**/*.scss',
        entry: SRC_PATH + '/css/main.scss',
        dist: DIST_PATH + '/css'
    },

    js: {
        src: SRC_PATH + '/js/*.js',
        entry: SRC_PATH + '/js/main.js',
        dist: DIST_PATH + '/js/'
    },

    img: {
        src: SRC_PATH + '/img/**/*.*',
        dist: DIST_PATH + '/img'
    },

    fonts: {
        src: SRC_PATH + '/fonts/**/*.*',
        dist: DIST_PATH + '/fonts'
    },

    browserSync: {
        baseDir: './' + DIST_PATH,
        watchPaths: [SRC_PATH + '/html/pages/*.pug', DIST_PATH + 'css/*.css', DIST_PATH + 'js/*.js']
    },

    indexBuilder: {
        location: SRC_PATH + '/index/index.js'
    }
};

// pug
gulp.task('pug', function () {
    gulp.src(paths.pug.pages)
        .pipe(plumber())
        .pipe(pug({
            pretty: '\t',
            basedir: './'
        }))
        .pipe(useref())
        .pipe(sourcemaps.init())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cssnano()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.pug.dist))
        .pipe(reload({stream: true}));
});

// sass
gulp.task('sass', function () {
    return gulp.src(paths.scss.entry)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 5%'],
            cascade: false
        }))
        .pipe(urlAdjuster({
            replace: ['../../', '../']
        }))
        .pipe(cssnano())
        .pipe(rename('styles.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.scss.dist))
        .pipe(reload({stream: true}));
});

// server
gulp.task('sync', function () {
    browserSync.init({
        server: {
            baseDir: paths.browserSync.baseDir
        }
    });
});

gulp.task('copy-file', function () {
    gulp.src(SRC_PATH + '/bower/jquery/dist/jquery.min.js')
        .pipe(gulp.dest(DIST_PATH + '/js'));
    gulp.src(SRC_PATH + '/bower/chart.js/dist/Chart.min.js')
        .pipe(gulp.dest(DIST_PATH + '/js'));
    gulp.src(SRC_PATH + '/bower/bxslider/images/*.*')
        .pipe(gulp.dest(DIST_PATH + '/img'));
    return gulp.src(SRC_PATH + '/bower/bxslider/jquery.bxslider.js')
        .pipe(gulp.dest(DIST_PATH + '/js'));
});


// images
gulp.task('images', function () {
    gulp.src(paths.img.src)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(paths.img.dist))
        .pipe(reload({stream: true}));
});

// fonts
gulp.task('fonts', function () {
    gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dist))
});

gulp.task('scripts', function () {
    return gulp.src(paths.js.src)
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(concat('main.js'))
        .pipe(gulp.dest(paths.js.dist))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.dist))
        .pipe(browserSync.reload({stream: true}))
});

// watch
gulp.task('watch', function () {
    gulp.watch(paths.pug.src, ['pug']);
    gulp.watch(paths.scss.src, ['sass']);
    gulp.watch(paths.js.src, ['scripts']);
    gulp.watch(paths.fonts.src, ['fonts']);
    gulp.watch([paths.img.src], function (event, cb) {
        gulp.start('images');
    });
});

// gulp.task('watch-no-image', function () {
//     gulp.watch(paths.pug.src, ['pug']);
//     gulp.watch(paths.scss.src, ['sass']);
//     gulp.watch(paths.js.src, ['scripts']);
//     gulp.watch(paths.fonts.src, ['fonts']);
// });


/* --------- default --------- */
gulp.task('default', ['pug', 'sass', 'images', 'sync', 'fonts', 'copy-file', 'scripts', 'watch']);
// gulp.task('default-no-image', ['pug', 'sass', 'sync', 'fonts', 'copy-file', 'watch-no-image']);