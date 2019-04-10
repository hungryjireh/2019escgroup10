import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

import java.util.List;

public class webapptesting {

    public static void main(String[] args) {
        System.setProperty("webdriver.gecko.driver","C:\\Users\\Me\\Documents\\geckodriver.exe");
        WebDriver driver = new FirefoxDriver();
        driver.get("https://acnapi-335c7.firebaseapp.com/");

    }
}
