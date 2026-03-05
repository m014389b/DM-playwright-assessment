import { Page } from "@playwright/test";
import { ErrorMessage } from "../content/common_constants"
import {expect} from "@playwright/test";

export class CommonFunctions {

    static async continueOn(page: Page, continuePageText: string): Promise<void> {
        page.getByRole("button", { name: continuePageText}).click();
    }

    static async assertErrorMessageExactMatch(page: Page, locator: string, text :string): Promise<void> {
        Promise.all([
            expect(page.locator(locator)).toHaveText(text),
        ]);
    }

    static async assertErrorMessagesContainMatch(page: Page, locator: string, text :string): Promise<void> {
        Promise.all([
            expect(page.locator(locator).first()).toContainText(text),
        ]);
    }

    static async retriableFill(page: Page, locator: string, inputValue: string) {
        let ok = false;
        const maxRetries = 3;

        for (let i = 0; i < maxRetries && !ok; i++) {
        ok = await this.fillValue(page, locator, inputValue);
            if (!ok) {
                await page.waitForTimeout(200);
            }
        }

        if (!ok) {
            throw new Error("Date inputs not populated after retries");
        }
    }

    static async fillValue(page: Page, locator: string, inputValue: string) {
        await page.locator(locator).fill(inputValue);
        const actual = await page.locator(locator).inputValue();
        return actual === inputValue;
    }


}
