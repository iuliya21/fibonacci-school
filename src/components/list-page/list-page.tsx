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
  smallCircleHead: boolean;
  smallCircleTail: boolean;
};

export const ListPage: React.FC = () => {
  const initialList = ["0", "34", "8", "1"].map((item) => ({
    value: item,
    changing: false,
    modified: false,
    smallCircleHead: false,
    smallCircleTail: false,
  }));

  const [list, setList] = useState(new LinkedList<ValueInfo>(initialList));

  const [inputValue, setInputValue] = useState("");
  const [indexValue, setIndexValue] = useState("");

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
      const newList = new LinkedList<ValueInfo>(prevList.toArray());
      const firstNode = newList.getFirstNode();
      if (firstNode) {
        firstNode.value = {
          ...firstNode.value,
          smallCircleHead: true,
        };
      }
      return newList;
    });
    await animate(500);
    setList((prevList: LinkedList<ValueInfo>) => {
      const newList = new LinkedList<ValueInfo>();
      newList.prepend({
        value: inputValue,
        changing: false,
        modified: true,
        smallCircleHead: false,
        smallCircleTail: false,
      });
      const currentArray = prevList.toArray();
      for (const item of currentArray) {
        newList.append(item);
      }
      setInputValue("");
      return newList;
    });
    await animate(500);
    setList((prevList: LinkedList<ValueInfo>) => {
      const listArray = prevList.toArray();
      const updateListArray = listArray.map((el) => ({
        ...el,
        changing: false,
        modified: false,
        smallCircleHead: false,
      }));
      const updatedList = new LinkedList<ValueInfo>(updateListArray);
      return updatedList;
    });
  };

  const handleAddToTail = async () => {
    setList((prevList: LinkedList<ValueInfo>) => {
      const newList = new LinkedList<ValueInfo>(prevList.toArray());
      const lastNode = newList.getLastNode();
      if (lastNode) {
        lastNode.value = {
          ...lastNode.value,
          smallCircleHead: true,
        };
      }
      return newList;
    });
    await animate(500);
    setList((prevList: LinkedList<ValueInfo>) => {
      const newList = new LinkedList<ValueInfo>();
      const currentArray = prevList.toArray();
      for (const item of currentArray) {
        newList.append(item);
      }
      newList.append({
        value: inputValue,
        changing: false,
        modified: true,
        smallCircleHead: false,
        smallCircleTail: false,
      });
      setInputValue("");
      return newList;
    });
    await animate(500);
    setList((prevList: LinkedList<ValueInfo>) => {
      const listArray = prevList.toArray();
      const updateListArray = listArray.map((el) => ({
        ...el,
        changing: false,
        modified: false,
        smallCircleHead: false,
      }));
      const updatedList = new LinkedList<ValueInfo>(updateListArray);
      return updatedList;
    });
  };

  const handleDeleteFromHead = async () => {
    setList((prevList: LinkedList<ValueInfo>) => {
      const newList = new LinkedList<ValueInfo>(prevList.toArray());
      const firstNode = newList.getFirstNode();
      if (firstNode) {
        firstNode.value = {
          ...firstNode.value,
          smallCircleTail: true,
        };
      }
      return newList;
    });
    await animate(500);
    setList((prevList: LinkedList<ValueInfo>) => {
      const listArray = prevList.toArray();
      const updateListArray = listArray.map((el) => ({
        ...el,
        smallCircleTail: false,
      }));
      const updatedList = new LinkedList<ValueInfo>(updateListArray);
      return updatedList;
    });
    setList((prevList: LinkedList<ValueInfo>) => {
      const newList = new LinkedList<ValueInfo>(prevList.toArray().slice(1));
      return newList;
    });
  };

  const handleDeleteFromTail = async () => {
    setList((prevList: LinkedList<ValueInfo>) => {
      const newList = new LinkedList<ValueInfo>(prevList.toArray());
      const lastNode = newList.getLastNode();
      if (lastNode) {
        lastNode.value = {
          ...lastNode.value,
          smallCircleTail: true,
        };
      }
      return newList;
    });
    await animate(500);
    setList((prevList: LinkedList<ValueInfo>) => {
      const listArray = prevList.toArray();
      const updateListArray = listArray.map((el) => ({
        ...el,
        smallCircleTail: false,
      }));
      const updatedList = new LinkedList<ValueInfo>(updateListArray);
      return updatedList;
    });
    setList((prevList: LinkedList<ValueInfo>) => {
      const newList = new LinkedList<ValueInfo>(
        prevList.toArray().slice(0, -1)
      );
      return newList;
    });
  };

  const handleAddByIndex = async () => {
    const index = parseInt(indexValue);
    for (let i = 0; i <= index; i++) {
      setList((prevList: LinkedList<ValueInfo>) => {
        const newList = new LinkedList<ValueInfo>(prevList.toArray());
        const currentNode = newList.getNodeByIndex(i);
        const lastNode = newList.getNodeByIndex(i - 1);
        if (currentNode) {
          currentNode.value = {
            ...currentNode.value,
            smallCircleHead: true,
          };
        }
        if (lastNode) {
          lastNode.value = {
            ...lastNode.value,
            changing: true,
            smallCircleHead: false,
          };
        }
        return newList;
      });
      await animate(1000);
    }

    if (!isNaN(index)) {
      setList((prevList: LinkedList<ValueInfo>) => {
        const newList = new LinkedList<ValueInfo>(prevList.toArray());
        newList.addByIndex(
          {
            value: inputValue,
            changing: false,
            modified: true,
            smallCircleHead: false,
            smallCircleTail: false,
          },
          index
        );
        setInputValue("");
        setIndexValue("");
        return newList;
      });
    }

    setList((prevList: LinkedList<ValueInfo>) => {
      const listArray = prevList.toArray();
      const updateListArray = listArray.map((el) => ({
        ...el,
        changing: false,
        smallCircleHead: false,
      }));
      const updatedList = new LinkedList<ValueInfo>(updateListArray);
      return updatedList;
    });
    await animate(500);
    setList((prevList: LinkedList<ValueInfo>) => {
      const newList = new LinkedList<ValueInfo>(prevList.toArray());
      const addedElement = newList.getNodeByIndex(index);
      if (addedElement) {
        addedElement.value.modified = false;
      }
      return newList;
    });
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
        {list
          .toArray()
          .map(
            (
              { value, changing, modified, smallCircleHead, smallCircleTail },
              index
            ) => (
              <React.Fragment key={index}>
                <Circle
                  letter={smallCircleTail ? "" : value}
                  state={
                    modified
                      ? ElementStates.Modified
                      : changing
                      ? ElementStates.Changing
                      : ElementStates.Default
                  }
                  head={
                    smallCircleHead ? (
                      <Circle
                        isSmall
                        letter={inputValue}
                        state={ElementStates.Changing}
                      />
                    ) : index === 0 ? (
                      "head"
                    ) : (
                      ""
                    )
                  }
                  tail={
                    smallCircleTail ? (
                      <Circle
                        isSmall
                        letter={value}
                        state={ElementStates.Changing}
                      />
                    ) : (smallCircleTail && index === 0) ||
                      (smallCircleTail &&
                        index === list.toArray().length - 1) ? (
                      <Circle
                        isSmall
                        letter={value}
                        state={ElementStates.Changing}
                      />
                    ) : index === list.toArray().length - 1 ? (
                      "tail"
                    ) : (
                      ""
                    )
                  }
                />
                {index !== list.toArray().length - 1 && <ArrowIcon />}
              </React.Fragment>
            )
          )}
      </div>
    </SolutionLayout>
  );
};