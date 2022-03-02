import * as ticketListPo from "../support/ticket-list.po";

describe("nrwl ticket managing app", () => {
  beforeEach(() => {
    cy.visit("/");
    ticketListPo.assertPageHasLoaded();
  });

  it("displays the list of tickets", () => {
    ticketListPo.queryCard(0).should("contain", "Install a monitor arm");
  });

  it("sets a ticket to done", () => {
    ticketListPo
      .queryCard(0)
      .findByTestId("complete-button")
      .should("contain", "Todo")
      .click();

    ticketListPo
      .queryCard(0)
      .findByTestId("complete-button")
      .should("contain", "Done");
  });

  it("creates a new ticket", () => {
    ticketListPo.createTicket("New ticket");
    ticketListPo.assertListSize(3);
    ticketListPo.queryCard(2).should("contain", "New ticket");
  });

  it("filters tickets by assignee", () => {
    ticketListPo.createTicket("New ticket");

    ticketListPo.assertListSize(3);
    cy.contains("More filters").click();
    cy.findByTestId("assignee-filter-list").contains("Victor").click();
    cy.contains("Exit").click();
    ticketListPo.assertListSize(2);
  });
});
