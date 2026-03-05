import { Page } from 'playwright';
import {expect} from "@playwright/test";
import annualLeaveStartDate_content from "../content/annualLeaveStartDate_content";
import axeTest from "../accessibilityTestHelper";
import { CommonConstants } from "../content/common_constants"
import { CommonFunctions } from "./commonFunctions"

class AnnualLeaveStartDatePage {
    private readonly dayText: string;
    private readonly monthText: string;
    private readonly yearText: string;
    private readonly dayInput: string;
    private readonly monthInput: string;
    private readonly yearInput: string;
    private readonly continueButtonLabel: string;
    private readonly errorBanner: string;
    private readonly errorMessage: string;

    constructor() {
        this.dayText = `label[for="response-0"]`
        this.monthText = `label[for="response-1"]`
        this.yearText = `label[for="response-2"]`
        this.dayInput = `#response-0`
        this.monthInput = `#response-1`
        this.yearInput = `#response-2`

        this.continueButtonLabel = 'Continue'
        this.errorBanner = `.govuk-error-summary__title`
        this.errorMessage = `.govuk-error-message`
    }

    async checkPageLoads(page: Page): Promise<void> {
        await Promise.all([
            expect(page.locator(CommonConstants.TITLE_CLASS)).toHaveText(annualLeaveStartDate_content.pageTitle),
            expect(page.locator(CommonConstants.TEXT_CLASS)).toContainText(annualLeaveStartDate_content.divText),
            expect(page.locator(this.dayText)).toContainText(annualLeaveStartDate_content.dayText),
            expect(page.locator(this.monthText)).toContainText(annualLeaveStartDate_content.monthText),
            expect(page.locator(this.yearText)).toContainText(annualLeaveStartDate_content.yearText),
        ]);
    }
    async accessibility(page): Promise<void> {
        axeTest(page);
    }

    async inputDateOnOctoberFirst1998(page: Page): Promise<void> {
        await CommonFunctions.retriableFill(page, this.dayInput, "1");
        await CommonFunctions.retriableFill(page, this.monthInput, "10");
        await CommonFunctions.retriableFill(page, this.yearInput, "1998");
    }

   async continueOn(page: Page): Promise<void> {
        CommonFunctions.continueOn(page, this.continueButtonLabel);
    }

    async triggerErrorMessages(page: Page): Promise<void> {
        await this.continueOn(page);
        await CommonFunctions.assertErrorMessageExactMatch(page, this.errorBanner, annualLeaveStartDate_content.errorBanner);
        await CommonFunctions.assertErrorMessagesContainMatch(page, this.errorMessage, annualLeaveStartDate_content.errorMessage);
    }
}

export default AnnualLeaveStartDatePage;