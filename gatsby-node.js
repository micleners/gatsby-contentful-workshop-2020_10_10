const path = require("path")
const slash = require("slash")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(
    `
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                slug
              }
              id
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
  })
}
