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
        await adminPage.getMenuTitle('Manage Job').click()
        await adminPage.page.waitForURL(URLS.adminJobManagement)
        await adminPage.page.waitForLoadState('networkidle')
    })

    test('Fiver_AP_19 + 21: Verify that the new job creation function was successful and delete job', async({page}) => {
        const jobId = await adminPage.addNewJob({
            nameJob: 'Modern UI UX Design',
            discription: 'I will create a modern and responsive UI/UX design for websites and mobile applications.',
            shortDiscription: 'Professional UI UX design service for web and mobile.',
            price: '25',
            rate: '5',
            detailCode: '1',
            starRatting: '5',
            filePath: 'E:/Tester/Auto/PLAYWRIGHT-FIVERR-TESTING11/Nhan-fiverr-playwright/tests/assets/download.jpg'
        })
        //Verify create job success
        await expect(adminPage.getSuccessMessageToast(SUCCESS_MESSAGES_ADMIN.job.create)).toBeVisible()
        await expect(page).toHaveURL(URLS.adminJobManagement)
        //Verify delete job success
        await adminPage.deleteJob(jobId)
        await expect(adminPage.getSuccessMessageToast(SUCCESS_MESSAGES_ADMIN.job.delete)).toBeVisible()
    })

})