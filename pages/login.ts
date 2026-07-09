import { Page } from "@playwright/test";

export class LoginPage
{
    constructor(private page:Page){}


    async doValidLogin(email:string, password:string)
    {
        await this.page.getByLabel("Email").fill(email);
        await this.page.getByLabel("Password").fill(password);
        await this.page.getByRole("button",{name:"LOG IN"}).click();
    }

    async doEmptyLogin()
    {
     await this.page.getByRole("button",{name:"LOG IN"}).click();
    }

    async doOneFieldInvalidLogin(email:string)
    {
        await this.page.getByLabel("Email").fill(email);
        await this.page.getByRole("button",{name:"LOG IN"}).click();

    }

    async doAllInvalidLogin(email:string,password:string)
    {
        await this.page.getByLabel("Email").fill(email);
        await this.page.getByLabel("Password").fill(password);
        await this.page.getByRole("button",{name:"LOG IN"}).click();

    }

}
