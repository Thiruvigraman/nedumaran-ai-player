const http = require("http");

const PORT = Number(process.env.PORT || 3000);
const API_KEY = process.env.NEDUMARAN_API_KEY || "";
const MAX_BODY_BYTES = 64 * 1024;

let latestObservation = null;
let lastObservationAt = null;
let observationCount = 0;

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(payload));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    let size = 0;

    req.on("data", chunk => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error("BODY_TOO_LARGE"));
        req.destroy();
        return;
      }
      body += chunk.toString("utf8");
    });

    req.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch {
        reject(new Error("INVALID_JSON"));
      }
    });

    req.on("error", reject);
  });
}

function validObservation(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return false;
  if (data.bot !== "Nedumaran") return false;
  if (typeof data.alive !== "boolean") return false;
  if (typeof data.respawning !== "boolean") return false;
  if (typeof data.world !== "string" || data.world.length > 128) return false;
  if (!data.position || typeof data.position !== "object") return false;

  for (const axis of ["x", "y", "z"]) {
    if (typeof data.position[axis] !== "number" || !Number.isFinite(data.position[axis])) {
      return false;
    }
  }

  return true;
}

const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/health") {
    return sendJson(res, 200, {
      status: "online",
      project: "Nedumaran AI Player",
      observationEndpoint: "available",
      observationsReceived: observationCount,
      lastObservationAt
    });
  }

  if (req.method === "GET" && req.url === "/api/v1/bot/status") {
    return sendJson(res, 200, {
      bot: "Nedumaran",
      hasObservation: latestObservation !== null,
      lastObservationAt,
      observationsReceived: observationCount,
      latestObservation
    });
  }

  if (req.method === "POST" && req.url === "/api/v1/bot/observe") {
    if (!API_KEY) {
      return sendJson(res, 503, { error: "SERVER_NOT_CONFIGURED" });
    }

    const auth = req.headers.authorization || "";
    const suppliedKey = auth.startsWith("Bearer ") ? auth.slice(7) : "";
    if (suppliedKey.length !== API_KEY.length ||
        !require("crypto").timingSafeEqual(Buffer.from(suppliedKey), Buffer.from(API_KEY))) {
      return sendJson(res, 401, { error: "UNAUTHORIZED" });
    }

    try {
      const observation = await readJson(req);
      if (!validObservation(observation)) {
        return sendJson(res, 400, { error: "INVALID_OBSERVATION" });
      }

      latestObservation = observation;
      lastObservationAt = new Date().toISOString();
      observationCount += 1;

      return sendJson(res, 202, {
        accepted: true,
        bot: "Nedumaran",
        receivedAt: lastObservationAt
      });
    } catch (error) {
      if (error.message === "BODY_TOO_LARGE") {
        return sendJson(res, 413, { error: "BODY_TOO_LARGE" });
      }
      return sendJson(res, 400, { error: "INVALID_JSON" });
    }
  }

  return sendJson(res, 404, { error: "NOT_FOUND" });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Nedumaran service listening on port ${PORT}`);
});

process.on("SIGTERM", () => {
  server.close(() => process.exit(0));
});
