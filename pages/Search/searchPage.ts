import {expect, Locator, Page} from "@playwright/test";
import * as fs from 'fs'
export class SearchPage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly buttonSearch: Locator;
    readonly resultMessage: Locator;
    readonly category: Locator;
    readonly webPrograming: Locator;
    //URL
    readonly url: string = "https://demo4.cybersoft.edu.vn/"

    constructor(page: Page) {
        this.page = page
        this.searchInput = page.locator('input[name="searchInputCarousel"]').or(page.locator('input[name="resultParam"]').filter({ visible: true}))
        this.buttonSearch = page.getByRole("button", {name: "Search"})
        this.resultMessage = page.locator('div.number-of-result span.pre-title')
        this.category = page.getByRole('button', {name:'Category'})
        this.webPrograming = page.locator('ul.dropdown-menu.show li a.dropdown-item', {hasText:'Web Programing'})
    }

    //Access go to url
    async accessWebPage(): Promise<void>{
        await this.page.goto(this.url)
    }

    // Search
    async searchFeature(keyword: string): Promise<void>{
        await this.searchInput.clear()
        await this.searchInput.fill(keyword)
        await this.buttonSearch.click()
        await this.page.waitForURL('**/result/**')
        if (keyword.trim().length > 0){
            await this.resultMessage.waitFor({state:'visible'})
        }
        await this.page.waitForTimeout(3000)
    }

    //Verify the return of the result URL.
    async isSearchSuccess(keyword: string): Promise<boolean>{
        const encodeKeyword = encodeURIComponent(keyword.trim())
        const currentUrl = this.page.url()
        return currentUrl.includes (`/result/${encodeKeyword}`)
    }

    //Verify services displayed in the search results
    async getSearchResults(): Promise<string[]> {
        const results = await this.page.locator('div.service-item').allTextContents()
        return results.map(result => result.trim()).filter(result => result.length > 0)
    }

    async getServiceCount(): Promise<number>{
        return await this.page.locator('div.service-card.card').count()
    }

    //Function screen shots
    async takeScreenShot(name: string): Promise<void>{
        fs.mkdirSync('tests/Search/screenshots', {recursive: true})
        await this.page.screenshot({
            path:`tests/Search/screenshots/${name}.png`,
            fullPage:true
        })
    }

    // Search by button
    async searchByButton(keyword: string): Promise<number>{
        await this.searchInput.clear()
        await this.searchInput.fill(keyword)
        
        const start = Date.now()
        await this.buttonSearch.click()
        await this.page.waitForURL('**/result**')
        await this.resultMessage.waitFor({ state: 'visible' })
        await this.page.waitForTimeout(2000)
        
        return Date.now() - start
    }

    //Search by enter
    async searchByEnter(keyword: string): Promise<number>{
        await this.searchInput.clear()
        await this.searchInput.fill(keyword)
        
        const start = Date.now()
        await this.searchInput.press('Enter')
        await this.page.waitForURL('**/result**')
        await this.resultMessage.waitFor({ state: 'visible' })
        await this.page.waitForTimeout(2000)
        
        return Date.now() - start
    }


     
}