import { expect, Locator, Page } from "@playwright/test";
import { LoginPage } from "../Authentication/loginPage";


export class AdminPage{
    readonly page: Page;

    //locator for search
    readonly searchInput: Locator;
    readonly columName: Locator;
    readonly noData: Locator;
    
    //Locator for update user
    readonly nameInputUpdate: Locator
    readonly phoneInputUpdate: Locator
    readonly birthdayInputUpdate: Locator
    readonly roleInputUpdate: Locator 
    readonly certificationInputUpdate: Locator
    readonly skillInputUpdate: Locator
    readonly maleInputUpdate: Locator
    readonly femaleInputUpdate: Locator
    readonly buttonSaveUpdate: Locator

    constructor(page:Page){
        this.page = page
        this.searchInput = page.locator('input[placeholder="Tìm kiếm thông tin người dùng ..."]')
        this.columName = page.locator('tr.ant-table-row-level-0 td.ant-table-cell').nth(1)
        this.noData = page.locator('div.ant-empty-description')

        //Update user
        this.nameInputUpdate = page.locator('input[name="name"]')
        this.phoneInputUpdate = page.locator('input[name="phone"]')
        this.birthdayInputUpdate = page.locator('input[name="birthday"]')
        this.maleInputUpdate = page.locator('input[name="gender"][value="male"]')
        this.femaleInputUpdate = page.locator('input[name="gender"][value="female"]')
        this.roleInputUpdate = page.locator('input[name="role"]')
        this.certificationInputUpdate = page.locator('input[id="certification"]')
        this.skillInputUpdate = page.locator('input[id="skill"]')
        this.buttonSaveUpdate = page.locator('button.btn_save')
    }

    getMenuTitle(menuTitle:string){
        return this.page.locator('ul.mt-3 li a',{ hasText: menuTitle})
    }

    getButtonByText(buttonText:string){
        return this.page.locator(`xpath=//button[text()="${buttonText}"]`)
    }
    //Toast message
    getSuccessMessageToast(messageStatus:string){
        return this.page.getByRole('alert').filter({ hasText: messageStatus})
    }

    getErrorMessageToast(messageStatus:string){
        return this.page.getByRole('alert').filter({ hasText: messageStatus})
    }
    //Field error
    getFieldError(errorTextInput:string){
        return this.page.locator('div.text-danger', { hasText: errorTextInput})
    }
    //muiChip-label Certification
    getCertificationChipByText(certificationText:string){
        return this.page.locator('div[role="dialog"] .MuiChip-label', { hasText: certificationText })
    }

    //muiChip-label Skill
    getSkillChipByText(skillText:string){
        return this.page.locator('div[role="dialog"] .MuiChip-label', { hasText: skillText })
    }

    //Button update
    getButtonDefault(buttonText:string){
        return this.page.locator(`button.ant-btn-default`, { hasText: buttonText })
    }
    //Button delete
    getButtonPrimary(buttonText:string){
        return this.page.locator(`button.ant-btn-primary`, { hasText: buttonText })
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

    //Update user
    async updateUser(data:{
        name?: string,
        phone?: string,
        birthday?: string,
        gender?: 'Male' | 'Female'
        role?: string,
        certification?: string,
        skill?: string,
    }): Promise<void>{
        await this.nameInputUpdate.clear()
        await this.nameInputUpdate.fill(data.name ?? '')
        
        await this.phoneInputUpdate.clear()
        await this.phoneInputUpdate.fill(data.phone ?? '')
        
        await this.birthdayInputUpdate.clear()
        await this.birthdayInputUpdate.fill(data.birthday ?? '')

        if(data.gender === 'Male'){
            await this.maleInputUpdate.check()
        } else if(data.gender === 'Female'){
            await this.femaleInputUpdate.check()
        }   

        await this.roleInputUpdate.clear()
        await this.roleInputUpdate.fill(data.role ?? '')
        await this.certificationInputUpdate.fill(data.certification ?? '')
        await this.certificationInputUpdate.press('Enter')
        await this.skillInputUpdate.fill(data.skill ?? '')
        await this.skillInputUpdate.press('Enter')
        await this.buttonSaveUpdate.click()
    }

    //Search username
    async searchUsername(username:string): Promise<void>{
        await this.searchInput.clear()
        await this.searchInput.fill(username)
        await this.searchInput.press('Enter')
        //Wait cell contains username appear
        await Promise.race([
            this.page.locator('tr.ant-table-row-level-0').first().waitFor({ state: 'visible', timeout: 10000 }),
            this.noData.waitFor({ state: 'visible', timeout: 1000 })
        ])
    }

    //Delete user
    async deleteUser(): Promise<void>{
        await this.getButtonPrimary('DEL').first().click()
    }

    // Verify url have contain /AdminPage
    async isLoginSuccess():Promise<boolean>{
        await this.page.waitForURL('**/admin')
        return this.page.url().includes('/admin')
    }

    //Wait for close toast message
    async waitForToastHide(): Promise<void> {
        await this.page.waitForTimeout(1000)
        await this.page.locator('button.Toastify__close-button').first().click().catch(() => {})
    }

    //Verify the search result have contain username
    async isSearchResultContainUsername(username:string): Promise<boolean>{
        try{
            //Get All name cells and check if any contains the username
            const text = await this.columName.textContent({ timeout: 1000 })
            return text?.includes(username) ?? false
        } catch {
            return false
        }
    }


}