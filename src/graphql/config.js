import { ApolloClient, InMemoryCache } from "@apollo/client"

import { WebSocketLink } from "@apollo/client/link/ws"

const wsLink = new WebSocketLink({
    uri: `ws://35.224.134.248/`,
    options: {
        reconnect: true,
    },
})

const client = new ApolloClient({
    uri: "http://35.224.134.248/",
    link: wsLink,
    cache: new InMemoryCache(),
})

export default client
