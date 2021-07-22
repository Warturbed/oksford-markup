const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso')
const imagemin = require('gulp-imagemin')
//const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
//const concat = require('gulp-concat')
//const autoprefixer = require('gulp-autoprefixer')
const sync = require('browser-sync').create()

function html() {
  return src('src/**.html')
    //.pipe(include({
    //  prefix: '@@'
    //}))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest('build'))
}

function scss() {
  return src('src/styles/**.scss')
    .pipe(sass())
    //.pipe(autoprefixer({
    //  browsers: ['last 2 versions']
    //}))
    .pipe(csso())
    //.pipe(concat('index.css'))
    .pipe(dest('build/styles'))
}

function img() {
    return src('src/img/*/*')
      .pipe(imagemin())
      .pipe(dest('build/img'))
  }

function clear() {
  return del('build')
}

function serve() {
  sync.init({
    server: './build'
  })

  watch('src/**.html', series(html)).on('change', sync.reload)
  watch('src/styles/**.scss', series(scss)).on('change', sync.reload)
}

exports.build = series(clear, scss, html, img)
exports.serve = series(clear, scss, html, img, serve)
exports.clear = clear