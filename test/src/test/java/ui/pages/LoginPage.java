package ui.pages;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import utilities.ConfigReader;
import utilities.Driver;
import utilities.ReusableMethods;

public class LoginPage {

    private final WebDriver driver = Driver.getDriver();

    //=========LOGIN LOCATERS============//

    By loginButton = By.linkText("Login");
    By emailInput = By.id("formBasicEmail");
    By passwordInput = By.id("formBasicPassword");
    By submitButton = By.xpath("//*[@class=' mb-5 mt-3 btn btn-success']");

    public void clickLoginButton() {
        ReusableMethods.wait(1);
        driver.findElement(loginButton).click();

    }

    public void enterEmail(String email) {
        ReusableMethods.wait(1);
        driver.findElement(emailInput).sendKeys(email);

    }

    public void enterPassword(String email) {
        ReusableMethods.wait(1);
        driver.findElement(passwordInput).sendKeys(email);

    }

    public void clickSubmitButton() {
        ReusableMethods.wait(1);
        driver.findElement(submitButton).click();

    }

    public void verifyIfLoginURL() {
        String expectedURL = ConfigReader.getProperty("url") + "main";
        String actualURL = driver.getCurrentUrl();
        ReusableMethods.wait(1);
        Assert.assertEquals(expectedURL,actualURL);

    }


}
