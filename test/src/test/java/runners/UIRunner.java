package runners;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
        plugin = {
                "pretty",
                "html:target/cucumber-report/cucumber.html",
                "json:target/json-reports/cucumber.json",
                "junit:target/xml-report/cucumber.xml",
                "rerun:target/failedRerun.txt"

        },

        features = "src/test/resources/uiFeatures",
        glue = "ui/stepdefinitions",
        tags = "@ui",
        monochrome=true,
        dryRun = false
)
public class UIRunner {


}
