import { render, screen, fireEvent } from '@testing-library/react';
import { StringComponent } from './string';

describe("Тестирование алгоритма разворота строки StringComponent", () => {
  test("Корректное разворот строки с нечетным количеством символов", async () => {
    render(<StringComponent />);
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: "Развернуть" });
  
    fireEvent.change(input, { target: { value: "hello" } });
    fireEvent.click(button);
    
    await screen.findByText("o");
    await screen.findByText("l");
    await screen.findByText("l");
    await screen.findByText("e");
    await screen.findByText("h");
  });
})

