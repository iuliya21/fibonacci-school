import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { StringComponent } from "./string";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

describe("Тестирование алгоритма разворота строки StringComponent", () => {
  test("Корректный разворот строки с нечетным количеством символов", async () => {
    render(
      <MemoryRouter>
        <StringComponent />
      </MemoryRouter>
    );

    const button = screen.getByText(/Развернуть/i);
    const input = screen.getByPlaceholderText("Введите текст");
    screen.queryAllByTestId("circle").map(item => expect(item).toBeNull());
    userEvent.type(input, "hello");
    userEvent.click(button);
    await waitFor(() => {
      expect(screen.findByTestId('button')).toHaveTextContent("Развернуть");
    });
    expect(screen.queryByTestId("button")).not.toHaveTextContent("Развернуть");
    await waitFor(() => {
      expect(screen.findByTestId('button')).toHaveTextContent("Развернуть");
    });

    // await waitFor(() => {
    //   expect(screen.queryByTestId("button")).not.toHaveTextContent("Развернуть");
    // });

    // await waitFor(() => {
    //   expect(screen.queryByTestId("button")).toHaveTextContent("Развернуть");
    // });

    // const result = ['o', 'l', 'l', 'e', 'h'];
    // const circles = screen.queryAllByTestId("circle").map(item => item.getAttribute("letter"));
    // expect(circles).toEqual(result);
    
    // screen.queryAllByTestId("circle").map(item => expect(item).toBeInTheDocument());
    

    // await waitFor(() => expect(screen.queryByTestId("button")).not.toHaveAttribute("isLoader"));

    // const result = ['o', 'l', 'l', 'e', 'h'];

    // const circles = screen.queryAllByTestId("circle").map(item => item.getAttribute("letter"));

    // expect(circles).toEqual(result);

  });
});
