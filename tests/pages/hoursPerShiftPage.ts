import { Page } from 'playwright';
import {expect} from "@playwright/test";
import hoursPerShift_content from "../content/hoursPerShift_content";
import axeTest from "../accessibilityTestHelper";
import { CommonConstants } from "../content/common_constants"
import { CommonFunctions } from "./commonFunctions"

class HoursPerShiftPage {
    private readonly hoursPerShiftInput: string;
    private readonly continueButtonLabel: string;
    private readonly title: string;
    private readonly errorBanner: string;
    private readonly errorMessage: string;

    constructor() {
        this.title = ".govuk-label-wrapper";
        this.hoursPerShiftInput = `#response`;
        this.continueButtonLabel = 'Continue';
        this.errorBanner = `.govuk-error-summary__title`;
        this.errorMessage = `.govuk-error-message`;
    }

    async checkPageLoads(page: Page): Promise<void> {
        await Promise.all([
            expect(page.locator(this.title)).toHaveText(hoursPerShift_content.pageTitle),
        ]);
        await axeTest(page);
    }

    async inputHours(page: Page): Promise<void> {
        await CommonFunctions.retriableFill(page, this.hoursPerShiftInput, "1");
    }

   async continueOn(page: Page): Promise<void> {
        CommonFunctions.continueOn(page, this.continueButtonLabel);
    }

    async triggerErrorMessages(page: Page): Promise<void> {
        await this.continueOn(page);
        await CommonFunctions.assertErrorMessageExactMatch(page, this.errorBanner, hoursPerShift_content.errorBanner);
        await CommonFunctions.assertErrorMessagesContainMatch(page, this.errorMessage, hoursPerShift_content.errorMessage);
    }
}

export default HoursPerShiftPage;