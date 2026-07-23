import { test, expect, Page } from '@playwright/test';
import { RegisterPage } from '../pages/register';
import { HomePage } from '../pages/home';
import { UserModel } from '../model/usermodel';
import { faker } from '@faker-js/faker';
import { generateRandomNumber, readJsonData, saveJsonData,setAuth,getAuth } from '../utils/utils';
import { LoginPage } from '../pages/login';
import { log } from 'node:console';
import { CellPhone } from '../pages/cellPhone';

let page: Page;
 test.beforeAll(async({browser})=>{
        page=await browser.newPage();
        await setAuth(page)
    });

    test('Go to add some product',async({})=>
    {

     await page.goto('https://test470.nop-station.com/');
     const homePage=new HomePage(page)
     const cellPhone=new CellPhone(page)
     await homePage.clickElectronics();
     await page.waitForLoadState();
     await cellPhone.clickProduct();
     await page.pause()


    });

//Need to test this part

/*

test("Doing login using invalid user and password",async({page})=>{
  await page.goto('https://test470.nop-station.com');
  const homePage=new HomePage(page);
  await homePage.clickLoginLink();


  const loginPage=new LoginPage(page);
  const invalidMail=faker.internet.email();
  const invalidPassword=generateRandomNumber(10000,99999).toString();

  await loginPage.doAllInvalidLogin(invalidMail,invalidPassword)

  
  const errorMessage= page.locator(".validation-summary-errors")

  await expect(errorMessage).toBeVisible();

  await expect(errorMessage).toContainText('Login was unsuccessful. Please correct the errors and try again');
  await expect(errorMessage).toContainText("No customer account found");




});

*/

/*test("Doing login using invalid user",async({page})=>{
  await page.goto('https://test470.nop-station.com');
  const homePage=new HomePage(page);
  await homePage.clickLoginLink();


  const loginPage=new LoginPage(page);
  const userEmail=readJsonData('resources/userList.json');
  await loginPage.doOneFieldvalidLogin(userEmail.email);

  await page.waitForTimeout(3000);

  
  const errorMessage= page.locator(".validation-summary-errors")

  await expect(errorMessage).toBeVisible();

  await expect(errorMessage).toContainText('Login was unsuccessful. Please correct the errors and try again');
  await expect(errorMessage).toContainText("The credentials provided are incorrect");




});
*/
// Task: Add a localstorage to save token data ,check github and google

/* test("Do login using valid user",async({page})=>
{
  await page.goto('https://test470.nop-station.com');
  const filePath='resources/userList.json';

  const homePage=new HomePage(page);
  const loginPage=new LoginPage(page);

  await homePage.clickLoginLink();
  await page.waitForTimeout(2000);
  
  const userData=readJsonData(filePath);
  await loginPage.doValidLogin(userData.email, userData.password)
  await page.waitForURL("https://test470.nop-station.com")
  await getAuth(page,".Nop.Authentication")
  await page.pause();




});
*/


/*
test("Do valid registration ",async({page})=>
{
  await page.goto('https://test470.nop-station.com/register');
  await page.waitForTimeout(2000);
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
*/



/*

*/


/*
test("Click alert ",async({page})=>
{
  await page.goto('https://test470.nop-station.com/register');
  await page.waitForTimeout(2000);
  const register=new RegisterPage(page);
  await register.withoutAcceptingPrivacyPolicy()


});
*/

/* test.fixme('Missing mandatory fields', async ({page}) => {
  await page.goto('https://test470.nop-station.com/register');
  
  await page.waitForTimeout(2000);

  const register=new RegisterPage(page);  //Class Declare
  //await register.vaiduserRegister();
  
  await register.missingMandatoryField();
  await page.waitForTimeout(2000);

  const FirstNameErrortxt=page.getByText("First name is required.")
  const LastNameErrortxt=  page.getByText("Last name is required.")
  const EmailErrortxt= page.getByText("Email is required.")
  const PasswordMissing=page.getByText("Password is required.").nth(1)

  expect(FirstNameErrortxt).toContainText("First name is required.")
  expect(LastNameErrortxt).toContainText("Last name is required.")
  expect(EmailErrortxt).toContainText("Email is required.")
  expect(PasswordMissing).toContainText("Password is required.")


  await page.pause();


  
});
*/
