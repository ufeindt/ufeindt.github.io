import * as React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
// import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import { Col, Container, Row } from "react-bootstrap"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import "./index.css"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "../utils/fontawesome"
// import { node } from "prop-types"

const IndexPage = ({ data }) => {
  const name = data.aboutMeYaml.fullName
  const subtitle = data.aboutMeYaml.jobTitle
  const links = data.aboutMeYaml.links
  const profilePic = data.fileName.childImageSharp.fluid
  const sections = data.allMarkdownRemark.edges

  return (
    <Layout showHeader={false}>
      <Seo title="About Me" />
      <Container className="my-3 mx-lg-4 header-container">
        <Row className="flex-lg-row-reverse justify-content-center align-items-center">
          <Col lg={4} className="header-card">
            <Img
              fluid={profilePic}
              alt="Ulrich Feindt"
              className="rounded-circle shadow-lg profile-pic"
            />
          </Col>
          <Col lg={5} className="header-card">
            <div>
              <h1>{name}</h1>
              <h3>{subtitle}</h3>
              <p>
                <Link to="/cv/">CV</Link> |{" "}
                {links.map((node, key) => (
                  <span key={key}>
                    <a href={node.link}>
                      <FontAwesomeIcon icon={node.icon} />
                    </a>
                    {key < links.length - 1 ? ` | ` : ``}
                  </span>
                ))}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      {sections.map((node, key) => (
        <div key={key} className="my-3 mx-4 p-4 shadow about-me-card">
          <h3 className={key % 2 === 0 ? "text-start" : "text-end"}>
            {node.node.frontmatter.title}
          </h3>
          <p
            className="description-text text-justify"
            dangerouslySetInnerHTML={{ __html: node.node.html }}
          />
        </div>
      ))}
    </Layout>
  )
}

export default IndexPage

export const pageData = graphql`
  query {
    fileName: file(relativePath: { eq: "profile.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 500, maxHeight: 500, jpegQuality: 95) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(about-me)(?=/[^/]*md)/" } }
      sort: { fields: frontmatter___date, order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            title
            featuredImage {
              publicURL
            }
          }
          html
        }
      }
    }
    aboutMeYaml {
      fullName
      jobTitle
      links {
        link
        icon
      }
    }
  }
`
