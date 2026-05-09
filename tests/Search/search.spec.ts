import { expect, test } from "@playwright/test";
import { SearchPage } from "../../pages/Search/searchPage";


test.describe('Testcase search', () => {
    let searchPage: SearchPage

    test.beforeEach(async ({ page }) => {
        searchPage = new SearchPage(page)
        await searchPage.accessWebPage()
    })

    test('Fiver_M2_SFS_22: Search with valid keywords', async({ page }) => {
        await searchPage.searchFeature('logo')

        expect(await searchPage.isSearchSuccess('logo')).toBeTruthy()
        await expect(searchPage.resultMessage).not.toContainText('0 services available')
        //Verify service count
        const cardCount = await searchPage.getServiceCount()
        expect(cardCount).toBeGreaterThan(0)

    })

    test('Fiver_M2_SFS_23: Invalid keyword search', async({page})=>{
        await searchPage.searchFeature('jenkins')
        await searchPage.takeScreenShot('search-jenkins')

        expect(await searchPage.isSearchSuccess('jenkins')).toBeTruthy()
        await expect(searchPage.resultMessage).toContainText('0 services available')
        expect(await searchPage.getServiceCount()).toBe(0)
    })

    test('Fiver_M2_SFS_24:Search with empty keywords', async({page})=>{
        await searchPage.searchFeature('')
        await searchPage.takeScreenShot('empty')

        await expect(page).toHaveURL(`${searchPage.url}result/`)
    })

    test('Fiver_M2_SFS_25: Search with special characters', async({page})=>{
        await searchPage.searchFeature('@#$%')

        await expect(page).toHaveURL(/\/result\//)
        await expect(searchPage.resultMessage).toContainText('0 services available')
        expect(await searchPage.getServiceCount()).toBe(0)
    })

    test('Fiver_M2_SFS_26: Search using a keyword that is 255 characters long', async({page})=>{
        await searchPage.searchFeature('automationtestingplaywrighttypescriptsearchfeaturevalidationperformanceboundarytestingsecurityinputdataverificationfiverrapplicationqualityassuranceendtoendtestingfunctionaltestingresponsivedesignuserexperienceautomationframeworkintegrationtesting')

        expect(await searchPage.isSearchSuccess('automationtestingplaywrighttypescriptsearchfeaturevalidationperformanceboundarytestingsecurityinputdataverificationfiverrapplicationqualityassuranceendtoendtestingfunctionaltestingresponsivedesignuserexperienceautomationframeworkintegrationtesting')).toBeTruthy()
        await expect(searchPage.resultMessage).toContainText('0 services available')
        expect(await searchPage.getServiceCount()).toBe(0)
    })

    test('Fiver_M2_SFS_27: Search with keywords containing spaces', async({page})=>{
        await searchPage.searchFeature('logo design')

        await expect(page).toHaveURL(/\/result\/logo%20design/)
        await expect(searchPage.resultMessage).not.toContainText('0 services available')
        const cardCount = await searchPage.getServiceCount()
        expect(cardCount).toBeGreaterThan(0)
    })

    test('Fiver_M2_SFS_28: Compare search time: Button vs Enter', async({page})=>{
        //Compare time press button
        await searchPage.accessWebPage()
        const buttonTime = await searchPage.searchByButton('logo')
        
        // Compare time press Enter
        await searchPage.accessWebPage()
        const enterTime = await searchPage.searchByEnter('logo')

        console.log(`Button: ${buttonTime}ms`)
        console.log(`Enter:  ${enterTime}ms`)
        console.log(`Diff:   ${Math.abs(buttonTime - enterTime)}ms`)

        expect(buttonTime).toBeLessThan(5000)
        expect(enterTime).toBeLessThan(5000)
    })

    test('Fiver_M2_SFS_29: Filter Categories by Web Programming', async({page})=>{
        await searchPage.searchFeature('logo')
        await searchPage.category.click()
        await searchPage.webPrograming.click()

        await searchPage.takeScreenShot('SFS_29')
        // BUG: href="#a" — filter không hoạt động
        // Expected: kết quả phải được filter theo Web Programming
        // Actual: URL chỉ thêm #a, vẫn hiển thị 6 services
        await expect(page).toHaveURL(/result\/logo#a/)
        expect(await searchPage.getServiceCount()).toBe(0) // <- Failed
    })

    
})
