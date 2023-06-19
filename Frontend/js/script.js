const formEl = document.querySelector(".fill");
const resultEl = document.querySelector(".result");
const checkboxEl = document.querySelector("#update");
const pinEl = document.querySelector(".pin");

const formSubmit = async (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target));
  const { link, alias, pin } = formData;
  console.log(formData);
  const regX = new RegExp(
    "^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
    "i"
  );
  if (!regX.test(link)) {
    alert("Invalid URL");
  } else if (alias !== "" && alias.length < 5) {
    alert("Alias must be at least 5 alphanumeric characters.");
  } else if ((pinEl.type === "number" && pin.length < 4) || pin.length > 10) {
    alert("PIN length must be between 4 to 10 digits");
  } else {
    const response = await sendToServer(formData);
    if (response.success) {
      document.result.link.value = link;
      document.result.shortLink.value = response.shortLink;
      document.querySelector(".visit-link").href = response.shortLink;
      formEl.classList.add("none");
      resultEl.classList.remove("none");
    } else {
      alert(response.msg);
    }
  }
};
const sendToServer = async (data) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const res = await fetch("/shorten", options);
  const response = await res.json();
  return response;
};

const resultSubmit = (e) => {
  e.preventDefault();
  formEl.reset();
  resultEl.classList.add("none");
  formEl.classList.remove("none");
};
const checkBoxClicked = (e) => {
  if (e.target.checked) {
    pinEl.type = "number";
  } else {
    pinEl.type = "hidden";
  }
};
const handleAlias = (e) => {
  if (e.target.value) {
    checkboxEl.disabled = false;
  } else {
    checkboxEl.checked = false;
    checkboxEl.disabled = true;
    pinEl.type = "hidden";
  }
};
const copyLink = (e) => {
  const shortLink = document.result.shortLink;
  shortLink.select();
  e.target.textContent = "Copied!";
  navigator.clipboard.writeText(shortLink.value);
  setTimeout(() => {
    e.target.textContent = "Copy";
  }, 2000);
};
