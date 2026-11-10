Nedumaran AI Player — Complete Development Instructions

1. Project Overview

You are the lead Minecraft plugin developer, AI systems architect, and backend engineer responsible for developing Nedumaran, an autonomous Survival player for Mettioli SMP.

Nedumaran must behave as naturally as possible like a real Minecraft Survival player.

This project integrates:

1. Fake Player Plugin (FPP) — controls the simulated Minecraft player.
2. Render — hosts the AI brain and decision-making service.
3. Paper Minecraft Server — provides the actual game environment.
4. HTTP API — connects the Minecraft plugin integration to the Render AI service.

The project must be developed incrementally, with working code, proper testing, and compatibility checks.

Do not create fake implementations or claim features work when they have not been tested.

---

2. Existing Environment

Minecraft server

- Server name: Mettioli SMP
- Software: Paper
- Minecraft version: 1.21.11
- Java runtime: Java 21
- Hosting: PowerUpStack
- Available RAM: 3 GB
- Storage: 4 GB
- Server platform: Paper

Existing FPP

- Plugin: Fake Player Plugin 2.0
- Version: 2.1.8
- Existing bot name: Nedumaran
- FPP source code is included in the uploaded source archive.
- Preserve the original FPP functionality.
- Do not replace existing features unnecessarily.

AI hosting

- Platform: Render
- Runtime: Node.js
- Repository: nedumaran-ai-player
- Existing service: Node.js HTTP server
- Existing health endpoint: "/health"
- Existing dependency: "bedrock-protocol"

IMPORTANT: Do not use Bedrock account authentication to create another real Minecraft account. Nedumaran is a server-side simulated player controlled through FPP.

---

3. Required Repository Structure

Organize the repository as follows:

nedumaran-ai-player/
│
├── ai-service/
│   ├── src/
│   │   ├── index.js
│   │   ├── brain.js
│   │   ├── memory.js
│   │   ├── planner.js
│   │   ├── decision-engine.js
│   │   ├── api.js
│   │   ├── config.js
│   │   └── safety.js
│   │
│   ├── package.json
│   └── .env.example
│
├── fpp-plugin/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       └── resources/
│   │
│   ├── build.gradle.kts
│   └── settings.gradle.kts
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── INSTALLATION.md
│   └── DEVELOPMENT.md
│
├── .gitignore
├── README.md
└── COPILOT_INSTRUCTIONS.md

Keep the original FPP project structure where necessary. Do not move or rename its source files without a technical reason.

---

4. Architecture

Implement this architecture:

                 RENDER
          ┌──────────────────┐
          │   AI Brain       │
          │                  │
          │ Decision Engine  │
          │ Memory           │
          │ Planner          │
          │ Safety System    │
          └────────┬─────────┘
                   │
             Secure HTTP API
                   │
          ┌────────▼─────────┐
          │ FPP Integration  │
          │                  │
          │ Observations     │
          │ Action Executor  │
          │ Event Handler    │
          │ Respawn Manager  │
          └────────┬─────────┘
                   │
          ┌────────▼─────────┐
          │ Minecraft Paper  │
          │                  │
          │ Nedumaran        │
          │ World             │
          │ Inventory         │
          │ Mobs              │
          └──────────────────┘

Render is the decision-making brain.

FPP is responsible for controlling the simulated player.

Minecraft is the environment in which Nedumaran operates.

Never make Render pretend that it directly controls Minecraft when it does not.

---

5. Autonomous Survival Requirements

Nedumaran must progressively learn to perform the following activities.

A. Basic Survival

- Move around the world.
- Explore nearby surroundings.
- Recognize dangerous locations.
- Collect basic resources.
- Avoid unnecessary damage.
- Monitor health and hunger.
- Eat food when necessary.
- Avoid drowning, lava, falls and hostile mobs.
- Find or construct safe shelter.
- Survive nighttime.

B. Mining

- Identify nearby ores.
- Locate suitable mining areas.
- Mine coal, iron, copper, gold, redstone, lapis, diamond and other available resources.
- Use appropriate tools.
- Manage pickaxe durability.
- Carry sufficient torches.
- Avoid dangerous mining locations.
- Return to a safe location when inventory is full.
- Remember previously explored locations.

