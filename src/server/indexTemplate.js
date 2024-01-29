export const indexTemplate = (content) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pomodoro</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍅</text></svg>">
        <script src="/static/client.js" type="application/javascript"></script>
    </head>
    <body>
      <div id="react_root">${content}</div>
      <div id="modal_root"></div>
    </body>
</html>
`;