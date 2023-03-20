import { User } from "../types/user.type";

const setAccessTokenToLS = (accessToken: string) => {
  localStorage.setItem("access_token", accessToken);
};
const setProfileToLS = (profile: User) => {
  localStorage.setItem("profile", JSON.stringify(profile));
};

const clearLS = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("profile");
};

const getAccessTokenFromLS = () => {
  return localStorage.getItem("access_token") || "";
};
const getProfileFromLS = () => {
  const profile = localStorage.getItem("profile");
  return profile ? JSON.parse(profile) : null;
};

export {
  setAccessTokenToLS,
  setProfileToLS,
  clearLS,
  getAccessTokenFromLS,
  getProfileFromLS,
};
