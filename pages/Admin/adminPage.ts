import { expect } from "@playwright/test";
import { LoginPage } from "../Authentication/loginPage";




export class AdminPage extends LoginPage{
    // Verify url have contain /AdminPage
    async isLoginSuccess():Promise<boolean>{
        await this.page.waitForURL('**/admin')
        return this.page.url().includes('/admin')
    }

}