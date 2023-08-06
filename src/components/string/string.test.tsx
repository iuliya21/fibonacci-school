import { reverseString } from "../../utils/string";

describe("Тестирование алгоритма разворота строки StringComponent", () => {
  test("Корректный разворот строки с нечетным количеством символов", () => {
    expect(reverseString("hello")).toEqual(["o", "l", "l", "e", "h"]);
  });
  test("Корректный разворот строки с четным количеством символов", () => {
    expect(reverseString("test")).toEqual(["t", "s", "e", "t"]);
  });
  test("Корректный разворот строки с одним символом", () => {
    expect(reverseString("8")).toEqual(["8"]);
  });
  test("Корректный разворот пустого массива", () => {
    expect(reverseString("")).toEqual([]);
  });
});
