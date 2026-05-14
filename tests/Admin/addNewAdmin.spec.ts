import test, { expect } from "@playwright/test";
import { LoginPage } from "../../pages/Authentication/loginPage";
import { AdminPage } from "../../pages/Admin/adminPage";
import { URLS } from "../../constants/url";
import { ACCOUNTS } from "../../constants/accounts";
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "../../constants/message";

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
        await adminPage.getMenuTitle('Manage User').click()  
    })

    test('Fiver_AP_3: Verify add new administrator successfully', async ({page}) => {
        await adminPage.addNewAdministrator({
            name: 'test admin',
            email: `testadmin${Date.now()}@example.com`,
            password: 'password123',
            phone: '0341567890'
        })
            
        //Verify status message
        await expect(adminPage.getSuccessMessageToast(SUCCESS_MESSAGES.admin.createAccount)).toBeVisible()      
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
        //Verify URL still on /admin/qlnd
        await expect(page).toHaveURL(URLS.adminUserManagement)  

    })

    test('Fiver_AP_5: Verify the notification when the name field is empty', async ({page}) => {
        await adminPage.addNewAdministrator({
            name: '',
            email: `testadmin${Date.now()}@example.com`,
            password: 'password123',
            phone: '0341567890'
        })

        await expect (loginPage.getErrorMessageToast(`${process.env.ERROR_WRONG_EMAIL_OR_PASSWORD}`)).toBeVisible()
        await expect(page).toHaveURL(loginPage.loginUrl)

        await expect(adminPage.getErrorMessageToast(`${ERROR_MESSAGES.name.empty}`)).toBeVisible()
        await expect(page).toHaveURL(URLS.adminUserManagement)  
    })

    test('Fiver_AP_6: Verify the notification when the email field is empty', async ({page}) => {
        await adminPage.addNewAdministrator({
            name: 'test admin',
            email: '',
            password: 'password123',
            phone: '0341567890'
        })
        await expect(adminPage.getErrorMessageToast(`${ERROR_MESSAGES.email.emptyAlt}`)).toBeVisible()
        await expect(page).toHaveURL(URLS.adminUserManagement)  
    })

    test('Fiver_AP_7: Verify the notification when the password field is empty', async ({page}) => {
        await adminPage.addNewAdministrator({
            name: 'test admin',
            email: `testadmin${Date.now()}@example.com`,
            password: '',
            phone: '0341567890'
        })
        await expect(adminPage.getErrorMessageToast(`${ERROR_MESSAGES.password.emptyAlt}`)).toBeVisible()
        await expect(page).toHaveURL(URLS.adminUserManagement)  
    })

    test('Fiver_AP_8: Verify the notification when the phone field is empty', async ({page}) => {
        await adminPage.addNewAdministrator({
            name: 'test admin',
            email: `testadmin${Date.now()}@example.com`,
            password: 'password123',
            phone: ''
        })
        await expect(adminPage.getErrorMessageToast(`${ERROR_MESSAGES.phone.empty}`)).toBeVisible()
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
        await expect(adminPage.getErrorMessageToast(`${ERROR_MESSAGES.email.charaterLimitAlt}`)).toBeVisible()
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
        await expect(adminPage.getErrorMessageToast(`${ERROR_MESSAGES.email.invalidFormatAlt}`)).toBeVisible()
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
        await expect(adminPage.getErrorMessageToast(`${ERROR_MESSAGES.name.characterLimitAlt}`)).toBeVisible()
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
        await expect(adminPage.getErrorMessageToast(`${ERROR_MESSAGES.name.invalidFormat}`)).toBeVisible()
        await expect(page).toHaveURL(URLS.adminUserManagement)
    })

    test.only('Fiver_AP_13: Check for error messages when passwords exceed 32 characters', async ({page}) => {
        const longPassword = `password${'a'.repeat(33)}`
        await adminPage.addNewAdministrator({
            name: 'test admin',
            email: `testadmin${Date.now()}@example.com`,
            password: longPassword,
            phone: '0341567890'
        })
        await expect(adminPage.getErrorMessageToast(`${ERROR_MESSAGES.password.characterLimit}`)).toBeVisible()
        await expect(page).toHaveURL(URLS.adminUserManagement)
        
    })
    test.only('Fiver_AP_14: Check for the error message indicating that more than 10 characters have been entered in the Phone information field', async ({page}) => {
        const longPhone = `03415678901`
        await adminPage.addNewAdministrator({
            name: 'test admin',
            email: `testadmin${Date.now()}@example.com`,
            password: 'password123',
            phone: longPhone
        })
        await expect(adminPage.getErrorMessageToast(`${ERROR_MESSAGES.phone.invalidFormat}`)).toBeVisible()
        await expect(page).toHaveURL(URLS.adminUserManagement)
        
    })

})