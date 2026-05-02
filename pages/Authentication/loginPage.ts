import {Locator, Page} from "@playwright/test";
import { expect } from "@playwright/test";
export class LoginPage {
    readonly page: Page;

    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginLink: Locator;

    //URL
    readonly url: string = "https://demo4.cybersoft.edu.vn/login";
    readonly profileUrl: string = "https://demo4.cybersoft.edu.vn/profile";
    readonly adminUrl: string = "https://demo4.cybersoft.edu.vn/admin";

    constructor(page: Page){
        this.page = page
        this.emailInput = page.locator('#email')
        this.passwordInput = page.locator('#password')
        this.loginButton = page.locator('button[type="submit"]')
        this.loginLink = page.locator('xpath=//a[@href="/login" and @class="active"]')
    }
    //Create method for warning status register
    getStatusPage(messageStatus:string){
        return this.page.getByRole('alert').filter({ hasText: messageStatus})
    }

    //Function verify access url login
    async navigateToLoginPage(): Promise<void>{
        await this.page.goto(this.url)
    }

    async login(data:{
        email: string, 
        password: string
    }): Promise<void>{
        await this.emailInput.fill(data.email)
        await this.passwordInput.fill(data.password)
        await this.loginButton.click()
    }

    //Function verify result login success
    async isLoginSuccess(role: 'user' | 'admin' = 'user'){
        const path = role === 'admin' ? 'admin' : 'profile'
        await expect(this.page).toHaveURL(new RegExp(`${path}`))
    }

    
}