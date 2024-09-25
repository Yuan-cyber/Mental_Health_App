package com.researchproject.mentalhealthappbackend.controller;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.concurrent.TimeUnit;

// test class之间默认是相互独立的，运行时会创建各自独立的测试环境，彼此之间的数据、浏览器 session 或变量无法直接共享
// 虽然React前端代码中已经有了存储和获取 token 的逻辑，但每次测试运行时，浏览器环境都是全新的
// 在基类中创建登录逻辑产生token,这里继承使用
public class MoodPackControllerTest extends BaseTest{

    //会继承基类的beforemethod
    @BeforeMethod
    public void setUp() {
        super.setUp();
        String token = loginAndGetToken();
        System.out.println("Token: " + token);

        /* 这里不需要Inject注入 a token into sessionStorage for request usage
        // 前端逻辑中已经处理
        JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;
        jsExecutor.executeScript("window.sessionStorage.setItem('token', '" + token + "');");

        // Wait for a short time to ensure token is injected
        // 等待注入生效
        try {
            Thread.sleep(1000);  // 也可以使用更好的方式替代sleep，例如使用等待条件
        } catch (InterruptedException e) {
            e.printStackTrace();
        }*/
    }

    @Test
    public void testMoodPacksByTag() throws InterruptedException {
        // 不需要Navigate to the home page，前端逻辑中已经处理
        //driver.get("http://localhost:5173/home");

        // 模拟用户click the "Happiness" tag
        WebElement happinessTag = driver.findElement(By.xpath("//div[text()='Happiness']"));
        happinessTag.click();

        // Wait for the mood packs to load
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.tagName("table")));

        // Verify that the mood packs are loaded and displayed
        List<WebElement> rows = driver.findElements(By.xpath("//table/tbody/tr"));
        Assert.assertTrue(rows.size() > 0, "Mood packs should be displayed");

     }

}
