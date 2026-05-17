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

    test('Fiver_AP_44: Update service successfully', async ({ page }) => {
        const serviceId = await adminPage.addNewService({
            jobID: '1',
            hirerID: '9667',
            hireDate: '2025-04-14',
            condition: 'complete'
        })
        await expect(adminPage.getSuccessMessageToast(SUCCESS_MESSAGES_ADMIN.service.createService)).toBeVisible()
        // Update service
        await adminPage.updateService({
            serviceId,
            jobID: '2',
            hirerID: '9600',
            hireDate: '2026-04-15',
            condition: 'incomplete'
        })
        await expect(adminPage.getSuccessMessageToast(SUCCESS_MESSAGES_ADMIN.service.updateService)).toBeVisible()
    })

    test.only('Fiver_AP_45: Test the service deletion function.', async({page}) => {
        await adminPage.addNewService({
            jobID:'4',
            hirerID:'2610',
            hireDate:'2026-02-10',
            condition:'complete'
        })
        await expect(adminPage.getSuccessMessageToast(SUCCESS_MESSAGES_ADMIN.service.createService)).toBeVisible()
        await expect(page).toHaveURL(URLS.adminServiceManagement)
        //Delete service
        await adminPage.deleteService(await adminPage.getLastServiceId())
        await expect(adminPage.getSuccessMessageToast(SUCCESS_MESSAGES_ADMIN.service.deleteService)).toBeVisible()
        await expect(page).toHaveURL(URLS.adminServiceManagement)
    })

})