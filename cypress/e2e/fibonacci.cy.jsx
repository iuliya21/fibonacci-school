import { loader, color_default, index_element } from "../constants/constants";

const step0 = [1];
const step1 = [1, 1];
const step2 =[1, 1, 2];
const step3 =[1, 1, 2, 3];
const step4 =[1, 1, 2, 3, 5];

const result = (step) => {
  switch (step) {
    case 0: return step0;
    case 1: return step1;
    case 2: return step2;
    case 3: return step3;
    case 4: return step4;
  }
}

describe("Корректная работа FibonacciPage", () => {
  beforeEach(() => {
    cy.visit('/fibonacci-school/fibonacci');
  });

  it("Открыта страница с компонентом FibonacciPage", () => {
    cy.contains("Последовательность Фибоначчи");
  });

  it("При пустом инпуте кнопка неактивна", () => {
    cy.get('input').should('be.empty');
    cy.contains('button', 'Рассчитать').should('be.disabled');
  });

  it("Корректная работа анимации", () => {
    const inputNumber = 4;
    const countSteps = 5;

    cy.get('input').type(inputNumber);
    cy.contains('button', 'Рассчитать').as("button_start_animation");
    cy.get("@button_start_animation").click();
    cy.get("@button_start_animation").get(loader).should('exist');

    for (let i = 0; i < countSteps; i++) {
      cy.get('[data-cy="circle"]').each((circle, index) => {
        cy.wrap(circle).find('[data-cy="letter"]').should("have.text", result(i)[index]);
        cy.wrap(circle).find('[data-cy="border"]').should("have.css", "border-color", color_default);
      });
      cy.wait(500);
    }
    cy.get("@button_start_animation").get(loader).should('not.exist');
  });
})