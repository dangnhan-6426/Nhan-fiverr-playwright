import {expect, Locator, Page} from "@playwright/test";
import * as fs from 'fs'
export class SearchPage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly buttonSearch: Locator;
    readonly resultTitle: Locator;
    readonly serviceCards: Locator;

    readonly url: string = "https://demo4.cybersoft.edu.vn/"

    constructor(page: Page) {
        this.page = page
        this.searchInput = page.locator('input[name="searchInputCarousel"]').or(page.locator('input[name="resultParam"]').filter({ visible: true}))
        this.buttonSearch = page.getByRole("button", {name: "Search"})
        this.resultTitle = page.locator('.result-sort').locator('div').first()
        this.serviceCards = page.locator('div.service-card.card')
    }

    //Access go to url
    async AccessWebPage(): Promise<void>{
        await this.page.goto(this.url)
    }

    //Clear input
    async clearInputSearch(): Promise<void>{
        await this.searchInput.clear()
    }

    //Search
    async search(data:{search?: string}):
    Promise<void>{
        await this.searchInput.fill(data.search ?? '')
        await this.buttonSearch.click()
        await this.page.waitForURL(`**/result/**`)
        await this.page.waitForLoadState('networkidle')
        await this.page.waitForTimeout(4000)
        // Chờ data load xong
        await this.page.waitForFunction(() => {
            const el = document.querySelector('.result-sort div')
            return el && !el.textContent?.includes('0 services')
        })
        fs.mkdirSync('tests/Search/screenshots', { recursive: true })
        await this.page.screenshot({ 
            path: `tests/Search/screenshots/result-${data.search}.png`, 
            fullPage: true 
        })
        console.log('✅ Chụp xong!')
    }

    //Verify result search
    async isSearchSuccess(keyword: string): Promise<boolean>{
        await this.page.waitForURL(`**\/result\/${keyword}**`)
        return this.page.url() === `https://demo4.cybersoft.edu.vn/result/${keyword}`
    }

    //Verify services after search success
    async getResultCount(): Promise<number>{
        return await this.serviceCards.count()
    }

    async isResultCountMatch(): Promise<boolean>{
        //Waiting loading data
        await this.resultTitle.waitFor({ state: 'visible'})
        await expect(this.resultTitle).not.toHaveText('0 services available')

        const cardCount = await this.serviceCards.count()
        const titleText = await this.resultTitle.innerText()
        const titleCount = parseInt(titleText.match(/\d+/)?.[0] ?? '0')
        return cardCount === titleCount && cardCount > 0
    }
}