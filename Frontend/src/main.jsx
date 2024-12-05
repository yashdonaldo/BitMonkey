import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import Store from './Store.js'
import { ApolloProvider } from '@apollo/client'
import client from './Graphql/Server.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>
)
