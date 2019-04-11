package Chatbot;
import java.util.regex.Pattern;
import java.util.concurrent.TimeUnit;
import org.junit.*;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

public class ChatbotTests {
    private WebDriver driver;
    private String baseUrl;
    private boolean acceptNextAlert = true;
    private StringBuffer verificationErrors = new StringBuffer();

    @Before
    public void setUp() throws Exception {
        System.setProperty("webdriver.gecko.driver","F:\\selenium_drivers\\geckodriver.exe");
        driver = new FirefoxDriver();
        baseUrl = "https://bottybyacnapi.netlify.com/";
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
    }


    @Test //1
    public void testSubmitTicket() throws Exception {
        //Submit a ticket through chatbot
        int botMessageNum = 1;

        WebDriver driver = this.driver;
        driver.get(baseUrl);
        By botReply = By.cssSelector("p.sc-jzJRlG.gpAGfg");


        WebElement userInput = driver.findElement(By.className("form-chatbox")); //locate the user input
        WebElement sendMessageButton = driver.findElement(By.cssSelector("button.sc-jKJlTe.evGbBd"));//locate the "submit" button's location
        WebDriverWait wait = new WebDriverWait(driver, 10);

        userInput.sendKeys("/ticket");
        sendMessageButton.click();
        botMessageNum += 1;

        wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(botReply,botMessageNum));
        userInput.sendKeys("test_user");
        sendMessageButton.click();
        botMessageNum += 1;

        wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(botReply,botMessageNum));
        userInput.sendKeys("random@testmail.com");
        sendMessageButton.click();
        botMessageNum += 1;

        wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(botReply,botMessageNum));
        userInput.sendKeys("API DevOps");
        sendMessageButton.click();
        botMessageNum += 1;

        wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(botReply,botMessageNum));
        userInput.sendKeys("Subject title");
        sendMessageButton.click();
        botMessageNum += 1;

        wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(botReply,botMessageNum));
        userInput.sendKeys("Ticket Description");
        sendMessageButton.click();
        botMessageNum += 1;


        wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(botReply,botMessageNum));
        userInput.sendKeys("Ticket Description");
        sendMessageButton.click();

        java.util.List<WebElement> botReplyList = driver.findElements(botReply);
        String successMessage = "have received your ticket";
        Assert.assertFalse("The ticket is not submitted successfully",
                botReplyList.get(botReplyList.size()- 1).getText().indexOf(successMessage) == -1);
    }

    @Test //2
    public void testEnquirySpecific(){
        //Enquiry about specif API. Test passes if the API's information link is returned.

        int botMessageNum = 1;//The total number of messages sent by the robot

        WebDriver driver = this.driver;
        driver.get(baseUrl);

        WebElement userInput = driver.findElement(By.className("form-chatbox")); //locate the user input
        WebElement sendMessageButton = driver.findElement(By.cssSelector("button.sc-jKJlTe.evGbBd"));//locate the "submit" button's location
        By botReply = By.cssSelector("p.sc-jzJRlG.gpAGfg");

        WebDriverWait wait = new WebDriverWait(driver, 10);

        userInput.sendKeys("I want to know more about AI Translator");
        sendMessageButton.click();
        botMessageNum += 1;

        wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(botReply,botMessageNum));

        java.util.List<WebElement> botReplyList = driver.findElements(botReply);
        String targetURL = "https://beta.acnapi.io/info/ai-translator";

        Assert.assertFalse("The API's info is not shown out.",botReplyList.get(botReplyList.size()-2).getText().indexOf(targetURL) == -1);
    }

    @Test //3
    public void testHelpSpecific(){
        //Enquiry about specif API. Test passes if the API's help link is returned.

        int botMessageNum = 1;//The total number of messages sent by the robot

        WebDriver driver = this.driver;
        driver.get(baseUrl);

        WebElement userInput = driver.findElement(By.className("form-chatbox")); //locate the user input
        WebElement sendMessageButton = driver.findElement(By.cssSelector("button.sc-jKJlTe.evGbBd"));//locate the "submit" button's location
        By botReply = By.cssSelector("p.sc-jzJRlG.gpAGfg");

        WebDriverWait wait = new WebDriverWait(driver, 10);

        userInput.sendKeys("I need help with API DevOps");
        sendMessageButton.click();
        botMessageNum += 1;

        wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(botReply,botMessageNum));

        java.util.List<WebElement> botReplyList = driver.findElements(botReply);
        String targetURL = "https://beta.acnapi.io/docs/api-devops";

        Assert.assertFalse("The API's docs  is not shown out.",botReplyList.get(botReplyList.size()-2).getText().indexOf(targetURL) == -1);
    }

    @Test //4
    public void testBotRestart() throws InterruptedException {
        //Restart the chatbot using "/restart" shortcut. test passes when the chatbot messages is cleared.

        int botMessageNum = 1;//The total number of messages sent by the robot

        WebDriver driver = this.driver;
        driver.get(baseUrl);

        WebElement userInput = driver.findElement(By.className("form-chatbox")); //locate the user input
        WebElement sendMessageButton = driver.findElement(By.cssSelector("button.sc-jKJlTe.evGbBd"));//locate the "submit" button's location
        By botReply = By.cssSelector("p.sc-jzJRlG.gpAGfg");

        WebDriverWait wait = new WebDriverWait(driver, 10);

        userInput.sendKeys("Hello!");
        sendMessageButton.click();
        botMessageNum += 1;

        wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(botReply,botMessageNum));

        userInput.sendKeys("/ticket");
        sendMessageButton.click();
        botMessageNum += 1;
        wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(botReply,botMessageNum));
        java.util.List<WebElement> botReplyList = driver.findElements(botReply);


        userInput.sendKeys("/restart");
        sendMessageButton.click();
        try{
            wait.until(ExpectedConditions.numberOfElementsToBeLessThan(botReply,botReplyList.size()));
        }catch (org.openqa.selenium.TimeoutException e){
            fail("The chatbot didn't restart in 10 s.");
        }

        botReplyList = driver.findElements(botReply);
        Assert.assertTrue("The chatbot is not restarted",botReplyList.size() == 2);
    }

    @Test //5
    public void testToMainPage(){
        //Click the company logo. Test passes if the page is directed to the main page

        WebDriver driver = this.driver;
        driver.get(baseUrl);

        WebElement companyImg = driver.findElement(By.cssSelector("img.company-logo"));
        companyImg.click();

        WebDriverWait wait = new WebDriverWait(driver,10);
        try{
            wait.until(ExpectedConditions.titleIs("ACNAPI - Catalyst Maker Studio"));
        }catch (org.openqa.selenium.TimeoutException e){
            fail("The page didn't jump to the main page");
        }
    }

    @After
    public void tearDown() throws Exception {
        Thread.sleep(2000);
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
