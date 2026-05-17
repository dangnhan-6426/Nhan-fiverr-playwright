import test, { expect } from "@playwright/test";
import { AdminPage } from "../../pages/Admin/adminPage";
import { LoginPage } from "../../pages/Authentication/loginPage";
import { ACCOUNTS } from "../../constants/accounts";
import { URLS } from "../../constants/url";
import { SUCCESS_MESSAGES_ADMIN } from "../../constants/message";

test.describe('Testcase add new job',()=>{
    let adminPage:AdminPage
    let loginPage: LoginPage

    test.beforeEach(async ({page})=>{
        adminPage = new AdminPage(page)
        loginPage = new LoginPage(page)

        await loginPage.accessToLoginPage()
        await loginPage.login({
            email: ACCOUNTS.admin.email,
            password: ACCOUNTS.admin.password
        })
        expect(adminPage.isLoginSuccess())
        await adminPage.waitForToastHide()
        await adminPage.getMenuTitle('Manage Service').click()
        await adminPage.page.waitForURL(URLS.adminServiceManagement)
        await adminPage.page.waitForLoadState('networkidle')
    })

    test('Fiver_AP_43: Verify that the service has been successfully created', async({page}) => {
        await adminPage.addNewService({
            jobID:'1',
            hirerID:'2661',
            hireDate:'2024-01-01',
            condition:'complete'
        })
        await expect(adminPage.getSuccessMessageToast(SUCCESS_MESSAGES_ADMIN.service.createService)).toBeVisible()
        await expect(page).toHaveURL(URLS.adminServiceManagement)
    })

})