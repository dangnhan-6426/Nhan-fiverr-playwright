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
    
    //URL
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

    //Create method for warning status register
    getStatusPage(messageStatus:string){
        return this.page.getByRole('alert').filter({ hasText: messageStatus})
    }

    //Create method for warning register form submit input
    getFieldError(errorTextInput:string){
        return this.page.locator('span.text-danger', { hasText: errorTextInput})
    }

    //Form submit
    async register(data: { 
        name?: string,
        email?: string,
        password?: string,
        confirmpassword?: string,
        phone?: string,
        birthday?: string,
        gender?: 'male'|'female',
        agreeTerms?: boolean,
    }): Promise<void>{
        await this.nameInput.waitFor({ state: 'visible' })
        await this.nameInput.fill(data.name ?? '')
        await this.emailInput.fill(data.email ?? '')
        await this.passwordInput.fill(data.password ?? '')
        await this.confirmPasswordInput.fill(data.confirmpassword ?? '')
        await this.phoneInput.fill(data.phone ?? '')
        await this.birthdayInput.fill(data.birthday ?? '')
        // Checkbox gender
        if(data.gender === 'male'){
            await this.maleRadio.check()
        }else if(data.gender === 'female'){
            await this.femaleRadio.check()
        }
        // Checkbox I agree all statements in Terms of service
        if(data.agreeTerms === false){
            await this.agreeCheckbox.uncheck({ force: true })
        }else{
            await this.agreeCheckbox.check({ force:true })
        }

        await this.registerButton.click({ force: true })
    }
    //Function go to url
    async navigateToRegisterPage(): Promise<void>{
        await this.page.goto(this.url)
    }
    //Function check result register account success
    async isRegisterSuccess(): Promise<boolean>{
        return this.page.url() !== this.url
    }


    


    
}