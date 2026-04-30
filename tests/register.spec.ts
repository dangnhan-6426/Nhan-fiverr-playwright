import { RegisterPage } from './../pages/Authentication/registerPage';
import {test, expect} from 'playwright/test'


test.describe('Register test case', () => { 
    test('Fiver_M1_ARS_01: Register account successfully', async ({page})=>{
        const registerPage = new RegisterPage(page)

        await page.goto(registerPage.url)
        await registerPage.register({
            name:`nhan`,
            email:`nhan${Date.now()}@gmail.com`,
            password:`12345678`,
            confirmpassword:`12345678`,
            phone: `0323453452`,
            birthday: `1997-08-08`,
            gender:`male`,
        })

        //Verify message create account successful
        const toast = page.getByRole('alert')
        await expect(toast).toBeVisible()
        await expect(toast).toHaveText('Đăng kí tài khoản thành công !')
    })

    test('Fiver_M1_ARS_02: Register an account using an existing username', async ({page}) =>{
        const registerPage = new RegisterPage(page)
        const name = `nhan`;
        //First register
        await page.goto(registerPage.url)
        await registerPage.register({
            name,
            email:`nhan${Date.now()}@gmail.com`,
            password:`12345678`,
            confirmpassword:`12345678`,
            phone: `0323453452`,
            birthday: `2000-09-09`,
            gender:`male`,
        })
        //Verify message create account successful
        const successToast = page.getByRole('alert')
        await expect(successToast).toBeVisible()
        await expect(successToast).toContainText('Đăng kí tài khoản thành công !')
        // Second register (duplicate name)
        await page.goto(registerPage.url)
        await registerPage.register({
            name,
            email:`nhan${Date.now()}@gmail.com`,
            password:`ndn@1234`,
            confirmpassword:`ndn@1234`,
            phone: `0323254352`,
            birthday: `1998-09-09`,
            gender:`male`,
        })
        //Expect fail Verify error message "username exist"
        const errorToast = page.getByRole('alert')  
        await expect(errorToast).toBeVisible()
        await expect(errorToast).toContainText('Tên người dùng đã tồn tại !')
    })

    test('Fiver_M1_ARS_03: Register an account using an existing email', async ({page}) =>{
        const registerPage = new RegisterPage(page)
        const email = `nhan+${Date.now()}@gmail.com`;
        //===First register
        await page.goto(registerPage.url)
        await registerPage.register({
            name:`nhanmot`,
            email,
            password:`12345678`,
            confirmpassword:`12345678`,
            phone:`0323453452`,
            birthday:`2000-09-09`,
            gender:`male`,
        })
        //Verify message create account successful
        const successToast = page.getByRole('alert')
        await expect(successToast).toBeVisible()
        await expect(successToast).toContainText('Đăng kí tài khoản thành công !')

        // Chờ toast ẩn hoặc page navigate xong trước khi goto lần 2
        await successToast.waitFor({ state: 'hidden' }) // ✅ chờ toast biến mất

        // ===Second register (duplicate email)
        await page.goto(registerPage.url)
        await page.waitForLoadState('networkidle')
        await registerPage.register({
            name:`nhanhai`,
            email,
            password:`12345678`,
            confirmpassword:`12345678`,
            phone:`0323453453`,
            birthday: `1998-09-10`,
            gender:`male`,
        })

        const errorToast = page.getByRole('alert')
        await expect(errorToast).toBeVisible()
        await expect(errorToast, 'BUG: System allows duplicate email').toContainText('Email đã tồn tại !')
        await successToast.waitFor({ state: 'hidden' })
    })

    test('Fiver_M1_ARS_04: Register an account using your registered phone number.',async ({page}) => {
        const registerPage = new RegisterPage(page)
        const phone = `0708878498`;

        await page.goto(registerPage.url)
        await registerPage.register({
            name:`tri`,
            email:`tri${Date.now()}@gmail.com`,
            password:`ndn@1234`,
            confirmpassword:`ndn@1234`,
            phone:`0876372232`,
            birthday: `1998-10-09`,
            gender:`female`,
        })
        //Verify message create account successful
        const successToast = page.getByRole('alert')
        await expect(successToast).toBeVisible()
        await expect(successToast).toContainText('Đăng kí tài khoản thành công !')
        // Second register (duplicate name)
        await page.goto(registerPage.url)
        await registerPage.register({
            name:`thy`,
            email:`thy${Date.now()}@gmail.com`,
            password:`ndn@1234`,
            confirmpassword:`ndn@1234`,
            phone: `0876372232`,
            birthday: `1995-09-09`,
            gender:`male`,
        })
        //Expect fail Verify error message "username exist"
        const errorToast = page.getByRole('alert')  
        await expect(errorToast).toBeVisible()
        await expect(errorToast).toContainText('Số điện thoại đã được đăng ký!')
    })

    test('Fiver_M1_ARS_05: Register an account with a date of birth that has already been registered',async ({page}) => {
        const registerPage = new RegisterPage(page)
        const birthday = `1998-09-09`;
        //First register
        await page.goto(registerPage.url)
        await registerPage.register({
            name:`bao`,
            email:`bao${Date.now()}@gmail.com`,
            password:`12345678`,
            confirmpassword:`12345678`,
            phone: `0323453452`,
            birthday,
            gender:`male`,
        })
        await expect(registerPage.successToast).toBeVisible()
        //Second register
        await page.goto(registerPage.url)
        await registerPage.register({
            name:`trong`,
            email:`trong${Date.now()}@gmail.com`,
            password:`12345678`,
            confirmpassword:`12345678`,
            phone: `0323254352`,
            birthday,
            gender:`female`,
        })
        //Expect success because a birthday should NOT be the only one.
        const Toast = page.getByRole('alert')
        await expect(Toast).toBeVisible()
        await expect(Toast,'BUG: System should NOT reject registration based on duplicate birthday').toContainText('Đăng kí tài khoản thành công !')
    })

    test.only('Fiver_M1_ARS_06: Verify the notification when leaving the "your name" field', async ({page}) => {
        const registerPage = new RegisterPage(page)

        await page.goto(registerPage.url)
        await registerPage.register({
            email: 'sam@gmail.com',
            password: 'sam@123',
            confirmpassword: 'sam@123',
            phone: '0862173946',
            birthday: '2000-01-01',
            gender: 'male',
        })
        await expect(registerPage.nameError).toBeVisible()
    })



})
