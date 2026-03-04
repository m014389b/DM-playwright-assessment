import { Page } from "@playwright/test";
import { ErrorMessage } from "../content/common_constants"
import {expect} from "@playwright/test";

export class CommonFunctions {

    static async continueOn(page: Page, continuePageText: string): Promise<void> {
        page.getByRole("button", { name: continuePageText}).click();
    }

    static async triggerErrorMessages(page: Page, errorBannerClass: string, errorBannerText :string, errorMessageClass: string, errorMessageText: string): Promise<void> {
        Promise.all([
            expect(page.locator(errorBannerClass)).toHaveText(errorBannerText),
            expect(page.locator(errorMessageClass)).toContainText(errorMessageText),
        ]);
    }
}
