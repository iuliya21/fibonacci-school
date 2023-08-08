const loader = '[data-cy="loader"]';

const step1 = [
  {value: '1', color: BORDER_DEFAULT},
  {value: '2', color: BORDER_DEFAULT},
  {value: '3', color: BORDER_DEFAULT},
  {value: '4', color: BORDER_DEFAULT},
  {value: '5', color: BORDER_DEFAULT},
];
const step2 = [
  {value: '1', color: BORDER_CHANGING},
  {value: '2', color: BORDER_DEFAULT},
  {value: '3', color: BORDER_DEFAULT},
  {value: '4', color: BORDER_DEFAULT},
  {value: '5', color: BORDER_CHANGING},
];
const step3 = [
  {value: 'o', color: BORDER_MODIFIED},
  {value: 'e', border: BORDER_CHANGING},
  {value: 'l', border: BORDER_DEFAULT},
  {value: 'l', border: BORDER_CHANGING},
  {value: 'h', border: BORDER_MODIFIED},
];
const step4 = [
  {value: 'o', border: BORDER_MODIFIED},
  {value: 'l', border: BORDER_MODIFIED},
  {value: 'l', border: BORDER_CHANGING},
  {value: 'e', border: BORDER_MODIFIED},
  {value: 'h', border: BORDER_MODIFIED},
];
const step5 = [
  {value: 'o', border: BORDER_MODIFIED},
  {value: 'l', border: BORDER_MODIFIED},
  {value: 'l', border: BORDER_MODIFIED},
  {value: 'e', border: BORDER_MODIFIED},
  {value: 'h', border: BORDER_MODIFIED},
];

const resultArray = (step) => {
  switch (step) {
    case 0: return step0;
    case 1: return step1;
    case 2: return step2;
    case 3: return step3;
    case 4: return step4;
    case 5: return step5;
    case 6: return step6;
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
    const reversedString = inputString.split("").reverse().join("");

    cy.get('input').type(inputString);
    cy.contains('button', 'Развернуть').as("button_start_animation");
    cy.get("@button_start_animation").click();
    cy.get("@button_start_animation").get(loader).should('exist');

    for(let i = 0; i <= countSteps; i++) {
      cy.get()
    }
  });
})

// export const LOADER_SELECTOR = '[data-cy="loader"]';
// export const CIRCLE_ELEMENT_SELECTOR = '[data-cy="circle_element"]';
// export const CIRCLE_LETTER_SELECTOR = '[data-cy="letter"]';
// export const CIRCLE_BORDER_SELECTOR = '[data-cy="border"]';
// export const CIRCLE_INDEX_SELECTOR = '[data-cy="index"]';
// export const CIRCLE_HEAD_SELECTOR = '[data-cy="head"]';
// export const CIRCLE_TAIL_SELECTOR = '[data-cy="tail"]';

// export const BORDER_DEFAULT = 'rgb(0, 50, 255)';
// export const BORDER_CHANGING = 'rgb(210, 82, 225)';
// export const BORDER_MODIFIED = 'rgb(127, 224, 81)';