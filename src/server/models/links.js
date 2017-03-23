import shortid from 'shortid'

let links = []

export function listLinks () {
  return links
}

export function createLink (params) {
  links.push({ ...params, id: shortid.generate() })
}

export function findById (id) {
  return links.find(x => x.id === id)
}

export function deleteLink (id) {
  links = links.filter(x => x.id !== id)
}

export function updateLink (id, params) {
  links = links.map(x => x.id === id ? {...x, ...params} : x)
}

createLink({ userId: 123, url: 'http://www.google.com' })
createLink({ userId: 123, url: 'http://www.facebook.com' })
createLink({ userId: 123, url: 'http://www.instagram.com' })
