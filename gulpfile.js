'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    browserSync = require("browser-sync"),
    notify = require( 'gulp-notify' ),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    reload = browserSync.reload;

var path = {
    dist: {
        html: 'dist/',
        pug: 'dist/',
        css: 'dist/css',
        sass: 'dist/css/',
        img: 'dist/img',
    },
    app: {
        html: 'app/*.html',
        pug: 'app/*.pug',
        sass: 'app/css/*.sass',
        css: 'app/css/*.css',
        img: 'app/img/**/*.*'
    },
    watch: {
        html: 'app/**/*.html',
        pug: 'app/**/*.pug',
        css: 'app/**/*.css',
        sass: 'app/css/**/*.sass',
        img: 'app/img/**/*.*'
    },
    clean: '.dist'
};

var config = {
    server: {
        baseDir: "./dist"
    },
    tunnel: false,
    host: 'localhost',
    port: 8081,
    logPrefix: "Stroev"
};

gulp.task('html:build', function() {
    gulp.src(path.app.html)
        .pipe(gulp.dest(path.dist.html))
        .pipe(reload({stream:true}));
});

gulp.task('css:build', function() {
    gulp.src(path.app.css)
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.css))
        .pipe(reload({stream: true}));
});

gulp.task('pug:build', function() {
    gulp.src(path.app.pug)
        //.pipe(sourcemaps.init())
        //.pipe(pug())
        .pipe( pug({pretty: true}).on( 'error', notify.onError({
            message: "<%= error.message %>",
            title  : "Pug Error!"
        })
        )
        )
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.pug))
        .pipe(reload({stream: true}));
});

gulp.task('sass:build', function() {
    gulp.src(path.app.sass)
        .pipe(sourcemaps.init())
        //.pipe(sass().on('error', sass.logError))
        .pipe( sass().on( 'error', notify.onError({
            message: "<%= error.message %>",
            title  : "Sass Error!"
        })
        )
        )
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest(path.dist.sass))
        //.pipe( notify( 'SASS - хорошая работа!' ) )
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.app.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.dist.img))
        .pipe(reload({stream: true}));
});

gulp.task('build', [
    'html:build',
    'css:build',
    'pug:build',
    'sass:build',
    'image:build'
]);

gulp.task('watch', function() {
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('css:build');
    });
    watch([path.watch.pug], function(event, cb) {
        gulp.start('pug:build');
    });
    watch([path.watch.sass], function(event, cb) {
        gulp.start('sass:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);