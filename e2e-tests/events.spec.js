import { test, expect } from "@playwright/test";
function generateRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
test("OverAll Happy flow", async ({ page }) => {
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
test("registration flow", async({page}) => {
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
await page.waitForSelector("text=Registration Successful", {
  state: "visible",
});
})
test("login flow", async({page})=>{
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
test("Select events flow", async({page}) => {
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
})
