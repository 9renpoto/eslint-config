/* @flow */
import React, {Component} from 'react'
import Helmet from 'react-helmet'
import include from 'underscore.string/include'
import sortBy from 'lodash/sortBy'
import {Link} from 'react-router'
import {get} from 'lodash/get'

type Props = {
  route: Object,
  blogTitle: string,
  prefixLink: Function
}

export class BlogIndex extends Component {
  props: Props
  render () {
    const {route, blogTitle, prefixLink} = this.props

    // Sort pages.
    const sortedPages = sortBy(route.pages, 'data.date')

    // Posts are those with md extension that are not 404 pages OR have a date (meaning they're a react component post).
    const visiblePages = sortedPages.filter(
      page =>
        (get(page, 'file.ext') === 'md' && !include(page.path, '/404')) ||
        get(page, 'data.date')
    )
    return (
      <div>
        <Helmet
          title={blogTitle}
          meta={[
            {name: 'description', content: 'Sample blog'},
            {name: 'keywords', content: 'blog, articles'}
          ]}
        />
        <ul>
          {visiblePages.map(page => (
            <li key={page.path}>
              <Link style={{boxShadow: 'none'}} to={prefixLink(page.path)}>
                {get(page, 'data.title', page.path)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
