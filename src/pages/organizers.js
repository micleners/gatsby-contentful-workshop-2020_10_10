import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { Flex, Box, Image, Heading } from "rebass"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Organizers = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      organizers: allOrganizersJson {
        edges {
          node {
            email
            employer
            id
            name
            phone
            photo
            website
            role
          }
        }
      }
    }
  `)

  const organizers = data.organizers.edges.map(edge => edge.node)

  return (
    <Layout>
      <SEO title="Organizers" description="Organizers of our group" />
      <h1>Organizers</h1>
      <p>Organizers of our group.</p>
      {organizers.map(organizer => (
        <Flex mb="30px" key={organizer.id}>
          <Box>
            <Image src={organizer.photo} />
            <Heading fontSize="4">{organizer.name}</Heading>
          </Box>
          <Box m="20px">
            <Box>Role: {organizer.role}</Box>
            <Box>Phone: {organizer.phone}</Box>
            <Box>Email: {organizer.email}</Box>
            {organizer.website && <a href={organizer.website}>Website</a>}
          </Box>
        </Flex>
      ))}
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default Organizers
