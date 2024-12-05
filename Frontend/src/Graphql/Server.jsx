import {ApolloProvider, InMemoryCache, ApolloClient} from '@apollo/client'


const client = new ApolloClient({
    uri: import.meta.env.VITE_API_GRAPHQL_URI,
    cache: new InMemoryCache(),
    credentials: 'include'
  })

export default client