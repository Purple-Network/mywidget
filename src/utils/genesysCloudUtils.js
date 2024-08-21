import platformClient from "purecloud-platform-client-v2";

const client = platformClient.ApiClient.instance;
client.setPersistSettings(true);
client.setEnvironment(platformClient.PureCloudRegionHosts.ap_southeast_2);
const usersApi = new platformClient.UsersApi();
const conversationApi = new platformClient.ConversationsApi();

export async function authenticate(clientConfig) {
  try {
    const data = await client.loginImplicitGrant(
      clientConfig.clientId,
      clientConfig.redirectUri,
      clientConfig.opts
    );
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getUserMe() {
  return usersApi.getUsersMe();
}

export async function createEmailConversation(body) {
  return conversationApi.postConversationsEmails(body);
}
