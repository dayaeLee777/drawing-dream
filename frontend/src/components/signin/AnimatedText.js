import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

// Word wrapper
const Wrapper = (props) => {
  // We'll do this to prevent wrapping of words using CSS
  return <span className="word-wrapper">{props.children}</span>;
};
const tagMap = {
  heading1: "h1",
};

const AnimatedCharacters = (props) => {
  const item = {
    hidden: {
      y: "200%",
      color: props.color,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
    },
    visible: {
      y: 0,
      color: props.color,
      //   backgroundColor: "#fec25c",
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
    },
  };
  const splitWords = props.text.split(" ");
  const words = [];
  for (const [, item] of splitWords.entries()) {
    words.push(item.split(""));
  }
  words.map((word) => {
    return word.push("\u00A0");
  });
  const Tag = tagMap[props.type];

  return (
    <Tag>
      {words.map((word, index) => {
        return (
          <Wrapper key={index}>
            {words[index].flat().map((element, index) => {
              return (
                <span
                  style={{
                    overflow: "hidden",
                    display: "inline-block",
                  }}
                  key={index}
                >
                  <motion.span
                    style={{ display: "inline-block" }}
                    variants={item}
                  >
                    {element}
                  </motion.span>
                </span>
              );
            })}
          </Wrapper>
        );
      })}
      {/* {} */}
    </Tag>
  );
};

export default AnimatedCharacters;
