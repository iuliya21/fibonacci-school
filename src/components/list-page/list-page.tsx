import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "./linked-list-node";
import { Circle } from "../ui/circle/circle";

export const ListPage: React.FC = () => {
  const [list, setList] = useState(
    new LinkedList<string>(["0", "34", "8", "1"])
  );
  const [inputValue, setInputValue] = useState("");
  const [indexValue, setIndexValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputIndexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIndexValue(e.target.value);
  };

  const handleAddToHead = () => {
    setList((prevList) => {
      const newList = new LinkedList<string>([
        inputValue,
        ...prevList.toArray(),
      ]);
      setInputValue("");
      return newList;
    });

  };

  const handleAddToTail = () => {
    setList((prevList) => {
      const newList = new LinkedList<string>([
        ...prevList.toArray(),
        inputValue,
      ]);
      setInputValue("");
      return newList;
    });
  };

  const handleDeleteFromHead = () => {
    setList((prevList) => {
      const newList = new LinkedList<string>(prevList.toArray().slice(1));
      return newList;
    });
  };

  const handleDeleteFromTail = () => {
    setList((prevList) => {
      const newList = new LinkedList<string>(prevList.toArray().slice(0, -1));
      return newList;
    });
  };

  const handleAddByIndex = () => {
    const index = parseInt(indexValue);
    if (!isNaN(index)) {
      setList((prevList) => {
        const newList = new LinkedList<string>(prevList.toArray());
        newList.addByIndex(inputValue, index);
        setInputValue("");
        setIndexValue("");
        return newList;
      });
    }
  };

  const handleDeleteByIndex = () => {
    const index = parseInt(indexValue);
    if (!isNaN(index)) {
      setList((prevList) => {
        const newList = new LinkedList<string>(prevList.toArray());
        newList.deleteByIndex(index);
        setIndexValue("");
        return newList;
      });
    }
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.containerTop}>
        <Input
          placeholder="Введите значение"
          extraClass={styles.input}
          maxLength={4}
          isLimitText={true}
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button
          text="Добавить в head"
          linkedList="small"
          onClick={handleAddToHead}
        />
        <Button
          text="Добавить в tail"
          linkedList="small"
          onClick={handleAddToTail}
        />
        <Button
          text="Удалить из head"
          linkedList="small"
          onClick={handleDeleteFromHead}
        />
        <Button
          text="Удалить из tail"
          linkedList="small"
          onClick={handleDeleteFromTail}
        />
      </div>
      <div className={styles.containerBottom}>
        <Input
          placeholder="Введите индекс"
          extraClass={styles.input}
          value={indexValue}
          onChange={handleInputIndexChange}
          type="number"
          min={0}
          max={list.toArray().length}
        />
        <Button
          text="Добавить по индексу"
          linkedList="big"
          onClick={handleAddByIndex}
        />
        <Button
          text="Удалить по индексу"
          linkedList="big"
          onClick={handleDeleteByIndex}
        />
      </div>
      <div className={styles.containerList}>
        {list.toArray().map((el, index) => (
          <React.Fragment key={index}>
            
            <Circle letter={el} head={index === 0 ? "head" : ""} tail={index === list.toArray().length - 1 ? "tail" : ""}/>
            {index !== list.toArray().length - 1 && <ArrowIcon />}
          </React.Fragment>
        ))}
      </div>
    </SolutionLayout>
  );
};
