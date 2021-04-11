// grab the packages we need
const request = require("request").defaults({ encoding: null });
var express = require("express");
const resizeImg = require("resize-image-buffer");

var app = express();
var port = process.env.PORT || 5000;

// routes will go here
app.get("/", async function (req, res) {
  res.send("<h1>ISIZER</h1>");
});

app.get("/api/resize", async function (req, res) {
  const { wd, ht, url } = req.query;

  await request.get(url, async (error, response, body) => {
    console.log(response);
    if (response.statusCode) {
    }
    if (!error && response.statusCode == 200) {
      const image = await resizeImg(Buffer.from(body), {
        width: Number(wd),
        height: Number(ht),
      });

      res.contentType(response.headers["content-type"]);
      return res.end(image);
    }
    return res.status(406).json({
      message: "Only content of type image(bmp, jpg, png) is accepted",
    });
  });
});

// start the server
app.listen(port, () => {
  console.log("Server started! at port", port);
});
