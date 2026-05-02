import { adminAccount } from './../data/account';
import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/Authentication/loginPage";

test.describe('Administrator testcase', ()=>{
    test.only('Fiver_AP_1: Verify login successful with account registered', async({ page })=>{
        const loginPage = new LoginPage(page)

        await loginPage.navigateToLoginPage()
        await loginPage.login(
            adminAccount.email,
            adminAccount.password
        )

        await expect (loginPage.getStatusPage('Đăng nhập tài khoản thành công !')).toBeVisible()
        await loginPage.isLoginSuccess()
    })
})