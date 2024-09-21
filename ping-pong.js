const { EventEmitter } = require("events");

pingpongServer = () => {
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
};
const delay = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const pingpongP = () => {
  const pingpong = new EventEmitter();

  pingpong
    .on("ping", async () => {
      console.log("ping");
      await delay(500);
      pingpong.emit("pong");
    })
    .on("pong", async () => {
      console.log("pong");
      pingpong.emit("ping");
    });

  pingpong.emit("ping");
};

// pingpongP();

const error = async () => {
  const pingpong = new EventEmitter({
    captureRejections: true,
  });

  pingpong
    .on("ping", async () => {
      console.log("ping");
      await delay(500);
      pingpong.emit("pong");
    })
    .on("pong", async () => {
      console.log("pong");
      await delay(500);
      pingpong.emit("ping");
    })
    .on("error", (error) => {
      console.error("eu captureu o erro  via on", error.message);
    })
    .on("forceExplodeAsync", (error) => Promise.reject(error));

  // node 14
  //prioritario
  pingpong[Symbol.for("nodejs.rejection")] = (error) => {
    console.error("eu capturei o erro  via propriedade", error.message);
  };

  pingpong.emit("ping");
  await delay(2000);
  pingpong.emit("error", Error("deu ruin depois de 2s"));

  await delay(1000);
  pingpong.emit("forceExplodeAsync", Error("deu ruin depois de 3s"));
};

error();
