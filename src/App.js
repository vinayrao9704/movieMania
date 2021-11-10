import "./App.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useState } from "react";
import styled from "styled-components";
import Card from "./Card";

const AppStyles = styled.div`
  width: 70%;
  margin: auto;
  form {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 100px;
    * {
      margin: 20px;
    }
    input {
      padding: 15px;
      font-size: 18px;
      border-radius: 5px;
      border: none;
      outline: none;
      background-color: #eee;
    }
    button {
      border: none;
      background-color: #eee;
      outline: none;
      font-size: 14px;
      font-weight: bold;
      color: gray;
      border-radius: 5px;
      margin-left: 5px;
    }
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
`;

const client = new ApolloClient({
  uri: "https://tmdb.apps.quintero.io/",
  cache: new InMemoryCache(),
});

function App() {
  const [input, setInput] = useState();
  const [data, setData] = useState([]);

  const takeInput = (e) => {
    setInput(e.target.value);
  };

  const runApi = async (e) => {
    e.preventDefault();
    client
      .query({
        query: gql`
          query {
            search(term: "${input}") {
              edges {
                node {
                  ... on Movie {
                    title
                    images {
                      posters {
                        image(size: W780)
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      })
      .then((result) => {
        console.log(result.data.search.edges);
        setData(result.data.search.edges);
      });
  };
  return (
    <AppStyles className="App">
      <form>
        <input
          type="text"
          placeholder="Enter movie name"
          onChange={takeInput}
        />
        <button type="submit" onClick={runApi}>
          Search
        </button>
      </form>
      <div className="cards">
        {data.map((dataItem) =>
          dataItem.node.__typename == "Movie" ? (
            <Card
              image={dataItem.node.images?.posters[0]?.image}
              title={dataItem?.node?.title}
            />
          ) : (
            ""
          )
        )}
      </div>
    </AppStyles>
  );
}

export default App;
