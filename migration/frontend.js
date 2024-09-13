app.get("/", (req, res) => {
    const filePath = path.join(__dirname, "pages", "home", "component.html");
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.status(500).send("We aren't able to fetch that file.");
        console.error(err);
        return;
      }
      var out = `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <script>
    window.op = window.op||function(...args){(window.op.q=window.op.q||[]).push(args);};
    window.op('init', {
      clientId: '17393df4-4fff-44dc-aac7-bef3acb32aa2',
      trackScreenViews: true,
      trackOutgoingLinks: true,
      trackAttributes: true,
    });
  </script>
  <script src="https://openpanel.dev/op1.js" defer async></script>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Home | Animator-Studio</title>       
            <link rel="stylesheet" type="text/css" href="/resources/home/styles.css">
            <link rel="icon" type="image/x-icon" href="/images/favicon.png">
        </head>
        <body>
        ${data}
        </body>
        </html>
        
      `
      res.send(out);
    });
  });