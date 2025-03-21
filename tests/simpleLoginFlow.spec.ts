import {test, expect, devices, BrowserContext, Page} from '@playwright/test'

test.use({
    ...devices['iPhone 13'],
  })


test 

test('simple multiplayer login flow', async ({browser}) => {

    const requiredPlayers = 4

    const creatorContext = await browser.newContext({...devices['iPhone 13']})
    const creatorPage = await creatorContext.newPage()
    await creatorPage.goto('http://localhost:5173/')

    // Host creates a game
    await creatorPage.getByRole('button', {name: 'Create Game'}).tap()
    await creatorPage.getByRole('combobox').tap()
    await creatorPage.getByRole('option', {name: requiredPlayers.toString()}).tap()
    await creatorPage.getByRole('button', {name: 'Submit'}).tap()
    await creatorPage.getByRole('button', {name: 'Mystery in the Mansion | 4'}).tap()
    await creatorPage.getByRole('button', {name: 'Create Game'}).tap()
    await creatorPage.getByRole('textbox', {name: 'Enter your preferred name'}).tap()
    await creatorPage.getByRole('textbox', {name: 'Enter your preferred name'}).fill('rooid')
    await creatorPage.getByRole('button', {name: 'Submit'}).tap()
    const roomCode = await creatorPage.locator('span[data-testid="room-code"]').textContent()
    if (!roomCode) {
        throw new Error("Room code not found")
    }
    console.log("roomCode: ", roomCode)


    // Create player context for joining
    const playerContexts: BrowserContext[] = [];
    const playerPages: Page[] = [];
    for (let i = 0; i < requiredPlayers - 1; i++) {
        const context = await browser.newContext({...devices['iPhone 13']})
        const page = await context.newPage();
        playerContexts.push(context);
        playerPages.push(page);
    }

    // Players join the game
    await Promise.all(playerPages.map(async (page: Page, idx: number) => {
        await page.goto('http://localhost:5173/')
        await page.getByRole('button', {name: 'Join Game'}).tap()
        await page.getByRole('textbox', {name: 'Enter Room ID'}).tap()
        await page.getByRole('textbox', {name: 'Enter Room ID'}).fill(roomCode)
        await page.getByRole('button', {name: 'Join Room'}).tap()
        await page.getByRole('textbox', {name: 'Enter your preferred name'}).tap()
        await page.getByRole('textbox', {name: 'Enter your preferred name'}).fill(`rooid${idx}`)
        await page.getByRole('button', {name: 'Submit'}).tap()
    }))

    // Wait for the lobby to update with all players
    await creatorPage.waitForTimeout(2000)

    // Check that all players are in the lobby
    const players = await creatorPage.locator('[data-testid="player-name"]').all()
    const playerNames = await Promise.all(players.map(async (player) => {
        return player.textContent()
    }))

    // Count the number of players in the lobby
    expect(playerNames.length).toBe(requiredPlayers)

    // check the host is listed
    expect(playerNames).toContain('rooid')

    // check the players are listed
    for (let i = 0; i < requiredPlayers - 1; i++) {
        expect(playerNames).toContain(`rooid${i}`)
    }

    await new Promise(() => {});
    await creatorPage.pause()

    for (const context of playerContexts) {
        await context.close()
    }
    await creatorContext.close()
})