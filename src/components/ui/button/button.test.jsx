import { render, fireEvent } from '@testing-library/react';
import { Button } from "./button";

test('Отрисовка компонента Button с текстом', () => {
  const { asFragment } = render(<Button text="Текст кнопки"/>);
  expect(asFragment()).toMatchSnapshot();
});

test('Отрисовка компонента Button без текста', () => {
  const { asFragment } = render(<Button />);
  expect(asFragment()).toMatchSnapshot();
});

test('Отрисовка заблокированного компонента Button', () => {
  const { asFragment } = render(<Button disabled />);
  expect(asFragment()).toMatchSnapshot();
});

test('Отрисовка компонента Button с индикацией загрузки', () => {
  const { asFragment } = render(<Button isLoader />);
  expect(asFragment()).toMatchSnapshot();
});

test('Клик по компоненту Button вызывает callback', () => {
  const onClickMock = jest.fn();
  const { getByRole } = render(<Button text="Текст кнопки" onClick={onClickMock} />);
  fireEvent.click(getByRole('button'));
  expect(onClickMock).toHaveBeenCalled();
});