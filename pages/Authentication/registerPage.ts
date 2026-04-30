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
    
    //Locator status message
    readonly successToast: Locator
    readonly nameError: Locator

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
        this.successToast = page.locator('div[role="alert"]').filter({hasText:'Đăng kí tài khoản thành công !'})
        this.nameError = page.locator('span.text-danger').filter({ hasText:'Name không được bỏ trống'})
    }

    //From submit
    async register(data: { 
        name?: string,
        email?: string,
        password?: string,
        confirmpassword?: string,
        phone?: string,
        birthday?: string,
        gender?: 'male'|'female',
    }): Promise<void>{
        await this.nameInput.waitFor({ state: 'visible' })
        await this.nameInput.fill(data.name ?? '')
        await this.emailInput.fill(data.email ?? '')
        await this.passwordInput.fill(data.password ?? '')
        await this.confirmPasswordInput.fill(data.confirmpassword ?? '')
        await this.phoneInput.fill(data.phone ?? '')
        await this.birthdayInput.fill(data.birthday ?? '')
        if(data.gender === 'male'){
            await this.maleRadio.check()
        }else if(data.gender === 'female'){
            await this.femaleRadio.check()
        }
        await this.agreeCheckbox.check({ force: true })
        await this.registerButton.click({ force: true })
    }

    //Function check result register account success
    async isRegisterSuccess(): Promise<boolean>{
        return this.page.url() !== this.url
    }

}