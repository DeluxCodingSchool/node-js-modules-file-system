const http = require("http");
const fs = require("fs");

const aboutHtml = fs.readFileSync("./templates/template-about.html", "utf8");
const usersHtml = fs.readFileSync("./templates/template-users.html", "utf8");
const userHtml = fs.readFileSync("./templates/template-user.html", "utf8");
const users = [
  {
    name: "John Doe",
    age: 30,
  },
  {
    name: "Jane Doe",
    age: 28,
  },
  {
    name: "Alice Doe",
    age: 25,
  },
];
console.log(aboutHtml);
const serverFn = (req, res) => {
  console.log("Request received");
  console.log("This is the request object", req.url);
  const pathName = req.url;
  if (pathName === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World! Welcome to Node js\n");
  } else if (pathName === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const result = aboutHtml.replaceAll("{%NAME%}", "Isaac");
    res.end(result);
  } else if (pathName === "/users") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const result = users
      .map((user) => userHtml.replace("{%USERNAME%}", user.name))
      .join(" ");
    const final = usersHtml.replace("{%USERS%}", result);
    res.end(final);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Not Found\n");
  }
};
const server = http.createServer(serverFn);

// console.log(server);

server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
