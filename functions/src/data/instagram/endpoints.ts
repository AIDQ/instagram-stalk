export default {
  baseUrl: 'https://www.instagram.com',
  loginUrl: 'https://www.instagram.com/accounts/login/ajax/',
  getAccountJsonUrl: (username: string) => {
    return `https://www.instagram.com/${username}/?__a=1`;
  },
  getFollowUrl: (accountId: string | number) => {
    return `https://www.instagram.com/web/friendships/${accountId}/follow/`;
  },
};
