import {
  AfterAll,
  BeforeAll,
  Given,
  Then,
  When
} from '@cucumber/cucumber';
import {
  chromium,
  expect,
  Browser,
  BrowserContext,
  Page
} from '@playwright/test';

import { HomePage } from '../pages/HomePage';
import { testUrl } from '../constants';

let browser: Browser;
let context: BrowserContext;
let page: Page;
let homePage: HomePage;

BeforeAll(async () => {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
  homePage = new HomePage(page);
})

AfterAll(async () => {
  if (page) await page.close();
  if (context) await context.close();
  if (browser) await browser.close();
});

Given('HomePage open page', async function() {
  await homePage.navigateTo(testUrl)
});

Given('HomePage has a form NewTask', function () {
  expect(page.getByRole('form')).toBeTruthy();
});

Given('NewTask form has a text field', async function () {
  expect(page.getByPlaceholder('Название задачи')).toBeTruthy();
});

Given('NewTask form has a submit button', async function () {
  expect(page.getByPlaceholder('Добавить')).toBeTruthy();
});

Then('User provides the name for the new task {string}',
  async function (taskName: string) {

  await page.getByPlaceholder('Название задачи').click();
  await page.getByPlaceholder('Название задачи').fill(taskName);
});

Then('User clicks the submit button', async function () {
  await page.getByRole('button', { name: 'Добавить' }).click();
});

When('A new task is created', async function () {
  await expect(page.getByText('Test 🍅 ')).toBeVisible();
});

When('The new task is displayed in the list', async function () {
  await expect(page.getByText('Test 🍅 ')).toBeVisible();
});
