import test, { expect } from "@playwright/test";
import { AdminPage } from "../../pages/Admin/adminPage";
import { LoginPage } from "../../pages/Authentication/loginPage";
import { ACCOUNTS } from "../../constants/accounts";
import { URLS } from "../../constants/url";
import { SUCCESS_MESSAGES_ADMIN } from "../../constants/message";

test.describe('Testcase add new job type',()=>{
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
        await adminPage.getMenuTitle('Manage JobType').click()
        await adminPage.page.waitForURL(URLS.adminJobTypeManagement)
        await adminPage.page.waitForLoadState('networkidle')
    })

    test('Fiver_AP_40: Check if adding the job type was successfu', async({page})=>{
        await adminPage.addNewJobTpe({
            jobType:'UI UX Design',
        })
        await expect(adminPage.getSuccessMessageToast(SUCCESS_MESSAGES_ADMIN.jobType.createJT)).toBeVisible()
        await expect(page).toHaveURL(URLS.adminJobTypeManagement)
    })

})