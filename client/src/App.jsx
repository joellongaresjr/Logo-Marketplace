import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Outlet } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

//Testing data
const cardStyling = {
  title: "Home",
  text: "Test Text",
  link: "#",
  imgSrc: "holder.js/100px180",
  altText: "alt-text",
};

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
