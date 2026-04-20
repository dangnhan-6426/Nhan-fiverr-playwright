import { Locator, Page } from '@playwright/test'

export class RegisterPage {
    readonly page: Page

    readonly nameInput: Locator
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly confirmPasswordInput: Locator
    readonly phoneInput: Locator
    readonly birthdayInput: Locator
    readonly maleRadio: Locator
    readonly femaleRadio: Locator
    readonly agreeCheckbox: Locator
    readonly registerButton: Locator

    readonly url: string = 'https://demo4.cybersoft.edu.vn/register'

    constructor(page: Page) {
        this.page = page
        //getByRole, getByLabel, getByPlaceholder, getByText, getByTitle, getByAltText, getByTestId
        this.emailInput = page.locator('#email')
        this.nameInput = page.locator('#name')
        this.passwordInput = page.locator('#password') 
        this.confirmPasswordInput = page.locator('#passwordConfirm')
        this.phoneInput = page.locator('#phone')
        this.birthdayInput = page.locator('#birthday')
        this.maleRadio = page.locator('#male')
        this.femaleRadio = page.locator('#female')
        this.agreeCheckbox = page.locator('#agree-term')
        this.registerButton = page.locator('button[type="submit"]')
    }

    
    async register(data: { 
        name: string,
        email: string,
        password: string,
        confirmpassword: string,
        phone: string,
        birthday: string,
        gender: 'male'|'female',
    }): Promise<void>{
        await this.nameInput.fill(data.name, {timeout:1000})
        await this.emailInput.fill(data.email, {timeout:1000})
        await this.passwordInput.fill(data.password, {timeout:1000})
        await this.confirmPasswordInput.fill(data.confirmpassword, {timeout:1000})
        await this.phoneInput.fill(data.phone, {timeout:1000})
        await this.birthdayInput.fill(data.birthday, {timeout:1000})
        if(data.gender === 'male'){
            await this.maleRadio.check({timeout:1000})
        }else{
            await this.femaleRadio.check({timeout:1000})
        }
        await this.agreeCheckbox.check({timeout:1000})
        await this.registerButton.click({timeout:1000})
    }

    //Function check result register account success

    async isRegisterSuccess(): Promise<boolean>{
        return this.page.url() !== this.url
    }

}