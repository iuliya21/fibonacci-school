import { render } from '@testing-library/react';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

describe('Тестирование компонента Circle', () => {
  test("Отрисовка компонента Circle без символа", () => {
    const { asFragment } = render(<Circle />);
    expect(asFragment()).toMatchSnapshot();
  });
  
  test("Отрисовка компонента Circle с символом", () => {
    const { asFragment } = render(<Circle letter="Символ" />);
    expect(asFragment()).toMatchSnapshot();
  });
  
  test("Отрисовка компонента Circle с пропсом head", () => {
    const { asFragment } = render(<Circle head="head" />);
    expect(asFragment()).toMatchSnapshot();
  });
  
  test("Отрисовка компонента Circle с react-элементом в пропсе head", () => {
    const { asFragment } = render(<Circle head={<div>React Element</div>} />);
    expect(asFragment()).toMatchSnapshot();
  });
  
  test("Отрисовка компонента Circle с  пропсом tail", () => {
    const { asFragment } = render(<Circle tail="tail" />);
    expect(asFragment()).toMatchSnapshot();
  });
  
  test("Отрисовка компонента Circle с react-элементом в пропсе tail", () => {
    const { asFragment } = render(<Circle tail={<div>React Element</div>} />);
    expect(asFragment()).toMatchSnapshot();
  });
  
  test("Отрисовка компонента Circle с index", () => {
    const { asFragment } = render(<Circle index={1} />);
    expect(asFragment()).toMatchSnapshot();
  });
  
  test("Отрисовка компонента Circle с пропсом isSmall ===  true", () => {
    const { asFragment } = render(<Circle isSmall={true} />);
    expect(asFragment()).toMatchSnapshot();
  });
  
  test("Отрисовка компонента Circle с состоянием ElementStates.Default", () => {
    const { asFragment } = render(<Circle state={ElementStates.Default} />);
    expect(asFragment()).toMatchSnapshot();
  });
  
  test("Отрисовка компонента Circle с состоянием ElementStates.Changing", () => {
    const { asFragment } = render(<Circle state={ElementStates.Changing} />);
    expect(asFragment()).toMatchSnapshot();
  });
  
  test("Отрисовка компонента Circle с состоянием ElementStates.Modifield", () => {
    const { asFragment } = render(<Circle state={ElementStates.Modified} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

