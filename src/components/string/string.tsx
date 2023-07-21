import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";

type CharInfo = {
  char: string;
  sorting: boolean;
  sorted: boolean;
};

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [word, setWord] = useState<CharInfo[]>([]); // массив символов введенного слова, который отрисовывается в circle

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    let wordInput = inputValue.split("").map((char) => ({ char, sorting: true, sorted: false }));
    setWord(wordInput);

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= wordInput.length/2) {
        setWord((prevWord) => {
          const newWord = [...prevWord];
          newWord[currentIndex] = prevWord[prevWord.length - 1 - currentIndex];
          newWord[newWord.length - 1 - currentIndex] = prevWord[currentIndex];
          return newWord;
        });
        currentIndex++;
      } else {
        clearInterval(interval);
        setWord((prevWord) =>
        prevWord.map((charInfo) => ({ ...charInfo, sorting: false, sorted: true }))
      );
      }
    }, 1000);
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <div className={styles.input}>
          <Input
            maxLength={11}
            isLimitText={true}
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        <Button
          text="Развернуть"
          onClick={handleButtonClick}
          style={{ width: 178 }}
        />
      </div>
      <div className={styles.wordContainer}>
        {word.map(({ char, sorting, sorted }, index) => (
          <Circle key={index} letter={char} />
        ))}
      </div>
    </SolutionLayout>
  );
};
