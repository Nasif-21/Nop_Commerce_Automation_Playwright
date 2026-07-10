import { test, expect, Page } from '@playwright/test';
import { generateRandomNumber,saveJsonData,readJsonData} from '../utils/utils';
import { HomePage } from '../pages/home';
import { RegisterPage } from '../pages/register';

import { UserModel } from '../model/usermodel';
import { faker } from '@faker-js/faker';
import { LoginPage } from '../pages/login';

//let page:Page;

test.describe.serial("User registration flow",()=>
{
    let page:Page;
    
    test.beforeAll(async({browser})=>{
        page=await browser.newPage();
    });
    test.afterAll(async()=>{
        await page.close();
    });

   
  test('Step 01: Go to Home page', async ({}) => {
    test.info().annotations.push({
    type: 'note',
    description: 'Go to Home Page',
  });
  await page.goto('https://test470.nop-station.com/');
  await page.waitForTimeout(2000);
  const homePage=new HomePage(page)
  await homePage.clickRegisterLink();
  await page.pause()
  
});

test('Step 02: Go to register page', async ({ }) => {
   test.info().annotations.push({
    type: 'note',
    description: 'Go to Register Page',
  });
  await page.goto('https://test470.nop-station.com/register');
  await page.waitForTimeout(2000);
  await page.pause()
    
});
test('Step 03: No invalid registration without accepting privacy policy', async ({ }) => {
   test.info().annotations.push({
    type: 'Assertion',
    description: 'Check the Register button without accepting terms and conditions checkbox',
  });
  const register=new RegisterPage(page);
  await register.withoutAcceptingPrivacyPolicy()
  await page.pause()

});

test('Step 04: No invalid registration with missing mandatory fields', async ({ }) => {
    test.info().annotations.push({
    type: 'Assertion',
    description: 'Check the Register button by keeping empty all mandatory fields',
  });
  const register=new RegisterPage(page);  
    await register.missingMandatoryField();
    await page.waitForTimeout(2000);
  
    const FirstNameErrortxt=page.getByText("First name is required.")
    const LastNameErrortxt=  page.getByText("Last name is required.")
    const EmailErrortxt=  page.getByText("Email is required.")
    const PasswordMissing=page.getByText("Password is required.") //.nth(1)

    await page.waitForTimeout(3000)
  
    await expect(FirstNameErrortxt).toContainText("First name is required.")
    await expect(LastNameErrortxt).toContainText("Last name is required.")
    await expect(EmailErrortxt).toContainText("Email is required.")
    await expect(PasswordMissing).toContainText("Password is required.")
    await page.pause()
  
});

test('Step 05: Valid registration with all mandatory fields', async ({ }) => {
   test.info().annotations.push({
    type: 'Assertion',
    description: 'Check the Register button with all satisfing condition',
  });
    const register=new RegisterPage(page);

  const userModel:UserModel={
    firstName:faker.person.firstName(),
    lastName:faker.person.lastName(),
    email:`skfamiy0304+playWright+${generateRandomNumber(1000,9999)}@gmail.com`,
    password:"123456"
    
  }
  await register.validuserRegister(userModel);
  await page.waitForTimeout(2000);
  saveJsonData(userModel,'resources/userList.json');
  await page.pause()
});


//Part of Login starts here, if you want to stop test, add test.fixme

test('Step 06:Go to log in page', async ({ }) => {
  test.info().annotations.push({
    type: 'note',
    description: 'Going to login page after doing registration',
  });

  await page.goto("https://test470.nop-station.com")
  const homePage=new HomePage(page);
  await homePage.clickLoginLink();
  await page.waitForLoadState();

});

test('Step:07:Doing login with invalid credencials',async({})=>{
  test.info().annotations.push({
    type: 'Assertion',
    description: 'Invalid login attempt using unregister email and password',
  });
  
const loginPage=new LoginPage(page);
  const invalidMail=faker.internet.email();
  const invalidPassword=generateRandomNumber(10000,99999).toString();

  await loginPage.doAllInvalidLogin(invalidMail,invalidPassword)

  
  const errorMessage= page.locator(".validation-summary-errors")

  await expect(errorMessage).toBeVisible();

  await expect(errorMessage).toContainText('Login was unsuccessful. Please correct the errors and try again');
  await expect(errorMessage).toContainText("No customer account found");

});


test('Step:08:Doing login with one empty field',async({})=>{
    test.info().annotations.push({
    type: 'Assertion',
    description: 'Login attempt by keeping password field empty',
  });
  const loginPage=new LoginPage(page);
  const userEmail=readJsonData('resources/userList.json');
  await loginPage.doOneFieldvalidLogin(userEmail.email);

  await page.waitForLoadState();

  
  const errorMessage= page.locator(".validation-summary-errors")

  await expect(errorMessage).toBeVisible();

  await expect(errorMessage).toContainText('Login was unsuccessful. Please correct the errors and try again');
  await expect(errorMessage).toContainText("The credentials provided are incorrect");

});


test('Step:09:Doing login using empty field',async({})=>{
  test.info().annotations.push({
    type: 'Assertion',
    description: 'Login attempt by keeping all field empty',
  });
  const loginPage=new LoginPage(page);
  loginPage.doEmptyLogin();
  await page.waitForLoadState();

});


test('Step:10:Doing login using valid credencials',async({})=>{
  test.info().annotations.push({
    type: 'Assertion',
    description: 'Doing login using valid credencials in required field',
  });
    const filePath='resources/userList.json';
    const loginPage=new LoginPage(page);
  
    
    const userData=readJsonData(filePath);
    await loginPage.doValidLogin(userData.email, userData.password)
    await page.pause();
  
});
  
});


    
//});


// test('Go to register page', async ({ page }) => {
//   await page.goto('https://test470.nop-station.com/');
//   await page.pause();
//   await page.waitForTimeout(2000);
//   //await expect(page).toHaveTitle("test470.nop-station.com/");


//   // Expect a title "to contain" a substring.
  
// });
