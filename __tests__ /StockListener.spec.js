import StockListener from "../StockListener.js";

describe("StockListener", () => {
  it("When testing stock listener, it should be able to start and stop the flow", async () => {
    const listener = new StockListener([], [], 1);
    const listenWithLimitSpy = jest.spyOn(listener, "listenWithLimit");
    listener.startListening();
    listener.stopListening();
    listener.logger.clearInterval();
    expect(listenWithLimitSpy).toHaveBeenCalledTimes(1);
    expect(listener.timeoutTimer).toBeUndefined();
  });
});
