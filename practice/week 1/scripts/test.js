describe("calculator", function () {
  context("when 2 and 3 entered", function () {
    beforeEach(function () {
      sinon.stub(window, "prompt");

      prompt.onCall(0).returns("2");
      prompt.onCall(1).returns("3");

      calculator.read();
    });

    afterEach(function () {
      prompt.restore();
    });

    it("the read get two values and saves them as object properties", function () {
      assert.equal(calculator.a, 2);
      assert.equal(calculator.b, 3);
    });

    it("the sum is 5", function () {
      assert.equal(calculator.sum(), 5);
    });

    it("the multiplication product is 6", function () {
      assert.equal(calculator.mul(), 6);
    });

    it("the subtraction is -1", function () {
      assert.equal(calculator.sub(), -1);
    });

    it("the division is 0.6666666666666666", function () {
      assert.equal(calculator.div(), 0.6666666666666666);
    });
  });
});