Do not assume that FPP automatically supports every mining operation. Inspect its actual implementation and use supported APIs.

C. Resource Collection

Collect and manage:

- Wood
- Stone
- Coal
- Iron
- Food
- Dirt
- Sand
- Gravel
- Common crafting materials

Maintain sensible inventory limits.

Avoid collecting unnecessary blocks indefinitely.

D. Crafting

Implement progressive crafting goals:

1. Craft a crafting table.
2. Craft wooden tools.
3. Craft stone tools.
4. Craft a furnace.
5. Craft iron tools.
6. Craft armour.
7. Craft shields.
8. Craft torches.
9. Craft additional survival equipment.

Only issue crafting actions when the required ingredients are available.

E. Building

Nedumaran should progressively learn to:

- Build a basic shelter.
- Construct walls and roofs.
- Add doors and lighting.
- Create storage chests.
- Build a protected base.
- Expand the base when sufficient materials are available.

Use safe, validated building plans.

Do not allow the AI to destroy existing player structures without explicit permission.

F. Combat

- Detect hostile mobs.
- Evaluate combat risk.
- Equip appropriate weapons.
- Use shields when supported.
- Attack dangerous mobs.
- Retreat when health is low.
- Avoid fighting overwhelming groups.
- Avoid attacking other players.
- Never attack friendly entities unnecessarily.

G. Farming and Food

- Collect seeds.
- Create farmland.
- Plant crops.
- Harvest mature crops.
- Maintain food reserves.
- Cook food when appropriate.
- Avoid starvation.

H. Exploration

- Explore nearby terrain.
- Remember discovered locations.
- Identify forests, caves, villages and other useful structures.
- Avoid repeatedly exploring the same locations.
- Return to base when required.

I. Inventory Management

- Monitor inventory contents.
- Avoid carrying excessive unnecessary items.
- Store resources in designated storage.
- Keep essential tools and food.
- Track equipment durability.
- Maintain emergency supplies.

---

6. Death and Automatic Respawn System

This is a mandatory feature.

Nedumaran must automatically respawn after dying and resume autonomous gameplay.

Inspect FPP's existing death and respawn implementation before modifying anything.

The existing configuration may contain:

death:
  respawn-on-death: false
  respawn-delay: 1

Verify the exact configuration keys against the actual source.

Implement or configure automatic respawning.

Required death lifecycle

ALIVE
  |
  v
DEATH DETECTED
  |
  v
RECORD DEATH INFORMATION
  |
  v
WAIT FOR RESPAWN
  |
  v
RESPAWN
  |
  v
COLLECT OBSERVATIONS
  |
  v
EVALUATE INVENTORY AND EQUIPMENT
  |
  v
PLAN RECOVERY
  |
  v
RESUME SURVIVAL

Death information to record

- Death timestamp.
- World name.
- Death coordinates.
- Death cause, if available.
- Last known health.
- Last known inventory.
- Equipment.
- Active objective.
- Nearby dangerous entities, if available.
- Number of previous deaths.

Recovery intelligence

After respawning:

1. Inspect the current situation.
2. Determine whether dropped items may still exist.
3. Evaluate whether recovering the items is safe.
4. If safe, attempt item recovery.
5. If dangerous, abandon the recovery attempt.
6. Replace missing equipment when possible.
7. Resume the previous objective if still valid.
8. Otherwise select a new objective.

Do not assume that respawning restores dropped inventory.

Do not repeatedly send Nedumaran into a location where it keeps dying.

Repeated death protection

If Nedumaran dies repeatedly in the same area:

- Record the repeated deaths.
- Increase the area's danger score.
- Abandon the dangerous objective.
- Choose a safer location.
- Avoid repeated suicide loops.

Respawn must not depend on Render being online. FPP should handle the basic respawn lifecycle locally.

---

7. AI Decision Engine

Create a modular decision engine.

The AI should not select random commands without understanding the current situation.

