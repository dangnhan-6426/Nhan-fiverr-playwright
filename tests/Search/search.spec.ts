import { expect, test } from "@playwright/test";
import { SearchPage } from "../../pages/Search/searchPage";
import { keyWordSearch } from '../../data/searchData';

test.describe('Testcase search', () => {

    test('Fiver_M2_SFS_22: Search with valid keywords', async({ page }) => {
        const searchPage = new SearchPage(page)

        await searchPage.AccessWebPage()
        await searchPage.search({
            search: 'logo'
        })
        //Verify result after search
        expect(await searchPage.isSearchSuccess(keyWordSearch.key)).toBeTruthy()
        expect(await searchPage.isResultCountMatch()).toBeTruthy()
    })
})