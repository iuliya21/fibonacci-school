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

    const button = screen.getByRole("button", { name: "Развернуть" });
    const input = screen.getByPlaceholderText("Введите текст");

    fireEvent.change(input, { target: { value: 'hello' } });
    fireEvent.click(button);
    expect(button.textContent).not.toBe('Развернуть');

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Развернуть" }).textContent).toBe('Развернуть');

    });

    const circles = screen.getAllByTestId(`circle`);
    expect(circles.length).toBe(5);
    expect(circles[0]).toHaveTextContent('o');
    expect(circles[1]).toHaveTextContent('l');
    expect(circles[2]).toHaveTextContent('l');
    expect(circles[3]).toHaveTextContent('e');
    expect(circles[4]).toHaveTextContent('h');
  });
});
