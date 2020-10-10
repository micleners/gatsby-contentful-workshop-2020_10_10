import { useStaticQuery, Link } from "gatsby"
import React from "react"
import { Flex, Box } from "rebass"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Events = () => {
  const data = useStaticQuery(graphql`
    {
      events: allContentfulEvents(filter: { node_locale: { eq: "en-US" } }) {
        edges {
          node {
            description {
              childMarkdownRemark {
                html
              }
            }
            location
            slug
            title
            datetime(formatString: "hh:mm, MMMM DD, YYYY")
          }
        }
      }
    }
  `)

  const events = data.events.edges.map(event => event.node)

  return (
    <Layout>
      <SEO title="Events" />
      <h1>Events</h1>
      {events &&
        events.map(event => {
          const { location, slug, title, presenter, datetime } = event

          return (
            <Flex flexDirection="column" mb="3" key={slug}>
              <Link to={`/event/${slug}`}>{title}</Link>
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
              {presenter && presenter.length === 1 && (
                <Box fontSize={2}>By: {presenter[0].name}</Box>
              )}
              {presenter && presenter.length > 1 && (
                <Box fontSize={2}>
                  By:
                  {presenter.map((pres, index) => {
                    if (index !== presenter.length - 1)
                      return <span key={pres.id}> {pres.name},</span>
                    else {
                      return <span key={pres.id}> and {pres.name}</span>
                    }
                  })}
                </Box>
              )}
            </Flex>
          )
        })}
    </Layout>
  )
}

export default Events
