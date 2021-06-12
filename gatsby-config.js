module.exports = {
  siteMetadata: {
    title: `Ulrich Feindt`,
    description:
      `Astrophysicist turned Data and Software Engineer | ` +
      `This is my personal page containing my CV, portfolio, ` +
      `and blog about projects I work on in my free time.`,
    author: `@ulrichfeindt`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "aboutMeFiles",
        path: `${__dirname}/content/about-me`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "blogFiles",
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "portfolioFiles",
        path: `${__dirname}/content/portfolio`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-yaml`,
    `gatsby-plugin-fontawesome-css`,
  ],
}
