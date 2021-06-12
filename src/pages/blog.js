import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout>
      <Seo title="Blog" />
      This is my Blog.
      {posts.map((node, key) => (
        <Link to={node.node.frontmatter.path}>
          <h3 key={key}>{node.node.frontmatter.title}</h3>
        </Link>
      ))}
    </Layout>
  )
}

export default BlogIndexPage

export const blogDataQuery = graphql`
query GetBlogPageData {
    allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "/(blog)(?=\/[^\/]*md)/"}}
    ) {
      edges {
        node {
          frontmatter {
            title
            path
            date
          }
          html
          fileAbsolutePath
        }
      }
    }
  }
`
