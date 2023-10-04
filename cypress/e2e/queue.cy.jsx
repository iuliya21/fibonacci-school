import { loader, color_default, color_changing, element, head, tail, circle} from "../constants/constants";

describe("Корректная работа компонента QueuePage", () => {
  beforeEach(() => {
    cy.visit("/fibonacci-school/queue");
  });

  it("Страница с компонентом QueuePage загружается корректно", () => {
    cy.contains("Очередь");
  });

  it("Кнопка добавления при пустом инпуте неактивна", () => {
    cy.contains("button", "Добавить").should("be.disabled");
    cy.get("input").should("be.empty");
  });

  it("Корретное добавление элемента в Очередь", () => {
    const count = 6;
    for (let i = 0; i < count; i++) {
      cy.get("input").type(i);
      cy.contains("button", "Добавить").as("button_add");
      cy.get("@button_add").click();
      cy.get("@button_add").get(loader).should("exist");

      cy.get(circle).each((circle, index) => {
        if (i === index) {
          cy.wrap(circle).find(element).should("have.css", "border-color", color_changing);
        } else {
          cy.wrap(circle).find(element).should("have.css", "border-color", color_default);
          if (index < i) {
            cy.wrap(circle).find(element).should("have.text", index);
          }
        }
      });
      cy.wait(700);
      cy.get(circle).first().find(head).should("exist").and("have.text", "head");
      cy.get(circle).eq(i).find(element).should("have.css", "border-color", color_default);
      cy.get(circle).eq(i).find(tail).should("exist").and("have.text", "tail");
    }
  })

  it("Корректное удаление элемента из Очереди", () => {
    const lastElement = 5;
    for (let i = 0; i <= lastElement; i++) {
      cy.get("input").type(i);
      cy.contains("button", "Добавить").as("button_add");
      cy.get("@button_add").click();
      cy.get("@button_add").get(loader).should("exist");
      cy.wait(700);
    }
    for (let i = 0; i < 4; i++) {
      cy.contains("button", "Удалить").as("button_delete");
      cy.get("@button_delete").click();
      cy.get("@button_delete").get(loader).should("exist");
      cy.get(circle).each((circle, index, collect) => {
        if (index === 0) {
          cy.wrap(circle).find(head).and("have.text", "head");
          cy.wrap(circle).find(element).should("have.css", "border-color", color_changing);
        } else {
          cy.wrap(circle).find(element).should("have.css", "border-color", color_default);
        }
      })
      cy.wait(700);
      cy.get(circle).eq(0).find(head).should("have.text", "head");
    }
  })

  it("Корректная работа кнопки Очистить", () => {
    const lastElement = 3;
    for (let i = 0; i <= lastElement; i++) {
      cy.get("input").type(i);
      cy.contains("button", "Добавить").as("button_add");
      cy.get("@button_add").click();
      cy.get("@button_add").get(loader).should("exist");
      cy.wait(700);
    }
    cy.contains("button", "Очистить").as("button_clear");
    cy.get("@button_clear").click();
    cy.get(circle).each((circle, index) => {
      cy.wrap(circle).find(element).should("have.css", "border-color", color_default);
      cy.wrap(circle).find(element).should("have.text", "");
    })
  })
})