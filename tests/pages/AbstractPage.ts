import { Page } from '@playwright/test';

export abstract class AbstractPage {

  // a page from Playwright
  protected page: Page;

  private static BASIC_XPATH = {
    heading: "//h2[text()='%s']",
    label: "//label[text()='%s']"
  }

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string) {
    await this.page.goto(url, {
      waitUntil: 'domcontentloaded',
    });
  }

  async findElement(selector: string) {
    await this.page.waitForSelector(selector);
  }

  async verifyElementExists(selector: string) {
    try {
      await this.page.waitForSelector(selector,
        {
          state: 'visible',
          timeout: 5000
        });
      return this.page.locator(selector);
    } catch (error) {
      throw new Error(`Unable to verify element with selector "${selector}", not found: ${error}`);
    }
  }

  async enterText(selector: string, text: string) {
    await this.verifyElementExists(selector)
    await this.page.fill(selector, text);
  }

}