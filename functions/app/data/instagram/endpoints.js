module.exports = {
  baseUrl: 'https://www.instagram.com',
  loginUrl: 'https://www.instagram.com/accounts/login/ajax/',
  getAccountJsonUrl: (username) => {
    return `https://www.instagram.com/${username}/?__a=1`;
  },
  getFollowUrl: (accountId) => {
    return `https://www.instagram.com/web/friendships/${accountId}/follow/`
  },
}
