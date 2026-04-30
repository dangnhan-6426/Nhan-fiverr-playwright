import {Locator, Page} from "@playwright/test";

export class LoginPage {
    readonly page: Page;

    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginLink: Locator;

    readonly url: string = "https://demo4.cybersoft.edu.vn/login";

    constructor(page: Page){
        this.page = page
        this.emailInput = page.locator('#email')
        this.passwordInput = page.locator('#password')
        this.loginButton = page.locator('button[type="submit"]')
        this.loginLink = page.locator('xpath=//a[@href="/login" and @class="active"]')
    }

    async navigateToLoginPage(): Promise<void>{
        await this.page.goto(this.url)
    }

    async login(email: string, password: string): Promise<void>{
        await this.emailInput.fill(email,{timeout: 1000})
        await this.passwordInput.fill(password,{timeout: 1000})
        await this.loginButton.click({timeout:1000})
    }
}