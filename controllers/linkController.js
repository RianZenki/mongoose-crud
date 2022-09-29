const Link = require('../models/Link')

const redirect = async (req, res) => {
  const title = req.params.title

  try {
    const doc = await Link.findOneAndUpdate({ title: title }, { $inc: { click: 1 } })
    res.redirect(doc.url)
  }
  catch (error) {
    res.send(error)
  }
}

const addLink = async (req, res) => {
  const link = new Link(req.body)

  try {
    await link.save()

    res.redirect('/')
  }
  catch (error) {
    res.render('add', { error, body: req.body })
  }
}

const allLinks = async (req, res) => {
  try {
    const docs = await Link.find({})
    res.render('all', { links: docs })
  }
  catch (error) {
    res.send(error)
  }
}

const deleteLink = async (req, res) => {
  let id = req.params.id

  if (!id) {
    id = req.body.id
  }

  try {
    await Link.findByIdAndDelete(id)
    res.send(id)
  }
  catch (error) {
    res.status(404).send(error)
  }
}

const loadLink = async (req, res) => {
  const id = req.params.id

  try {
    const doc = await Link.findById(id)
    res.render('edit', { body: doc })
  }
  catch (error) {
    res.render('edit', { error, body: req.body })
  }
}

const editLink = async (req, res) => {
  let link = {}
  let id = req.params.id

  if (!id) {
    id = req.body.id
  }

  link.title = req.body.title
  link.description = req.body.description
  link.url = req.body.url

  try {
    await Link.findByIdAndUpdate(id, link)
    res.redirect('/')
  }
  catch (error) {
    res.render('edit', { body: req.body, error })
  }
}

module.exports = { redirect, addLink, allLinks, deleteLink, loadLink, editLink }