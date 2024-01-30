import { test, expect } from '@playwright/test';

test('test', async ({ page, browserName }) => {
  await page.goto('http://192.168.1.2:18084/');
  await page.getByRole('button', { name: 'Спрятать помощь' }).click();
  await page.getByPlaceholder('Название задачи').click();
  await page.getByPlaceholder('Название задачи').fill('Test');
  await page.getByRole('button', { name: 'Добавить' }).click();
  await page.locator('.menubutton__menuButton--36QzX').click();
  await page.getByText('Увеличить 🍅').click({
    clickCount: 3
  });
  await page.getByRole('button', { name: 'Старт' }).click();
  await expect(page.getByText('Test 🍅 🍅 🍅 🍅')).toBeVisible();
  await expect(page.getByText('TestПомидор:')).toBeVisible();
  await expect(page.getByText('Статус - Выполняется')).toBeVisible();
  await page.getByRole('button', { name: 'Стоп' }).click();
  await expect(page.getByText('Статус -')).toBeVisible();
  await expect(page.getByText('Статус - Не начато')).toBeVisible();
  await page.getByRole('button', { name: 'Старт' }).click();
  await page.getByRole('button', { name: 'Пауза' }).click();
  await expect(page.getByText('Статус - На паузе')).toBeVisible();
  await page.getByRole('button', { name: 'Продолжить' }).click();
  await expect(page.getByText('Статус - Выполняется')).toBeVisible();
  await page.getByRole('button', { name: 'Пауза' }).click();
  await page.getByRole('button', { name: 'Сделано' }).click();
  await expect(page.getByText('Помидор:')).toBeVisible();
  await expect(page.getByText('Test ✅ 🍅 🍅 🍅')).toBeVisible();
  await page.screenshot({ path: 'test-results/homepage-'+browserName+'.png', fullPage: true });
});