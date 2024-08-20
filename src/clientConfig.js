const location = new URL(window.location.href);
const origin = location.origin;

export const clientConfig = {
  flowId: import.meta.env.VITE_FLOW_ID,
  clientId: import.meta.env.VITE_CLIENT_ID,
  redirectUri: origin + import.meta.env.BASE_URL,
  // opts: {
  //   org: "",
  //   provider: "",
  //   target: "",
  // },
};
