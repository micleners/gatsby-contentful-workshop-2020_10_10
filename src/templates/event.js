import React from "react"
import { graphql, Link } from "gatsby"
import { Box, Flex, Heading } from "rebass"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ViewAllEvents = () => <Link to="/events">View all events</Link>

const Event = ({ data }) => {
  console.log(data)

  const {
    description,
    location,
    slug,
    title,
    presenter,
    datetime,
  } = data.contentfulEvents

  return (
    <Layout>
      <SEO title={title} />
      <ViewAllEvents />
      <Flex flexDirection="column" mb="3" key={slug}>
        <Heading as="h1" fontSize="5" mb="10px">
          {title}
        </Heading>
        {location && (
          <Box>
            <em>{location}</em>
          </Box>
        )}
        {datetime && (
          <Box>
            <em>{datetime}</em>
          </Box>
        )}
        { description?.childMarkdownRemark?.html && (
            <Box mt="3"
              dangerouslySetInnerHTML={{
                __html: description.childMarkdownRemark.html,
              }}
            />
          )}
      </Flex>

      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default Event
export const pageQuery = graphql`
  query($slug: String!) {
    contentfulEvents(slug: { eq: $slug }) {
      slug
      datetime
      title
      location
      description {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
