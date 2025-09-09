const { spawn } = require("child_process");

const next = spawn("npm", ["run", "start"], {
  cwd: __dirname,
  stdio: "inherit",
  shell: true,
});

next.on("close", (code) => {
  console.log(`Next.js exited with code ${code}`);
});