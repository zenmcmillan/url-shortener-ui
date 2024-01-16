describe('URL Shortener', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
      statusCode: 200,
      fixture: "testData.json",
    });
    cy.visit("http://localhost:3000/");
  })
  it("should have a form with 2 inputs a button and title above, and it should fill out form", () => {
    cy.get("h1").contains("URL Shortener")

    cy.get("form")
    .get('input[name="title"]')
    .type("Hey").should("have.value", "Hey")

    cy.get("form")
      .get('input[name="url"]')
      .type(
        "https://github.com/zenmcmillan/url-shortener-ui?tab=readme-ov-fileFDASgzdvxbc"
      )
      .should(
        "have.value",
        "https://github.com/zenmcmillan/url-shortener-ui?tab=readme-ov-fileFDASgzdvxbc"
      );

    cy.get("form").contains("button", "Shorten Please")
  })

  it("should have one url card with the title, original url and shortened url", () => {
    cy.get("h3").contains("Awesome photo");
    cy.get("a").contains("http://localhost:3001/useshorturl/1");
    cy.get("p").contains(
      "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
    );
  })
  it("should post form input data and show it in the UI", () => {
    cy.intercept("POST", "http://localhost:3001/api/v1/urls", {
      statusCode: 201,
      fixture: "postData.json"
    });
    
    cy.get("form")
      .get('input[name="title"]')
      .type("Hey")
      .should("have.value", "Hey");

    cy.get("form")
      .get('input[name="url"]')
      .type(
        "https://github.com/zenmcmillan/url-shortener-ui?tab=readme-ov-fileFDASgzdvxbc"
      )
      .should(
        "have.value",
        "https://github.com/zenmcmillan/url-shortener-ui?tab=readme-ov-fileFDASgzdvxbc"
      );

      cy.get("button").click()

      cy.get('.url').first().contains("Awesome photo");
      cy.get(".url").first().contains("http://localhost:3001/useshorturl/1");
      cy.get('.url').first().contains("https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80")

      cy.get('.url').last().contains("Hey")
      cy.get(".url").last().contains("http://localhost:3001/useshorturl/2");
      cy.get(".url")
        .last()
        .contains(
          "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80adfsadsf"
        );
  })
})