import { expect, test } from "@playwright/test";

test("loginComSucesso", async ({ page }) => {
    const errorLabel = await page.locator('[data-test="error"]');

    await page.goto("https://www.saucedemo.com/");
    await expect(errorLabel).not.toBeVisible();

    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    const span = page.locator("span.title");
    await expect(span).toHaveText("Products");
})

test("loginComUsuarioBloqueado", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");

    await page.locator('[data-test="username"]').fill("locked_out_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    const errorLabel = await page.locator('[data-test="error"]');

    await expect(errorLabel).toHaveText("Epic sadface: Sorry, this user has been locked out.");
    await expect(errorLabel).toBeVisible();
})

test("LoginComUsernameErrado", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");

    await page.locator('[data-test="username"]').fill("standard_userr");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    const passwordErrorLabel = page.locator('[data-test="error"]');
    await expect(passwordErrorLabel).toHaveText("Epic sadface: Username and password do not match any user in this service");
    await expect(passwordErrorLabel).toBeVisible();
})

test("LoginComSenhaErrada", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");

    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauceeee");
    await page.locator('[data-test="login-button"]').click();

    const passwordErrorLabel = page.locator('[data-test="error"]');
    await expect(passwordErrorLabel).toHaveText("Epic sadface: Username and password do not match any user in this service");
    await expect(passwordErrorLabel).toBeVisible();
})