package ui.stepdefinitions;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import ui.pages.LoginPage;
import utilities.ConfigReader;
import utilities.Driver;

public class LoginStepDef extends LoginPage {

    @Given("User goes to dart home page")
    public void user_goes_to_dart_home_page() {

        Driver.getDriver().get(ConfigReader.getProperty("url"));

    }

    @And("User clicks login button")
    public void userClicksLoginButton() {
        clickLoginButton();

    }

    @Given("User enters a valid email {string}")
    public void user_enters_valid_email(String email) {
       enterEmail(email);

    }

    @Given("User enters a valid password {string}")
    public void user_enters_valid_password(String password) {
        enterPassword(password);

    }

    @Given("User enters an invalid email {string}")
    public void user_enters_an_invalid_email(String email) {
        enterEmail(email);

    }

    @Given("User enters an invalid password {string}")
    public void user_enters_an_invalid_password(String password) {
        enterPassword(password);

    }

    @Given("User clicks submit button")
    public void user_login_with() {
        clickSubmitButton();

    }

    @Then("Verify if login")
    public void verifyIfLogin() {
        verifyIfLoginURL();

    }
}

