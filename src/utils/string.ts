import { swap } from "./swap";

export const reverseString = (string: string): string[] => {
  const stringArray = string.split("");
  const lastIndex = stringArray.length - 1;
  for(let i = 0; i < Math.floor(stringArray.length / 2); i++) {
    swap(stringArray, i, lastIndex - i);
  }
  return stringArray;
}