import { httpClient } from "./httpClient";

export const authApi = {
  async register(email, password, name) {
    const data = await httpClient.post("/auth/register", {
      email,
      password,
      name,
    });

    // salva token no localStorage (apenas de forma temporaria)
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  },

  async login(email, password) {
    const data = await httpClient.post("/auth/login", {
      email,
      password,
    });

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  },

  async loginWithGoogle(credential) {
    const data = await httpClient.post("/auth/google", {
      credential,
    });

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  },
};
