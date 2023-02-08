import Configuration from "./Configuration";

describe("Configuration server class", () => {
  const instance = new Configuration();

  const originalPort = process.env.PORT;

  it("should return correct default port", () => {
    expect(instance.port).toBe(3001);
  });

  it("should return correct env port", () => {
    const mockedPort = "2007";
    process.env.PORT = mockedPort;

    expect(instance.port).toBe(mockedPort);

    process.env.PORT = originalPort;
  });

  afterAll(() => {
    process.env.PORT = originalPort;
  });
});
