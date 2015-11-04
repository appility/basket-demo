
describe("Form", function() {

  beforeEach(function() {
    spyOn(window, 'confirm').andReturn(true);
    $('#sandbox').append(strVar);
    var basket =  new App.Basket({
      vatAt: 20
    });
    var form = new App.Form(basket, 'basket');
  });

  afterEach(function () {
    $('#sandbox').empty();
    delete basket;
  });

  it("Clicking on 'plus' button (first item) updates items quantity", function() {
      $('#sandbox tbody tr:eq(0) .plus')[0].click();
      expect($('tbody tr:eq(0) input').val()).toBe('2');
  });

    it("Clicking on 'plus' button (first item) updates items cost", function() {
      $('#sandbox tbody tr:eq(0) .plus')[0].click();
      expect($('tbody tr:eq(0) .item-cost').text()).toBe('3.98');
  });

  it("Clicking on 'minus' button (second item) updates items quantity", function() {
    $('#sandbox tbody tr:eq(1) .minus')[0].click();
    expect($('tbody tr:eq(1) input').val()).toBe('1');
  });

  it("Clicking on 'minus' button (second item) updates items cost", function() {
    $('#sandbox tbody tr:eq(1) .minus')[0].click();
    expect($('tbody tr:eq(1) .item-cost').text()).toBe('2.99');
  });

  it("Clicking on 'plus' button (second item) updates subtotal", function() {
    $('#sandbox tbody tr:eq(1) .plus')[0].click();
    expect($('#sandbox .subtotal-cost').text()).toBe('14.95');
  });

  it("Clicking on 'plus' button (second item) updates VAT", function() {
    $('#sandbox tbody tr:eq(1) .plus')[0].click();
    expect($('#sandbox .vat-cost').text()).toBe('2.99');
  });

  it("Clicking on 'plus' button (second item) updates total", function() {
    $('#sandbox tbody tr:eq(1) .plus')[0].click();
    expect($('#sandbox .total-cost').text()).toBe('17.94');
  });

  it("Clicking on 'delete' icon, removes the row", function() {
    $('#sandbox tbody tr#cottonshirt-medium .delete')[0].click();
    expect($('#sandbox tbody:eq(0) tr#cottonshirt-medium').length).toBe(0);
    expect($('#sandbox tbody:eq(0) tr').length).toBe(2);
  });

  it("Changing quantity field and tabbing out updates cost", function() {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", false, true);
    $('#sandbox tbody tr:eq(1) input').val('3');
    $('#sandbox tbody tr:eq(1) input')[0].dispatchEvent(evt);
    expect($('tbody tr:eq(1) .item-cost').text()).toBe('8.97');
  });

  it("Changing quantity field and tabbing out updates subtotal", function() {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", false, true);
    $('#sandbox tbody tr:eq(1) input').val('4');
    $('#sandbox tbody tr:eq(1) input')[0].dispatchEvent(evt);
    expect($('#sandbox .subtotal-cost').text()).toBe('17.94');
  });

  it("Changing quantity field and tabbing out updates subtotal", function() {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", false, true);
    $('#sandbox tbody tr:eq(1) input').val('4');
    $('#sandbox tbody tr:eq(1) input')[0].dispatchEvent(evt);
    expect($('#sandbox .subtotal-cost').text()).toBe('17.94');
  });

  it("Changing quantity field and tabbing out updates total", function() {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", false, true);
    $('#sandbox tbody tr:eq(0) input').val('5');
    $('#sandbox tbody tr:eq(0) input')[0].dispatchEvent(evt);
    expect($('#sandbox .total-cost').text()).toBe('23.90');
  });

  it("Removing all items disables 'Submit' button", function() {
    $('#sandbox tbody tr:eq(0) .delete')[0].click();
    $('#sandbox tbody tr:eq(0) .delete')[0].click();
    $('#sandbox tbody tr:eq(0) .delete')[0].click();
    expect($('#sandbox input[type="submit"]').attr('disabled')).toBeDefined();
  });

});