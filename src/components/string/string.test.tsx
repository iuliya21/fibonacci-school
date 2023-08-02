import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { StringComponent } from "./string";
import { MemoryRouter } from "react-router-dom";

describe("Тестирование алгоритма разворота строки StringComponent", () => {
  test("Корректный разворот строки с нечетным количеством символов", async () => {
    render(
      <MemoryRouter>
        <StringComponent />
      </MemoryRouter>
    );

    const initialWord = ["h", "e", "l", "l", "o"];

    const button = screen.getByRole("button", { name: "Развернуть" });
    const input = screen.getByPlaceholderText("Введите текст");

    fireEvent.click(button);
    expect(initialWord).toBeInTheDocument();

    await waitFor(() => {
      const reversedWord = ["o", "l", "l", "e", "h"];
      expect(reversedWord).toBeInTheDocument();
    });
  });
});
