import { LoginPage } from '../../pages/Authentication/loginPage';
import { test, expect } from "@playwright/test";

test.describe('Logout FUnctionality', () => {
    test.beforeEach(async ({ page}) => {
        //Dependency Login successful
        const loginPage = new LoginPage(page)
        await loginPage.navigateToLoginPage()
        await loginPage.login({
            email:process.env.USER2_EMAIL ?? 'cao@gmail.com',
            password:process.env.USER2_PASSWORD ?? '12345678'
        })
        await page.waitForTimeout(1000) // Waiting 1s verify login successful
    })

    test('Fiver_M1_ARS_12: Logout by clearing all localStorage data', async ({page})=>{
        const loginPage = new LoginPage(page)

        await page.evaluate(() => localStorage.clear())

        //Make sure login successful
        await page.waitForTimeout(2000)
        
        //Reload page after when clear data
        await page.reload()
        
        //Verify link
        await expect(page).toHaveURL(`${process.env.BASE_URL_LOGIN}/login`)

        //Verify link Signin show
        await expect(loginPage.loginLink).toBeVisible()

        const storageLength = await page.evaluate(() => localStorage.length)
        expect(storageLength).toBe(0)
    })
})