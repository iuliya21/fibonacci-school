import { loader, circle, element, color_default, color_changing, head, letter, index_element } from "../constants/constants";

describe("Корректная работа компонента StackPage", () => {
  beforeEach(() => {
    cy.visit('/fibonacci-school/stack');
  });

  it("Открыта страница с компонентом StackPage", () => {
    cy.contains("Стек");
  });

  it("При пустом инпуте кнопка добавления неактивна", () => {
    cy.get('input').should('be.empty');
    cy.contains('button', 'Добавить').should('be.disabled');
  });

  it("Корретное добавление элемента в Стек", () => {
    for (let i = 0; i < 6; i++) {
      cy.get("input").type(i);
      cy.contains("button", "Добавить").as("button_add");
      cy.get("@button_add").click();
      cy.get("@button_add").get(loader).should("exist");
      cy.get(circle).should("have.length", i + 1);
      cy.get(circle).each((circle, index, collect) => {
        if (index < collect.length - 1) {
          cy.wrap(circle).find(element).should('have.css', 'border-color', color_default);
          cy.wrap(circle).find(head).should('be.empty');
        } else {
          cy.wrap(circle).find(element).should('have.css', 'border-color', color_changing);
          cy.wrap(circle).find(head).and('have.text', 'top');
        }
        cy.wrap(circle).find(letter).should('have.text', index);
        cy.wrap(circle).find(index_element).should('have.text', index);
      });
      cy.wait(700);
    }
    cy.get(circle).last().find(element).should('have.css', 'border-color', color_default);
    cy.get("@button_add").get(loader).should('not.exist');
  });

  it("Корректное удаление элемента из стека", () => {
    for (let i = 0; i < 6; i++) {
      cy.get("input").type(i);
      cy.contains("button", "Добавить").as("button_add");
      cy.get("@button_add").click();
      cy.wait(700);
    }
    for (let i = 0; i < 3; i++) {
      cy.contains("button", "Удалить").as("button_delete");
      cy.get("@button_delete").click();
      cy.get("@button_delete").get(loader).should("exist");

      cy.get(circle).each((circle, index, collect) => {
        if (index < collect.length - 1) {
          cy.wrap(circle).find(element).should("have.css", "border-color", color_default);
          cy.wrap(circle).find(head).should("be.empty");
        } else {
          cy.wrap(circle).find(element).should("have.css", "border-color", color_changing);
          cy.wrap(circle).find(head).and("have.text", "top");
        }
        cy.wrap(circle).find(letter).should("have.text", index);
        cy.wrap(circle).find(index_element).should("have.text", index);
      });
      cy.wait(700);
      cy.get(circle).each((circle, index, collect) => {
        if (index < collect.length - 1) {
          cy.wrap(circle).find(head).should("be.empty");
        } else {
          cy.wrap(circle).find(head).and("have.text", "top");
        }
        cy.wrap(circle).find(element).should("have.css", "border-color", color_default);
        cy.wrap(circle).find(letter).should("have.text", index);
        cy.wrap(circle).find(index_element).should("have.text", index);
      });
      cy.get("@button_delete").get(loader).should("not.exist");
    }
  });

  it("Корректная работа при нажатии Очистить", () => {
    for (let i = 0; i < 6; i++) {
      cy.get("input").type(i);
      cy.contains("button", "Добавить").as("button_add");
      cy.get("@button_add").click();
      cy.wait(700);
    }
    cy.contains("button", "Очистить").as("button_clear");
    cy.get("@button_clear").click();
    cy.get(circle).should("have.length", 0);
  });
})