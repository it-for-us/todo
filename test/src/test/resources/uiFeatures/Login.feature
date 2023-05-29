@ui
Feature: Dart Login

  Background: User open dart webpage
    Given User goes to dart home page

  Scenario: TC1 Login with invalid mail address
    And User clicks login button
    Given User enters an invalid email "fdsa@gmail.com"
    And User enters an invalid password "Asddd123.."
    Then User clicks submit button

  Scenario: TC2 Login with valid mail address
    And User clicks login button
    Given User enters a valid email "asdffdsa@gmail.com"
    And User enters a valid password "Asd123.."
    Then User clicks submit button
    Then Verify if login





