import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import styles from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(1);
  const [loader, setLoader] = useState<boolean>(false);
  const [numbers, setNumbers] = useState<number[]>([]);



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(event.target.value));
  };

  const fibonacci = (num: number): number => {
    if (num <= 1) {
      return 1;
    }
    return fibonacci(num - 1) + fibonacci(num - 2);
  };

  const handleButton = () => {
    let currentIndex = 0;
    setNumbers([]);
    setLoader(true);
    const interval = setInterval(() => {
      if (inputValue && currentIndex <= inputValue) {
        const numberFibbonacci = fibonacci(currentIndex);
        setNumbers((prevNumbers) => [...prevNumbers, numberFibbonacci]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setLoader(false);
      }
    }, 500);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <div className={styles.input}>
          <Input
            type="number"
            isLimitText={true}
            onChange={handleInputChange}
            max={19}
            min={1}
          />
        </div>
        <Button
          text="Рассчитать"
          style={{ width: 178 }}
          onClick={handleButton}
          isLoader={loader}
          disabled={inputValue > 19 ? true : inputValue < 1 ? true : false}
        />
      </div>
      <div className={styles.containerNumbers}>
        {numbers.map((num, index) => (
          <div className={styles.number} key={index}>
            <Circle letter={num.toString()} />
            <p className={styles.index}>{index}</p>
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};
