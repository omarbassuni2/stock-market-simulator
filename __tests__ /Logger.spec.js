import fs from "fs";
import path from "path";
import getOrInitWinstonInstance from "../Logger.js";
import { testGetLogsDir } from "./TestUtils.js";

describe("Winston Logger", () => {
  it("should add new file transport after interval", async () => {
    const winstonInstance = getOrInitWinstonInstance(1);
    await new Promise((resolve) => {
      setTimeout(() => {
        expect(winstonInstance.getLogger().transports.length).toBeGreaterThan(
          0
        );
        resolve();
      }, 100);
    });
    winstonInstance.getLogger().clear();
    winstonInstance.clearInterval();
    const logsDir = testGetLogsDir();
    const files = fs.readdirSync(logsDir);
    expect(files.length).toBeGreaterThan(0);
    files.forEach((file) => fs.unlinkSync(path.join(logsDir, file)));
    fs.rmdirSync(logsDir);
  });
});
