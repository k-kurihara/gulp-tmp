// 共通
import gulp from 'gulp';
import plumber from "gulp-plumber";
import browserSync from 'browser-sync';

// Pug
import pug from 'gulp-pug';

// Sass
import sass from 'gulp-sass';
import minify from 'gulp-minify-css';
import autoprefixer from "gulp-autoprefixer";
import concat from 'gulp-concat';

// Babel
import babel from 'gulp-babel';


const path = {
  pub: 'htdocs/',
  pug: 'htdocs_dev/pug/',
  dev: 'htdocs_dev/assets/',
  dest: 'htdocs/assets/'
}


// BrowserSync
gulp.task("browserSync", function () {
  browserSync({
    notify: false,
    server: {
      baseDir: 'htdocs/'
    },
    startPath: '/',
});
  gulp.watch(path.dest + '**/', function() {
    browserSync.reload();
  });
});

// Pug
gulp.task('pug', () => {
  gulp.src(path.pug + '*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest(path.pub))
});

// Sass
gulp.task('scss', () => {
  gulp.src([
    path.dev + 'scss/**/*.scss',
    '!' + path.dev + 'scss/contents/**/*.scss'
    ])
  .pipe(plumber())
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: ["last 2 versions", "Android >= 4","ios_saf >= 8", "ie >= 9"]
  }))
  .pipe(concat('app.css'))
  .pipe(minify())
  .pipe(gulp.dest(path.dest + 'css'))
});

gulp.task('scss_contents', () => {
  gulp.src([
    path.dev + 'scss/contents/**/*.scss'
    ])
  .pipe(plumber())
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: ["last 2 versions", "Android >= 4","ios_saf >= 8","ie >= 9"]
  }))
  .pipe(minify())
  .pipe(gulp.dest(path.dest + 'css'))
});

// Babel
gulp.task('babel', function() {
  gulp.src(path.dev + 'js/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./'))
    .pipe(gulp.dest(path.dest + 'js'))
});

gulp.task('watch', () => {
  gulp.watch(path.dev + 'scss/**/*.scss',['scss']);
  gulp.watch(path.pug + '*.pug', ['pug'])
  gulp.watch(path.dev + '**/*.scss',['scss_contents']);
  gulp.watch(path.dev + 'js/*.js', ['babel'])
});


gulp.task('default', ['watch', 'browserSync']);
