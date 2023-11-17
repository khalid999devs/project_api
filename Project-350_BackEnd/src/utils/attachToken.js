const attachTokenToResponse = (tokenName, { res, token, expiresInDay }) => {
  const tokName = tokenName || 'token';
  const day = 1000 * 60 * 60 * (24 * Number(expiresInDay));

  res.cookie(tokName, token, {
    httpOnly: true,
    expires: new Date(Date.now() + day),
    signed: true,
  });
};

module.exports = { attachTokenToResponse };
