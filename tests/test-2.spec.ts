import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.locator('body').click();
  await page.getByRole('button', { name: 'Create Game' }).click();
  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: '3' }).click();
  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: '4' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Mystery in the Mansion | 4' }).click();
  await page.getByRole('button', { name: 'Create Game' }).click();
  await page.getByRole('textbox', { name: 'Enter your preferred name' }).click();
  await page.getByRole('textbox', { name: 'Enter your preferred name' }).fill('rooid');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('11eF0d13e').click({
    button: 'right'
  });
});