import { test, expect, Page } from '@playwright/test';
import { RegisterPage } from '../pages/register';
import { HomePage } from '../pages/home';
import { UserModel } from '../model/usermodel';
import { faker } from '@faker-js/faker';
import { generateRandomNumber, readJsonData, saveJsonData } from '../utils/utils';
import { LoginPage } from '../pages/login';

let page: Page;

test("Do login using valid user",async({page})=>
{
  await page.goto('https://test470.nop-station.com');
  const filePath='resources/userList.json';

  const homePage=new HomePage(page);
  const loginPage=new LoginPage(page);

  await homePage.clickLoginLink();
  await page.waitForTimeout(2000);
  
  const userData=readJsonData(filePath);
  await loginPage.doValidLogin(userData.email, userData.password)


});



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
