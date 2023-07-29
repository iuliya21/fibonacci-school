import React, { useState, useEffect } from "react";
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
  const [addButtonDisable, setAddButtonDisable] = useState(true);
  const [addButtonIndexDisable, setAddButtonIndexDisable] = useState(true);
  const [removeButtonIndexDisable, setRemoveButtonIndexDisable] =
    useState(true);
  const [loaderAddToHead, setAddToHeadLoader] = useState<boolean>(false);
  const [loaderRemoveToHead, setRemoveToHeadLoader] = useState<boolean>(false);
  const [loaderAddToTail, setAddToTailLoader] = useState<boolean>(false);
  const [loaderRemoveToTail, setremoveToTailLoader] = useState<boolean>(false);
  const [loaderAddIndex, setAddIndexLoader] = useState<boolean>(false);
  const [loaderRemoveIndex, setRemoveIndexLoader] = useState<boolean>(false);

  useEffect(() => {
    const input = inputValue.trim().length === 0;
    setAddButtonDisable(input);
    const length = list.toArray().length;
    const isValid =
      parseInt(indexValue) >= 0 && parseInt(indexValue) <= length - 1;
    setAddButtonIndexDisable(!isValid || input);
    setRemoveButtonIndexDisable(length !== 0 && !isValid);
  }, [inputValue, indexValue]);

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
    setAddToHeadLoader(true);
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
    await animate(700);
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
        item.smallCircleHead = false;
      }
      setInputValue("");
      return newList;
    });
    setAddToHeadLoader(false);
    await animate(700);
    setList((prevList: LinkedList<ValueInfo>) => {
      const listArray = prevList.toArray();
      const updateListArray = listArray.map((el) => ({
        ...el,
        changing: false,
        modified: false,
      }));
      const updatedList = new LinkedList<ValueInfo>(updateListArray);
      return updatedList;
    });
  };

  const handleAddToTail = async () => {
    setAddToTailLoader(true);
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
    await animate(700);
    setList((prevList: LinkedList<ValueInfo>) => {
      const newList = new LinkedList<ValueInfo>();
      const currentArray = prevList.toArray();
      for (const item of currentArray) {
        newList.append(item);
        item.smallCircleHead = false;
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
    setAddToTailLoader(false);
    await animate(700);
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
    setRemoveToHeadLoader(true);
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
    await animate(700);
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
    setRemoveToHeadLoader(false);
  };

  const handleDeleteFromTail = async () => {
    setremoveToTailLoader(true);
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
    await animate(700);
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
    setremoveToTailLoader(false);
  };

  const handleAddByIndex = async () => {
    setAddIndexLoader(true);
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
      await animate(700);
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
    await animate(700);
    setList((prevList: LinkedList<ValueInfo>) => {
      const newList = new LinkedList<ValueInfo>(prevList.toArray());
      const addedElement = newList.getNodeByIndex(index);
      if (addedElement) {
        addedElement.value.modified = false;
      }
      return newList;
    });
    setAddIndexLoader(false);
  };

  const handleDeleteByIndex = async () => {
    setRemoveIndexLoader(true);
    const index = parseInt(indexValue);
    for (let i = 0; i < index; i++) {
      setList((prevList: LinkedList<ValueInfo>) => {
        const newList = new LinkedList<ValueInfo>(prevList.toArray());
        const currentNode = newList.getNodeByIndex(i);
        if (currentNode) {
          currentNode.value = {
            ...currentNode.value,
            changing: true,
          };
        }
        return newList;
      });
      await animate(700);
    }
    setList((prevList: LinkedList<ValueInfo>) => {
      const newList = new LinkedList<ValueInfo>(prevList.toArray());
      const currentNode = newList.getNodeByIndex(index);
      if (currentNode) {
        currentNode.value = {
          ...currentNode.value,
          changing: true,
        };
      }
      return newList;
    });
    await animate(700);
    setList((prevList: LinkedList<ValueInfo>) => {
      const newList = new LinkedList<ValueInfo>(prevList.toArray());
      const currentNode = newList.getNodeByIndex(index);
      if (currentNode) {
        currentNode.value = {
          ...currentNode.value,
          changing: false,
          smallCircleTail: true,
        };
      }
      return newList;
    });
    await animate(700);
    if (!isNaN(index)) {
      setList((prevList: LinkedList<ValueInfo>) => {
        const newList = new LinkedList<ValueInfo>(prevList.toArray());
        newList.deleteByIndex(index);
        setIndexValue("");
        return newList;
      });
    }
    setList((prevList: LinkedList<ValueInfo>) => {
      const listArray = prevList.toArray();
      const updateListArray = listArray.map((el) => ({
        ...el,
        changing: false,
      }));
      const updatedList = new LinkedList<ValueInfo>(updateListArray);
      return updatedList;
    });
    setRemoveIndexLoader(false);
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
          disabled={addButtonDisable}
          isLoader={loaderAddToHead}
        />
        <Button
          text="Добавить в tail"
          linkedList="small"
          onClick={handleAddToTail}
          disabled={addButtonDisable}
          isLoader={loaderAddToTail}
        />
        <Button
          text="Удалить из head"
          linkedList="small"
          onClick={handleDeleteFromHead}
          disabled={!(list.toArray().length > 0)}
          isLoader={loaderRemoveToHead}
        />
        <Button
          text="Удалить из tail"
          linkedList="small"
          onClick={handleDeleteFromTail}
          disabled={!(list.toArray().length > 0)}
          isLoader={loaderRemoveToTail}
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
          disabled={addButtonIndexDisable}
          isLoader={loaderAddIndex}
        />
        <Button
          text="Удалить по индексу"
          linkedList="big"
          onClick={handleDeleteByIndex}
          disabled={removeButtonIndexDisable}
          isLoader={loaderRemoveIndex}
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
