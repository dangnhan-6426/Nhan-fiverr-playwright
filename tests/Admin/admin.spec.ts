import test, { expect } from "@playwright/test";
import { LoginPage } from "../../pages/Authentication/loginPage";
import { AdminPage } from "../../pages/Admin/adminPage";
import { URLS } from "../../constants/url";
import { ACCOUNTS } from "../../constants/accounts";
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "../../constants/message";

test.describe('Testcase Administrator page', ()=>{
    let adminPage : AdminPage
    let loginPage : LoginPage
    test.beforeEach(async ({page}) => {
        adminPage = new AdminPage(page)
        loginPage = new LoginPage(page)
        await loginPage.accessToLoginPage()
    })

    test('Fiver_AP_3: Verify add new administrator successfully', async ({page}) => {
        await adminPage.getmenuTitle('Manage User').click()
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
        await adminPage.getmenuTitle('Manage User').click()
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
        await adminPage.getmenuTitle('Manage User').click()
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
        await adminPage.getmenuTitle('Manage User').click()
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
        await adminPage.getmenuTitle('Manage User').click()
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
        await adminPage.getmenuTitle('Manage User').click()
        await adminPage.addNewAdministrator({
            name: 'test admin',
            email: `testadmin${Date.now()}@example.com`,
            password: 'password123',
            phone: ''
        })
        await expect(adminPage.getErrorMessageToast(`${ERROR_MESSAGES.phone.empty}`)).toBeVisible()
        await expect(page).toHaveURL(URLS.adminUserManagement)  

    })

})