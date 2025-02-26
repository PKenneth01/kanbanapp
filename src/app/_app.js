// pages/_app.js
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // URL of your GraphQL API server
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
