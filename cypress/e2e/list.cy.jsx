import { loader, circle, element, color_changing, color_modified, color_default, letter, head, tail, add_to_head } from "../constants/constants";

describe("Корректная работа компонента ListPage", () => {
  beforeEach(function () {
    cy.visit("/fibonacci-school/list");
  });

  it("Страница с компонентом ListPage загружается корректно", () => {
    cy.contains("Связный список");
  });

  it("Кнопка добавления в head при пустом инпуте 'Введите значение' неактивна", () => {
    cy.get("input").eq(0).should("be.empty");
    cy.contains("button", add_to_head).should("be.disabled");
    cy.contains("button", "Добавить по индексу").should("be.disabled");
    cy.contains("button", "Удалить по индексу").should("be.disabled");
  });

  it("Кнопка добавления по индексу при пустом инпуте 'Введите индекс'", () => {
    cy.get("input").eq(0).type("44");
    cy.get("input").eq(1).should("be.empty");
    cy.contains("button", add_to_head).should("not.be.disabled");
    cy.contains("button", "Добавить в tail").should("not.be.disabled");
    cy.contains("button", "Добавить по индексу").should("be.disabled");
    cy.contains("button", "Удалить по индексу").should("be.disabled");
  });

  it("Корректная отрисовка первоначального списка", () => {
    const initialArray = [0, 34, 8, 1];
    const lastIndex = initialArray.length - 1;
    cy.get(circle).each((circle, index, collect) => {
      cy.wrap(circle).find(element).should("have.css", "border-color", color_default);
      cy.wrap(circle).find(letter).should("have.text", initialArray[index]);
      if (index === 0) {
        cy.wrap(circle).find(head).should("have.text", "head");
      }
      if(index === lastIndex) {
        cy.wrap(circle).find(tail).should("have.text", "tail");
      }
    })
  })

  it("Корректное добавление элемента в head", () => {
    cy.get("input").eq(0).type("44");
    cy.contains("button", add_to_head).as("button_add_head");
    cy.get("@button_add_head").click();
    cy.get("@button_add_head").get(loader).should("exist");
    cy.get(circle).first().find(head).find(element).should("have.css", "border-color", color_changing);
    cy.get(circle).first().find(head).find(letter).should("have.text", "44");
    cy.wait(700);
    cy.get(circle).first().find(element).should("have.css", "border-color", color_modified);
    cy.get(circle).first().find(head).should("have.text", "head");
    cy.get(circle).first().find(letter).should("have.text", "44");
    cy.wait(700);
    cy.get(circle).first().find(element).should("have.css", "border-color", color_default);
    cy.get("@button_add_head").get(loader).should("not.exist");
  })

  it("Корректное добавление элемента в tail", () => {
    cy.get("input").eq(0).type("44");
    cy.contains("button", "Добавить в tail").as("button_add_tail");
    cy.get("@button_add_tail").click();
    cy.get("@button_add_tail").get(loader).should("exist");
    cy.get(circle).last().find(element).should("have.css", "border-color", color_changing);
    cy.get(circle).last().find(letter).should("have.text", "44");
    cy.wait(700);
    cy.get(circle).last().find(element).should("have.css", "border-color", color_modified);
    cy.get(circle).last().find(head).should("be.empty");
    cy.get(circle).last().find(tail).should("have.text", "tail");
    cy.get(circle).last().find(letter).should("have.text", "44");
    cy.wait(700);
    cy.get(circle).last().find(element).should("have.css", "border-color", color_default);
    cy.get("@button_add_tail").get(loader).should("not.exist");
  });

  it("Корректное удаление элемента из head", () => {
    cy.contains("button", "Удалить из head").as("button_delete_head");
    cy.get("@button_delete_head").click();
    cy.get("@button_delete_head").get(loader).should("exist");
    cy.get(circle).first().find(letter).should("be.empty");
    cy.get(circle).first().find(tail).find(element).should("have.css", "border-color", color_changing);
    cy.wait(700);
    cy.get("body").then($body => {
      if ($body.find(element).length > 0) {
        cy.get(circle).each((circle, index, collect) => {
          cy.wrap(circle).find(element).should("have.css", "border-color", color_default);
          cy.wrap(circle).find(letter).should("not.be.empty");
          if (index > 0 && index < collect.length - 1) {
            cy.wrap(circle).find(head).should("be.empty");
            cy.wrap(circle).find(tail).should("be.empty");
          }
        });
        cy.get(circle).first().get(head).should("have.text", "head");
        cy.get(circle).last().get(tail).should("have.text", "tail");
      }
    })
    cy.get("@button_delete_head").get(loader).should("not.exist");
  })

  it("Корректное удаление элемента из tail", () => {
    cy.contains("button", "Удалить из tail").as("button_delete_tail");
    cy.get("@button_delete_tail").click();
    cy.get("@button_delete_tail").get(loader).should("exist");
    cy.get(circle).last().find(element).should("have.css", "border-color", color_changing);
    cy.get(circle).each((circle, index, collect) => {
      if (index === collect.length - 2) {
        cy.wrap(circle).find(letter).should("be.empty");
      }
    })
    cy.wait(700);
    cy.get("body").then($body => {
      if ($body.find(element).length > 0) {
        cy.get(element).should("have.css", "border-color", color_default);
        cy.get(circle).first().get(head).should("have.text", "head");
        cy.get(circle).last().get(tail).should("have.text", "tail");
      }
    })
    cy.get("@button_delete_tail").get(loader).should("not.exist");
  })

  it("Добавление элемента по индексу", () => {
    cy.get("body").then($body => {
      const indexForAdd = 2;
      cy.get("input").eq(0).type("44");
      cy.get("input").eq(1).type(indexForAdd);
      cy.contains("button", "Добавить по индексу").as("button_add_index");
      cy.get("@button_add_index").click();
      cy.get("@button_add_index").get(loader).should("exist");
      for (let i = 0; i <= indexForAdd; i++) {
        cy.get(circle).each((circle, index, collect) => {
          if (index <= i) {
            cy.wrap(circle).find(element).should("have.css", "border-color", color_changing);
          }
        })
        cy.wait(700);
      }
      cy.get(circle).each((circle, index, collect) => {
        if (index < indexForAdd) {
          cy.wrap(circle).find(element).should("have.css", "border-color", color_default);
        }
        if (index === indexForAdd) {
          cy.wrap(circle).find(element).should("have.css", "border-color", color_modified);
        }
      })
      cy.wait(700);
      cy.get(circle).each((circle, index, collect) => {
        if (index === indexForAdd) {
          cy.wrap(circle).find(letter).should("have.text", "44");
        }
      })
      cy.get("@button_add_index").get(loader).should("not.exist");
    })
  })

  it("Удаление элемента по индексу", () => {
    cy.get("body").then($body => {
      const lengthStart = $body.find(circle).length;
      const indexForDelete = 2;
      cy.get("input").eq(1).type(indexForDelete);
      cy.contains("button", "Удалить по индексу").as("button_delete_index");
      cy.get("@button_delete_index").click();
      cy.get("@button_delete_index").get(loader).should("exist");
      for (let i = 0; i <= indexForDelete; i++) {
        cy.get(circle).each((circle, index, collect) => {
          if (index <= i) {
            cy.wrap(circle).find(element).should("have.css", "border-color", color_changing);
          }
        })
        cy.wait(700);
      }
      cy.get(circle).each((circle, index, collect) => {
        if (index < indexForDelete) {
          cy.wrap(circle).find(element).should("have.css", "border-color", color_changing);
        } else if (index === indexForDelete) {
          cy.wrap(circle).find(element).should("have.css", "border-color", color_default);
          cy.wrap(circle).find(letter).should("be.empty");
          cy.wrap(circle).find(tail).find(element).should("have.css", "border-color", color_changing);
        }
      })
      cy.wait(700);
      cy.get("body").then($body => {
        if ($body.find(circle).length > 0) {
          cy.get(circle).should("have.length", lengthStart - 1);
          cy.get(element).should("have.css", "border-color", color_default);
          cy.get(circle).first().get(head).should("have.text", "head");
          cy.get(circle).last().get(tail).should("have.text", "tail");
        }
      })
      cy.get("@button_delete_index").get(loader).should("not.exist");
    })
  })
})