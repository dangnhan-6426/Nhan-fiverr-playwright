import { SUCCESS_MESSAGES, SUCCESS_MESSAGES_ADMIN, ERROR_MESSAGES } from './../../constants/message';
import test, { expect } from "@playwright/test";
import { LoginPage } from "../../pages/Authentication/loginPage";
import { AdminPage } from "../../pages/Admin/adminPage";
import { URLS } from "../../constants/url";
import { ACCOUNTS } from "../../constants/accounts";

test.describe('Testcase Add New Administrator', ()=>{
    let adminPage : AdminPage
    let loginPage : LoginPage
    test.beforeEach(async ({page}) => {
        adminPage = new AdminPage(page)
        loginPage = new LoginPage(page)
        await loginPage.accessToLoginPage()
        await loginPage.login({
            email: ACCOUNTS.admin.email,
            password: ACCOUNTS.admin.password
        })
        await expect(adminPage.page).toHaveURL(URLS.admin)
        await adminPage.waitForToastHide()
        await adminPage.getMenuTitle('Manage User').click()  
        await expect(adminPage.page).toHaveURL(URLS.adminUserManagement)
    })

    test('Fiver_AP_3: Verify add new administrator successfully', async ({page}) => {
        await adminPage.addNewAdministrator({
            name: 'test admin',
            email: `testadmin${Date.now()}@example.com`,
            password: 'password123',
            phone: '0341567890'
        })
            
        //Verify status message
        await expect(adminPage.getSuccessMessageToast(SUCCESS_MESSAGES_ADMIN.admin.createAccount)).toBeVisible()      
        //Verify URL have /admin/qlnd
        await expect(page).toHaveURL(URLS.adminUserManagement)
    });

    test('Fiver_AP_4: Verify add new administrator failed when email already exists', async ({page}) => {
        await adminPage.addNewAdministrator({
            name: 'test admin',
            email: ACCOUNTS.admin.email,
            password: 'password123',
            phone: '0341567890'
        })
        //Verify status message
        await expect(adminPage.getErrorMessageToast(ERROR_MESSAGES.email.alreadyExists)).toBeVisible()

    })

    test('Fiver_AP_5: Verify the notification when the name field is empty', async ({page}) => {
        await adminPage.addNewAdministrator({
            name: '',
            email: `testadmin${Date.now()}@example.com`,
            password: 'password123',
            phone: '0341567890'
        })
        await expect(adminPage.getFieldError(`${ERROR_MESSAGES.name.empty}`)).toBeVisible() 
    })

    test('Fiver_AP_6: Verify the notification when the email field is empty', async ({page}) => {
        await adminPage.addNewAdministrator({
            name: 'test admin',
            email: '',
            password: 'password123',
            phone: '0341567890'
        })
        await expect(adminPage.getFieldError(`${ERROR_MESSAGES.email.emptyAlt}`)).toBeVisible()
        await expect(page).toHaveURL(URLS.adminUserManagement)  
    })

    test('Fiver_AP_7: Verify the notification when the password field is empty', async ({page}) => {
        await adminPage.addNewAdministrator({
            name: 'test admin',
            email: `testadmin${Date.now()}@example.com`,
            password: '',
            phone: '0341567890'
        })
        await expect(adminPage.getFieldError(`${ERROR_MESSAGES.password.emptyAlt}`)).toBeVisible()
        await expect(page).toHaveURL(URLS.adminUserManagement)  
    })

    test('Fiver_AP_8: Verify the notification when the phone field is empty', async ({page}) => {
        await adminPage.addNewAdministrator({
            name: 'test admin',
            email: `testadmin${Date.now()}@example.com`,
            password: 'password123',
            phone: ''
        })
        await expect(adminPage.getFieldError(`${ERROR_MESSAGES.phone.empty}`)).toBeVisible()
        await expect(page).toHaveURL(URLS.adminUserManagement)  

    })

    test('Fiver_AP_9: Check if any error messages appear when entering an email address that is 255 characters long', async ({page}) => {
        const longEmail = `test${'a'.repeat(250)}@example.com`
        await adminPage.addNewAdministrator({
            name: 'test admin',
            email: longEmail,
            password: 'password123',
            phone: '0341567890'
        })
        await expect(adminPage.getFieldError(`${ERROR_MESSAGES.email.charaterLimitAlt}`)).toBeVisible()
        await expect(page).toHaveURL(URLS.adminUserManagement)
    })

    test('Fiver_AP_10: Check email notifications for incorrect input formatting.', async ({page}) => {
        const invalidEmail = 'invalid-email-format'
        await adminPage.addNewAdministrator({
            name: 'test admin',
            email: invalidEmail,
            password: 'password123',
            phone: '0341567890'
        })
        await expect(adminPage.getFieldError(`${ERROR_MESSAGES.email.invalidFormatAlt}`)).toBeVisible()
        await expect(page).toHaveURL(URLS.adminUserManagement)
    })

    test('Fiver_AP_11: Check for error messages when entering a name with a length of 255 characters', async ({page}) => {
        const longName = `test${'a'.repeat(250)}`
        await adminPage.addNewAdministrator({
            name: longName,
            email: `testadmin${Date.now()}@example.com`,
            password: 'password123',
            phone: '0341567890'
        })
        await expect(adminPage.getFieldError(`${ERROR_MESSAGES.name.characterLimitAlt}`)).toBeVisible()
        await expect(page).toHaveURL(URLS.adminUserManagement)
    })

    test('Fiver_AP_12: Check for error messages indicating incorrect name format', async ({page}) => {
        const invalidName = 'invalid-name-format-1001'
        await adminPage.addNewAdministrator({
            name: invalidName,
            email: `testadmin${Date.now()}@example.com`,
            password: 'password123',
            phone: '0341567890'
        })
        await expect(adminPage.getFieldError(`${ERROR_MESSAGES.name.invalidFormat}`)).toBeVisible()
        await expect(page).toHaveURL(URLS.adminUserManagement)
    })

    test('Fiver_AP_13: Check for error messages when passwords exceed 32 characters', async ({page}) => {
        const longPassword = `password${'a'.repeat(33)}`
        await adminPage.addNewAdministrator({
            name: 'test admin',
            email: `testadmin${Date.now()}@example.com`,
            password: longPassword,
            phone: '0341567890'
        })
        await expect(adminPage.getFieldError(`${ERROR_MESSAGES.password.characterLimit}`)).toBeVisible()
        await expect(page).toHaveURL(URLS.adminUserManagement)
        
    })

    test('Fiver_AP_14: Check for the error message indicating that more than 10 characters have been entered in the Phone information field', async ({page}) => {
        const longPhone = `03415678901`
        await adminPage.addNewAdministrator({
            name: 'test admin',
            email: `testadmin${Date.now()}@example.com`,
            password: 'password123',
            phone: longPhone
        })
        await expect(adminPage.getFieldError(`${ERROR_MESSAGES.phone.invalidFormat}`)).toBeVisible()
        await expect(page).toHaveURL(URLS.adminUserManagement)
        
    })

    test('Fiver_AP_15: Search username registered', async ({page}) => {
        const searchName = 'nhan'
        await adminPage.searchInput.click()
        await adminPage.searchUsername(searchName)
        //Verify the search result have contain username
        expect(await adminPage.isSearchResultContainUsername(searchName)).toBeTruthy()
    })

    test('Fiver_AP_16: Search username not registered', async ({page}) => {
        const searchName = `justatest`
        await adminPage.searchInput.click()
        await adminPage.searchUsername(searchName) 
        //Verify the search result have contain username
        expect(await adminPage.isSearchResultContainUsername(searchName)).toBeFalsy()
        await expect(adminPage.noData).toBeVisible()   
    })

    test('Fiver_AP_17: Check for user feature updates', async ({page}) => {
        const searchName = 'test admin'
        await adminPage.searchInput.click()
        await adminPage.searchUsername(searchName)
        await adminPage.getButtonDefault('View & Edit').first().click()
        await adminPage.updateUser({
            name: 'test admin updated',
            phone: '0341567890',
            birthday: '1990-01-01',
            gender: 'Male',
            role: 'Admin',
            certification: 'Certified Admin',
            skill: 'Admin Skills'
        })
        //Verify status message
        await expect(adminPage.getSuccessMessageToast(SUCCESS_MESSAGES_ADMIN.admin.updateAccount)).toBeVisible()
        await expect(page).toHaveURL(URLS.adminUserManagement)
        
        await adminPage.waitForToastHide()
        await adminPage.searchUsername('test admin updated')    
        await adminPage.getButtonDefault('View & Edit').first().click()
        //Verify the updated information
        await expect(adminPage.nameInputUpdate).toHaveValue('test admin updated')
        await expect(adminPage.phoneInputUpdate).toHaveValue('0341567890')
        await expect(adminPage.birthdayInputUpdate).toHaveValue('1990-01-01')
        await expect(adminPage.maleInputUpdate).toBeChecked()
        await expect(adminPage.femaleInputUpdate).not.toBeChecked()
        await expect(adminPage.roleInputUpdate).toHaveValue('Admin')
        await expect(adminPage.getCertificationChipByText('Certified Admin')).toBeVisible()
        await expect(adminPage.getSkillChipByText('Admin Skills')).toBeVisible()
    })

    test('Fiver_AP_18: Delete user', async ({page}) => {
        const searchName = 'test admin updated'
        await adminPage.searchInput.click()
        await adminPage.searchUsername(searchName)
        await adminPage.deleteUser()
        //Verify status message
        await expect(adminPage.getSuccessMessageToast(SUCCESS_MESSAGES_ADMIN.admin.delete)).toBeVisible()
        await expect(page).toHaveURL(URLS.adminUserManagement)
        await adminPage.waitForToastHide()
        await adminPage.searchUsername(searchName)
        //Verify the search result have contain username        
        expect(await adminPage.isSearchResultContainUsername(searchName)).toBeFalsy()
        await expect(adminPage.noData).toBeVisible()
    })

})