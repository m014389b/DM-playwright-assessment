import { Page } from 'playwright';
import {expect} from "@playwright/test";
import daysInShiftPattern_content from "../content/daysInShiftPattern_content";
import axeTest from "../accessibilityTestHelper";
import { CommonConstants } from "../content/common_constants"
import { CommonFunctions } from "./commonFunctions"

class DaysInShiftPatternPage {

    private readonly daysInShiftPatternInput: string;
    private readonly continueButtonLabel: string;
    private readonly title: string;
    private readonly errorBanner: string;
    private readonly errorMessage: string;

    constructor() {
        this.title = ".govuk-label-wrapper";
        this.daysInShiftPatternInput = `#response`
        this.continueButtonLabel = 'Continue'
        this.errorBanner = `.govuk-error-summary__title`
        this.errorMessage = `.govuk-error-message`
    }

    async checkPageLoads(page: Page): Promise<void> {
        await Promise.all([
            expect(page.locator(this.title)).toHaveText(daysInShiftPattern_content.pageTitle),
            expect(page.locator(CommonConstants.TEXT_CLASS)).toContainText(daysInShiftPattern_content.divText),
        ]);
        await axeTest(page);
    }

    async inputDaysInShiftPattern(page: Page): Promise<void> {
        await CommonFunctions.retriableFill(page, this.daysInShiftPatternInput, "5");
    }

   async continueOn(page: Page): Promise<void> {
        CommonFunctions.continueOn(page, this.continueButtonLabel);
    }

    async accessibility(page): Promise<void> {
        axeTest(page);
    }

    async triggerInvalidDayErrorMessages(page: Page): Promise<void> {
        await CommonFunctions.retriableFill(page, this.daysInShiftPatternInput, "1");
        await CommonFunctions.continueOn(page, this.continueButtonLabel);
        await Promise.all([
                    expect(page.locator(this.errorBanner)).toHaveText(daysInShiftPattern_content.errorBanner),
                    expect(page.locator(this.errorMessage).first()).toContainText(daysInShiftPattern_content.errorMessage_greaterThanShifts),
                ]);
    }

}

export default DaysInShiftPatternPage;