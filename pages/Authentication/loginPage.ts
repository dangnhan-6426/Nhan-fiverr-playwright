import {Locator, Page} from "@playwright/test";
import { expect } from "@playwright/test";
import { URLS } from "../../constants/url";
export class LoginPage {
    readonly page: Page;

    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginLink: Locator;

    //URL
    readonly loginUrl: string = URLS.login;
    readonly profileUrl: string = URLS.profile;

    constructor(page: Page){
        this.page = page
        this.emailInput = page.locator('#email')
        this.passwordInput = page.locator('#password')
        this.loginButton = page.locator('button[type="submit"]')
        this.loginLink = page.locator('xpath=//a[@href="/login" and @class="active"]')
    }
    //Create method for warning status login
    getSuccessMessageToast(message:string){
        return this.page.getByRole('alert').filter({ hasText: message})
    }

    getErrorMessageToast(message:string){
        return this.page.getByRole('alert').filter({ hasText: message})
    }

    //Create method for warning input message login
    getErrorMessage(messageStatus:string){
        return this.page.locator('span.text-danger',{ hasText: messageStatus})
    }
    //Function verify access url login
    async accessToLoginPage(): Promise<void>{
        await this.page.goto(this.loginUrl)
    }

    async login(data:{
        email?: string, 
        password?: string
    }): Promise<void>{
        await this.emailInput.clear()
        await this.passwordInput.clear()
        await this.emailInput.fill(data.email ?? '')
        await this.passwordInput.fill(data.password ?? '')
        await this.loginButton.click()
    }

    // Verify url have contain /profile
    async isLoginSuccess():Promise<boolean>{
        await this.page.waitForURL('**/profile')
        return this.page.url().includes('/profile')
    }

    //Function verify result login success
    // async isLoginSuccess(role: 'user' | 'admin' = 'user'){
    //     const path = role === 'admin' ? 'admin' : 'profile'
    //     await expect(this.page).toHaveURL(new RegExp(`${path}`))
    // }

    
}