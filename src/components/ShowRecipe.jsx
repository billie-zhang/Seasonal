import React, { useState } from "react";
import Markdown from "react-markdown";
import ReactMarkdown from "react-markdown";
import "./ShowRecipe.css";

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const ShowRecipe = (props) => {
  // eslint-disable-next-line
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [fruit, setFruit] = useState("");

  const processMessageToChatGPT = async () => {
    setResponse(
      "Generating recipe for " +
        props.product +
        "! Please allow up to 5 seconds."
    );
    console.log(props.product);
    let ingredient = props.product;

    // if (ingredient === "") {
    //   console.log(fruit);
    //   ingredient = fruit;
    // }

    const message_content =
      "I am asking you for a recipe with this ingredient " +
      ingredient +
      ". Output format: Beautiful looking Markdown text format with all of different markdown elements to be super visually pleasing, similar to a github/linkedin post readme with emojis ideally for every line. ";
    const apiRequestBody = {
      model: "gpt-3.5-turbo-0125",
      messages: [{ role: "system", content: message_content }],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });

    const response_str = await response.json();
    // const response_str = JSON.stringify(response_new);
    console.log(response_str);
    if (
      response_str &&
      response_str.choices &&
      response_str.choices.length > 0
    ) {
      const recipe = response_str.choices[0].message.content;
      setResponse(recipe);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center	justify-center mt-3 ">
        <button
          className="text-l px-4 py-5 bg-green text-white border-none rounded-md cursor-pointer"
          onClick={processMessageToChatGPT}
        >
          Generate a Recipe
        </button>
      </div>
      <ReactMarkdown className="recipe-box">{response}</ReactMarkdown>
      <br />
      <br />
      <br />
    </div>
  );
};
export default ShowRecipe;
