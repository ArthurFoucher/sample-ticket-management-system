export const assertPageHasLoaded = () => {
  assertListSize(2, 4_000);
};

export const assertListSize = (count: number, timeout?: number) => {
  cy.findAllByTestId("card").should("have.length", count, { timeout });
};

export const queryCard = (position: number) =>
  cy.findAllByTestId("card").eq(position);

export const createTicket = (description: string) => {
  cy.findByTestId("add-card-button").click();
  cy.focused().type(description).type("{enter}");
};
