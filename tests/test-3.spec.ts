import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Join Game' }).click();
  await page.getByRole('textbox', { name: 'Enter Room ID' }).click();
  await page.getByRole('textbox', { name: 'Enter Room ID' }).fill('SIkz6whZt');
  await page.getByRole('button', { name: 'Join Room' }).click();
  await page.getByRole('textbox', { name: 'Enter your preferred name' }).click();
  await page.getByRole('textbox', { name: 'Enter your preferred name' }).fill('roody');
  await page.getByRole('button', { name: 'Submit' }).click();
});