import { test, expect } from "@playwright/test"
import { AdminPage } from "../../pages/Admin/adminPage"
import { LoginPage } from "../../pages/Authentication/loginPage"
import { ACCOUNTS } from "../../constants/accounts";
import { URLS } from "../../constants/url";
import { SUCCESS_MESSAGES_ADMIN } from "../../constants/message";

test.describe('Logout account administrator',()=>{
    let adminPage: AdminPage
    let loginPage: LoginPage
    test.beforeEach(async ({page})=>{
        adminPage = new AdminPage(page)
        loginPage = new LoginPage(page)
        await loginPage.accessToLoginPage()
        await loginPage.login({
            email: ACCOUNTS.admin.email,
            password: ACCOUNTS.admin.password
        })
        await expect(adminPage.page).toHaveURL(URLS.admin)
        await adminPage.waitForToastHide()
    })

    test('Fiver_AP_50: Test the administrator logout functionality of the site', async({page}) => {
        await adminPage.dropdownIcon.click()
        await adminPage.btnLogout.click()
        
        await expect(adminPage.getSuccessMessageToast(SUCCESS_MESSAGES_ADMIN.admin.logout))
        await expect(adminPage.page).toHaveURL(URLS.base)  
    })
})