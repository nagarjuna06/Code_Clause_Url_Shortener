const formEl = document.querySelector(".fill");
const resultEl = document.querySelector(".result");

const formSubmit = async (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target));
  const { link, alias } = formData;
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
};
const sendToServer = async (data) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const res = await fetch("/update", options);
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
  const shortLink = document.result.shortLink;
  shortLink.select();
  e.target.textContent = "Copied!";
  navigator.clipboard.writeText(shortLink.value);
  setTimeout(() => {
    e.target.textContent = "Copy";
  }, 2000);
};
