import test, { expect } from "@playwright/test";
import { LoginPage } from "../../pages/Authentication/loginPage";
import { AdminPage } from "../../pages/Admin/adminPage";

test.describe('Login account Administrator', ()=>{
    let adminPage : AdminPage
    let loginPage : LoginPage
    test.beforeEach(async ({page}) => {
        adminPage = new AdminPage(page)
        loginPage = new LoginPage(page)
        await loginPage.accessToLoginPage()
    })
    test('Fiver_AP_1: Verify login successful with account registered', async({ page })=>{

        await loginPage.login({
            email:process.env.ADMIN_EMAIL ?? '',
            password:process.env.ADMIN_PASSWORD ?? ''
        })
        //Verify status message
        await expect (loginPage.getStatusPage(`${process.env.MESSAGE_LOGIN_SUCCESSFUL}`)).toBeVisible()
        //Verify URL have /admin
        await adminPage.isLoginSuccess()
    })

    test('Fiver_AP_2: Check for invalid administrator account login', async ({ page }) => {
        await loginPage.login({
            email: process.env.USER1_EMAIL ?? '',
            password: process.env.USER1_PASSWORD ?? ''
        })
        await expect(loginPage.getStatusPage(`${process.env.ERROR_WRONG_EMAIL_OR_PASSWORD}`)).toBeVisible()

        await expect(page).toHaveURL(loginPage.loginUrl)
    })
})