const path = require("path")
const slash = require("slash")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(
    `
      {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/(markdown)/.*.md$/" } }
        ) {
          edges {
            node {
              frontmatter {
                slug
              }
              id
            }
          }
        }
        allContentfulEvents(filter: { node_locale: { eq: "en-US" } }) {
          edges {
            node {
              title
              slug
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.error) {
      console.log("Error retrieving data", result.error)
    }

    const blogPostTemplate = path.resolve("./src/templates/blogpost.js")
    const eventTemplate = path.resolve("./src/templates/event.js")

    result.data.allMarkdownRemark.edges.forEach(edge => {
      createPage({
        path: `blogpost/${edge.node.frontmatter.slug}`,
        component: slash(blogPostTemplate),
        context: {
          slug: edge.node.frontmatter.slug,
          id: edge.node.id,
        },
      })
    })

    result.data.allContentfulEvents.edges.forEach(edge => {
      createPage({
        path: `event/${edge.node.slug}`,
        component: slash(eventTemplate),
        context: {
          slug: edge.node.slug,
        },
      })
    })
  })
}
