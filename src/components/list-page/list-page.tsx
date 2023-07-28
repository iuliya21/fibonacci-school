import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "./linked-list-node";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

type ValueInfo = {
  value: string;
  changing: boolean;
  modified: boolean;
}

export const ListPage: React.FC = () => {

  const initialList = ["0", "34", "8", "1"].map((item) => ({
    value: item,
    changing: false,
    modified: false,
  }));

  const [list, setList] = useState(new LinkedList<ValueInfo>(initialList));

  const [inputValue, setInputValue] = useState("");
  const [indexValue, setIndexValue] = useState("");
  const [smallCircle, setSmallCircle] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputIndexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIndexValue(e.target.value);
  };

  const animate = (ms: number) =>
    new Promise<void>((resolve) => {
      setTimeout(resolve, ms);
    });

  const handleAddToHead = async () => {
    setList((prevList: LinkedList<ValueInfo>) => {
      const newList = new LinkedList<ValueInfo>([
        { value: inputValue, changing: false, modified: true },
        ...prevList.toArray(),
      ]);
      setInputValue("");
      return newList;
    });
    await animate(500);
    setList((prevList: LinkedList<ValueInfo>) => {
      const listArray = prevList.toArray();
      const updatedListArray = listArray.map((el) => ({
        ...el,
        changing: false,
        modified: false,
      }));
      const updatedList = new LinkedList<ValueInfo>(updatedListArray);
      return updatedList;
    });
  };

  const handleAddToTail = () => {
    setList((prevList: LinkedList<ValueInfo>) => {
      const newElement: ValueInfo = {
        value: inputValue,
        changing: false,
        modified: false,
      };

      const newList = new LinkedList<ValueInfo>([
        ...prevList.toArray(),
        newElement,
      ]);

      setInputValue("");
      return newList;
    });
  };

  const handleDeleteFromHead = () => {
    setList((prevList: LinkedList<ValueInfo>) => {
      const newList = new LinkedList<ValueInfo>(prevList.toArray().slice(1));
      return newList;
    });
  };

  const handleDeleteFromTail = () => {
    setList((prevList: LinkedList<ValueInfo>) => {
      const newList = new LinkedList<ValueInfo>(prevList.toArray().slice(0, -1));
      return newList;
    });
  };

  const handleAddByIndex = () => {
    const index = parseInt(indexValue);
    if (!isNaN(index)) {
      setList((prevList: LinkedList<ValueInfo>) => {
        const newList = new LinkedList<ValueInfo>(prevList.toArray());
        newList.addByIndex({ value: inputValue, changing: false, modified: false }, index);
        setInputValue("");
        setIndexValue("");
        return newList;
      });
    }
  };

  const handleDeleteByIndex = () => {
    const index = parseInt(indexValue);
    if (!isNaN(index)) {
      setList((prevList: LinkedList<ValueInfo>) => {
        const newList = new LinkedList<ValueInfo>(prevList.toArray());
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
        {list.toArray().map(({ value, changing, modified }, index) => (
          <React.Fragment key={index}>
            <Circle letter={value} state={modified ? ElementStates.Modified : changing ? ElementStates.Changing : ElementStates.Default} head={index === 0 ? (smallCircle ? <Circle isSmall state={ElementStates.Changing} letter={inputValue} /> : "head") : ""} tail={index === list.toArray().length - 1 ? "tail" : ""} />
            {index !== list.toArray().length - 1 && <ArrowIcon />}
          </React.Fragment>
        ))}
      </div>
    </SolutionLayout>
  );
};
