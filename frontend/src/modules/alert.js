import { toast } from "react-toastify";

export const errorAlert = (statusCode, msg) => {
  if (statusCode === 401) {
    toast.error("인증된 사용자가 아닙니다.", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
      theme: (theme) => (theme.isDarkMode ? "dark" : "light"),
    });
  } else if (statusCode === 409) {
    toast.error(msg, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
      theme: (theme) => (theme.isDarkMode ? "dark" : "light"),
    });
  } else {
    toast.error(msg, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
      theme: (theme) => (theme.isDarkMode ? "dark" : "light"),
    });
  }
};

export const successAlert = (msg) => {
  toast.success(msg, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 1000,
    theme: (theme) => (theme.isDarkMode ? "dark" : "light"),
  });
};

export const warnAlert = (msg) => {
  toast.warn(msg, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 1000,
    theme: (theme) => (theme.isDarkMode ? "dark" : "light"),
  });
};