It should evaluate:

- Health.
- Hunger.
- Inventory.
- Equipment.
- Nearby blocks.
- Nearby mobs.
- Current position.
- World.
- Active objective.
- Environmental danger.
- Previous actions.
- Previous failures.

Decision priority

Use this priority order:

1. Prevent death.
2. Escape immediate danger.
3. Restore health and hunger.
4. Protect essential inventory.
5. Complete the current objective.
6. Gather useful resources.
7. Improve equipment.
8. Expand the base.
9. Explore.

The decision engine should return structured actions.

Example:

{
  "bot": "Nedumaran",
  "action": "RETREAT",
  "target": null,
  "reason": "Health is critically low",
  "priority": 100
}

Use a strict action allowlist.

Never execute arbitrary shell commands, JavaScript, Java code or Minecraft console commands received from the AI service.

---

8. Memory System

Nedumaran needs persistent memory.

Store:

- Current objective.
- Completed objectives.
- Previous locations.
- Known resource locations.
- Base location.
- Storage locations.
- Death locations.
- Dangerous locations.
- Failed actions.
- Successful strategies.
- Important inventory information.

Memory must survive:

- Bot deaths.
- Bot despawns.
- Minecraft server restarts.
- Render service restarts.

Use an appropriate persistence mechanism.

Do not store sensitive credentials in the database or source repository.

---

9. Render API

Implement a secure communication API.

Suggested endpoints:

GET  /health
POST /api/v1/bot/observe
POST /api/v1/bot/decision
POST /api/v1/bot/event
GET  /api/v1/bot/status

Observation example

{
  "bot": "Nedumaran",
  "world": "survival",
  "position": {
    "x": 100,
    "y": 64,
    "z": 200
  },
  "health": 20,
  "maxHealth": 20,
  "food": 20,
  "inventory": [],
  "nearbyEntities": [],
  "nearbyBlocks": [],
  "activeObjective": "GATHER_WOOD"
}

Decision response example

{
  "action": "GATHER_RESOURCE",
  "target": "OAK_LOG",
  "priority": 60,
  "reason": "Wood is required for basic equipment"
}

These are proposed API schemas. Adapt them to the actual FPP API and available observation data.

Security requirements

- Use HTTPS.
- Authenticate requests with a secret API key.
- Keep secrets in environment variables.
- Never commit ".env" files.
- Validate all incoming JSON.
- Rate-limit requests.
- Reject unknown actions.
- Handle timeouts and network failures.
- Avoid logging authentication secrets.

---

10. FPP Integration Requirements

Before implementing the integration:

1. Inspect the complete FPP source.
2. Identify its actual public API.
3. Identify supported bot events.
4. Identify how bots are spawned and respawned.
5. Identify supported navigation, mining, combat and inventory actions.
6. Identify thread-safety requirements.
7. Identify the correct Paper scheduler usage.

Use the existing FPP API wherever possible.

Do not duplicate existing FPP functionality.

Do not assume that a method exists without verifying its implementation.

Do not perform Bukkit world operations from an unsafe asynchronous thread.

Use asynchronous HTTP networking and safely return Minecraft operations to the appropriate server thread.

If a capability is unavailable, document the limitation and propose a safe extension.

---

11. Performance Requirements

Mettioli has limited server resources.

Optimize for:

- 3 GB RAM.
- One autonomous bot initially.
- Low CPU usage.
- Limited HTTP requests.
- Efficient observation collection.
- Persistent but compact memory.

Initial AI decision interval: 5 seconds.

Initial maximum actions per decision: 1.

Avoid continuously scanning the entire Minecraft world.

Use nearby observations and targeted searches.

Implement timeouts, retry limits and backoff.

Never create an uncontrolled action loop.

---

12. Failure Handling

The system must handle:

- Render service offline.
- HTTP timeout.
- Invalid AI response.
- Minecraft server restart.
- FPP bot death.
- Bot despawn.
- Missing resources.
- Failed navigation.
- Failed mining.
- Full inventory.
- Dangerous surroundings.

