package com.researchproject.mentalhealthappbackend.controller;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

public class BaseTest {

    protected WebDriver driver;

    @BeforeMethod
    public void setUp() {
        // 设置 ChromeDriver 路径
        System.setProperty("webdriver.chrome.driver", "/Users/yuanzhiyi/chromedriver-mac-arm64/chromedriver");

        // 创建 ChromeOptions 对象
        ChromeOptions options = new ChromeOptions();

        // 使用无头模式运行浏览器（可选），在运行自动化测试时，不显示用户界面
        options.addArguments("--headless");

        // 启动 Chrome 浏览器，使用带有选项的 ChromeDriver
        driver = new ChromeDriver(options);

        // 最大化浏览器窗口
        driver.manage().window().maximize();

        // 设置隐式等待
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

    }

    protected String loginAndGetToken() {
        driver.get("http://localhost:5173/");

        WebElement usernameField = driver.findElement(By.name("username"));
        WebElement passwordField = driver.findElement(By.name("password"));
        WebElement loginButton = driver.findElement(By.name("login"));

        usernameField.sendKeys("Yuan");
        passwordField.sendKeys("111");
        loginButton.click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        // 等待某个登录成功后的元素加载完成，这里是跳转到新的页面包含div id: heading
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("heading")));

        JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;
        return (String) jsExecutor.executeScript("return window.sessionStorage.getItem('token');");
    }

    @AfterMethod
    public void tearDown() {
        // 清理逻辑
        if (driver != null) {
            driver.quit();
        }
    }
}
