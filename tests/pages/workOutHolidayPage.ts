import { Page } from 'playwright';
import {expect} from "@playwright/test";
import workoutHoliday_content from "../content/workoutHoliday_content";
import axeTest from "../accessibilityTestHelper";
import { CommonConstants } from "../content/common_constants"
import { CommonFunctions } from "./commonFunctions"

class WorkOutHolidayPage {
    private readonly fullYearText: string;
    private readonly startingPartWayThroughYearText: string;
    private readonly leavingPartWayThroughYearText: string;
    private readonly startingAndLeavingPartWayThroughYearText: string;
    private readonly continueButtonLabel: string;
    private readonly errorBanner: string;
    private readonly errorMessage: string;

    constructor() {
        this.fullYearText = `label[for="response-0"]`
        this.startingPartWayThroughYearText = `label[for="response-1"]`
        this.leavingPartWayThroughYearText = `label[for="response-2"]`
        this.startingAndLeavingPartWayThroughYearText = `label[for="response-3"]`
        this.continueButtonLabel = 'Continue'
        this.errorBanner = `.govuk-error-summary__title`
        this.errorMessage = `.govuk-error-message`
    }

    async checkPageLoads(page: Page): Promise<void> {
        await Promise.all([
            expect(page.locator(CommonConstants.TITLE_CLASS)).toHaveText(workoutHoliday_content.pageTitle),
        ]);
        await this.checkPageLoadsCommon(page);
    }

    async checkPageLoads_Shifts(page: Page): Promise<void> {
        await Promise.all([
            expect(page.locator(CommonConstants.TITLE_CLASS)).toHaveText(workoutHoliday_content.pageTitleAlt),
        ]);
        await this.checkPageLoadsCommon(page);
    }

    async checkPageLoadsCommon(page: Page): Promise<void> {
        await Promise.all([
            expect(page.locator(this.fullYearText)).toContainText(workoutHoliday_content.fullYearText),
            expect(page.locator(this.startingPartWayThroughYearText)).toContainText(workoutHoliday_content.startingPartWayThroughYearText),
            expect(page.locator(this.leavingPartWayThroughYearText)).toContainText(workoutHoliday_content.leavingPartWayThroughYearText),
            expect(page.locator(this.startingAndLeavingPartWayThroughYearText)).toContainText(workoutHoliday_content.startingAndLeavingPartWayThroughYearText),
        ]);
//         await axeTest(page);
    }

    async clickFullYear(page: Page): Promise<void> {
        await page.click(this.fullYearText);
    }

    async clickStartingPartWayThroughYear(page: Page): Promise<void> {
        await page.click(this.startingPartWayThroughYearText);
    }

    async clickLeavingPartWayThroughYear(page: Page): Promise<void> {
        await page.click(this.leavingPartWayThroughYearText);
    }

    async clickStartingAndLeavingPartWayThroughYearText(page: Page): Promise<void> {
        await page.click(this.startingAndLeavingPartWayThroughYearText);
    }

    async continueOn(page: Page): Promise<void> {
//         CommonFunctions.continueOn(page, this.continueButtonLabel);
                await page.getByRole("button", { name: "Continue" }).click();
    }

    async triggerErrorMessages(page: Page): Promise<void> {
        await this.continueOn(page);
            await Promise.all([
                    expect(page.locator(this.errorBanner)).toHaveText(workoutHoliday_content.errorBanner),
                    expect(page.locator(this.errorMessage)).toContainText(workoutHoliday_content.errorMessage),
                ]);
//         await CommonFunctions.triggerErrorMessages(page, CommonFunctions.errorMessageFactory(this.errorBanner, workoutHoliday_content.errorBanner, this.errorMessage, workoutHoliday_content.errorMessage));
    }
}

export default WorkOutHolidayPage;