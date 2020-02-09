import React, { Suspense, PureComponent } from 'react'
import styled from 'styled-components'
import { Link as OriginalLink } from 'gatsby'
import { rhythm, scale } from '../utils/typography'

const Search = React.lazy(() => import('./search'))

const Link = styled(OriginalLink)`
  box-shadow: none;
  text-decoration: none;
  color: inherit;
`

interface Props {
  children: React.ReactNode
  title: string
  location: Location
}

declare const __PATH_PREFIX__: string

const searchIndices = [
  { name: `Pages`, title: `Pages`, hitComp: `PageHit` } as const,
  { name: `Posts`, title: `Blog Posts`, hitComp: `PostHit` } as const,
]

export default class Layout extends PureComponent<Props> {
  render() {
    const { location, title, children } = this.props
    let header

    if (location.pathname === `${__PATH_PREFIX__}/`) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link to="/">{title}</Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link to="/">{title}</Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>
          {header}
          <Suspense fallback={null}>
            <Search indices={searchIndices} />
          </Suspense>
        </header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    )
  }
}
