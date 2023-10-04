import { loader, color_default, color_modified, color_changing, element, circle } from "../constants/constants";

const step0 = [
  { value: '1', color: color_default },
  { value: '2', color: color_default },
  { value: '3', color: color_default },
  { value: '4', color: color_default },
  { value: '5', color: color_default },
];
const step1 = [
  { value: '1', color: color_changing },
  { value: '2', color: color_default },
  { value: '3', color: color_default },
  { value: '4', color: color_default },
  { value: '5', color: color_changing },
];
const step2 = [
  { value: '5', color: color_modified },
  { value: '2', color: color_changing },
  { value: '3', color: color_default },
  { value: '4', color: color_changing },
  { value: '1', color: color_modified },
];
const step3 = [
  { value: '5', color: color_modified },
  { value: '4', color: color_modified },
  { value: '3', color: color_default },
  { value: '2', color: color_modified },
  { value: '1', color: color_modified },
];
const step4 = [
  { value: '5', color: color_modified },
  { value: '4', color: color_modified },
  { value: '3', color: color_changing },
  { value: '2', color: color_modified },
  { value: '1', color: color_modified },
];
const step5 = [
  { value: '5', color: color_modified },
  { value: '4', color: color_modified },
  { value: '3', color: color_modified },
  { value: '2', color: color_modified },
  { value: '1', color: color_modified },
];

const result = (step) => {
  switch (step) {
    case 0: return step0;
    case 1: return step1;
    case 2: return step2;
    case 3: return step3;
    case 4: return step4;
    case 5: return step5;
  }
}

describe("Корректная работа StringComponent", () => {
  beforeEach(() => {
    cy.visit('/recursion');
  });

  it("Открыта страница с компонентом StringComponent", () => {
    cy.contains("Строка");
  });

  it("При пустом инпуте кнопка неактивна", () => {
    cy.get('input').should('be.empty');
    cy.contains('button', 'Развернуть').should('be.disabled');
  });

  it("Корректная работа анимации", () => {
    const inputString = "12345";
    const countSteps = 6;

    cy.get('input').type(inputString);
    cy.contains('button', 'Развернуть').as("button_start_animation");
    cy.get("@button_start_animation").click();
    cy.get("@button_start_animation").get(loader).should('exist');

    for (let i = 0; i < countSteps; i++) {
      cy.get(circle).each((circle, index) => {

        cy.wrap(circle).find(element).should("have.text", result(i)[index].value);
        cy.wrap(circle).find(element).should("have.css", "border-color", result(i)[index].color);
      });
      cy.wait(500);
    }
    cy.get("@button_start_animation").get(loader).should('not.exist');
  });
})