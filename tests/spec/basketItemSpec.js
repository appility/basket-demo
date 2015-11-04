  var basket;

  describe("Basket Item", function() {
    beforeEach(function() {
      basket = new App.Basket();
    });

    afterEach(function() {
      delete basket;
    });

    it("cannot have a quantity of less than 1", function() {
      var basketItem = new App.BasketItem({
            id: "shoe",
            price: 9.50,
            quantity: 2,
            parent: basket
      });
      basketItem.setQuantity(0);
      expect(basketItem.getQuantity()).toBe(2);
    });

    it("cannot have a quantity of more than 10", function() {
      var basketItem = new App.BasketItem({
            id: "shoe",
            price: 9.50,
            quantity: 2,
            parent: basket
      });
      basketItem.setQuantity(10);
      expect(basketItem.getQuantity()).toBe(10);
      basketItem.changeQuantity(1);
      expect(basketItem.getQuantity()).toBe(10);
    });
  });