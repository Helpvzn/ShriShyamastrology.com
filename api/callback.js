export default async function handler(req, res) {
  const { code } = req.query;
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!code) {
    res.status(400).send("Missing code parameter");
    return;
  }

  let tokenData;
  try {
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });
    tokenData = await response.json();
  } catch (err) {
    res.status(500).send("Failed to fetch token from GitHub");
    return;
  }

  if (!tokenData.access_token) {
    res.status(400).send("GitHub did not return an access token: " + JSON.stringify(tokenData));
    return;
  }

  const token = tokenData.access_token;
  const msg = JSON.stringify({ token, provider: "github" });

  // Send token back to Decap CMS via postMessage
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(`<!DOCTYPE html>
<html>
<head><title>Authenticating...</title></head>
<body>
<p>Login successful. Closing window...</p>
<script>
  (function () {
    function receiveMessage(e) {
      window.opener.postMessage(
        'authorization:github:success:${msg}',
        e.origin
      );
    }
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:github", "*");
  })();
</script>
</body>
</html>`);
}
