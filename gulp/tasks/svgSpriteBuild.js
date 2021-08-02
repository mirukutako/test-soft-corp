const gulp = require('gulp')
const config = require('../config')
// const svgstore = require('gulp-svgstore')
// const rename = require('gulp-rename')

const svgSprite = require('gulp-svg-sprite')
const svgmin = require('gulp-svgmin')
const cheerio = require('gulp-cheerio')
const replace = require('gulp-replace')


module.exports = function svgSpriteBuild() {
  return gulp.src('src/img/sprite/*.svg')
  // minify svg
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    // remove all fill, style and stroke declarations in out shapes
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: {xmlMode: true}
    }))
    // cheerio plugin create unnecessary string '&gt;', so replace it.
    .pipe(replace('&gt;', '>'))
    // build svg sprite
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "../sprite.svg",
          render: {
            scss: {
              dest: config.root + '../../src/styles/utils/sprite.scss',
              template: 'src/styles/helpers/_sprite_template.scss'
            }
          }
        }
      }
    }))
    .pipe(gulp.dest('build/img'));
}

