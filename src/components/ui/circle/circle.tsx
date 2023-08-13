import React from "react";
import styles from "./circle.module.css";
import { ElementStates } from "../../../types/element-states";

interface CircleProps {
  state?: ElementStates;
  letter?: string;
  head?: string | React.ReactElement | React.ReactNode | null;
  index?: number;
  tail?: string | React.ReactElement | React.ReactNode | null;
  tailType?: "string" | "element";
  extraClass?: string;
  isSmall?: boolean;
}

export const Circle: React.FC<CircleProps> = ({
  state = ElementStates.Default,
  letter,
  head,
  index,
  tail,
  extraClass = "",
  isSmall,
}) => {
  return (
    <div className={`${styles.content} ${extraClass}`} data-cy="circle">
      <div
        data-cy="head"
        className={`text text_type_input text_color_input mb-4 ${
          styles.absolute
        } ${styles.head} ${
          styles[typeof head === "string" ? "string" : "element"]
        }`}
      >
        {head}
      </div>
      <div
        className={`${styles.circle}  ${isSmall ? styles.small : ""} ${
          styles[state]
        }`}
        data-cy="border"
      >
        <p
          className={`text text_type_circle text_color_input ${styles.letter}`}
          data-cy="letter"
        >
          {letter}
        </p>
      </div>
      <p
        className={`text text_type_input text_color_input mt-4 ${styles.absolute} ${styles.index}`}
        data-cy="index"
      >
        {index?.toString()}
      </p>
      <div
        data-cy="tail"
        className={`text text_type_input text_color_input mt-4 ${
          styles.absolute
        } ${index?.toString() ? styles.tail60 : styles.tail30} ${
          styles[typeof tail === "string" ? "string" : "element"]
        }`}
      >
        {tail}
      </div>
    </div>
  );
};
