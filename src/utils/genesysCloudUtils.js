import platformClient from "purecloud-platform-client-v2";

const client = platformClient.ApiClient.instance;
client.setEnvironment(platformClient.PureCloudRegionHosts.ap_southeast_2);
client.setPersistSettings(true);
const usersApi = new platformClient.UsersApi();
const conversationApi = new platformClient.ConversationsApi();

export async function authenticate(clientConfig) {
  try {
    return await client.loginImplicitGrant(
      clientConfig.clientId,
      clientConfig.redirectUri,
      clientConfig.opts
    );
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
