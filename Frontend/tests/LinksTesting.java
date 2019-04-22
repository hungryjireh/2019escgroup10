package week10;

import org.openqa.selenium.By;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

import java.util.List;

public class LinksTesting {

    public static void main(String[] args) throws Exception{
        System.setProperty("webdriver.gecko.driver","C:\\Users\\Me\\Documents\\geckodriver.exe");
        WebDriver driver = new FirefoxDriver();

        //WebDriver driver = new ChromeDriver();
        driver.get("https://bottybyacnapi.netlify.com/");

        // get all the links
        List<WebElement> links = driver.findElements(By.tagName("a"));
        System.out.println(links.size());

        // print all the links
        for (int i = 0; i < links.size(); i=i+1) {
            System.out.println(i + " " + links.get(i).getText());
            System.out.println(i + " " + links.get(i).getAttribute("href"));
        }


        // maximize the browser window
        driver.manage().window().maximize();

        // click all links in a web page
        for(int i = 0; i < links.size(); i++)
        {
            if(i==0|| i>4){
                System.out.println("*** Navigating to" + " " + links.get(i).getAttribute("href"));
                boolean staleElementLoaded = true;
                while (staleElementLoaded) {
                    try {
                        driver.navigate().to(links.get(i).getAttribute("href"));
                        Thread.sleep(1000);
                        driver.navigate().back();
                        links = driver.findElements(By.tagName("a"));
                        System.out.println("*** Navigated to" + " " + links.get(i).getAttribute("href"));
                        staleElementLoaded = false;
                    } catch (StaleElementReferenceException e) {
                        staleElementLoaded = true;
                    }
                }

            }
        }

    }
}
