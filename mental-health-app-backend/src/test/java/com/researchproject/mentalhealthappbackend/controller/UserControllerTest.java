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
import java.util.concurrent.TimeUnit;
public class UserControllerTest {
    private WebDriver driver;

    @BeforeMethod
    public void setUp() {
        // 设置 ChromeDriver 路径
        System.setProperty("webdriver.chrome.driver", "/Users/yuanzhiyi/chromedriver-mac-arm64/chromedriver");

        // 使用无头模式运行浏览器（可选）
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");

        // 启动 Chrome 浏览器
        driver = new ChromeDriver(options);
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

    }

    @AfterMethod
    public void tearDown() {
        // 关闭浏览器
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void testLogin() {
        // 模拟登录
        driver.get("http://localhost:5173/");

        // 定位用户名和密码输入框
        WebElement usernameField = driver.findElement(By.name("username"));
        WebElement passwordField = driver.findElement(By.name("password"));

        // 填入登录信息
        usernameField.sendKeys("Yuan");
        passwordField.sendKeys("111");

        // 定位并点击登录按钮
        WebElement loginButton = driver.findElement(By.name("login"));
        loginButton.click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        // 等待某个登录成功后的元素加载完成
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("heading")));

        // 从sessionStorage获取token
        JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;
        String token = (String) jsExecutor.executeScript("return window.sessionStorage.getItem('token');");
        System.out.println(token);

        Assert.assertNotNull(token, "Token should not be null after login.");
    }

    @Test
    public void testInvalidLogin() {
        // 模拟访问登录页面
        driver.get("http://localhost:5173/");

        // 定位用户名和密码输入框
        WebElement usernameField = driver.findElement(By.name("username"));
        WebElement passwordField = driver.findElement(By.name("password"));

        // 输入无效的用户名和密码
        usernameField.sendKeys("InvalidUser");
        passwordField.sendKeys("WrongPassword");

        // 定位并点击登录按钮
        WebElement loginButton = driver.findElement(By.name("login"));
        loginButton.click();

        // 等待错误消息
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        // xpath: 在xml中搜索信息
        WebElement errorMessage = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(
                "//p[contains(text(), 'Please check your name and password')]")));

        // 验证页面是否显示错误消息
        Assert.assertNotNull(errorMessage, "Error message should be displayed for invalid login.");
        Assert.assertTrue(errorMessage.getText().contains("Please check your name and password"), "Error message text should match expected.");

        // token应为null
        JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;
        String token = (String) jsExecutor.executeScript("return window.sessionStorage.getItem('token');");
        Assert.assertNull(token, "Token should be null after an invalid login attempt.");
    }

    @Test
    public void testCreateUser() {
        // 模拟登录以获取token
        //testLogin();
        //JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;

        //String token = (String) jsExecutor.executeScript("return window.sessionStorage.getItem('token');");
        //System.out.println("Token: " + token);
        //Assert.assertNotNull(token, "Token should not be null after login.");

        // 模拟创建用户
        driver.get("http://localhost:5173/create");

        // 定位输入框，填写用户信息
        WebElement nameField = driver.findElement(By.name("username"));
        WebElement passwordField = driver.findElement(By.name("password"));
        WebElement phoneField = driver.findElement(By.name("phone"));

        // 填写创建用户的信息
        nameField.sendKeys("newuser");
        passwordField.sendKeys("newpassword");
        phoneField.sendKeys("1234567890");

        // 定位并点击创建用户按钮
        WebElement createButton = driver.findElement(By.name("create"));
        createButton.click();

        // 验证用户创建是否成功
        // 可以检查当前页面的URL或者页面上是否有成功信息
        String currentUrl = driver.getCurrentUrl();
        Assert.assertTrue(currentUrl.contains("/"), "User should be redirected to login page after account creation.");

    }

}
