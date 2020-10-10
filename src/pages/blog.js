import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { Box, Heading } from "rebass"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Blog = () => {
  const data = useStaticQuery(graphql`
    query BlogQuery {
      blogs: allMarkdownRemark {
        edges {
          node {
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              slug
              title
            }
          }
        }
      }
    }
  `)

  const blogs = data.blogs.edges.map(edge => edge.node.frontmatter)

  return (
    <Layout>
      <SEO title="Blog" />
      <h1>Blog</h1>
      <p>Blogs from our great authors.</p>
      {blogs &&
        blogs.map(blog => (
          <Box key={blog.slug} my="3">
            <Heading fontSize="4">
              <Link to={`/blogpost/${blog.slug}`}>{blog.title}</Link>
              <Box fontSize="2">
                <em>{blog.date}</em>
              </Box>
            </Heading>
          </Box>
        ))}

      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default Blog
