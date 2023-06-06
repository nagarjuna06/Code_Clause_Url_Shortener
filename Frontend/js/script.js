const formEl = document.querySelector(".fill");
const resultEl = document.querySelector(".result");
const formSubmit = async (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target));
  const { link, alias } = formData;
  const regX = new RegExp(
    "^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
    "i"
  );
  if (!regX.test(link)) {
    alert("Invalid URL");
  } else if (alias !== "" && alias.length < 5) {
    alert("Alias must be at least 5 alphanumeric characters.");
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
const copyLink = (e) => {
  const text = document.result.shortLink.value;
  navigator.clipboard.writeText(text);
  alert("Copied to Clipboard!");
};
