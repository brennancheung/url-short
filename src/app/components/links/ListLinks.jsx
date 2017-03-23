import React from 'react'
import { connect } from 'react-redux'

import { Button, Icon } from 'semantic-ui-react'

import { fetchLinks, deleteLink, setAddLinkVisibility } from './actions'

function mapStateToProps (state) {
  return {
    links: (state.links && state.links.links) || [],
    addLinkFormVisible: (state.links && state.links.addLinkFormVisible) || false
  }
}

@connect(mapStateToProps)
class ListLinks extends React.Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchLinks())
  }

  handleView = (id) => () => {
    alert(`view stats for ${id}`)
  }

  handleDelete = (id) => () => {
    const { dispatch } = this.props
    dispatch(deleteLink(id))
  }

  showAddLinkForm = () => {
    const { dispatch } = this.props
    dispatch(setAddLinkVisibility(true))
  }

  render () {
    const { links, addLinkFormVisible } = this.props
    return (
      <LinkList
        links={links}
        handleView={this.handleView}
        handleDelete={this.handleDelete}
        addLinkFormVisible={addLinkFormVisible}
        showAddLinkForm={this.showAddLinkForm} />
    )
  }
}

const AddLinkButton = ({ ...rest }) => {
  return (
    <Button floated="left" icon labelPosition="left" primary size="small" {...rest} >
      <Icon name="plus" /> Add Link
    </Button>
  )
}

const AddLinkForm = () => {
  return (
    <h1>Add Link Form</h1>
  )
}

const LinkList = ({ links, addLinkFormVisible, showAddLinkForm, handleView, handleDelete }) => (
  <div className="links-list">
    <h1>Links</h1>
    {!addLinkFormVisible &&
      <AddLinkButton onClick={showAddLinkForm} />
    }
    {addLinkFormVisible &&
      <AddLinkForm />
    }
    <br />
    <br />
    <table className="ui selectable celled table">
      <thead>
        <tr>
          <th>Short URL</th>
          <th>Long URL</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {links.map(link => <LinkRow key={link.id} link={link} handleView={handleView(link.id)} handleDelete={handleDelete(link.id)} />)}
      </tbody>
    </table>
  </div>
)

const LinkRow = ({ link, handleView, handleDelete }) => {
  const hostPrefix = 'http://localhost:4000'
  const makeLink = (id) => `${hostPrefix}/${id}`
  const copyLink = () => {
    alert('TODO: copy to clipboard')
  }

  return (
    <tr>
      <td>
        {makeLink(link.id)}
        &nbsp;
        <Icon link name="copy" onClick={copyLink} />
        <a href={makeLink(link.id)} target="_blank">
          <Icon link name="external" />
        </a>
      </td>
      <td>{link.url}</td>
      <td>
        <Icon link name="bar chart" onClick={handleView} />
        <Icon link name="remove" onClick={handleDelete} />
      </td>
    </tr>
  )
}


export default ListLinks
