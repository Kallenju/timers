import express from "express";

export default function render(): express.RequestHandler {
  return (req, res): void => {
    res.set('Content-Type', 'text/html');

    res.send(Buffer.from(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-sc>
        <title>Timers</title>
      </head>
      <body style="overflow: hidden; display: flex; justify-content: ce>
        <h1 style="font-size: 2rem; font-weight: 500; line-height: 1;>
      </body>
      </html>
    `));
  };
}
