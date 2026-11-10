
const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    if (req.url === "/health") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        return res.end(JSON.stringify({
            status: "online",
            project: "Nedumaran AI Player",
            minecraft: "not connected"
        }));
    }

    res.writeHead(200, {
        "Content-Type": "text/plain"
    });

    res.end("Nedumaran AI Player is running.");
});

server.listen(PORT, "0.0.0.0", () => {
    console.log(`Nedumaran service running on port ${PORT}`);
});
