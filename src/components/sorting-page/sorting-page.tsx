import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { sortingChoice, sortingBubble } from "../../utils/sorting-page";

type NumberInfo = {
  num: number;
  sorting: boolean;
  sorted: boolean;
};

export const SortingPage: React.FC = () => {

  const [selectedOption, setSelectedOption] = useState("Выбор");
  
  const [loaderDescending, setLoaderDescending] = useState<boolean>(false);
  const [loaderAscending, setLoaderAscending] = useState<boolean>(false);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const randomArr = (minLength: number, maxLength: number): number[] => {
    const arrayRand: number[] = [];
    const length = getRandomNumber(minLength, maxLength);

    for (let i = 0; i < length; i++) {
      const numRandom = getRandomNumber(0, 100);
      arrayRand.push(numRandom);
    }
    return arrayRand;
  };

  const [arrayNumbers, setArrayNumbers] = useState<NumberInfo[]>(randomArr(3, 17).map((num) => ({
    num,
    sorting: false,
    sorted: false,
  })));

  const createArray = () => {
    const minLength = 3;
    const maxLength = 17;
    setArrayNumbers(
      randomArr(minLength, maxLength).map((num) => ({
        num,
        sorting: false,
        sorted: false,
      }))
    );
  };

  const animate = (ms: number) =>
    new Promise<void>((resolve) => {
      setTimeout(resolve, ms);
    });

  const handleButtonSort = async (order: "ascending" | "descending") => {
    setLoaderAscending(order === "ascending");
    setLoaderDescending(order === "descending");

    const arrayCopy = arrayNumbers.map((number) => ({
      ...number,
      sorted: false,
      sorting: false,
    }));
    setArrayNumbers(arrayCopy);

    //если сортировка выбором
    if (selectedOption === "Выбор") {
      for (let i = 0; i < arrayCopy.length - 1; i++) {
        let compareIndex = i;
        setArrayNumbers((prevNumbers) =>
          prevNumbers.map((number, index) => ({
            ...number,
            sorting: index === i,
          }))
        );
        await animate(700);

        for (let j = i + 1; j < arrayCopy.length; j++) {
          setArrayNumbers((prevNumbers) =>
            prevNumbers.map((number, index) => ({
              ...number,
              sorting: index === i || index === j,
            }))
          );
          await animate(700);

          const shouldSwap =
            order === "descending"
              ? arrayCopy[j].num > arrayCopy[compareIndex].num
              : arrayCopy[j].num < arrayCopy[compareIndex].num;

          if (shouldSwap) {
            compareIndex = j;
          }
        }

        if (compareIndex !== i) {
          const temp = arrayCopy[i];
          arrayCopy[i] = arrayCopy[compareIndex];
          arrayCopy[compareIndex] = temp;
        }

        arrayCopy[i] = { ...arrayCopy[i], sorted: true };
        setArrayNumbers([...arrayCopy]);

        setArrayNumbers((prevNumbers) =>
          prevNumbers.map((number) => ({
            ...number,
            sorting: false,
          }))
        );
      }
      arrayCopy[arrayCopy.length - 1] = {
        ...arrayCopy[arrayCopy.length - 1],
        sorted: true,
      };
    }

    // если сортировка пузырьком
    if (selectedOption === "Пузырёк") {
      for (let i = 0; i < arrayCopy.length - 1; i++) {
        for (let j = 0; j < arrayCopy.length - i - 1; j++) {
          setArrayNumbers((prevNumbers) =>
            prevNumbers.map((number, index) => ({
              ...number,
              sorting: index === j - 1 || index === j,
            }))
          );
          await animate(700);
          setArrayNumbers((prevNumbers) =>
            prevNumbers.map((number, index) => ({
              ...number,
              sorting: index === j || index === j + 1,
            }))
          );
          await animate(700);

          const shouldSwap =
            order === "descending"
              ? arrayCopy[j].num < arrayCopy[j + 1].num
              : arrayCopy[j].num > arrayCopy[j + 1].num;

          if (shouldSwap) {
            const temp = arrayCopy[j];
            arrayCopy[j] = arrayCopy[j + 1];
            arrayCopy[j + 1] = temp;
          }
          setArrayNumbers([...arrayCopy]);
        }
        arrayCopy[arrayCopy.length - i - 1] = {
          ...arrayCopy[arrayCopy.length - i - 1],
          sorted: true,
        };
      }
      arrayCopy[0] = {
        ...arrayCopy[0],
        sorted: true,
      };
    }

    setArrayNumbers(arrayCopy);
    setLoaderAscending(false);
    setLoaderDescending(false);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container}>
        <div className={styles.radioInputs}>
          <RadioInput
            label="Выбор"
            value={"Выбор"}
            checked={selectedOption === "Выбор"}
            onChange={handleRadioChange}
          />
          <RadioInput
            label="Пузырёк"
            value={"Пузырёк"}
            checked={selectedOption === "Пузырёк"}
            onChange={handleRadioChange}
          />
        </div>
        <div className={styles.buttons}>
          <Button
            text="По возрастанию"
            sorting={Direction.Ascending}
            style={{ width: 205 }}
            onClick={() => {
              handleButtonSort("ascending");
            }}
            isLoader={loaderAscending}
          />
          <Button
            text="По убыванию"
            sorting={Direction.Descending}
            style={{ width: 205 }}
            onClick={() => {
              handleButtonSort("descending");
            }}
            isLoader={loaderDescending}
          />
        </div>
        <Button
          text="Новый массив"
          style={{ width: 205 }}
          onClick={createArray}
        />
      </div>
      <div className={styles.array}>
        {arrayNumbers.map(({ num, sorting, sorted }, index) => (
          <Column
            index={num}
            key={index}
            state={
              sorting
                ? ElementStates.Changing
                : sorted
                ? ElementStates.Modified
                : ElementStates.Default
            }
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
