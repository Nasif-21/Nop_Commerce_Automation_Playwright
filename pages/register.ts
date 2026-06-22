import { expect, Locator, Page } from "@playwright/test";
import { UserModel } from "../model/usermodel.ts";


export class RegisterPage
{
    constructor(private page:Page){}

    async validuserRegister(userMode:UserModel)
    {
        //Locators
        const indexRadio=Math.floor(Math.random()*2);
        const randomDay=Math.floor(Math.random()*31)+1;
        const randomMonth=Math.floor(Math.random()*12)+1;
        const randomYear=Math.floor(Math.random()*112)+1;
        

        await this.page.getByRole("radio").nth(indexRadio).click();
        await this.page.getByLabel("First name").fill(userMode.firstName)
        await this.page.pause()
        await this.page.getByLabel("Last name").fill(userMode.lastName)
        await this.page.pause()
        await this.page.getByRole("combobox").nth(3).selectOption({index: randomDay});
        await this.page.getByRole("combobox").nth(4).selectOption({index:randomMonth});
        await this.page.getByRole("combobox").nth(5).selectOption({index:randomYear});
        await this.page.getByLabel("Email:").fill(userMode.email)
        await this.page.getByRole("textbox", { name: "Password:", exact: true }).fill(userMode.password);
        await this.page.getByRole("textbox", { name: "Confirm password:", exact: true }).fill(userMode.password);
        await this.page.getByRole('checkbox', { name: 'I accept privacy policy' }).click();
        //await this.page.getByRole('button', {name: "REGISTER"}).click();
       

    }
    async withoutAcceptingPrivacyPolicy()
    {
        //Scroll to the button
        //Click it
        await this.page.locator('[id=register-button]').scrollIntoViewIfNeeded();
        await this.page.getByRole('button', {name: "REGISTER"}).click();
        await this.page.pause();
       
    }

    async missingMandatoryField()
    {

        await this.page.getByRole('checkbox', { name: 'I accept privacy policy' }).click();
        await this.page.getByRole('button', {name: "REGISTER"}).click();
        
    }


    

}