import { LoginPage } from './../pages/loginPage';
import { test, expect } from "@playwright/test";

test.describe('Logout FUnctionality', () => {
    test.beforeEach(async ({ page}) => {
        //B1: Login successful
        const loginPage = new LoginPage(page)
        await loginPage.navigateToLoginPage()
        await loginPage.login('cao@gmail.com', '12345678')
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
        await expect(page).toHaveURL('https://demo4.cybersoft.edu.vn/login')

        //Verify link Signin show
        await expect(loginPage.loginLink).toBeVisible()

        const storageLength = await page.evaluate(() => localStorage.length)
        expect(storageLength).toBe(0)
    })
})