/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import "bootstrap/dist/css/bootstrap.min.css"

import "./layout.css"
import Header from "./header"

const Layout = ({ children, showHeader, customHeader }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const startYear = "2021"
  const currentYear = `${new Date().getFullYear()}`

  return (
    <>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 1200,
          padding: `0 0 1.45rem`,
        }}
      >
        {customHeader}
        {showHeader && !customHeader && (
          <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        )}
        <main>{children}</main>
        <footer
          style={{
            marginTop: `2rem`,
            textAlign: `center`,
          }}
        >
          © {startYear}
          {startYear !== currentYear ? `-${currentYear.slice(-2)}` : ``}, Ulrich
          Feindt. Built with
          {` `}
          <a className="footer-link" href="https://www.gatsbyjs.com">
            Gatsby
          </a>
          .
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  customHeader: PropTypes.node,
  showHeader: PropTypes.bool,
}

Layout.defaultProps = {
  showHeader: true,
}

export default Layout
