import { Page } from 'playwright';
import { expect } from "@playwright/test";
import { fullYearLeaveAnnualised_calculatedEntitlement_content, common_calculatedEntitlement_content, partYearShiftPattern_calculatedEntitlement_content } from "../content/calculatedEntitlement_content";
import axeTest from "../accessibilityTestHelper";
import { CommonConstants } from "../content/common_constants"
import { CommonFunctions } from "./commonFunctions"

class CalculatedEntitlementPage {
    private readonly title: string;
    private readonly text: string;

    constructor() {
        this.title = `.govuk-heading-xl`
        this.text = `.govuk-govspeak`
    }

    async checkFullYearLeaveAnnualisedPageLoads(page: Page): Promise<void> {
        await Promise.all([
            expect(page.locator(this.title)).toContainText(common_calculatedEntitlement_content.pageTitle),
            expect(page.locator(this.text)).toContainText(fullYearLeaveAnnualised_calculatedEntitlement_content.calculationText),
            expect(page.locator(this.text)).toContainText(common_calculatedEntitlement_content.rulesText),
            expect(page.locator(this.text)).toContainText(common_calculatedEntitlement_content.employerListText),
            expect(page.locator(this.text)).toContainText(common_calculatedEntitlement_content.employerListText2),
            expect(page.locator(this.text)).toContainText(fullYearLeaveAnnualised_calculatedEntitlement_content.employerListText),
            expect(page.locator(this.text)).toContainText(fullYearLeaveAnnualised_calculatedEntitlement_content.employerListText2),

            expect(page.locator(this.text)).toContainText(fullYearLeaveAnnualised_calculatedEntitlement_content.userText),
            expect(page.locator(this.text)).toContainText(fullYearLeaveAnnualised_calculatedEntitlement_content.userListText),
       ]);
        await this.assertLinks(page);
    }

    async checkStartAndLeaveSameYearShiftPatternPageLoads(page: Page): Promise<void> {
        await Promise.all([
            expect(page.locator(this.title)).toContainText(common_calculatedEntitlement_content.pageTitle),
            expect(page.locator(this.text)).toContainText(partYearShiftPattern_calculatedEntitlement_content.calculationText),
            expect(page.locator(this.text)).toContainText(common_calculatedEntitlement_content.rulesText),
            expect(page.locator(this.text)).toContainText(partYearShiftPattern_calculatedEntitlement_content.employerListText),
            expect(page.locator(this.text)).toContainText(partYearShiftPattern_calculatedEntitlement_content.employerListText2),
            expect(page.locator(this.text)).toContainText(common_calculatedEntitlement_content.employerListText2),

            expect(page.locator('a', { hasText: common_calculatedEntitlement_content.calculatorHomePageLinkText })).toHaveAttribute('href', 'https://www.gov.uk/calculate-your-holiday-entitlement/y' ),
            expect(page.locator('a', { hasText: common_calculatedEntitlement_content.holidayPayLinkText })).toHaveAttribute('href', '/holiday-entitlement-rights/holiday-pay-the-basics'),
            expect(page.locator('a', { hasText: common_calculatedEntitlement_content.guidanceLinkText })).toHaveAttribute('href', '/holiday-entitlement-rights')
       ]);
        await this.assertLinks(page);
    }

    async assertLinks(page: Page): Promise<void> {
        await Promise.all([
            expect(page.locator('a', { hasText: common_calculatedEntitlement_content.calculatorHomePageLinkText })).toHaveAttribute('href', 'https://www.gov.uk/calculate-your-holiday-entitlement/y' ),
            expect(page.locator('a', { hasText: common_calculatedEntitlement_content.holidayPayLinkText })).toHaveAttribute('href', '/holiday-entitlement-rights/holiday-pay-the-basics'),
            expect(page.locator('a', { hasText: common_calculatedEntitlement_content.guidanceLinkText })).toHaveAttribute('href', '/holiday-entitlement-rights')
       ]);
    }

    async accessibility(page): Promise<void> {
        axeTest(page);
   }

}

export default CalculatedEntitlementPage;