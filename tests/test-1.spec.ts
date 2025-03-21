import { test, expect, devices } from '@playwright/test';

test.use({
  ...devices['iPhone 12 Pro'],
})

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Create Game' }).click();
  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: '4' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Mystery in the Mansion | 4' }).click();
  await page.getByRole('button', { name: 'Create Game' }).click();
  await page.getByRole('textbox', { name: 'Enter your preferred name' }).click();
  await page.getByRole('textbox', { name: 'Enter your preferred name' }).fill('Bobby');
  await page.getByRole('textbox', { name: 'Enter your preferred name' }).press('Enter');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('img').click();
});