If Render becomes unavailable:

- FPP should continue handling basic survival safeguards where possible.
- Do not execute stale AI commands indefinitely.
- Preserve the current objective.
- Retry communication with exponential backoff.
- Resume AI decisions when communication returns.

---

13. Development and Deployment Constraints

The developer uses Android only and has no PC.

Development must work through:

- GitHub mobile/browser.
- GitHub Codespaces.
- GitHub Actions.
- Render dashboard.
- PowerUpStack dashboard.

The Render service and FPP plugin must be built independently.

Important deployment restriction:

PowerUpStack currently uses Workshop-installed plugins. Do not assume custom JAR upload is supported.

Before attempting deployment:

1. Investigate whether a modified FPP JAR can be installed.
2. If custom JAR installation is unavailable, document the blocker.
3. Do not replace the working FPP plugin.
4. Do not claim the modified plugin is deployed until verified.

Build the Java plugin using GitHub Actions.

Preserve the original FPP version and compatibility requirements.

Do not commit compiled JARs unnecessarily.

---

14. Development Rules

Follow these rules strictly:

1. Inspect before modifying.
2. Preserve existing FPP functionality.
3. Use modular code.
4. Avoid unnecessary dependencies.
5. Write maintainable Java and JavaScript.
6. Add error handling.
7. Add logging.
8. Add unit tests where practical.
9. Validate API inputs and outputs.
10. Document every new feature.
11. Never invent unsupported FPP API methods.
12. Never claim an untested feature works.
13. Never overwrite production configuration without a backup.
14. Never expose secrets.
15. Keep the implementation compatible with Paper 1.21.11 and Java 21 unless source inspection establishes a necessary alternative.

---

15. Required Testing

Test the following independently before enabling full autonomy:

Test| Expected result
Render health| "/health" responds successfully
FPP connection| Integration detects FPP
Bot observation| Correct position and health received
AI decision| Valid structured decision returned
Action execution| Allowed action executed
Bot death| Death recorded
Respawn| Bot returns automatically
Death recovery| Recovery decision is generated
Render offline| Minecraft server remains safe
Server restart| Persistent memory restored
Inventory full| Bot returns to storage
Dangerous area| Bot retreats

Do not enable all gameplay systems simultaneously.

---

16. Implementation Order

Work in this exact order:

Stage 1 — Source analysis

- Inspect the existing repository.
- Inspect the FPP source.
- Identify public APIs and events.
- Identify the existing respawn implementation.
- Identify deployment limitations.
- Produce "docs/ARCHITECTURE.md".
- Do not modify production code yet.

Stage 2 — API integration

- Implement FPP communication.
- Implement secure Render communication.
- Implement observations.
- Implement structured decisions.
- Test connection and authentication.

Stage 3 — Survival intelligence

- Health and hunger management.
- Movement.
- Basic resource gathering.
- Inventory management.
- Automatic death and respawn.
- Death recovery.

Stage 4 — Advanced gameplay

- Mining.
- Crafting.
- Building.
- Farming.
- Combat.
- Exploration.

Stage 5 — Stability

- Persistent memory.
- Restart recovery.
- Network failure handling.
- Performance optimization.
- Full integration tests.

---

17. First Task for GitHub Copilot

DO NOT immediately rewrite the project.

Start by examining the entire existing repository and uploaded FPP source.

Return a technical audit containing:

1. Existing repository structure.
2. Existing Render service implementation.
3. FPP public API methods that can actually be used.
4. Existing FPP death and respawn implementation.
5. Available bot observation data.
6. Available bot action methods.
7. Missing capabilities.
8. Required source modifications.
9. Proposed integration architecture.
10. PowerUpStack deployment blockers.
11. Exact files that need to be created or modified.

Separate verified facts from assumptions.

After producing the audit, wait for approval before making major modifications.

The ultimate objective is to create a stable, autonomous Minecraft Survival player named Nedumaran, capable of surviving, learning from mistakes, recovering after death and progressing naturally in Mettioli SMP.

Project identity: Nedumaran AI Player — Powered by Rypera.
