import { Page } from 'playwright';
import {expect} from "@playwright/test";
import landingPage_content from "../content/landingPage_content";
import axeTest from "../accessibilityTestHelper";
import { CommonConstants } from "../content/common_constants"
import { CommonFunctions } from "./commonFunctions"

class LandingPage {
    private readonly title: string;
    private readonly text: string;
    private readonly startButtonLabel: string;

    constructor() {
        this.title = `.govuk-heading-xl`
        this.text = `.gem-c-govspeak`
        this.startButtonLabel = 'Start now'
    }

    async checkPageLoads(page: Page): Promise<void> {
        await page.goto(CommonConstants.HOLIDAY_CALCULATOR_URL);

        await Promise.all([
            expect(page.locator(this.title)).toHaveText(landingPage_content.pageTitle),
            expect(page.locator(this.text)).toContainText(landingPage_content.pText1),
            expect(page.locator(this.text)).toContainText(landingPage_content.pText2),
            expect(page.locator(this.text)).toContainText(landingPage_content.liText1),
            expect(page.locator(this.text)).toContainText(landingPage_content.liText2),
        ]);
//         await axeTest(page);
    }

    async continueOn(page: Page): Promise<void> {
        CommonFunctions.continueOn(page, this.startButtonLabel);
    }

}

export default LandingPage;