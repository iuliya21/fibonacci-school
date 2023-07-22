import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

type CharInfo = {
  char: string;
  sorting: boolean;
  sorted: boolean;
};

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [word, setWord] = useState<CharInfo[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    let wordInput = inputValue.split("").map((char) => ({ char, sorting: false, sorted: false }));
    setWord(wordInput);
    setLoader(true);
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < wordInput.length / 2) {
        setTimeout(() => {
          setWord((prevWord) => {
            const newWord = [...prevWord];
            const lastIndex = newWord.length - 1 - currentIndex;
            newWord[currentIndex] = { ...prevWord[currentIndex], sorting: true };
            newWord[lastIndex] = { ...prevWord[lastIndex], sorting: true }
            return newWord;
          });
        }, 0);
        setTimeout(() => {
          setWord((prevWord) => {
            const newWord = [...prevWord];
            const lastIndex = newWord.length - 1 - currentIndex;
            newWord[currentIndex] = { ...prevWord[lastIndex], sorting: false, sorted: true };
            newWord[lastIndex] = { ...prevWord[currentIndex], sorting: false, sorted: true }
            return newWord;
          });
          currentIndex++;
        }, 500)
      } else {
        clearInterval(interval);
        setLoader(false);
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
          isLoader={loader}
        />
      </div>
      <div className={styles.containerWords}>
        {word.map(({ char, sorting, sorted }, index) => (
          <Circle key={index} letter={char} state={sorting ? ElementStates.Changing : sorted ? ElementStates.Modified : ElementStates.Default} />
        ))}
      </div>
    </SolutionLayout>
  );
};
