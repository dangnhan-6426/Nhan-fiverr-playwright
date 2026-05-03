import { loginData } from "../../data/account";
import { test, expect } from "@playwright/test";
import { LoginPage } from '../../pages/Authentication/loginPage'; 


test.describe('Testcase login',()=>{

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

    test('Fiver_M1_ARS_15: Verify login error when incorrect email but correct password is entered', async({page})=>{
        const loginPage = new LoginPage(page)

        await loginPage.navigateToLoginPage()
        await loginPage.login({
            email:'cao123@gmail.com',
            password:'12345678'
        })
        await expect (loginPage.getStatusPage('Email hoặc mật khẩu không đúng !')).toBeVisible()
        await expect(page).toHaveURL(loginPage.url)
    })

    test('Fiver_M1_ARS_16: Verify login error when correct email but incorrect password is entered', async({page})=>{
        const loginPage = new LoginPage(page)

        await loginPage.navigateToLoginPage()
        await loginPage.login({
            email:'cao@gmail.com',
            password:'cao123'
        })
        await expect (loginPage.getStatusPage('Email hoặc mật khẩu không đúng !')).toBeVisible()
        await expect(page).toHaveURL(loginPage.url)
    })

    test('Fiver_M1_ARS_17: Verify login error when incorrect email and incorrect password is entered', async({page})=>{
        const loginPage = new LoginPage(page)

        await loginPage.navigateToLoginPage()
        await loginPage.login({
            email:loginData.invalidUser.email,
            password:loginData.invalidUser.password
        })
        await expect (loginPage.getStatusPage('Email hoặc mật khẩu không đúng !')).toBeVisible()
        await expect(page).toHaveURL(loginPage.url)
    })

    test('Fiver_M1_ARS_18: Multiple incorrect password attempts → account locked', async({page})=>{
        const loginPage = new LoginPage(page)
        
        await loginPage.navigateToLoginPage()

        for(let i = 1; i <= 10; i++){
            await loginPage.clearInput()
            await loginPage.login({
                email: loginData.validUser.email,
                password: 'cao@123'
            })
            console.log(`Times ${i}: Login Fail`)
            if (i<10){
                await page.waitForTimeout(1000) // Wait for alert to appear
                await page.getByRole('button', {name: 'close'}).first().click()
                await page.waitForTimeout(1000) // Wait for alert to disappear
            }else{
                await expect(loginPage.getStatusPage('Email hoặc mật khẩu không đúng !').first()).toBeVisible()
                await expect(page).toHaveScreenshot('login-blocked.png')
            }
        }
        //Verify error message 
        await expect(page).toHaveURL(loginPage.url)
    })

    test('Fiver_M1_ARS_20: Verify error messages when leaving the email information field blank.', async({page})=>{
        const loginPage = new LoginPage(page)

        await loginPage.navigateToLoginPage()
        await loginPage.login({
            password:loginData.validUser.password
        })
        await expect (loginPage.getErrorMessage('Email không được bỏ trống !')).toBeVisible()
        await expect(page).toHaveURL(loginPage.url)
    })

    test('Fiver_M1_ARS_21: Verify error messages when the password field is left blank.', async({page})=>{
        const loginPage = new LoginPage(page)

        await loginPage.navigateToLoginPage()
        await loginPage.login({
            email:loginData.validUser.email,
        })
        await expect (loginPage.getErrorMessage('Password không được bỏ trống !')).toBeVisible()
        await expect(page).toHaveURL(loginPage.url)
    })

    
})