import { Page } from 'playwright';
import {expect} from "@playwright/test";
import irregularHours_content from "../content/irregularHours_content";
import axeTest from "../accessibilityTestHelper";
import { CommonConstants } from "../content/common_constants"
import { CommonFunctions } from "./commonFunctions"

class IrregularHoursPage {
    private readonly continueButtonLabel: string;
    private readonly radioButtonYes: string;
    private readonly radioButtonNo: string;
    private readonly errorBanner: string;
    private readonly errorMessage: string;

    constructor() {
        this.radioButtonYes = `label[for="response-0"]`
        this.radioButtonNo = `label[for="response-1"]`
        this.continueButtonLabel = 'Continue'
        this.errorBanner = `.govuk-error-summary__title`
        this.errorMessage = `.govuk-error-message`
    }

    async checkPageLoads(page: Page): Promise<void> {
        await Promise.all([
            expect(page.locator(CommonConstants.TITLE_CLASS)).toHaveText(irregularHours_content.pageTitle),
            expect(page.locator(CommonConstants.TEXT_CLASS)).toContainText(irregularHours_content.divText),
            expect(page.locator(this.radioButtonYes)).toContainText(irregularHours_content.radioYes),
            expect(page.locator(this.radioButtonNo)).toContainText(irregularHours_content.radioNo),
        ]);
//         await axeTest(page);
    }

    async clickYes(page: Page): Promise<void> {
        await page.click(this.radioButtonYes);
    }

    async clickNo(page: Page): Promise<void> {
        await page.click(this.radioButtonNo);
    }

    async continueOn(page: Page): Promise<void> {
        CommonFunctions.continueOn(page, this.continueButtonLabel);
    }

    async triggerErrorMessages(page: Page): Promise<void> {
        await this.continueOn(page);
        await Promise.all([
            expect(page.locator(this.errorBanner)).toHaveText(irregularHours_content.errorBanner),
            expect(page.locator(this.errorMessage)).toContainText(irregularHours_content.errorMessage),
        ]);
    }
}

export default IrregularHoursPage;