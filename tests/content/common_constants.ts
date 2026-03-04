export class CommonConstants {
    static readonly HOLIDAY_CALCULATOR_URL: string = "https://www.gov.uk/calculate-your-holiday-entitlement";
    static readonly TITLE_CLASS: string = ".govuk-fieldset__heading";
    static readonly TEXT_CLASS: string = ".govuk-hint";
    static readonly CONTINUE_BUTTON_TEXT: string = "Continue";
}

export type ErrorMessage = {
           errorBannerClass: string;
           errorBannerText: string;
           errorMessageClass: string;
           errorMessageText: string;
}