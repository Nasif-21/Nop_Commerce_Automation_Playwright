import { expect, Page } from "@playwright/test";

export class CellPhone
{
    constructor(private page:Page){}

    //Cell phone locator and add to cart part

    async clickProduct()
    {
        await this.page.getByRole("button",{name:"ADD TO CART"}).nth(0).dblclick({delay:2000})
    }

    



}
