const location = new URL(window.location.href);
const baseUrl = location.origin;

export const clientConfig = {
  flowId: "53712bc0-21de-42d6-b416-a64d1ed3c2c5",
  clientId: "42952baf-a65f-4147-ad8b-56441794abc4",
  redirectUri: baseUrl + import.meta.env.BASE_URL,
  // opts: {
  //   org: "",
  //   provider: "",
  //   target: "",
  // },
};
