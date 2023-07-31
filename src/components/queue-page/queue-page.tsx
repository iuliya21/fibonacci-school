import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./quene-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import Quene from "./quene";
import { ElementStates } from "../../types/element-states";

type QueueElement = {
  element: string;
  color: boolean;
};

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [queue, setQueue] = useState<Quene<string>>(new Quene<string>());
  const [elements, setElements] = useState<QueueElement[]>(
    queue.elements().map((element) => ({ element, color: false }))
  );
  const [headIndex, setHeadIndex] = useState<number | null>(null);
  const [tailIndex, setTailIndex] = useState<number | null>(null);
  const [addButtonDisabled, setAddButtonDisabled] = useState(true);
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(true);
  const [clearButtonDisabled, setClearButtonDisabled] = useState(true);
  const [loaderAdd, setLoaderAdd] = useState<boolean>(false);
  const [loaderDelete, setLoaderDelete] = useState<boolean>(false);

  useEffect(() => {
    setAddButtonDisabled(inputValue.trim().length === 0);
  }, [inputValue]);

  useEffect(() => {
    setDeleteButtonDisabled(elements.length === 0);
    setClearButtonDisabled(elements.length === 0);
    setAddButtonDisabled(elements.length === 0);
  }, [elements]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputValue(event.target.value);
  };

  const animate = (ms: number) =>
    new Promise<void>((resolve) => {
      setTimeout(resolve, ms);
    });

  const handleAdd = async () => {
    setLoaderAdd(true);
    queue.enqueue(inputValue);
    const newElements: QueueElement[] = [
      ...queue.elements().map((element) => ({ element, color: false })),
    ];
    const lastIndex = newElements.length - 1;
    newElements[lastIndex] = {
      ...newElements[lastIndex],
      color: true,
    };
    setElements(newElements);
    setInputValue("");
    setHeadIndex(queue.isEmpty() ? null : 0);
    setTailIndex(queue.isEmpty() ? null : newElements.length - 1);
    await animate(700);
    setElements((prevState) =>
      prevState.map((element) => ({
        ...element,
        color: false,
      }))
    );
    setLoaderAdd(false);
  };

  const handleRemove = async () => {
    setLoaderDelete(true);
    let newElements: QueueElement[] = [
      ...queue.elements().map((element) => ({ element, color: false })),
    ];
    newElements[0] = {
      ...newElements[0],
      color: true,
    };
    setElements(newElements);
    await animate(700);
    queue.dequeue();
    newElements = [
      ...queue.elements().map((element) => ({ element, color: false })),
    ];
    setElements(newElements);
    setHeadIndex(queue.isEmpty() ? null : 0);
    setTailIndex(queue.isEmpty() ? null : newElements.length - 1);
    setLoaderDelete(false);
  };

  const handleClear = (): void => {
    queue.clear();
    const newElements: QueueElement[] = [
      ...queue.elements().map((element) => ({ element, color: false })),
    ];
    setElements(newElements);
    setHeadIndex(null);
    setTailIndex(null);
  };

  const isQueueFull = tailIndex === 6;

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.main}>
        <div className={styles.container}>
          <Input
            placeholder="Введите значение"
            maxLength={4}
            isLimitText={true}
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button
            text="Добавить"
            onClick={handleAdd}
            disabled={isQueueFull || addButtonDisabled}
            isLoader={loaderAdd}
          />
          <Button
            text="Удалить"
            onClick={handleRemove}
            disabled={deleteButtonDisabled}
            isLoader={loaderDelete}
          />
        </div>
        <Button
          text="Очистить"
          onClick={handleClear}
          disabled={clearButtonDisabled}
        />
      </div>
      <div className={styles.queue}>
        {Array.from({ length: 7 }, (el, index) => {
          const item = elements[index];
          const letter = item ? item.element : "";
          const color = item ? item.color : "";
          return (
            <Circle
              key={index}
              index={index}
              letter={letter}
              head={headIndex === index ? "head" : ""}
              tail={tailIndex === index ? "tail" : ""}
              state={color ? ElementStates.Changing : ElementStates.Default}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
