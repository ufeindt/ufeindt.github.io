import * as React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { Card, Col, Container, Row } from "react-bootstrap"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import "./cv.css"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "../utils/fontawesome"

const CVPage = ({ data }) => {
  const profilePic = data.fileName.childImageSharp.fluid
  const cvData = data.aboutMeYaml
  const languages = cvData.languages.map(
    node => `${node.language} (${node.level})`
  )
  const links = cvData.links.map(node => (
    <a href={node.link}>
      <FontAwesomeIcon icon={node.icon} className="show-icon-left" />{" "}
      {node.text}{" "}
      <FontAwesomeIcon icon={node.icon} className="show-icon-right" />
    </a>
  ))
  const softwareSkills = cvData.softwareSkills.map(node =>
    node.skillList.join(", ")
  )

  const leftColumn = [
    { title: "Links", list: links },
    { title: "Skills", list: cvData.skills },
    { title: "Coding/Software", list: softwareSkills },
    { title: "Languages", list: languages },
  ]
  const rightColumn = [
    {
      title: "Profile",
      children: <p className="description-text">{cvData.profile}</p>,
    },
    { title: "Experience", children: <CVTimeline data={cvData.experience} /> },
    { title: "Education", children: <CVTimeline data={cvData.education} /> },
  ]

  return (
    <Layout
      showHeader={false}
      customHeader={
        <CVHeader
          title={cvData.fullName}
          subTitle={cvData.jobTitle}
          profilePic={profilePic}
        />
      }
    >
      <Seo title="CV" />
      <Container>
        <Row className="flex-md-row-reverse">
          <Col md={8}>
            {rightColumn.map((item, key) => (
              <CVSection title={item.title}>{item.children}</CVSection>
            ))}
          </Col>
          <Col md={4}>
            {leftColumn.map((item, key) => (
              <CVSection title={item.title} leftAlign={false}>
                <CVList list={item.list} leftAlign={false} />
              </CVSection>
            ))}
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

const CVHeader = ({ title, subTitle, profilePic }) => {
  console.log(profilePic)
  return (
    <header className="header-container">
      <Row className="header-row">
        <Col md={4} className="mx-0 p-0">
          <div className="header-color" />
          <div className="header-pic">
            <div />
            <Link to="/">
              <Img
                fluid={profilePic}
                alt="{title}"
                className="rounded-circle border-white"
              />
            </Link>
          </div>
        </Col>
        <Col md={8} className="mx-0 p-0">
          <div className="align-items-end header-color header-title">
            <h1 className="text-center">
              <Link to="/">{title}</Link>
            </h1>
          </div>
          <div className="align-items-start header-subtitle">
            <h4 className="text-center">
              <Link to="/">{subTitle}</Link>
            </h4>
          </div>
        </Col>
      </Row>
    </header>
  )
}

CVHeader.propTypes = {
  profilePic: PropTypes.object.isRequired,
  subTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

const CVSection = ({ children, title, leftAlign }) => {
  const classes =
    (leftAlign ? "right-column" : "left-column") + " section-title"
  return (
    <>
      <h4 className={classes}>{title}</h4>
      <hr />
      {children}
    </>
  )
}

CVSection.propTypes = {
  children: PropTypes.node.isRequired,
  leftAlign: PropTypes.bool,
  title: PropTypes.string.isRequired,
}

CVSection.defaultProps = {
  leftAlign: true,
}

const CVList = ({ list, leftAlign }) => {
  const classes =
    (leftAlign ? "right-column" : "left-column") + " description-text"
  return (
    <>
      {list.map((item, key) => (
        <p key={key} className={classes}>
          {item}
        </p>
      ))}
    </>
  )
}

CVList.propTypes = {
  leftAlign: PropTypes.bool,
  list: PropTypes.array.isRequired,
}

CVList.defaultProps = {
  leftAlign: true,
}

const CVTimeline = ({ data }) => {
  return (
    <>
      {data.map((node, key) => (
        <Container key={key} className="timeline-paragraph">
          <p>
            <b>{node.title}</b> &mdash; {node.employer}
          </p>
          <p className="text-muted">
            {node.from} &ndash; {node.until ? node.until : "present"}
          </p>
          <p className="description-text">{node.description}</p>
          {node.items ? (
            <ul>
              {node.items.map((item, itemKey) => (
                <li key={itemKey} className="description-text">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </Container>
      ))}
    </>
  )
}

CVTimeline.propTypes = {
  data: PropTypes.array.isRequired,
}

export default CVPage

export const cvDataQuery = graphql`
  query getCVData {
    fileName: file(relativePath: { eq: "profile.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 250, maxHeight: 250, jpegQuality: 95) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    aboutMeYaml {
      fullName
      jobTitle
      links {
        icon
        link
        text
      }
      skills
      softwareSkills {
        type
        skillList
      }
      languages {
        language
        level
      }
      profile
      experience {
        title
        employer
        description
        items
        from(formatString: "MMM YYYY", locale: "en_US")
        until(formatString: "MMM YYYY", locale: "en_US")
      }
      education {
        title
        employer
        from(formatString: "MMM YYYY", locale: "en_US")
        until(formatString: "MMM YYYY", locale: "en_US")
        description
      }
    }
  }
`
