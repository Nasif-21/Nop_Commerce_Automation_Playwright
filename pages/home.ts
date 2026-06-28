import { Page } from "@playwright/test";

export class HomePage
{
    constructor(private page:Page){}

    async clickRegisterLink(){
        await this.page.getByRole("link",{name:"Register"}).click();

    }

    async clickLoginLink()
    {
        await this.page.getByRole("link",{name:"Log in"}).click()
    }

}
