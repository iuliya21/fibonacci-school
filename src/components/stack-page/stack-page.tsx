import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from "./stack-page.module.css";
import { Button } from "../ui/button/button";
import Stack from "../../types/stack";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

type StackElement = {
  element: string;
  color: boolean;
};

export const StackPage: React.FC = () => {
  const [stack] = useState<Stack<string>>(new Stack<string>());
  const [stackElements, setStackElement] = useState<StackElement[]>(
    stack.elements.map((element) => ({ element, color: false }))
  );
  const [inputValue, setInputValue] = useState<string>("");
  const [addButtonDisabled, setAddButtonDisabled] = useState(true);
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(true);
  const [clearButtonDisabled, setClearButtonDisabled] = useState(true);

  useEffect(() => {
    setAddButtonDisabled(inputValue.trim().length === 0);
  }, [inputValue]);

  useEffect(() => {
    setDeleteButtonDisabled(stackElements.length === 0);
    setClearButtonDisabled(stackElements.length === 0);
  }, [stackElements]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): any => {
    setInputValue(event.target.value);
  };

  const animate = (ms: number) =>
    new Promise<void>((resolve) => {
      setTimeout(resolve, ms);
    });

  const addButton = async () => {
    setAddButtonDisabled(true);
    stack.push(inputValue);
    const newStackElements: StackElement[] = [
      ...stack.elements.map((element) => ({ element, color: false })),
    ];
    const lastIndex = newStackElements.length - 1;
    newStackElements[lastIndex] = {
      ...newStackElements[lastIndex],
      color: true,
    };
    setStackElement(newStackElements);
    await animate(500);
    setStackElement((prevNumbers) =>
      prevNumbers.map((element) => ({
        ...element,
        color: false,
      }))
    );
    setAddButtonDisabled(false);
  };

  const deleteButton = async () => {
    const newStackElements: StackElement[] = [
      ...stack.elements.map((element) => ({ element, color: false })),
    ];
    const lastIndex = newStackElements.length - 1;
    newStackElements[lastIndex] = {
      ...newStackElements[lastIndex],
      color: true,
    };
    setStackElement(newStackElements);
    await animate(500);
    stack.pop();
    const deleteElements: StackElement[] = [
      ...stack.elements.map((element) => ({ element, color: false })),
    ];
    setStackElement(deleteElements);
  };

  const clearButton = () => {
    stack.clear();
    const newStackElements: StackElement[] = [
      ...stack.elements.map((element) => ({ element, color: false })),
    ];
    setStackElement(newStackElements);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.main}>
        <div className={styles.container}>
          <Input
            maxLength={4}
            isLimitText={true}
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button text="Добавить" onClick={addButton} disabled={addButtonDisabled}/>
          <Button text="Удалить" onClick={deleteButton} disabled={deleteButtonDisabled}/>
        </div>
        <Button text="Очистить" onClick={clearButton} disabled={clearButtonDisabled}/>
      </div>
      <div className={styles.stack}>
        {stackElements.map(({ element, color }, index) => (
          <Circle
            key={index}
            letter={element}
            head={index === stackElements.length - 1 ? "top" : ""}
            index={index}
            state={color ? ElementStates.Changing : ElementStates.Default}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
