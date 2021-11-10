import { gql } from "@apollo/client";

export const query = gql`
  query {
    search(term: "Avengers", first: 2) {
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
`;
