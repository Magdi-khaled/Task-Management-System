export function setToken(token, expirationTimeInMinutes, user) {
  const expiry = new Date().getTime() + expirationTimeInMinutes * 60000;
  localStorage.setItem("user", { email: user.email, password: user.password });
  localStorage.setItem("authToken", token);
  localStorage.setItem("authTokenExpiry", JSON.stringify(expiry));
}

export function isTokenExpired() {
  const tokenExpiry = JSON.parse(localStorage.getItem("authTokenExpiry"));
  if (!tokenExpiry) {
    return true;
  }
  return new Date().getTime() > tokenExpiry;
}

export function handleSessionExpiry(router) {
  if (isTokenExpired()) {
    localStorage.clear();

    const expiredTag = document.getElementById("expired");
    if (expiredTag) {
      expiredTag.classList.remove("hidden");
      expiredTag.classList.add("flex");

      setTimeout(() => {
        expiredTag.classList.add("hidden");
        router.push({ name: "Login" });
      }, 2500);
    }
  }
}