import { loginData } from './../data/account';
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/Authentication/loginPage";


test.describe('Login testcase',()=>{

    test.only('Fiver_M1_ARS_14: Verify login successful with account registered', async({ page })=>{
        const loginPage = new LoginPage(page)

        await loginPage.navigateToLoginPage()
        await loginPage.login(
            loginData.validUser.email,
            loginData.validUser.password
        )

        await expect (loginPage.getStatusPage('Đăng nhập tài khoản thành công !')).toBeVisible()
        await loginPage.isLoginSuccess()
    })

})