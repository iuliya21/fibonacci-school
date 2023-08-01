import { render, screen, fireEvent } from '@testing-library/react';
import { StringComponent } from './string';

test("Корректное разворот строки с четным количеством символов", async () => {
  render(<StringComponent />);
  const input = screen.getByRole("textbox");
})