export const signup = user => (
  fetch("http://localhost:3000/register", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  })
);
export const login = user => (
  fetch("http://localhost:3000/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  })
);
export const logout = () => (
  fetch("http://localhost:3000/login", { method: "DELETE" })
);