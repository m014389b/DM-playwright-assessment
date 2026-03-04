import { Page } from 'playwright';
import {expect} from "@playwright/test";
import hoursPerShift_content from "../content/hoursPerShift_content";
import axeTest from "../accessibilityTestHelper";
import { CommonConstants } from "../content/common_constants"
import { CommonFunctions } from "./commonFunctions"

class HoursPerShiftPage {
    private readonly hoursPerShiftInput: string;
    private readonly continueButtonLabel: string;
    private readonly errorBanner: string;
    private readonly errorMessage: string;

    constructor() {
        this.hoursPerShiftInput = `#response`
        this.continueButtonLabel = 'Continue'
        this.errorBanner = `.govuk-error-summary__title`
        this.errorMessage = `.govuk-error-message`
    }

    async checkPageLoads(page: Page): Promise<void> {
        await Promise.all([
            expect(page.locator(CommonConstants.TITLE_CLASS)).toHaveText(hoursPerShift_content.pageTitle),
        ]);
        await axeTest(page);
    }

    async inputHours(page: Page): Promise<void> {
        await page.locator(this.hoursPerShiftInput).fill("1");
    }

   async continueOn(page: Page): Promise<void> {
        CommonFunctions.continueOn(page, this.continueButtonLabel);
    }

    async triggerErrorMessages(page: Page): Promise<void> {
        await this.continueOn(page);
        await Promise.all([
            expect(page.locator(this.errorBanner)).toHaveText(hoursPerShift_content.errorBanner),
            expect(page.locator(this.errorMessage).first()).toContainText(hoursPerShift_content.errorMessage),
        ]);
    }
}

export default HoursPerShiftPage;