import { Container } from "@chakra-ui/react"
import { Head, BlitzLayout } from "blitz"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "my-blitz-app"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW="container.xl">{children}</Container>
    </>
  )
}

export default Layout
