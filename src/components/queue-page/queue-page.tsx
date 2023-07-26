import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./quene-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import Quene from "./quene";

type QueueElement = {
  element: string;
  color: boolean;
}

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [queue, setQueue] = useState<Quene<string>>(new Quene<string>());
  const [elements, setElements] = useState<QueueElement[]>(queue.elements().map((element) => ({ element, color: false })));
  const [headIndex, setHeadIndex] = useState<number | null>(null);
  const [tailIndex, setTailIndex] = useState<number | null>(null);

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
    queue.enqueue(inputValue);
    const newElements: QueueElement[] = [
      ...queue.elements().map((element) => ({ element, color: false })),
    ];
    setElements(newElements);
    setInputValue("");
    setHeadIndex(queue.isEmpty() ? null : 0);
    setTailIndex(queue.isEmpty() ? null : newElements.length - 1);
  };

  const handleRemove = (): void => {
    queue.dequeue();
    const newElements: string[] = queue.elements();
    const lastIndex = newElements.length - 1;
    newElements[lastIndex] = {
      ...newElements[lastIndex],
      color: true,
    };
    setElements(newElements);
    setHeadIndex(queue.isEmpty() ? null : 0);
    setTailIndex(queue.isEmpty() ? null : newElements.length - 1);
  };

  const handleClear = (): void => {
    queue.clear();
    setElements(["", "", "", "", "", "", ""]);
    setHeadIndex(null);
    setTailIndex(null);
  };

  const isQueueFull = tailIndex === 6;

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.main}>
        <div className={styles.container}>
          <Input
            maxLength={4}
            isLimitText={true}
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button text="Добавить" onClick={handleAdd} disabled={isQueueFull} />
          <Button text="Удалить" onClick={handleRemove} />
        </div>
        <Button text="Очистить" onClick={handleClear} />
      </div>
      <div className={styles.queue}>
        {Array.from({ length: 7 }, (el, index) => {
          const item = elements[index] || "";
          return (
            <Circle key={index} index={index} letter={item} head={headIndex === index ? "head" : ""} tail={tailIndex === index ? "tail" : ""} />
          )
        })}
      </div>
    </SolutionLayout>
  );
};
