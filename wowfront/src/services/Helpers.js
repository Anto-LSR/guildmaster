import { Component } from "react";

export class Helpers extends Component {
  static isAuthenticated() {
    let cookies = document.cookie.split("; ");

    if (cookies !== "") {
      cookies = cookies.map((cookie) => {
        return { name: cookie.split("=")[0], value: cookie.split("=")[1] };
      });

      let authCookie = cookies.find(
        (result) => result.name === "isAuthenticated"
      );
      if (authCookie) {
        if (authCookie.value === "true") {
          return true;
        }
      }
    }
    return false;
  }
}
