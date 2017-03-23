import express from 'express'

import {
  listLinks,
  createLink,
  // findById,
  deleteLink
} from './models/links'

let router = express.Router()

router.get('/', (req, res) => {
  const links = listLinks()
  res.status(200).send({ links })
})

router.post('/', (req, res) => {
  const link = createLink(req.body)
  res.status(201).send({ link })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  deleteLink(id)

  const links = listLinks()
  res.status(200).send({ links })
})

export default router
