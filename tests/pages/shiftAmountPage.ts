import { Page } from 'playwright';
import {expect} from "@playwright/test";
import shiftAmount_content from "../content/shiftAmount_content";
import axeTest from "../accessibilityTestHelper";
import { CommonConstants } from "../content/common_constants"
import { CommonFunctions } from "./commonFunctions"

class ShiftAmountPage {

    private readonly shiftAmountInput: string;
    private readonly continueButtonLabel: string;
    private readonly title: string;
    private readonly errorBanner: string;
    private readonly errorMessage: string;

    constructor() {
        this.title = ".govuk-label-wrapper";
        this.shiftAmountInput = `#response`
        this.continueButtonLabel = 'Continue'
        this.errorBanner = `.govuk-error-summary__title`
        this.errorMessage = `.govuk-error-message`
    }

    async checkPageLoads(page: Page): Promise<void> {
        await Promise.all([
            expect(page.locator(this.title)).toHaveText(shiftAmount_content.pageTitle),
        ]);
    }

   async accessibility(page): Promise<void> {
        axeTest(page);
   }

    async inputShifts(page: Page): Promise<void> {
        await CommonFunctions.retriableFill(page, this.shiftAmountInput, "3");
    }

   async continueOn(page: Page): Promise<void> {
        CommonFunctions.continueOn(page, this.continueButtonLabel);
    }

    async triggerErrorMessages(page: Page): Promise<void> {
        await this.continueOn(page);
        await CommonFunctions.assertErrorMessageExactMatch(page, this.errorBanner, shiftAmount_content.errorBanner);
        await CommonFunctions.assertErrorMessagesContainMatch(page, this.errorMessage, shiftAmount_content.errorMessage);
    }
}

export default ShiftAmountPage;