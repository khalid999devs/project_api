const attachTokenToResponse = (tokenName, { res, token, expiresInDay }) => {
  const tokName = tokenName || 'token';
  const day = 1000 * 60 * 60 * (24 * Number(expiresInDay));

  res.cookie(tokName, token, {
    expires: new Date(Date.now() + day),
    signed: true,
    sameSite: 'none',
    secure: true,
  });
};

module.exports = { attachTokenToResponse };
