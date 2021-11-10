import React from "react";
import styled from "styled-components";

const CardStyles = styled.div`
  height: 400px;
  width: 300px;
  display: grid;
  margin: 15px;
  grid-template-rows: 1fr max-content;
  background-color: #0099af;
  border-radius: 10px;
  div {
    border-radius: 10px 10px 0px 0px;
    width: 100%;
    border: 2px solid black;
    background-image: url(${(props) => props.Image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  span {
    color: white;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
    font-size: 18px;
    padding: 10px;
    text-overflow: ellipsis("...");
  }
`;

function Card(props) {
  return (
    <CardStyles Image={props.image}>
      <div></div>
      <span>{props.title}</span>
    </CardStyles>
  );
}

export default Card;
