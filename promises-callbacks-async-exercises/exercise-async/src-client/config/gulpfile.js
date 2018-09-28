const concat = require('gulp-concat');
const debug = require('gulp-debug');
const del = require('del');
const fs = require('fs');
const ftp = require('vinyl-ftp');
const gulp = require('gulp');
const pug = require('gulp-pug');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const sourceMaps = require('gulp-sourcemaps');
const strip = require('gulp-strip-comments');
const svgMin = require('gulp-svgmin');
const svgSprite = require('gulp-svgstore');
const uglify = require('gulp-uglify');
const paths = require('./paths');

const config = {
  vendor: {
    js: [
      /*'node_modules/jquery/dist/jquery.min.js',*/
      `${paths.nodeModulesDirectory}/jquery-migrate/dist/jquery-migrate.min.js`,
      `${paths.nodeModulesDirectory}/jquery.mmenu/dist/jquery.mmenu.all.js`,
    ],
    polyfills: [`${paths.nodeModulesDirectory}/svg4everybody/dist/svg4everybody.min.js`],
  },
};

/* Watch */
gulp.task('watch', () => {
  gulp.watch(`${paths.svgDirectory}/*.svg`, ['svg']);
  gulp.watch(`${paths.imageDirectory}/*`, ['img']);
  gulp.watch(`${paths.indexPug}`, ['html']);
});

/* SVG Sprite */
gulp.task('svg', () => {
  return gulp
    .src(`${paths.svgDirectory}/*.svg`)
    .pipe(debug())
    .pipe(svgMin())
    .pipe(svgSprite())
    .pipe(rename('assets.svg'))
    .pipe(gulp.dest(paths.buildDirectory));
});

/* Copy + Optimize images */
gulp.task('img', () => {
  return gulp
    .src(`${paths.imageDirectory}/**/*`)
    .pipe(debug())
    .pipe(gulp.dest(paths.buildImageDirectory));
});

/* Vendor JavaScript */
gulp.task('js:vendor', () => {
  return gulp
    .src(config.vendor.js)
    .pipe(debug())
    .pipe(sourceMaps.init('vendor.js.map'))
    .pipe(concat('vendor.js'))
    .pipe(sourceMaps.write(''))
    .pipe(gulp.dest(paths.buildJsDirectory));
});

/* Polyfills */
gulp.task('js:polyfills', () => {
  return gulp
    .src(config.vendor.polyfills)
    .pipe(debug())
    .pipe(concat('polyfills.js'))
    .pipe(strip())
    .pipe(uglify())
    .pipe(gulp.dest(paths.buildJsDirectory));
});

/* HTML */
gulp.task('html', () => {
  return gulp
    .src(paths.indexPug)
    .pipe(debug())
    .pipe(pug({}))
    .pipe(gulp.dest(paths.buildDirectory));
});

gulp.task('minify', () => {
  gulp
    .src([paths.buildJsDirectory + '/vendor.js'])
    .pipe(debug())
    .pipe(strip())
    .pipe(uglify())
    .pipe(gulp.dest(paths.buildJsDirectory));

  return del(`${paths.buildJsDirectory}/*.map`, { force: true });
});

gulp.task('ftp', () => {
  var ftpConfig = JSON.parse(fs.readFileSync('./ftp.json'));
  var conn = ftp.create(ftpConfig);

  var globs = ['./**'];

  //   TODO Delete existing index.html, js, css folders before deploying

  return gulp
    .src(globs, { cwd: paths.buildDirectory, base: paths.buildDirectory, buffer: false })
    .pipe(debug())
    .pipe(conn.newer('/cameronstewartdev.com/subdomains/rxhelpadmin.cameronstewartdev.com'))
    .pipe(conn.dest('/cameronstewartdev.com/subdomains/rxhelpadmin.cameronstewartdev.com'));
});

/* Clean */
gulp.task('clean', () => {
  return del(paths.buildDirectory + '/*', { force: true });
});

/* Compile */
gulp.task('compile', (callback) => {
  return runSequence('clean', 'html', 'js:polyfills', ['img', 'svg', 'js:vendor']);
});

/* Build */
gulp.task('build', (callback) => {
  return runSequence(['minify']);
});
