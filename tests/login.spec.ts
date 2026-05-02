import { loginData } from './../data/account';
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/Authentication/loginPage";


test.describe('Login testcase',()=>{

    test('Fiver_M1_ARS_14: Verify login successful with account registered', async({ page })=>{
        const loginPage = new LoginPage(page)

        await loginPage.navigateToLoginPage()
        await loginPage.login({
            email: loginData.validUser.email,
            password: loginData.validUser.password
        })

        await expect (loginPage.getStatusPage('Đăng nhập tài khoản thành công !')).toBeVisible()
        await loginPage.isLoginSuccess('user')
    })

    test.only('Fiver_M1_ARS_15: Verify login error when incorrect email but correct password is entered', async({page})=>{
        const loginPage = new LoginPage(page)

        await loginPage.navigateToLoginPage()
        await loginPage.login({
            email:'cao123@gmail.com',
            password:'cao123'
        })
        await expect (loginPage.getStatusPage('Email hoặc mật khẩu không đúng !')).toBeVisible()
        await expect(page).toHaveURL(loginPage.url)
    })

})