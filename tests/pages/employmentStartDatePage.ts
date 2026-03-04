import { Page } from 'playwright';
import {expect} from "@playwright/test";
import employmentStartDate_content from "../content/employmentStartDate_content";
import axeTest from "../accessibilityTestHelper";
import { CommonConstants } from "../content/common_constants"
import { CommonFunctions } from "./commonFunctions"

class EmploymentStartDatePage {
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
            expect(page.locator(CommonConstants.TITLE_CLASS)).toHaveText(employmentStartDate_content.pageTitle),
            expect(page.locator(CommonConstants.TEXT_CLASS)).toContainText(employmentStartDate_content.divText),
            expect(page.locator(this.dayText)).toContainText(employmentStartDate_content.dayText),
            expect(page.locator(this.monthText)).toContainText(employmentStartDate_content.monthText),
            expect(page.locator(this.yearText)).toContainText(employmentStartDate_content.yearText),
        ]);
        await axeTest(page);
    }

    async inputDate(page: Page): Promise<void> {
        await page.locator(this.dayInput).fill("1");
        await page.locator(this.monthInput).fill("10");
        await page.locator(this.yearInput).fill("2025");
    }

   async continueOn(page: Page): Promise<void> {
        CommonFunctions.continueOn(page, this.continueButtonLabel);
    }

    async triggerErrorMessages(page: Page): Promise<void> {
        await this.continueOn(page);
        await Promise.all([
            expect(page.locator(this.errorBanner)).toHaveText(annualLeaveStartDate_content.errorBanner),
            expect(page.locator(this.errorMessage).first()).toContainText(annualLeaveStartDate_content.errorMessage),
        ]);
    }
}

export default EmploymentStartDatePage;