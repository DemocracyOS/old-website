var mergeTrees = require('broccoli-merge-trees')
var Funnel = require('broccoli-funnel')
var browserify = require('broccoli-fast-browserify')
var jade = require('broccoli-jade')
var stylus = require('broccoli-stylus-single')
var autoprefixer = require('broccoli-autoprefixer')
var assetRev = require('broccoli-asset-rev')

var doCompress = process.env.BROCCOLI_COMPRESS === 'true'
var doServe = process.env.BROCCOLI_SERVE === 'true'

var app = 'app'

var js = browserify(new Funnel(app, { include: ['js/**/*.js']}), {
  browserify: {
    debug: doServe
  },
  bundles: {
    'js/app.js': {
      transform: doCompress ? 'uglifyify' : undefined,
      entryPoints: ['js/index.js']
    }
  }
})

var css = stylus(
  [new Funnel(app, { include: ['css/**/*.styl']})],
  'css/index.styl',
  'css/app.css',
  { compress: doCompress }
)

css = autoprefixer(css)

var html = jade(new Funnel(app, { include: ['*.jade']}), {
  pretty: !doCompress
})

var img = new Funnel(app, { include: ['img/**/*']})

var tree = mergeTrees([js, css, html, img])

if (doCompress) tree = assetRev(tree)

module.exports = tree
