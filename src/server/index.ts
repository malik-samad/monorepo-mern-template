import express from "express";
import path from "path";

import { ENVIRONMENT, IS_LOCAL, PORT } from "./configs";
import apiRoute from "./routes";
import WebpackHMR from "./webpack-hmr";
import Logging from "./utils/logging";

// Process exception handler
process
  .on("uncaughtException", (err, origin) => {
    Logging.emerg(`${err.message} - unhandled error at - ${origin}`);
  })
  .on("unhandledRejection", (reason, p) => {
    Logging.emerg(`${reason} - unhandled rejection of promise - ${p}`);
  });

const app = express();
const port = PORT || 3000;

app.disable("x-powered-by");

if (IS_LOCAL) WebpackHMR(app); // enable webpack's HMR for client side

app
  .use(
    "/api",
    express.urlencoded({ extended: true }),
    express.json(),
    express.text(),
    apiRoute
  )
  // Serve static files of react build - for non-Dev builds
  .use(express.static(path.join(__dirname, "../client")));

// Handle all other routes by sending the HTML file
app.get("*", (req, res) => {
  res.send(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <link rel="icon" href="logo192.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="MERN stack"
        />
        <link rel="apple-touch-icon" href="/logo192.png" /> 
        <title>MERN Stack</title>
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div> 
        <script>
        window._CONFIG_ = ${JSON.stringify({
          ENVIRONMENT,
        })}
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
    `);
});

app.listen(port, () => [console.log(`Server is running on port ${port}`)]);
