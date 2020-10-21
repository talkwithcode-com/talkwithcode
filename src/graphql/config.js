import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
    uri: "http://35.224.134.248/",
    cache: new InMemoryCache(),
})

export default client
