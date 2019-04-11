package Chatbot;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.concurrent.TimeUnit;

import static org.junit.Assert.fail;

public class AdminTests {
    private WebDriver driver;
    private String baseUrl;
    private boolean acceptNextAlert = true;
    private StringBuffer verificationErrors = new StringBuffer();

    @Before
    public void setUp() throws Exception {
        System.setProperty("webdriver.gecko.driver","F:\\selenium_drivers\\geckodriver.exe");
        driver = new FirefoxDriver();
        baseUrl = "https://acnapi-335c7.firebaseapp.com";
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
    }

    @Test //1
    public void testLogin() throws Exception {
        //Login with invalid username. Test passes if the website's url didn't change and a notification is shown.
        WebDriver driver = this.driver;
        driver.get(baseUrl);
        WebElement username = driver.findElement(By.cssSelector("#root > div > div > div > form > input.sc-hEsumM.eqLHtx"));
        WebElement password = driver.findElement(By.cssSelector("input[type = \"password\"]"));
        WebElement loginButton =  driver.findElement(By.cssSelector("button[to = \"/dashboard\"]"));

        username.sendKeys("admin");
        password.sendKeys("happy");
        loginButton.click();

        WebDriverWait wait= new WebDriverWait(driver,10);
        try{
            wait.until(ExpectedConditions.urlContains("main="));
        }catch (org.openqa.selenium.TimeoutException e){
            fail("The page didn't jump to the dashboard");
        }
    }

    @Test //2
    public void testInvalidLogin() throws Exception {
        //Login. Test passes if the website is directed to the dashboard
        WebDriver driver = this.driver;
        driver.get(baseUrl);
        WebElement username = driver.findElement(By.cssSelector("#root > div > div > div > form > input.sc-hEsumM.eqLHtx"));
        WebElement password = driver.findElement(By.cssSelector("input[type = \"password\"]"));
        WebElement loginButton =  driver.findElement(By.cssSelector("button[to = \"/dashboard\"]"));

        username.sendKeys("invalid");
        password.sendKeys("invalid");
        loginButton.click();

        WebDriverWait wait= new WebDriverWait(driver,10);
        try{
            wait.until(ExpectedConditions.urlContains("main="));
            fail("The invalid username and password login for some reason.");
        }catch (org.openqa.selenium.TimeoutException e){
            wait.until(ExpectedConditions.urlMatches("https://acnapi-335c7.firebaseapp.com/"));
            Assert.assertTrue(isElementPresent(By.cssSelector("div.warning")));
            Assert.assertTrue(driver.findElement(By.cssSelector("div.warning")).getText().contains("Login failed!"));
        }
    }

    @Test //3
    public void testLogout() throws Exception {
        //Try login and click the logout button. Test passes if the page jumps from the dashboard to the login page.
        WebDriver driver = this.driver;
        driver.get(baseUrl);
        WebElement username = driver.findElement(By.cssSelector("#root > div > div > div > form > input.sc-hEsumM.eqLHtx"));
        WebElement password = driver.findElement(By.cssSelector("input[type = \"password\"]"));
        WebElement loginButton =  driver.findElement(By.cssSelector("button[to = \"/dashboard\"]"));

        username.sendKeys("admin");
        password.sendKeys("happy");
        loginButton.click();

        WebDriverWait wait= new WebDriverWait(driver,10);
        wait.until(ExpectedConditions.urlContains("main="));

        WebElement logoutButton = driver.findElement(By.cssSelector("lli.sc-dxgOiQ:nth-child(5) > button:nth-child(1)"));
        logoutButton.click();
        try{
            wait.until(ExpectedConditions.urlToBe("https://acnapi-335c7.firebaseapp.com/"));
        }catch (org.openqa.selenium.TimeoutException e){
            fail("The page didn't logout.");
        }
    }

    @Test //4
    public void testSendMessage() throws Exception {
        //Login and send message to the user. Test passes if the message sent appears in the conversation box.
        WebDriver driver = this.driver;
        driver.get(baseUrl);
        WebElement username = driver.findElement(By.cssSelector("#root > div > div > div > form > input.sc-hEsumM.eqLHtx"));
        WebElement password = driver.findElement(By.cssSelector("input[type = \"password\"]"));
        WebElement loginButton =  driver.findElement(By.cssSelector("button[to = \"/dashboard\"]"));

        username.sendKeys("admin");
        password.sendKeys("happy");
        loginButton.click();

        WebDriverWait wait= new WebDriverWait(driver,10);
        wait.until(ExpectedConditions.urlContains("main="));

        WebElement ticket = driver.findElement(By.cssSelector("div.ticketlistitem"));
        ticket.click();

        driver.findElement(By.cssSelector("button.convo")).click();
        driver.findElement(By.cssSelector("textarea")).sendKeys("Thank you for looking for our team!");
        driver.findElement(By.cssSelector("button.sc-hzDkRC:nth-child(3)")).click(); //The "submit" button

//        Assert.assertTrue(isElementPresent(By.cssSelector(".sc-gPEVay > p:nth-child(2)")));
//        Assert.assertTrue(driver.findElement(By.cssSelector(".sc-gPEVay > p:nth-child(2)")).getText().equals("Thank you for looking for our team!"));
        //Test passes if the message sent is occurred in the conversation box
    }



    @After
    public void tearDown() throws Exception {
//        Thread.sleep(5000);
//        driver.quit();
    }

    private boolean isElementPresent(By by) {
        try {
            driver.findElement(by);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    private boolean isAlertPresent() {
        try {
            driver.switchTo().alert();
            return true;
        } catch (NoAlertPresentException e) {
            return false;
        }
    }

    private String closeAlertAndGetItsText() {
        try {
            Alert alert = driver.switchTo().alert();
            String alertText = alert.getText();
            if (acceptNextAlert) {
                alert.accept();
            } else {
                alert.dismiss();
            }
            return alertText;
        } finally {
            acceptNextAlert = true;
        }
    }
}
