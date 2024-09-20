const { EventEmitter } = require("events");

((async) => {
  {
    const pingpong = new EventEmitter();

    pingpong
      .on("ping", () => {
        console.log("ping!");
        setTimeout(() => {
          pingpong.emit("pong");
        }, 0);
      })
      .on("pong", () => {
        console.log("pong!");
        setTimeout(() => {
          pingpong.emit("ping");
        }, 0);
      });

    pingpong.emit("ping");
  }

  const delay = (time) => {
    new Promise((resolve) => setTimeout(resolve, time));
  };

  const pingpongP = () => {
    const pingpong = new EventEmitter();

    pingpong
      .on("ping", async () => {
        console.log("ping");
        delay(500);
        pingpong.emit("pong");
      })
      .on("pong", async () => {
        console.log("pong");
        pingpong.emit("ping");
      });

    pingpong.emit("ping");
  };
})();
