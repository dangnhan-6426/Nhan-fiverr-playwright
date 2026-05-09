import test, { expect } from "@playwright/test";
import { LoginPage } from "../../pages/Authentication/loginPage";

test.describe('Administrator testcase', ()=>{
    test.only('Fiver_AP_1: Verify login successful with account registered', async({ page })=>{
        const loginPage = new LoginPage(page)

        await loginPage.accessToLoginPage()
        await loginPage.login({
            email:process.env.ADMIN_EMAIL ?? '',
            password:process.env.ADMIN_PASSWORD ?? ''
        })
        //Verify status message
        await expect (loginPage.getStatusPage('Đăng nhập tài khoản thành công !')).toBeVisible()
        //Verify URL have /admin
        await loginPage.isLoginSuccess('admin')
    })
})