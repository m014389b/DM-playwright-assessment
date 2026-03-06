import { Page } from "@playwright/test";
import { ErrorMessage } from "../content/common_constants"
import {expect} from "@playwright/test";

export class CommonFunctions {

    static async continueOn(page: Page, continuePageText: string): Promise<void> {
        await page.getByRole("button", { name: continuePageText}).click();
    }

    static async retriableFill(page: Page, locator: string, inputValue: string): Promise<void> {
        let ok = false;
        const maxRetries = 3;

        for (let i = 0; i < maxRetries && !ok; i++) {
        ok = await this.fillValue(page, locator, inputValue);
            if (!ok) {
                await page.waitForTimeout(200);
            }
        }

        if (!ok) {
            throw new Error("Input not populated after retries");
        }
    }

    static async fillValue(page: Page, locator: string, inputValue: string): Promise<boolean> {
        await page.locator(locator).fill(inputValue);
        const actual = await page.locator(locator).inputValue();
        return actual === inputValue;
    }

}
