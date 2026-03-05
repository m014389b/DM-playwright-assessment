import { Page } from 'playwright';
import {expect} from "@playwright/test";
import employmentEndDate_content from "../content/employmentEndDate_content";
import axeTest from "../accessibilityTestHelper";
import { CommonConstants } from "../content/common_constants"
import { CommonFunctions } from "./commonFunctions"

class EmploymentEndDatePage {
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
            expect(page.locator(CommonConstants.TITLE_CLASS)).toHaveText(employmentEndDate_content.pageTitle),
            expect(page.locator(this.dayText)).toContainText(employmentEndDate_content.dayText),
            expect(page.locator(this.monthText)).toContainText(employmentEndDate_content.monthText),
            expect(page.locator(this.yearText)).toContainText(employmentEndDate_content.yearText),
        ]);
        await axeTest(page);
    }

    async inputDate(page: Page): Promise<void> {
        await CommonFunctions.retriableFill(page, this.dayInput, "1");
        await CommonFunctions.retriableFill(page, this.monthInput, "2");
        await CommonFunctions.retriableFill(page, this.yearInput, "2026");
    }

   async continueOn(page: Page): Promise<void> {
        CommonFunctions.continueOn(page, this.continueButtonLabel);
    }

    async triggerNoContentErrorMessages(page: Page): Promise<void> {
        await this.continueOn(page);
        await CommonFunctions.assertErrorMessageExactMatch(page, this.errorBanner, employmentEndDate_content.errorBanner);
        await CommonFunctions.assertErrorMessagesContainMatch(page, this.errorMessage, employmentEndDate_content.errorMessage);
    }

    async triggerGreaterThanOneYearErrorMessages(page: Page): Promise<void> {
        await CommonFunctions.retriableFill(page, this.dayInput, "1");
        await CommonFunctions.retriableFill(page, this.monthInput, "1");
        await CommonFunctions.retriableFill(page, this.yearInput, "2027");
        await this.continueOn(page);

        await CommonFunctions.assertErrorMessageExactMatch(page, this.errorBanner, employmentEndDate_content.errorBanner);
        await CommonFunctions.assertErrorMessagesContainMatch(page, this.errorMessage, employmentEndDate_content.errorMessage_MoreThanOneYearAfterStartDate);
    }

    async triggerBeforeStartDateErrorMessages(page: Page): Promise<void> {
        await CommonFunctions.retriableFill(page, this.dayInput, "1");
        await CommonFunctions.retriableFill(page, this.monthInput, "1");
        await CommonFunctions.retriableFill(page, this.yearInput, "2024");
        await this.continueOn(page);

        await CommonFunctions.assertErrorMessageExactMatch(page, this.errorBanner, employmentEndDate_content.errorBanner);
        await CommonFunctions.assertErrorMessagesContainMatch(page, this.errorMessage, employmentEndDate_content.errorMessage_BeforeStartDate);
    }
}

export default EmploymentEndDatePage;