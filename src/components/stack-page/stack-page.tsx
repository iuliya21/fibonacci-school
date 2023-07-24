import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from "./stack-page.module.css";
import { Button } from "../ui/button/button";
import Stack from "../../types/stack";
import { Circle } from "../ui/circle/circle";

export const StackPage: React.FC = () => {
  
  const stack = new Stack<string>();

  const [inputValue, setInputValue] = useState<string>("");
  const [stackElements, setStackElements] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const addButton = () => {
    stack.push(inputValue);
    setStackElements([...stack.elements]);
    console.log(stack.elements);
  }
  
  return (
    <SolutionLayout title="Стек">
      <div className={styles.main}>
        <div className={styles.container}>
          <Input maxLength={4} isLimitText={true} value={inputValue}
            onChange={handleInputChange}/>
          <Button text="Добавить" onClick={addButton}/>
          <Button text="Удалить" />
        </div>
        <Button text="Очистить" />
      </div>
      <div className={styles.stack}>
        {stackElements.map((char, index) => (
          <Circle key={index} letter={char}/>
        ))}
      </div>
    </SolutionLayout>
  );
};
