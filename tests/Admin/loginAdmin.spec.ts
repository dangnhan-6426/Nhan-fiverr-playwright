import test, { expect } from "@playwright/test";
import { LoginPage } from "../../pages/Authentication/loginPage";
import { AdminPage } from "../../pages/Admin/adminPage";
import { ACCOUNTS } from "../../constants/accounts";
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "../../constants/message";
import { Urls } from "../../constants/url";

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
            email: ACCOUNTS.admin.email,
            password: ACCOUNTS.admin.password
        })
        //Verify status message
        await expect (loginPage.getSuccessMessageToast(`${SUCCESS_MESSAGES.auth.login}`)).toBeVisible()
        //Verify URL have /admin
        await adminPage.isLoginSuccess()
    })

    test('Fiver_AP_2: Check for invalid administrator account login', async ({ page }) => {
        await loginPage.login({
            email: ACCOUNTS.user2.email,
            password: ACCOUNTS.user2.password
        })
        await expect(loginPage.getErrorMessageToast(`${ERROR_MESSAGES.email.wrongEmailOrPassword}`)).toBeVisible()

        await expect(page).toHaveURL(loginPage.loginUrl)
    })
})