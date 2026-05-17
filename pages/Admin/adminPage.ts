import { expect, Locator, Page } from "@playwright/test";
import { URLS } from "../../constants/url";


export class AdminPage{
    readonly page: Page;
//Locator
//========== Manage User ==========

    //Add new admin
    //readonly addNewAdminButton: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly phoneInput: Locator;

    //search
    readonly searchInput: Locator;
    readonly columName: Locator;
    readonly noData: Locator;
    
    //Form update user
    readonly nameInputUpdate: Locator;
    readonly phoneInputUpdate: Locator;
    readonly birthdayInputUpdate: Locator;
    readonly roleInputUpdate: Locator;
    readonly certificationInputUpdate: Locator;
    readonly skillInputUpdate: Locator;
    readonly maleInputUpdate: Locator;
    readonly femaleInputUpdate: Locator;
    readonly buttonSaveUpdate: Locator;

//========== Manager Job ===========
    // Form add new job    
    readonly nameJobInput: Locator;
    readonly discriptionInput: Locator;
    readonly shortDiscriptionInput: Locator;
    readonly priceInput: Locator;
    readonly rateInput: Locator;
    readonly detailCodeInput: Locator;
    readonly starRattingInput: Locator;
    readonly uploadImageInput: Locator;

//========== Manager JobType ===========
    readonly jobTypeInput: Locator;

//========== Manager Service ===========
    readonly jobIDInput:Locator;
    readonly hirerIDInput: Locator;
    readonly hireDateInput: Locator;
    readonly completeInput: Locator;
    readonly incompleteInput: Locator;

    constructor(page:Page){
        this.page = page    

        // Manage User
        //Add new Admin
        this.nameInput = page.locator('#name')
        this.emailInput = page.locator('#email')
        this.passwordInput = page.locator('#password')
        this.phoneInput = page.locator('#phone')
        //Search
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

         // Manage Job
        this.nameJobInput = page.locator('input[name="tenCongViec"]')
        this.discriptionInput = page.locator('input[name="moTa"]')
        this.shortDiscriptionInput = page.locator('input[name="moTaNgan"]')
        this.priceInput = page.locator('input[name="giaTien"]')
        this.rateInput = page.locator('input[name="danhGia"]')
        this.detailCodeInput = page.locator('input[name="maChiTietLoaiCongViec"]')
        this.starRattingInput = page.locator('input[name="saoCongViec"]')
        this.uploadImageInput = page.locator('input[name="hinhAnh"]')

        //Manage Job Type
        this.jobTypeInput = page.locator('input[name="tenLoaiCongViec"]')

        //Manage Service
        this.jobIDInput = page.locator('input[name="maCongViec"]')
        this.hirerIDInput = page.locator('input[name="maNguoiThue"]')
        this.hireDateInput = page.locator('input[name="ngayThue"]')
        this.completeInput = page.locator('input[name="hoanThanh"][value="true"]')
        this.incompleteInput = page.locator('input[name="hoanThanh"][value="false"]')
    }

    //Locator general
    //Manage User
    //Menu title
    getMenuTitle(title: string) {
        return this.page.getByRole('link', { name: title, exact: true })
    }

    //Button add new, Save, Delete, Update
    getButtonAdd(buttonText: string) {
        return this.page.getByRole('button', { name: new RegExp(buttonText, 'i') })
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

    //Manage Job
    

//========= Manage User ===========

    async addNewAdministrator(data: {
        name?: string,
        email?: string,
        password?: string,
        phone?: string
    }): Promise<void> {
        await this.getButtonAdd('ADD NEW ADMIN').click()
        await this.nameInput.fill(data.name ?? '')
        await this.emailInput.fill(data.email ?? '')
        await this.passwordInput.fill(data.password ?? '')
        await this.phoneInput.fill(data.phone ?? '')
        await this.getButtonAdd('Save').click()
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

    //========= Manage Job ===========
    async getLastJobId(): Promise<number> {
        // Click page cuối cùng
        const lastPageBtn = this.page.locator('li.ant-pagination-item').last()
        await lastPageBtn.click()
        await this.page.waitForLoadState('networkidle')

        // Lấy ID row cuối
        const idText = await this.page.locator('tr.ant-table-row')
            .last()
            .locator('td.ant-table-cell')
            .first()
            .innerText()

        return parseInt(idText)
    }
    
    async addNewJob(data:{
        nameJob?:string,
        discription?:string,
        shortDiscription?:string,
        price?:string,
        rate?:string,
        detailCode?:string,
        starRatting?:string,
        filePath?:string 
    }): Promise <number>{
        await this.getButtonAdd('ADD NEW JOB').click()
        await this.nameJobInput.fill(data.nameJob ?? '')
        await this.discriptionInput.fill(data.discription ?? '')
        await this.shortDiscriptionInput.fill(data.shortDiscription ?? '')
        await this.priceInput.fill(data.price ?? '')
        await this.rateInput.fill(data.rate ?? '')
        await this.detailCodeInput.fill(data.detailCode ?? '')
        await this.starRattingInput.fill(data.starRatting ?? '')
        await this.uploadImageInput.setInputFiles(data.filePath ?? '')
        await this.getButtonAdd('Save').click()
        await this.page.waitForTimeout(1000)
        return await this.getLastJobId()
    }

    async deleteJob(jobId: number): Promise<void>{
        await this.page.locator('tr.ant-table-row')
        .filter({ hasText: String(jobId)})
        .getByRole('button', {name:'DEL'})
        .click()
    }

    //========= Manage JobType ===========
    async addNewJobTpe(data:{
        jobType?:string
    }): Promise<void> {
        await this.getButtonAdd('ADD NEW JOB TYPE').click()
        await this.jobTypeInput.fill(data.jobType ?? '')
        await this.getButtonAdd('ADD').click()
    }

    //========= Manage Service ===========
    async addNewService(data:{
        jobID?:string,
        hirerID?:string,
        hireDate?:string,
        condition?: 'complete' | 'incomplete'
    }):Promise<void>{
        await this.getButtonAdd('ADD SERVICE').click()
        await this.jobIDInput.fill(data.jobID??'')
        await this.hirerIDInput.fill(data.hirerID??'')
        await this.hireDateInput.fill(data.hireDate??'')

        if(data.condition === 'complete'){
            await this.completeInput.check()
        }else if(data.condition === 'incomplete'){
            await this.incompleteInput.check()
        }
        await this.getButtonAdd('ADD').click()
    }

    // Verify url have contain /AdminPage
    async isLoginSuccess():Promise<boolean>{
        await this.page.waitForURL(URLS.admin)
        return this.page.url().includes(URLS.admin)
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