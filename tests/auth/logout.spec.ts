import { LoginPage } from '../../pages/Authentication/loginPage';
import { test, expect } from "@playwright/test";
import { URLS } from '../../constants/url';
import { ACCOUNTS } from '../../constants/accounts';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../constants/message';
test.describe('Logout FUnctionality', () => {
    let loginPage : LoginPage
    test.beforeEach(async ({ page}) => {
        //Dependency Login successful
        loginPage = new LoginPage(page)
        await loginPage.accessToLoginPage()
        await loginPage.login({
            email:ACCOUNTS.user1.email,
            password:ACCOUNTS.user1.password
        })
        await page.waitForTimeout(1000) // Waiting 1s verify login successful
    })

    test('Fiver_M1_ARS_12: Logout by clearing all localStorage data', async ({page})=>{
        await page.evaluate(() => localStorage.clear())

        //Make sure login successful
        await page.waitForTimeout(2000)
        
        //Reload page after when clear data
        await page.reload()
        
        //Verify link
        await expect(page).toHaveURL(`${URLS.login}`)

        //Verify link Signin show
        await expect(loginPage.loginLink).toBeVisible()

        const storageLength = await page.evaluate(() => localStorage.length)
        expect(storageLength).toBe(0)
    })
})