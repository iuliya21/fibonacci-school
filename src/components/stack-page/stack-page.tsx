import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from "./stack-page.module.css";
import { Button } from "../ui/button/button";
import Stack from "../../types/stack";
import { Circle } from "../ui/circle/circle";

export const StackPage: React.FC = () => {

  const [stack, ] = useState<Stack<string>>(new Stack<string>());
  const [stackElements, setStackElement] = useState(stack.elements);

  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): any => {
    setInputValue(event.target.value);
  };

  const addButton = (): void => {
    stack.push(inputValue);
    setStackElement(stack.elements);
    setInputValue('');
  };

  const deleteButton = (): void => {
    stack.pop();
    const newStackElements = [...stack.elements];
    setStackElement(newStackElements);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.main}>
        <div className={styles.container}>
          <Input maxLength={4} isLimitText={true} value={inputValue}
            onChange={handleInputChange}/>
          <Button text="Добавить" onClick={addButton}/>
          <Button text="Удалить" onClick={deleteButton}/>
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
