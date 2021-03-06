import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

export default function BlogPost({ data }) {
  const post = data.markdownRemark
  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{__html: post.html}} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query BlogPost($slug: String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      frontmatter {
        title
      }
      html
    }
}
`
