import express from "express";

export default function render(): express.RequestHandler {
  return (req, res): void => {
    res.set('Content-Type', 'text/html');

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Timers</title>
      </head>
      <body style="overflow: hidden; display: flex; justify-content: center; align-items: center; width: 100vw; height: 100vh;">
          <h1 style="font-size: 2rem; font-weight: 500; line-height: 1;">Please use a <a href="https://github.com/Kallenju/timers/tree//main/client" target="_blank" rel="noopener noreferrer">cli client</a> to use this service</h1>
      </body>
      </html>
    `);
  };
}
