import { RegisterPage } from '../../pages/Authentication/registerPage';
import  { test, expect } from '@playwright/test';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../constants/message';

test.describe('Register test case', () => { 
    let registerPage : RegisterPage
    test.beforeEach(async ({page}) => {
        registerPage = new RegisterPage(page)
        await registerPage.navigateToRegisterPage()
    })
    test('Fiver_M1_ARS_01: Register account successfully', async ({page}) => {
        //Access go to url 
        await registerPage.navigateToRegisterPage()
        await registerPage.register({
            name:`nhan`,
            email:`nhan${Date.now()}@gmail.com`,
            password:`12345678`,
            confirmpassword:`12345678`,
            phone: `0323453452`,
            birthday: `1997-08-08`,
            gender:`male`,
            agreeTerms:true,
        })

        //Verify message create account successful
        await expect(registerPage.getSuccessMessageToast(`${SUCCESS_MESSAGES.auth.register}`)).toBeVisible()
    })

    test('Fiver_M1_ARS_02: Register an account using an existing username', async ({page}) => {
        const name = `nhan`;
        //First register
        //Access go to url 
        await registerPage.navigateToRegisterPage()
        await registerPage.register({
            name,
            email:`nhan${Date.now()}@gmail.com`,
            password:`12345678`,
            confirmpassword:`12345678`,
            phone: `0323453452`,
            birthday: `2000-09-09`,
            gender:`male`,
            agreeTerms:true,
        })
        //Verify message create account successful
        await expect(registerPage.getSuccessMessageToast(`${SUCCESS_MESSAGES.auth.register}`)).toBeVisible()
        // Second register (duplicate name)
        //Access go to url 
        await registerPage.navigateToRegisterPage()
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
        await expect(registerPage.getErrorMessageToast(`${ERROR_MESSAGES.name.alreadyExists}`)).toBeVisible()
    })

    test('Fiver_M1_ARS_03: Register an account using an existing email', async ({page}) => {
        const email = `nhan+${Date.now()}@gmail.com`;
        //===First register
        //Access go to url 
        await registerPage.navigateToRegisterPage()
        await registerPage.register({
            name:`nhanmot`,
            email,
            password:`12345678`,
            confirmpassword:`12345678`,
            phone:`0323453452`,
            birthday:`2000-09-09`,
            gender:`male`,
            agreeTerms:true,
        })
        //Verify message create account successful
        await expect(registerPage.getSuccessMessageToast(`${SUCCESS_MESSAGES.auth.register}`)).toBeVisible()

        // ===Second register (duplicate email)
        //Access go to url 
        await registerPage.navigateToRegisterPage()
        await registerPage.register({
            name:`nhanhai`,
            email,
            password:`12345678`,
            confirmpassword:`12345678`,
            phone:`0323453453`,
            birthday: `1998-09-10`,
            gender:`male`,
        })

        await expect(registerPage.getErrorMessageToast(`${ERROR_MESSAGES.email.alreadyExists}`)).toBeVisible()
        // await successToast.waitFor({ state: 'hidden' })
    })

    test('Fiver_M1_ARS_04: Register an account using your registered phone number.',async ({page}) => {
        const phone = `0708878498`;
        //Access go to url 
        await registerPage.navigateToRegisterPage()
        await registerPage.register({
            name:`tri`,
            email:`tri${Date.now()}@gmail.com`,
            password:`ndn@1234`,
            confirmpassword:`ndn@1234`,
            phone,
            birthday: `1998-10-09`,
            gender:`female`,
            agreeTerms:true,
        })
        //Verify message create account successful
        await expect(registerPage.getSuccessMessageToast(`${SUCCESS_MESSAGES.auth.register}`)).toBeVisible()
        // Second register (duplicate name)
        //Access go to url 
        await registerPage.navigateToRegisterPage()
        await registerPage.register({
            name:`thy`,
            email:`thy${Date.now()}@gmail.com`,
            password:`ndn@1234`,
            confirmpassword:`ndn@1234`,
            phone,
            birthday: `1995-09-09`,
            gender:`male`,
        })
        //Expect fail Verify error message "username exist"
        await expect(registerPage.getErrorMessageToast(`${ERROR_MESSAGES.phone.alreadyExists}`)).toBeVisible()
    })

    test('Fiver_M1_ARS_05: Register an account with a date of birth that has already been registered',async ({page}) => {
        const birthday = `1998-09-09`;
        //First register
        //Access go to url 
        await registerPage.navigateToRegisterPage()
        await registerPage.register({
            name:`bao`,
            email:`bao${Date.now()}@gmail.com`,
            password:`12345678`,
            confirmpassword:`12345678`,
            phone: `0323453452`,
            birthday,
            gender:`male`,
            agreeTerms:true,
        })
        await expect(registerPage.getSuccessMessageToast(`${SUCCESS_MESSAGES.auth.register}`)).toBeVisible()
        //Second register
        //Access go to url 
        await registerPage.navigateToRegisterPage()
        await registerPage.register({
            name:`trong`,
            email:`trong${Date.now()}@gmail.com`,
            password:`12345678`,
            confirmpassword:`12345678`,
            phone: `0323254352`,
            birthday,
            gender:`female`,
            agreeTerms:true,
        })
        //Expect success because a birthday should NOT be the only one.
        await expect(registerPage.getSuccessMessageToast(`${SUCCESS_MESSAGES.auth.register}`)).toBeVisible()
    })

    test('Fiver_M1_ARS_06: Verify the notification when leaving the "your name" field', async ({page}) => {
        //Access go to url 
        await registerPage.navigateToRegisterPage()
        await registerPage.register({
            email: 'sam@gmail.com',
            password: 'sam@123',
            confirmpassword: 'sam@123',
            phone: '0862173946',
            birthday: '2000-01-01',
            gender: 'male',
            agreeTerms:true,
        })
        await expect(registerPage.getFieldError(`${ERROR_MESSAGES.name.empty}`)).toBeVisible()
    })

    test('Fiver_M1_ARS_07: Verify the notification when leaving the "Your Email" field', async ({page}) => {
      //Access go to url 
      await registerPage.navigateToRegisterPage()
      await registerPage.register({
        name:'sam',
        password:'sam@123',
        confirmpassword: 'sam@123',
        phone: '0862173946',
        birthday: '2000-01-01',
        gender: 'male',
        agreeTerms:true,
      })
      await expect(registerPage.getFieldError(`${ERROR_MESSAGES.email.emptyAlt}`)).toBeVisible()

    })

    test('Fiver_M1_ARS_08: Verify the notification when leaving the "Your Password" field', async ({page}) => {
      //Access go to url 
        await registerPage.navigateToRegisterPage()
      await registerPage.register({
        name:'sam',
        email:'sam@gmail.com',
        confirmpassword: 'sam@123',
        phone: '0862173946',
        birthday: '2000-01-01',
        gender: 'male',
        agreeTerms:true,
      })
      await expect(registerPage.getFieldError(`${ERROR_MESSAGES.password.emptyAlt}`)).toBeVisible()

    })

    test('Fiver_M1_ARS_09: Verify the notification when leaving the "Repeat Your Password" field', async ({page}) => {
        //Access go to url 
        await registerPage.navigateToRegisterPage()
        await registerPage.register({
            name:`nhan`,
            email:`nhan${Date.now()}@gmail.com`,
            password:`12345678`,
            phone: `0323453452`,
            birthday: `1997-08-08`,
            gender:`male`,
            agreeTerms:true,
        })
        //Verify message create account successful
        await expect(registerPage.getFieldError(`${ERROR_MESSAGES.confirmPassword.empty}`)).toBeVisible()
    })

    test('Fiver_M1_ARS_10: Verify the notification when leaving the "Your Phone" field', async ({page}) => {
        //Access go to url 
        await registerPage.navigateToRegisterPage()
        await registerPage.register({
            name:`nhan`,
            email:`nhan${Date.now()}@gmail.com`,
            password:`sam@123`,
            confirmpassword: 'sam@123',
            birthday: `1997-08-08`,
            gender:`male`,
            agreeTerms:true,
        })
        //Verify message create account successful
        await expect(registerPage.getFieldError(`${ERROR_MESSAGES.phone.empty}`)).toBeVisible()
    })

    test('Fiver_M1_ARS_11: Verify the notification when leaving the "Birthday" field', async ({page}) => {
        //Access go to url 
        await registerPage.navigateToRegisterPage()

        await registerPage.register({
            name:`nhan`,
            email:`nhan${Date.now()}@gmail.com`,
            password:`sam@123`,
            confirmpassword: 'sam@123',
            phone: `0323453452`,
            gender:`male`,
            agreeTerms:true,
        })
        //Verify message create account successful
        await expect(registerPage.getFieldError(`${ERROR_MESSAGES.birthday.empty}`)).toBeVisible()
    })

    test('Fiver_M1_ARS_12: Verify the notification when uncheck "I agree all statements in Terms of service" field', async ({page}) => {
        //Access go to url
        await registerPage.navigateToRegisterPage()
        await registerPage.register({
            name:`nhan`,
            email:`nhan${Date.now()}@gmail.com`,
            password:`sam@123`,
            confirmpassword: 'sam@123',
            phone: `0323453452`,
            birthday: `1997-08-08`,
            gender:`male`,
            agreeTerms:false,
        })
        // Verify form don't submit (browser native tooltip)
        // await expect(page).toHaveURL(registerPage.url)
        // //Verify checkbox invalid
        // const valueMissing = await registerPage.agreeCheckbox.evaluate((el: HTMLInputElement) => el.validity.valueMissing)
        // expect(valueMissing).toBe(true)
        await expect(page).toHaveScreenshot('agree-checkbox-warning.png')
    })

    test('Fiver_M1_ARS_13: Verify notifications when the password and repeat your password are incorrect.', async ({page}) => {
         //Access go to url 
        await registerPage.navigateToRegisterPage()

        await registerPage.register({
            name:`nhan`,
            email:`nhan${Date.now()}@gmail.com`,
            password:`sam@123`,
            confirmpassword: '123',
            phone: `0323453452`,
            birthday: `1997-08-08`,
            gender:`male`,
            agreeTerms:true,
        })
        // Verify form don't submit (browser native tooltip)
        await expect(registerPage.getFieldError(`${ERROR_MESSAGES.confirmPassword.mismatch}`)).toBeVisible()
        
    })

})
