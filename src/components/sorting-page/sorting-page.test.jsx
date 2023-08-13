import { sortingChoice, sortingBubble } from "../../utils/sorting-page";

describe("Тестирование алгоритмов сортировки выбором и пузырьком", () => {
  test("Корректная сортировка выбором по убыванию массива из нескольких элементов", () => {
    expect(sortingChoice([3, 10, 1, 2, 5, 0], "descending")).toEqual([10, 5, 3, 2, 1, 0]);
  });
  test("Корректная сортировка выбором по убыванию массива из одного элемента", () => {
    expect(sortingChoice([3], "descending")).toEqual([3]);
  });
  test("Корректная сортировка выбором по убыванию пустого массива", () => {
    expect(sortingChoice([], "descending")).toEqual([]);
  });
  test("Корректная сортировка выбором по возрастанию массива из нескольких элементов", () => {
    expect(sortingChoice([3, 10, 1, 2, 5, 0], "ascending")).toEqual([0, 1, 2, 3, 5, 10]);
  });
  test("Корректная сортировка выбором по возрастанию массива из одного элемента", () => {
    expect(sortingChoice([3], "ascending")).toEqual([3]);
  });
  test("Корректная сортировка выбором по возрастанию пустого массива", () => {
    expect(sortingChoice([], "ascending")).toEqual([]);
  });

  test("Корректная сортировка пузырьком по убыванию массива из нескольких элементов", () => {
    expect(sortingBubble([3, 10, 1, 2, 5, 0], "descending")).toEqual([10, 5, 3, 2, 1, 0]);
  });
  test("Корректная сортировка пузырьком по убыванию массива из одного элемента", () => {
    expect(sortingBubble([3], "descending")).toEqual([3]);
  });
  test("Корректная сортировка пузырьком по убыванию пустого массива", () => {
    expect(sortingBubble([], "descending")).toEqual([]);
  });
  test("Корректная сортировка пузырьком по возрастанию массива из нескольких элементов", () => {
    expect(sortingBubble([3, 10, 1, 2, 5, 0], "ascending")).toEqual([0, 1, 2, 3, 5, 10]);
  });
  test("Корректная сортировка пузырьком по возрастанию массива из одного элемента", () => {
    expect(sortingBubble([3], "ascending")).toEqual([3]);
  });
  test("Корректная сортировка пузырьком по возрастанию пустого массива", () => {
    expect(sortingBubble([], "ascending")).toEqual([]);
  });
});