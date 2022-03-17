import React from "react"
import { Link as BlitzLink, LinkProps as BlitzLinkProps } from "blitz"
import { Link as ChakraUILink, LinkProps as ChakraUILinkProps } from "@chakra-ui/react"

interface Props extends Omit<ChakraUILinkProps, "href"> {
  href: BlitzLinkProps["href"]
  children: React.ReactNode
}

export function Link({ href, children, ...chakraUILinkProps }: Props) {
  return (
    <BlitzLink href={href}>
      <ChakraUILink color="blue.600" {...chakraUILinkProps}>
        {children}
      </ChakraUILink>
    </BlitzLink>
  )
}
