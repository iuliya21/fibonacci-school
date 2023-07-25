import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./quene-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): any => {
    setInputValue(event.target.value);
  };

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
          <Button text="Добавить"/>
          <Button text="Удалить"/>
        </div>
        <Button text="Очистить"/>
      </div>
      <div className={styles.quene}>
        
      </div>
    </SolutionLayout>
  );
};
