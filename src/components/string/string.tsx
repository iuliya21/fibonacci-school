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
  const [word, setWord] = useState<CharInfo[]>([]); // массив символов введенного слова

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    const newWord = inputValue
      .split("")
      .map((char) => ({ char, sorting: false, sorted: false }));
    setWord(newWord);
    let delay = 1000;
    for(let i = 0; i <= newWord.length / 2; i++) {
      const lastIndex = newWord.length - i - 1;
      setTimeout(() => {
        const temp = newWord[i];
        newWord[i] = newWord[lastIndex];
        newWord[lastIndex] = temp;
      }, delay)
    }
  };

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
