import {test, expect} from 'playwright/test'
import {RegisterPage} from'../pages/registerPage'

test.describe('Register test case', () => {
    test('TC01: Register successfully', async ({page})=>{
        const registerPage = new RegisterPage(page)

        await page.goto(registerPage.url)

        await registerPage.register({
            name:'nhan',
            email:`nhan${Date.now()}@gmail.com`,
            password:'12345678',
            confirmpassword:'12345678',
            phone: '0323453452',
            birthday: '1997-08-08',
            gender:'male',
        })

        await page.waitForTimeout(5000)
        const isSuccess = await registerPage.isRegisterSuccess()
        expect(isSuccess).toBe(true)
    })
})