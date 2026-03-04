import {expect, test} from "@playwright/test";
import LandingPage from "./pages/landingPage";
import IrregularHoursPage from "./pages/irregularHoursPage";
import AnnualLeaveStartDatePage from "./pages/annualLeaveStartDatePage";
import HolidayEntitlementBasedOnPage from "./pages/holidayEntitlementBasedOnPage";
import WorkOutHolidayPage from "./pages/workOutHolidayPage";
import CalculatedEntitlementPage from "./pages/calculatedEntitlementPage";
import EmploymentStartDatePage from "./pages/employmentStartDatePage";
import EmploymentEndDatePage from "./pages/employmentEndDatePage";
import HoursPerShiftPage from "./pages/hoursPerShiftPage";
import ShiftAmountPage from "./pages/shiftAmountPage";
import DaysInShiftPatternPage from "./pages/daysInShiftPatternPage";


test.describe('Holiday entitlement ', () => {
    test.skip(`Holiday entitlement for a full leave year with annualised hours and other options`, async ({ page }): Promise<void> => {
        const landingPage: landingPage = new LandingPage();
        await landingPage.checkPageLoads(page);
        await landingPage.continueOn(page);

        const irregularHoursPage: irregularHoursPage = new IrregularHoursPage();
        await irregularHoursPage.checkPageLoads(page);
    //     await irregularHoursPage.triggerErrorMessages(page);
        await irregularHoursPage.clickYes(page);
        await irregularHoursPage.continueOn(page);

        const annualLeaveStartDatePage: annualLeaveStartDatePage = new AnnualLeaveStartDatePage();
        await annualLeaveStartDatePage.checkPageLoads(page);
    //     await annualLeaveStartDatePage.triggerErrorMessages(page);
        await annualLeaveStartDatePage.inputDateOnOctoberFirst1998(page);
        await annualLeaveStartDatePage.continueOn(page);

        const holidayEntitlementBasedOnPage: holidayEntitlementBasedOnPage = new HolidayEntitlementBasedOnPage();
        await holidayEntitlementBasedOnPage.checkPageLoads(page);
    //     await holidayEntitlementBasedOnPage.triggerErrorMessages(page);
        await holidayEntitlementBasedOnPage.clickAnnualisedHours(page);
        await holidayEntitlementBasedOnPage.continueOn(page);

        const workOutHolidayPage: workOutHolidayPage = new WorkOutHolidayPage();
        await workOutHolidayPage.checkPageLoads(page);
    //     await workOutHolidayPage.triggerErrorMessages(page);
        await workOutHolidayPage.clickFullYear(page);
        await workOutHolidayPage.continueOn(page);

        const calculatedEntitlementPage: calculatedEntitlementPage = new CalculatedEntitlementPage();
        await calculatedEntitlementPage.checkFullYearLeaveAnnualisedPageLoads(page);
    });

 test(`Holiday entitlement for someone starting and leaving part way through a leave year with shifts and other options`, async ({ page }): Promise<void> => {
        const landingPage: landingPage = new LandingPage();
        await landingPage.checkPageLoads(page);
        await landingPage.continueOn(page);

        const irregularHoursPage: irregularHoursPage = new IrregularHoursPage();
        await irregularHoursPage.checkPageLoads(page);
    //     await irregularHoursPage.triggerErrorMessages(page);
        await irregularHoursPage.clickYes(page);
        await irregularHoursPage.continueOn(page);

        const annualLeaveStartDatePage: annualLeaveStartDatePage = new AnnualLeaveStartDatePage();
        await annualLeaveStartDatePage.checkPageLoads(page);
    //     await annualLeaveStartDatePage.triggerErrorMessages(page);
        await annualLeaveStartDatePage.inputDateOnOctoberFirst1998(page);
        await annualLeaveStartDatePage.continueOn(page);

        const holidayEntitlementBasedOnPage: holidayEntitlementBasedOnPage = new HolidayEntitlementBasedOnPage();
        await holidayEntitlementBasedOnPage.checkPageLoads(page);
    //     await holidayEntitlementBasedOnPage.triggerErrorMessages(page);
        await holidayEntitlementBasedOnPage.clickShifts(page);
        await holidayEntitlementBasedOnPage.continueOn(page);

        const workOutHolidayPage: workOutHolidayPage = new WorkOutHolidayPage();
        await workOutHolidayPage.checkPageLoads_Shifts(page);
    //     await workOutHolidayPage.triggerErrorMessages(page);
        await workOutHolidayPage.clickStartingAndLeavingPartWayThroughYearText(page);
        await workOutHolidayPage.continueOn(page);

        const employmentStartDatePage: employmentStartDatePage = new EmploymentStartDatePage();
        await employmentStartDatePage.checkPageLoads(page);
//         await employmentStartDatePage.triggerErrorMessages(page);
        await employmentStartDatePage.inputDate(page);
        await employmentStartDatePage.continueOn(page);

 // What was the employment end date? (enter value)
        const employmentEndDatePage: employmentEndDatePage = new EmploymentEndDatePage();
        await employmentEndDatePage.checkPageLoads(page);
//         await employmentEndDatePage.triggerErrorMessages(page);
        await employmentEndDatePage.inputDate(page);
        await employmentEndDatePage.continueOn(page);

  // How many hours in each shift? (enter value)
        const hoursPerShiftPage: hoursPerShiftPage = new HoursPerShiftPage();
        await hoursPerShiftPage.checkPageLoads(page);
//         await hoursPerShiftPage.triggerErrorMessages(page);
        await hoursPerShiftPage.inputHours(page);
        await hoursPerShiftPage.continueOn(page);

  // How many shifts will be worked per shift pattern? (enter value)
        const shiftAmountPage: shiftAmountPage = new ShiftAmountPage();
        await shiftAmountPage.checkPageLoads(page);
//         await shiftAmountPage.triggerErrorMessages(page);
        await shiftAmountPage.inputShifts(page);
        await shiftAmountPage.continueOn(page);


  // How many days in the shift pattern? (enter value)
        const daysInShiftPatternPage: daysInShiftPatternPage = new DaysInShiftPatternPage();
        await daysInShiftPatternPage.checkPageLoads(page);
//         await daysInShiftPatternPage.triggerErrorMessages(page);
        await daysInShiftPatternPage.inputDaysInShiftPattern(page);
        await daysInShiftPatternPage.continueOn(page);

        const calculatedEntitlementPage: calculatedEntitlementPage = new CalculatedEntitlementPage();
        await calculatedEntitlementPage.checkStartAndLeaveSameYearShiftPatternPageLoads(page);
    });


});