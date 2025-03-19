import {test, expect} from '@playwright/test';

test('has title', async ({page}) => {
  await page.goto('http://localhost:5173/');

  await expect(page.getByRole('heading', { name: 'Welcome to Jubensha' })).toBeVisible();

});