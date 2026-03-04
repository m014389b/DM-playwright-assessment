import { Page } from "@playwright/test";
import { ErrorMessage } from "../content/common_constants"
import {expect} from "@playwright/test";

export class CommonFunctions {

    static async continueOn(page: Page, continuePageText: string): Promise<void> {
        page.getByRole("button", { name: continuePageText}).click();
    }

    static async triggerErrorMessages(page: Page, errorMessage: ErrorMessage): Promise<void> {
        Promise.all([
            expect(page.locator(errorMessage.errorBannerClass)).toHaveText(errorMessage.errorBannerText),
            expect(page.locator(errorMessage.errorMessageClass)).toContainText(errorMessage.errorMessageText),
        ]);
    }

    static errorMessageFactory(errorBannerClass: string, errorBannerText: string, errorMessageClass: string, errorMessageText: string): ErrorMessage {
     return {
         errorBannerClass: errorBannerClass,
         errorBannerText: errorBannerText,
         errorMessageClass: errorMessageClass,
         errorMessageText: errorMessageText
         } as ErrorMessage;
    }
}
