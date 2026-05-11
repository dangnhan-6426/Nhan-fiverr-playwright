import { test, expect } from "@playwright/test";
import { LoginPage } from '../../pages/Authentication/loginPage'; 


test.describe('Testcase login',()=>{
    let loginPage : LoginPage
    test.beforeEach(async ({page}) =>{
        loginPage = new LoginPage(page)
        await loginPage.accessToLoginPage()
    })
    test('Fiver_M1_ARS_14: Verify login successful with account registered', async({ page })=>{
        await loginPage.login({
            email: process.env.USER2_EMAIL ?? '',
            password: process.env.USER2_PASSWORD ?? ''
        })
        await expect (loginPage.getStatusPage(`${process.env.MESSAGE_LOGIN_SUCCESSFUL}`)).toBeVisible()
        expect(await loginPage.isLoginSuccess()).toBeTruthy()
    })

    test('Fiver_M1_ARS_15: Verify login error when incorrect email but correct password is entered', async({page})=>{
        await loginPage.login({
            email:'cao123@gmail.com',
            password:process.env.USER2_PASSWORD ??''
        })
        await expect (loginPage.getStatusPage(`${process.env.ERROR_WRONG_EMAIL_OR_PASSWORD}`)).toBeVisible()
        await expect(page).toHaveURL(loginPage.loginUrl)
    })

    test('Fiver_M1_ARS_16: Verify login error when correct email but incorrect password is entered', async({page})=>{
        await loginPage.login({
            email:process.env.USER2_EMAIL ?? '',
            password:'cao123'
        })
        await expect (loginPage.getStatusPage(`${process.env.ERROR_WRONG_EMAIL_OR_PASSWORD}`)).toBeVisible()
        await expect(page).toHaveURL(loginPage.loginUrl)
    })

    test('Fiver_M1_ARS_17: Verify login error when incorrect email and incorrect password is entered', async({page})=>{
        await loginPage.login({
            email:'cao123@gmail.com',
            password:'cao123'
        })
        await expect (loginPage.getStatusPage(`${process.env.ERROR_WRONG_EMAIL_OR_PASSWORD}`)).toBeVisible()
        await expect(page).toHaveURL(loginPage.loginUrl)
    })

    test('Fiver_M1_ARS_18: Multiple incorrect password attempts → account locked', async ({ page }) => {
        // login Faile 10 times
        for (let i = 1; i <= 10; i++) {
            await loginPage.login({
                email: process.env.USER2_EMAIL ?? '',
                password: 'cao@123'
            })
            console.log(`Times ${i}: Login Fail`)

            await expect(
                loginPage.getStatusPage(process.env.ERROR_WRONG_EMAIL_OR_PASSWORD ?? '').first()
            ).toBeVisible()
            // Close the toast box before the next baking session.
            if (i < 10) {
                await page.getByRole('button', { name: 'close' }).first().waitFor({ state: 'visible' })
                await page.getByRole('button', { name: 'close' }).first().click()
            }
        }
        await page.screenshot({ path: 'tests/auth/screenshots/login-blocked.png', fullPage: true })
        // Verification gets locked after 10 attempts — test FAILED if the app isn't locked.
        await expect(page).toHaveURL(loginPage.loginUrl)
        await expect(
            loginPage.getStatusPage(process.env.ERROR_ACCOUNT_LOCKED ?? 'account locked')
        ).toBeVisible()
        await page.screenshot({ path: 'tests/auth/screenshots/login-blocked.png', fullPage: true })
    })

    test('Fiver_M1_ARS_20: Verify error messages when leaving the email information field blank.', async({page})=>{
        await loginPage.login({
            password:process.env.USER2_PASSWORD ?? ''
        })
        await expect (loginPage.getErrorMessage(`${process.env.ERROR_EMPTY_EMAIL}`)).toBeVisible()
        await expect(page).toHaveURL(loginPage.loginUrl)
    })

    test('Fiver_M1_ARS_21: Verify error messages when the password field is left blank.', async({page})=>{
        await loginPage.login({
            email:process.env.USER2_EMAIL ?? '',
        })
        await expect (loginPage.getErrorMessage(`${process.env.ERROR_EMPTY_PASSWORD}`)).toBeVisible()
        await expect(page).toHaveURL(loginPage.loginUrl)
    })

    
})