/* eslint-disable */
import { test, expect } from "@playwright/test";
function generateRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
test("registration flow", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const randomFirstName = generateRandomString(6);
  const randomLastName = generateRandomString(6);
  const randomUserId = `${randomFirstName.toLowerCase()}${Math.floor(
    Math.random() * 1000
  )}@example.com`;
  const randomPassword = `Password@${Math.floor(Math.random() * 1000)}`;
  await page.getByRole("heading", { name: "Sports Day Event" }).click();
  await page.getByRole("heading", { name: "Registration Form" }).click();
  await page.getByPlaceholder("Enter your first name").click();
  await page.getByPlaceholder("Enter your first name").press("CapsLock");
  await page.getByPlaceholder("Enter your first name").fill(randomFirstName);
  await page.getByPlaceholder("Enter your first name").press("Tab");
  await page.getByPlaceholder("Enter your last name").press("CapsLock");
  await page.getByPlaceholder("Enter your last name").fill(randomLastName);
  await page.getByPlaceholder("Enter your userid").click();
  await page.getByPlaceholder("Enter your userid").fill(randomUserId);
  await page.getByPlaceholder("Enter your password").click();
  await page.getByPlaceholder("Enter your password").press("CapsLock");
  await page.getByPlaceholder("Enter your password").fill(randomPassword);
  await page.getByRole("button", { name: "Register" }).click();
  await page.waitForSelector("text=Registration Successful", {
    state: "visible",
  });
});
test("login flow", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const randomFirstName = generateRandomString(6);
  const randomLastName = generateRandomString(6);
  const randomUserId = `${randomFirstName.toLowerCase()}${Math.floor(
    Math.random() * 1000
  )}@example.com`;
  const randomPassword = `Password@${Math.floor(Math.random() * 1000)}`;
  await page.getByRole("heading", { name: "Sports Day Event" }).click();
  await page.getByRole("heading", { name: "Registration Form" }).click();
  await page.getByPlaceholder("Enter your first name").click();
  await page.getByPlaceholder("Enter your first name").press("CapsLock");
  await page.getByPlaceholder("Enter your first name").fill(randomFirstName);
  await page.getByPlaceholder("Enter your first name").press("Tab");
  await page.getByPlaceholder("Enter your last name").press("CapsLock");
  await page.getByPlaceholder("Enter your last name").fill(randomLastName);
  await page.getByPlaceholder("Enter your userid").click();
  await page.getByPlaceholder("Enter your userid").fill(randomUserId);
  await page.getByPlaceholder("Enter your password").click();
  await page.getByPlaceholder("Enter your password").press("CapsLock");
  await page.getByPlaceholder("Enter your password").fill(randomPassword);
  await page.getByRole("button", { name: "Register" }).click();
  await page.waitForTimeout(1500);
  await page.getByPlaceholder("Enter your userid").click();
  await page.getByPlaceholder("Enter your userid").fill(randomUserId);
  await page.getByPlaceholder("Enter your password").click();
  await page.getByPlaceholder("Enter your password").press("CapsLock");
  await page.getByPlaceholder("Enter your password").fill(randomPassword);
  await page.getByTestId("login-button").click();
  await page.waitForSelector("text=Login Successful!", {
    state: "visible",
  });
});
test("Select events flow", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const randomFirstName = generateRandomString(6);
  const randomLastName = generateRandomString(6);
  const randomUserId = `${randomFirstName.toLowerCase()}${Math.floor(
    Math.random() * 1000
  )}@example.com`;
  const randomPassword = `Password@${Math.floor(Math.random() * 1000)}`;
  await page.getByRole("heading", { name: "Sports Day Event" }).click();
  await page.getByRole("heading", { name: "Registration Form" }).click();
  await page.getByPlaceholder("Enter your first name").click();
  await page.getByPlaceholder("Enter your first name").press("CapsLock");
  await page.getByPlaceholder("Enter your first name").fill(randomFirstName);
  await page.getByPlaceholder("Enter your first name").press("Tab");
  await page.getByPlaceholder("Enter your last name").press("CapsLock");
  await page.getByPlaceholder("Enter your last name").fill(randomLastName);
  await page.getByPlaceholder("Enter your userid").click();
  await page.getByPlaceholder("Enter your userid").fill(randomUserId);
  await page.getByPlaceholder("Enter your password").click();
  await page.getByPlaceholder("Enter your password").press("CapsLock");
  await page.getByPlaceholder("Enter your password").fill(randomPassword);
  await page.getByRole("button", { name: "Register" }).click();
  await page.waitForTimeout(1500);
  await page.getByPlaceholder("Enter your userid").click();
  await page.getByPlaceholder("Enter your userid").fill(randomUserId);
  await page.getByPlaceholder("Enter your password").click();
  await page.getByPlaceholder("Enter your password").press("CapsLock");
  await page.getByPlaceholder("Enter your password").fill(randomPassword);
  await page.getByTestId("login-button").click();
  await page.waitForTimeout(1500);
  await page
    .locator("div")
    .filter({ hasText: /^Butterfly 100MSwimming1:30 PM-2:30 PMSelect$/ })
    .getByRole("button")
    .click();
});
test("Remove event flow", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const randomFirstName = generateRandomString(6);
  const randomLastName = generateRandomString(6);
  const randomUserId = `${randomFirstName.toLowerCase()}${Math.floor(
    Math.random() * 1000
  )}@example.com`;
  const randomPassword = `Password@${Math.floor(Math.random() * 1000)}`;
  await page.getByRole("heading", { name: "Sports Day Event" }).click();
  await page.getByRole("heading", { name: "Registration Form" }).click();
  await page.getByPlaceholder("Enter your first name").click();
  await page.getByPlaceholder("Enter your first name").press("CapsLock");
  await page.getByPlaceholder("Enter your first name").fill(randomFirstName);
  await page.getByPlaceholder("Enter your first name").press("Tab");
  await page.getByPlaceholder("Enter your last name").press("CapsLock");
  await page.getByPlaceholder("Enter your last name").fill(randomLastName);
  await page.getByPlaceholder("Enter your userid").click();
  await page.getByPlaceholder("Enter your userid").fill(randomUserId);
  await page.getByPlaceholder("Enter your password").click();
  await page.getByPlaceholder("Enter your password").press("CapsLock");
  await page.getByPlaceholder("Enter your password").fill(randomPassword);
  await page.getByRole("button", { name: "Register" }).click();
  await page.waitForTimeout(1500);
  await page.getByPlaceholder("Enter your userid").click();
  await page.getByPlaceholder("Enter your userid").fill(randomUserId);
  await page.getByPlaceholder("Enter your password").click();
  await page.getByPlaceholder("Enter your password").press("CapsLock");
  await page.getByPlaceholder("Enter your password").fill(randomPassword);
  await page.getByTestId("login-button").click();
  await page.waitForTimeout(1500);
  await page
    .locator("div")
    .filter({ hasText: /^Butterfly 100MSwimming1:30 PM-2:30 PMSelect$/ })
    .getByRole("button")
    .click();
  await page.getByRole("button", { name: "Remove" }).click();
});
test("Logout flow", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const randomFirstName = generateRandomString(6);
  const randomLastName = generateRandomString(6);
  const randomUserId = `${randomFirstName.toLowerCase()}${Math.floor(
    Math.random() * 1000
  )}@example.com`;
  const randomPassword = `Password@${Math.floor(Math.random() * 1000)}`;
  await page.getByRole("heading", { name: "Sports Day Event" }).click();
  await page.getByRole("heading", { name: "Registration Form" }).click();
  await page.getByPlaceholder("Enter your first name").click();
  await page.getByPlaceholder("Enter your first name").press("CapsLock");
  await page.getByPlaceholder("Enter your first name").fill(randomFirstName);
  await page.getByPlaceholder("Enter your first name").press("Tab");
  await page.getByPlaceholder("Enter your last name").press("CapsLock");
  await page.getByPlaceholder("Enter your last name").fill(randomLastName);
  await page.getByPlaceholder("Enter your userid").click();
  await page.getByPlaceholder("Enter your userid").fill(randomUserId);
  await page.getByPlaceholder("Enter your password").click();
  await page.getByPlaceholder("Enter your password").press("CapsLock");
  await page.getByPlaceholder("Enter your password").fill(randomPassword);
  await page.getByRole("button", { name: "Register" }).click();
  await page.waitForTimeout(1500);
  await page.getByPlaceholder("Enter your userid").click();
  await page.getByPlaceholder("Enter your userid").fill(randomUserId);
  await page.getByPlaceholder("Enter your password").click();
  await page.getByPlaceholder("Enter your password").press("CapsLock");
  await page.getByPlaceholder("Enter your password").fill(randomPassword);
  await page.getByTestId("login-button").click();
  await page.waitForTimeout(1500);
  await page.getByRole("button", { name: "Logout" }).click();
  await page.getByRole("heading", { name: "Login Form" }).click();
});
test("Registration negative flow", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Register" }).click();
  await page.getByText("first name cannot be blank").click();
  await page.getByText("last name cannot be blank").click();
  await page.getByText("userId field cannot be blank").click();
  await page.getByText("password field cannot be blank").click();
});
test("Login negative flow", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.getByTestId("login-button").click();
  await page.getByText("userid is mandatory").click();
  await page.getByText("password is a mandatory field").click();
});
test("direct access to events without logging in should fallback to login", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/events");
  await page.getByRole("heading", { name: "Login Form" }).click();
});
test("Random url with domain name should fallback to login", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/sgijrepg");
  await page.getByRole("heading", { name: "Login Form" }).click();
});
test("Selected events persists after logging out and loggin back in", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");
  const randomFirstName = generateRandomString(6);
  const randomLastName = generateRandomString(6);
  const randomUserId = `${randomFirstName.toLowerCase()}${Math.floor(
    Math.random() * 1000
  )}@example.com`;
  const randomPassword = `Password@${Math.floor(Math.random() * 1000)}`;
  await page.getByRole("heading", { name: "Sports Day Event" }).click();
  await page.getByRole("heading", { name: "Registration Form" }).click();
  await page.getByPlaceholder("Enter your first name").click();
  await page.getByPlaceholder("Enter your first name").press("CapsLock");
  await page.getByPlaceholder("Enter your first name").fill(randomFirstName);
  await page.getByPlaceholder("Enter your first name").press("Tab");
  await page.getByPlaceholder("Enter your last name").press("CapsLock");
  await page.getByPlaceholder("Enter your last name").fill(randomLastName);
  await page.getByPlaceholder("Enter your userid").click();
  await page.getByPlaceholder("Enter your userid").fill(randomUserId);
  await page.getByPlaceholder("Enter your password").click();
  await page.getByPlaceholder("Enter your password").press("CapsLock");
  await page.getByPlaceholder("Enter your password").fill(randomPassword);
  await page.getByRole("button", { name: "Register" }).click();
  await page.waitForTimeout(1500);
  await page.getByPlaceholder("Enter your userid").click();
  await page.getByPlaceholder("Enter your userid").fill(randomUserId);
  await page.getByPlaceholder("Enter your password").click();
  await page.getByPlaceholder("Enter your password").press("CapsLock");
  await page.getByPlaceholder("Enter your password").fill(randomPassword);
  await page.getByTestId("login-button").click();
  await page.waitForTimeout(1500);
  await page
    .locator("div")
    .filter({ hasText: /^Butterfly 100MSwimming1:30 PM-2:30 PMSelect$/ })
    .getByRole("button")
    .click();
  await page.getByText("SButterfly 100MSwimming1:30 PM-2:30 PMRemove").click();
  await page.getByRole("button", { name: "Logout" }).click();
  await page.getByPlaceholder("Enter your userid").fill(randomUserId);
  await page.getByPlaceholder("Enter your password").fill(randomPassword);
  await page.getByTestId("login-button").click();
  await page.waitForTimeout(1500);
  await page.getByText("SButterfly 100MSwimming1:30 PM-2:30 PMRemove").click();
});
test("Selected events persists after a reload", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const randomFirstName = generateRandomString(6);
  const randomLastName = generateRandomString(6);
  const randomUserId = `${randomFirstName.toLowerCase()}${Math.floor(
    Math.random() * 1000
  )}@example.com`;
  const randomPassword = `Password@${Math.floor(Math.random() * 1000)}`;
  await page.getByRole("heading", { name: "Sports Day Event" }).click();
  await page.getByRole("heading", { name: "Registration Form" }).click();
  await page.getByPlaceholder("Enter your first name").click();
  await page.getByPlaceholder("Enter your first name").press("CapsLock");
  await page.getByPlaceholder("Enter your first name").fill(randomFirstName);
  await page.getByPlaceholder("Enter your first name").press("Tab");
  await page.getByPlaceholder("Enter your last name").press("CapsLock");
  await page.getByPlaceholder("Enter your last name").fill(randomLastName);
  await page.getByPlaceholder("Enter your userid").click();
  await page.getByPlaceholder("Enter your userid").fill(randomUserId);
  await page.getByPlaceholder("Enter your password").click();
  await page.getByPlaceholder("Enter your password").press("CapsLock");
  await page.getByPlaceholder("Enter your password").fill(randomPassword);
  await page.getByRole("button", { name: "Register" }).click();
  await page.waitForTimeout(1500);
  await page.getByPlaceholder("Enter your userid").click();
  await page.getByPlaceholder("Enter your userid").fill(randomUserId);
  await page.getByPlaceholder("Enter your password").click();
  await page.getByPlaceholder("Enter your password").press("CapsLock");
  await page.getByPlaceholder("Enter your password").fill(randomPassword);
  await page.getByTestId("login-button").click();
  await page.waitForTimeout(1500);
  await page
    .locator("div")
    .filter({ hasText: /^Butterfly 100MSwimming1:30 PM-2:30 PMSelect$/ })
    .getByRole("button")
    .click();
  await page.getByText("SButterfly 100MSwimming1:30 PM-2:30 PMRemove").click();
  await page.goto("http://localhost:3000/events");
  await page.getByText("SButterfly 100MSwimming1:30 PM-2:30 PMRemove").click();
});
test("Check if conflicting events doesnt get added", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const randomFirstName = generateRandomString(6);
  const randomLastName = generateRandomString(6);
  const randomUserId = `${randomFirstName.toLowerCase()}${Math.floor(
    Math.random() * 1000
  )}@example.com`;
  const randomPassword = `Password@${Math.floor(Math.random() * 1000)}`;
  await page.getByRole("heading", { name: "Sports Day Event" }).click();
  await page.getByRole("heading", { name: "Registration Form" }).click();
  await page.getByPlaceholder("Enter your first name").click();
  await page.getByPlaceholder("Enter your first name").press("CapsLock");
  await page.getByPlaceholder("Enter your first name").fill(randomFirstName);
  await page.getByPlaceholder("Enter your first name").press("Tab");
  await page.getByPlaceholder("Enter your last name").press("CapsLock");
  await page.getByPlaceholder("Enter your last name").fill(randomLastName);
  await page.getByPlaceholder("Enter your userid").click();
  await page.getByPlaceholder("Enter your userid").fill(randomUserId);
  await page.getByPlaceholder("Enter your password").click();
  await page.getByPlaceholder("Enter your password").press("CapsLock");
  await page.getByPlaceholder("Enter your password").fill(randomPassword);
  await page.getByRole("button", { name: "Register" }).click();
  await page.waitForTimeout(1500);
  await page.getByPlaceholder("Enter your userid").click();
  await page.getByPlaceholder("Enter your userid").fill(randomUserId);
  await page.getByPlaceholder("Enter your password").click();
  await page.getByPlaceholder("Enter your password").press("CapsLock");
  await page.getByPlaceholder("Enter your password").fill(randomPassword);
  await page.getByTestId("login-button").click();
  await page.waitForTimeout(1500);
  await page
    .locator("div")
    .filter({ hasText: /^Butterfly 100MSwimming1:30 PM-2:30 PMSelect$/ })
    .getByRole("button")
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Backstroke 100MSwimming1:00 PM-2:00 PMSelect$/ })
    .getByRole("button")
    .click();
  await page.getByText("This event conflicts with").click();
});
test("Check if more than 3 events doesnt get added", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const randomFirstName = generateRandomString(6);
  const randomLastName = generateRandomString(6);
  const randomUserId = `${randomFirstName.toLowerCase()}${Math.floor(
    Math.random() * 1000
  )}@example.com`;
  const randomPassword = `Password@${Math.floor(Math.random() * 1000)}`;
  await page.getByRole("heading", { name: "Sports Day Event" }).click();
  await page.getByRole("heading", { name: "Registration Form" }).click();
  await page.getByPlaceholder("Enter your first name").click();
  await page.getByPlaceholder("Enter your first name").press("CapsLock");
  await page.getByPlaceholder("Enter your first name").fill(randomFirstName);
  await page.getByPlaceholder("Enter your first name").press("Tab");
  await page.getByPlaceholder("Enter your last name").press("CapsLock");
  await page.getByPlaceholder("Enter your last name").fill(randomLastName);
  await page.getByPlaceholder("Enter your userid").click();
  await page.getByPlaceholder("Enter your userid").fill(randomUserId);
  await page.getByPlaceholder("Enter your password").click();
  await page.getByPlaceholder("Enter your password").press("CapsLock");
  await page.getByPlaceholder("Enter your password").fill(randomPassword);
  await page.getByRole("button", { name: "Register" }).click();
  await page.waitForTimeout(1500);
  await page.getByPlaceholder("Enter your userid").click();
  await page.getByPlaceholder("Enter your userid").fill(randomUserId);
  await page.getByPlaceholder("Enter your password").click();
  await page.getByPlaceholder("Enter your password").press("CapsLock");
  await page.getByPlaceholder("Enter your password").fill(randomPassword);
  await page.getByTestId("login-button").click();
  await page.waitForTimeout(1500);
  await page
    .locator("div")
    .filter({ hasText: /^Butterfly 100MSwimming1:30 PM-2:30 PMSelect$/ })
    .getByRole("button")
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Freestyle 400MSwimming3:00 PM-4:00 PMSelect$/ })
    .getByRole("button")
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Triple JumpAthletics4:00 PM-5:00 PMSelect$/ })
    .getByRole("button")
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Long JumpAthletics5:00 PM-6:00 PMSelect$/ })
    .getByRole("button")
    .click();
  await page.getByText("You can only select up to 3").click();
});
test("Overall test only using keyboard (Accessibility)", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const randomFirstName = generateRandomString(6);
  const randomLastName = generateRandomString(6);
  const randomUserId = `${randomFirstName.toLowerCase()}${Math.floor(
    Math.random() * 1000
  )}@example.com`;
  const randomPassword = `Password@${Math.floor(Math.random() * 1000)}`;
  await page.getByPlaceholder("Enter your first name").press("CapsLock");
  await page.getByPlaceholder("Enter your first name").fill(randomFirstName);
  await page.getByPlaceholder("Enter your first name").press("Tab");
  await page.getByPlaceholder("Enter your last name").press("CapsLock");
  await page.getByPlaceholder("Enter your last name").fill(randomLastName);
  await page.getByPlaceholder("Enter your last name").press("Tab");
  await page.getByPlaceholder("Enter your userid").fill(randomUserId);
  await page.getByPlaceholder("Enter your userid").press("Tab");
  await page.getByPlaceholder("Enter your password").press("CapsLock");
  await page.getByPlaceholder("Enter your password").fill(randomPassword);
  await page.getByPlaceholder("Enter your password").press("Tab");
  await page.getByRole("button", { name: "Register" }).press("Enter");
  await page.waitForTimeout(2500);
  await page.getByPlaceholder("Enter your userid").fill(randomUserId);
  await page.getByPlaceholder("Enter your userid").press("Tab");
  await page.getByPlaceholder("Enter your password").press("CapsLock");
  await page.getByPlaceholder("Enter your password").fill(randomPassword);
  await page.getByPlaceholder("Enter your password").press("Tab");
  await page.getByTestId("login-button").press("Enter");
  await page.waitForTimeout(2500);
  await page
    .locator("div")
    .filter({ hasText: /^Butterfly 100MSwimming1:30 PM-2:30 PMSelect$/ })
    .getByRole("button")
    .press("Tab");
  await page
    .locator("div")
    .filter({ hasText: /^Backstroke 100MSwimming1:00 PM-2:00 PMSelect$/ })
    .getByRole("button")
    .press("Enter");
    await page
      .locator("div")
      .filter({ hasText: /^Backstroke 100MSwimming1:00 PM-2:00 PMSelect$/ })
      .getByRole("button")
      .press("Tab");
    await page
      .locator("div")
      .filter({ hasText: /^Freestyle 400MSwimming3:00 PM-4:00 PMSelect$/ })
      .getByRole("button")
      .press("Tab");
    await page
      .locator("div")
      .filter({ hasText: /^High JumpAthletics1:00 PM-2:00 PMSelect$/ })
      .getByRole("button")
      .press("Tab");
    await page
      .locator("div")
      .filter({ hasText: /^Triple JumpAthletics4:00 PM-5:00 PMSelect$/ })
      .getByRole("button")
      .press("Enter");
});
test("OverAll flow", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const randomFirstName = generateRandomString(6);
  const randomLastName = generateRandomString(6);
  const randomUserId = `${randomFirstName.toLowerCase()}${Math.floor(
    Math.random() * 1000
  )}@example.com`;
  const randomPassword = `Password@${Math.floor(Math.random() * 1000)}`;
  await page.getByRole("heading", { name: "Sports Day Event" }).click();
  await page.getByRole("heading", { name: "Registration Form" }).click();
  await page.getByPlaceholder("Enter your first name").click();
  await page.getByPlaceholder("Enter your first name").press("CapsLock");
  await page.getByPlaceholder("Enter your first name").fill(randomFirstName);
  await page.getByPlaceholder("Enter your first name").press("Tab");
  await page.getByPlaceholder("Enter your last name").press("CapsLock");
  await page.getByPlaceholder("Enter your last name").fill(randomLastName);
  await page.getByPlaceholder("Enter your userid").click();
  await page.getByPlaceholder("Enter your userid").fill(randomUserId);
  await page.getByPlaceholder("Enter your password").click();
  await page.getByPlaceholder("Enter your password").press("CapsLock");
  await page.getByPlaceholder("Enter your password").fill(randomPassword);
  await page.getByRole("button", { name: "Register" }).click();
  await page.waitForTimeout(1500);
  await page.getByPlaceholder("Enter your userid").click();
  await page.getByPlaceholder("Enter your userid").fill(randomUserId);
  await page.getByPlaceholder("Enter your password").click();
  await page.getByPlaceholder("Enter your password").press("CapsLock");
  await page.getByPlaceholder("Enter your password").fill(randomPassword);
  await page.getByTestId("login-button").click();
  await page.waitForTimeout(1500);
  await page
    .locator("div")
    .filter({ hasText: /^Butterfly 100MSwimming1:30 PM-2:30 PMSelect$/ })
    .getByRole("button")
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Backstroke 100MSwimming1:00 PM-2:00 PMSelect$/ })
    .getByRole("button")
    .click();
  await page.getByText("This event conflicts with").click();
  await page
    .locator("div")
    .filter({ hasText: /^Freestyle 400MSwimming3:00 PM-4:00 PMSelect$/ })
    .getByRole("button")
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Triple JumpAthletics4:00 PM-5:00 PMSelect$/ })
    .getByRole("button")
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Long JumpAthletics5:00 PM-6:00 PMSelect$/ })
    .getByRole("button")
    .click();
  await page.getByText("You can only select up to 3").click();
});
