import React from "react"
import { graphql, Link } from "gatsby"
import { Box, Heading } from "rebass"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Blog from "../pages/blog"

const ViewAllPosts = () => <Link to="/blog">View all blogs</Link>

const BlogPost = ({ data }) => {
  console.log(data)
  const { frontmatter, html } = data.markdownRemark
  const { title, date } = frontmatter

  return (
    <Layout>
      <SEO title={title} />
      <ViewAllPosts />
      <Heading as="h1" fontSize="5" mb="10px">
        {title}
      </Heading>
      {date && <Heading>{date}</Heading>}
      {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default BlogPost
export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        date(formatString: "MMMM D, YYYY")
        slug
        title
      }
      html
    }
  }
`
