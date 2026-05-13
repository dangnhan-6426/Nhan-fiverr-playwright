import test, { expect } from "@playwright/test";
import { LoginPage } from "../../pages/Authentication/loginPage";
import { AdminPage } from "../../pages/Admin/adminPage";

test.describe('Testcase Administrator page', ()=>{
    let adminPage : AdminPage
    let loginPage : LoginPage
    test.beforeEach(async ({page}) => {
        adminPage = new AdminPage(page)
        loginPage = new LoginPage(page)
        await loginPage.accessToLoginPage()
        await loginPage.login({
            email: process.env.ADMIN_EMAIL ?? '',
            password: process.env.ADMIN_PASSWORD ?? ''
        })
        await page.waitForTimeout(1000) // Waiting 1s verify login successful
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
        await expect(adminPage.getStatusPage(`${process.env.MESSAGE_SUCCESS_CREATE_ACCOUNT_ADMIN}`)).toBeVisible()      
        //Verify URL have /admin/qlnd
        await expect(page).toHaveURL(`${process.env.BASE_URL}/admin/qlnd`)
    });

    test('Fiver_AP_4: Verify add new administrator failed when email already exists', async ({page}) => {
        await adminPage.getmenuTitle('Manage User').click()
        await adminPage.addNewAdministrator({
            name: 'test admin',
            email: process.env.USER2_EMAIL ?? '',
            password: 'password123',
            phone: '0341567890'
        })
        //Verify status message
        await expect(adminPage.getStatusPage(`${process.env.ERROR_EMAIL_ALREADY_EXISTS}`)).toBeVisible()
        //Verify URL still on /admin/qlnd
        await expect(page).toHaveURL(`${process.env.BASE_URL}/admin/qlnd`)  
    })

    test('Fiver_AP_5: Verify the notification when the name field is empty', async ({page}) => {
        await adminPage.getmenuTitle('Manage User').click()
        await adminPage.addNewAdministrator({
            name: '',
            email: `testadmin${Date.now()}@example.com`,
            password: 'password123',
            phone: '0341567890'
        })
        await expect(adminPage.getStatusPage(`${process.env.ERROR_EMPTY_NAME}`)).toBeVisible()
        await expect(page).toHaveURL(`${process.env.BASE_URL}/admin/qlnd`)  
    })

    test('Fiver_AP_6: Verify the notification when the email field is empty', async ({page}) => {
        await adminPage.getmenuTitle('Manage User').click()
        await adminPage.addNewAdministrator({
            name: 'test admin',
            email: '',
            password: 'password123',
            phone: '0341567890'
        })
        await expect(adminPage.getStatusPage(`${process.env.ERROR_EMPTY_EMAIL_2}`)).toBeVisible()
        await expect(page).toHaveURL(`${process.env.BASE_URL}/admin/qlnd`)  
    })

    test('Fiver_AP_7: Verify the notification when the password field is empty', async ({page}) => {
        await adminPage.getmenuTitle('Manage User').click()
        await adminPage.addNewAdministrator({
            name: 'test admin',
            email: `testadmin${Date.now()}@example.com`,
            password: '',
            phone: '0341567890'
        })
        await expect(adminPage.getStatusPage(`${process.env.ERROR_EMPTY_PASSWORD_2}`)).toBeVisible()
        await expect(page).toHaveURL(`${process.env.BASE_URL}/admin/qlnd`)  
    })

    test('Fiver_AP_8: Verify the notification when the phone field is empty', async ({page}) => {
        await adminPage.getmenuTitle('Manage User').click()
        await adminPage.addNewAdministrator({
            name: 'test admin',
            email: `testadmin${Date.now()}@example.com`,
            password: 'password123',
            phone: ''
        })
        await expect(adminPage.getStatusPage(`${process.env.ERROR_EMPTY_PHONE_NUMBER}`)).toBeVisible()
        await expect(page).toHaveURL(`${process.env.BASE_URL}/admin/qlnd`)  
    })

    
})