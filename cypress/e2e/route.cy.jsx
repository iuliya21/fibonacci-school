describe("Корректный роутинг на страницы алгоритмов", () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it("Открывается главная страница", () => {
    cy.contains('МБОУ АЛГОСОШ');
  });
  it("Открывается страница с компонентом StringComponent", () => {
    cy.get('[data-cy="string"]').click();
    cy.contains("Строка");
  });
  it("Открывается страница с компонентом FibonacciPage", () => {
    cy.get('[data-cy="fibonacci"]').click();
    cy.contains("Последовательность Фибоначчи");
  });
  it("Открывается страница с компонентом SortingPage", () => {
    cy.get('[data-cy="sorting"]').click();
    cy.contains("Сортировка массива");
  });
  it("Открывается страница с компонентом StackPage", () => {
    cy.get('[data-cy="stack"]').click();
    cy.contains("Стек");
  });
  it("Открывается страница с компонентом QueuePage", () => {
    cy.get('[data-cy="queue"]').click();
    cy.contains("Очередь");
  });
  it("Открывается страница с компонентом ListPage", () => {
    cy.get('[data-cy="list"]').click();
    cy.contains("Связный список");
  });
})