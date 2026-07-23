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
    
    async clickElectronics()
    {
        await this.page.getByRole("link",{name:"Electronics"}).first().hover()
        await this.page.waitForLoadState()
        await this.page.getByRole("link",{name:"Cell phones"}).click()


    }


}
