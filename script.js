const BASE_URL =
  "https://otp-function-app-ewb9bdejfsewdxc2.canadacentral-01.azurewebsites.net/api";

const SEND_OTP_URL = `${BASE_URL}/generate-otp`;
const VERIFY_OTP_URL = `${BASE_URL}/verify-otp`;

async function sendOtp() {
  const email = document.getElementById("email").value.trim();
  const messageEl = document.getElementById("message");

  if (!email) {
    messageEl.innerText = "Enter email";
    return;
  }

  try {
    await fetch(
      `${SEND_OTP_URL}?email=${encodeURIComponent(email)}`,
      { method: "GET" }
    );

    messageEl.innerText = "OTP sent successfully";
  } catch (err) {
    console.error(err);
    messageEl.innerText = "Error sending OTP";
  }
}

async function verifyOtp() {
  const email = document.getElementById("email").value.trim();
  const otp = document.getElementById("otp").value.trim();
  const messageEl = document.getElementById("message");

  if (!email || !otp) {
    messageEl.innerText = "Enter email and OTP";
    return;
  }

  try {
    const response = await fetch(
      `${VERIFY_OTP_URL}?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`,
      { method: "GET" }
    );

    const data = await response.json();
    messageEl.innerText = data.message;
  } catch (error) {
    console.error(error);
    messageEl.innerText = "OTP verification failed";
  }
}