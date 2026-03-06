import { Page } from 'playwright';
import {expect} from "@playwright/test";
import holidayEntitlementBasedOn_content from "../content/holidayEntitlementBasedOn_content";
import axeTest from "../accessibilityTestHelper";
import { CommonConstants } from "../content/common_constants"
import { CommonFunctions } from "./commonFunctions"

class HolidayEntitlementBasedOnPage {
    private readonly continueButtonLabel: string;
    private readonly radioButtonDaysWorkedPerWeek: string;
    private readonly radioButtonHoursWorkedPerWeek: string;
    private readonly radioButtonAnnualisedHours: string;
    private readonly radioButtonCompressedHours: string;
    private readonly radioButtonShifts: string;
    private readonly errorBanner: string;
    private readonly errorMessage: string;

    constructor() {
        this.radioButtonDaysWorkedPerWeek = `label[for="response-0"]`
        this.radioButtonHoursWorkedPerWeek = `label[for="response-1"]`
        this.radioButtonAnnualisedHours = `label[for="response-2"]`
        this.radioButtonCompressedHours = `label[for="response-3"]`
        this.radioButtonShifts = `label[for="response-4"]`
        this.continueButtonLabel = 'Continue'
        this.errorBanner = `.govuk-error-summary__title`
        this.errorMessage = `.govuk-error-message`
    }

    async checkPageLoads(page: Page): Promise<void> {
        await Promise.all([
            expect(page.locator(CommonConstants.TITLE_CLASS)).toHaveText(holidayEntitlementBasedOn_content.pageTitle),
            expect(page.locator(CommonConstants.TEXT_CLASS)).toContainText(holidayEntitlementBasedOn_content.divText),
            expect(page.locator(this.radioButtonDaysWorkedPerWeek)).toContainText(holidayEntitlementBasedOn_content.radioDaysPerWeek),
            expect(page.locator(this.radioButtonHoursWorkedPerWeek)).toContainText(holidayEntitlementBasedOn_content.radioHoursPerWeek),
            expect(page.locator(this.radioButtonAnnualisedHours)).toContainText(holidayEntitlementBasedOn_content.radioAnnualisedHours),
            expect(page.locator(this.radioButtonCompressedHours)).toContainText(holidayEntitlementBasedOn_content.radioCompressedHours),
            expect(page.locator(this.radioButtonShifts)).toContainText(holidayEntitlementBasedOn_content.radioShifts),
        ]);
        await axeTest(page);
    }

    async accessibility(page): Promise<void> {
        axeTest(page);
    }

    async clickDaysWorkedPerWeek(page: Page): Promise<void> {
        await page.click(this.radioButtonDaysWorkedPerWeek);
    }

    async clickHoursWorkedPerWeek(page: Page): Promise<void> {
        await page.click(this.radioButtonHoursWorkedPerWeek);
    }

    async clickAnnualisedHours(page: Page): Promise<void> {
        await page.click(this.radioButtonAnnualisedHours);
    }

    async clickCompressedHours(page: Page): Promise<void> {
        await page.click(this.radioButtonCompressedHours);
    }

    async clickShifts(page: Page): Promise<void> {
        await page.click(this.radioButtonShifts);
    }

    async continueOn(page: Page): Promise<void> {
        CommonFunctions.continueOn(page, this.continueButtonLabel);
    }

    async triggerErrorMessages(page: Page): Promise<void> {
        await CommonFunctions.continueOn(page, this.continueButtonLabel);
        await Promise.all([
                expect(page.locator(this.errorBanner)).toHaveText(holidayEntitlementBasedOn_content.errorBanner),
                expect(page.locator(this.errorMessage).first()).toContainText(holidayEntitlementBasedOn_content.errorMessage),
            ]);
    }
}

export default HolidayEntitlementBasedOnPage;