export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers["host"];
  const callbackUrl = `${proto}://${host}/api/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    scope: "repo,user",
    redirect_uri: callbackUrl,
  });

  res.redirect(`https://github.com/login/oauth/authorize?${params}`);
}
