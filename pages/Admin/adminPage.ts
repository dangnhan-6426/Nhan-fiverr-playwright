import { expect, Locator } from "@playwright/test";
import { LoginPage } from "../Authentication/loginPage";

export class AdminPage extends LoginPage{
    

    getMenuTitle(menuTitle:string){
        return this.page.locator('ul.mt-3 li a',{ hasText: menuTitle})
    }

    getButtonByText(buttonText:string){
        return this.page.locator(`xpath=//button[text()="${buttonText}"]`)
    }

    getSuccessMessageToast(messageStatus: string){
        return this.page.locator('div.text-danger', { hasText: messageStatus })
    }

    getErrorMessageToast(messageStatus: string){
        return this.page.locator('div.text-danger', { hasText: messageStatus })
    }

    async addNewAdministrator(data:{
        name?: string,
        email?: string,
        password?: string,
        phone: string
    }): Promise<void>{
        await this.getButtonByText('Add New Admin').click()
        await this.page.locator('#name').fill(data.name ?? '')
        await this.page.locator('#email').fill(data.email ?? '')
        await this.page.locator('#password').fill(data.password ?? '')
        await this.page.locator('#phone').fill(data.phone ?? '')
        await this.getButtonByText('Save').click()
    }
    
    
    // Verify url have contain /AdminPage
    async isLoginSuccess():Promise<boolean>{
        await this.page.waitForURL('**/admin')
        return this.page.url().includes('/admin')
    }



}