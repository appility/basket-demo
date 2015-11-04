  var basket;
  var form;

  describe("Basket", function() {
    beforeEach(function() {
      basket = new App.Basket();
    });

    afterEach(function() {
      delete basket;
    });

    it("item can be added to basket", function() { 
      basket.addItem(new App.BasketItem({
        id: "scarf",
        price: 1.99,
        quantity: 2,
        parent: basket
      }));
      expect(basket.items.length).toBe(1);
    });

    it("items can be added to basket", function() { 
      basket.addItem(new App.BasketItem({
            id: "scarf",
            price: 1.99,
            quantity: 2,
            parent: basket
      }));
      basket.addItem(new App.BasketItem({
            id: "tie",
            price: 2.99,
            quantity: 2,
            parent: basket
      }));
      expect(basket.items.length).toBe(2);
    });

    it("item can be removed from basket", function() {
      basket.addItem(new App.BasketItem({
            id: "tie",
            price: 2.99,
            quantity: 2,
            parent: basket
      }));
      basket.removeItem('tie');
      expect(basket.items.length).toBe(0);

    });

    it("removing item from basket leaves other items intact", function() {
      basket.addItem(new App.BasketItem({
        id: "tie",
        price: 2.99,
        quantity: 2,
        parent: basket
      }));
      basket.addItem(new App.BasketItem({
        id: "tie",
        price: 2.99,
        quantity: 2,
        parent: basket
      }));
      basket.removeItem('tie');
      expect(basket.items.length).toBe(1);
    });

    it("basket can return correct subtotal", function() {
      basket.addItem(new App.BasketItem({
            id: "shoe",
            price: 2.50,
            quantity: 2,
            parent: basket
      }));
      basket.addItem(new App.BasketItem({
            id: "socks",
            price: 1.50,
            quantity: 1,
            parent: basket
      }));
      expect(basket.getSubTotal()).toBe(6.50);
    });

    it("basket can return correct VAT", function() {
      basket.addItem(new App.BasketItem({
            id: "shoe",
            price: 2.50,
            quantity: 2,
            parent: basket
      }));
      expect(basket.getVat().toFixed(2)).toBe('1.00');
    });

    it("basket can return correct total", function() {
      basket.addItem(new App.BasketItem({
            id: "shoe",
            price: 9.50,
            quantity: 2,
            parent: basket
      }));
      basket.addItem(new App.BasketItem({
            id: "sock",
            price: 2.50,
            quantity: 2,
            parent: basket
      }));
      expect(basket.getTotal().toFixed(2)).toBe('28.80');
    });

    it("basket can return its empty state", function() {
      basket.addItem(new App.BasketItem({
            id: "shoe",
            price: 9.50,
            quantity: 2,
            parent: basket
      }));
      expect(basket.isEmpty()).toBeFalsy();
      basket.removeItem('shoe');
      expect(basket.isEmpty()).toBeTruthy();
    });

  });