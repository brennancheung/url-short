import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'

import linksRouter from './links_router'

import { findById } from './models/links'

const app = express()
const port = 4000

app.disable('x-powered-by')
console.log('Starting server')

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

const nodeEnv = process.env.NODE_ENV || 'development'
const isDev = nodeEnv === 'development'

if (isDev) {
  console.log('Webpack processing...')
  const webpack = require('webpack')
  const webpackConfig = require('../../webpack.config')
  const compiler = webpack(webpackConfig)

  const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    stats: {
      colors: true
    }
  })
  const webpackHotMiddleware = require('webpack-hot-middleware')(compiler)

  app.use(webpackDevMiddleware)
  app.use(webpackHotMiddleware)
}

// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/links', linksRouter)

app.get('/:id', (req, res) => {
  const id = req.params.id
  const link = findById(id)
  const url = link.url
  console.log(`attempt to redirect ${id} to ${url}`)
  res.redirect(url)
})

const server = http.createServer(app)
server.listen(port)
console.log(`Server listening on port ${port}`)
