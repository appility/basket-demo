/*! Test 09-09-2013 */
function addEvent(a,b,c){document.addEventListener?a.addEventListener(b,c,!1):document.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c}function cancelEvent(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function removeElement(a){a.parentNode.removeChild(a)}Object.create=function(a){function b(){}return b.prototype=a,new b};var App=App||{};App.Model=function(){},App.Model.prototype=function(){"use strict";function a(a){var b,c=this;b=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),b.overrideMimeType("application/json"),b.open("GET",a,!1),b.onload=function(){c.saveComplete(b,a)},b.send()}return{save:a}}();var App=App||{};App.Basket=function(a){"use strict";this.items=[],this.vatAt="object"==typeof a?a.vatAt:20},App.Basket.prototype=Object.create(App.Model.prototype),App.Basket.prototype.addItem=function(a){"use strict";var b=new App.BasketItem(a);return this.items.push(b),b},App.Basket.prototype.removeItem=function(a){"use strict";for(var b=0;b<this.items.length;b++)if(this.items[b].id===a)return this.items.splice(b,1),!1},App.Basket.prototype.getSubTotal=function(){"use strict";for(var a=0,b=0;b<this.items.length;b++)a+=this.items[b].quantity*this.items[b].price;return parseFloat(a)},App.Basket.prototype.getVat=function(){"use strict";return parseFloat(this.getSubTotal()/100*this.vatAt)},App.Basket.prototype.getTotal=function(){"use strict";return parseFloat(this.getSubTotal()+this.getVat())},App.Basket.prototype.saveComplete=function(a){"use strict";200===a.status?alert(JSON.stringify(this)):alert(JSON.stringify(this))},App.Basket.prototype.isEmpty=function(){"use strict";return!this.items.length};var App=App||{};App.BasketItem=function(a){"use strict";this.id=a.id,this.price=a.price,this.quantity=a.quantity},App.BasketItem.prototype=function(){"use strict";function a(){return this.price}function b(a){var b=this.quantity+a;return b>0&&11>b?this.quantity+=a:!1}function c(a){a>0&&11>a&&(this.quantity=a)}function d(){return this.quantity}function e(){return this.getQuantity()*this.getPrice()}return{getPrice:a,changeQuantity:b,getQuantity:d,setQuantity:c,getCost:e}}();var App=App||{};App.Form=function(a,b){"use strict";this.model=a,this.el=document.getElementById(b),this.subTotalEl=this.el.getElementsByClassName("subtotal-cost")[0],this.vatEl=this.el.getElementsByClassName("vat-cost")[0],this.totalEl=this.el.getElementsByClassName("total-cost")[0],this.submitEl=this.el.querySelector(' input[type="submit"]'),this.items=this.el.querySelectorAll("tbody:first-of-type tr");for(var c=function(a){this.handleModelChange(a)}.bind(this),d=0;d<this.items.length;d++)addEvent(this.items[d],"modelChange",c),new App.FormItem(a,this.items[d]);this.init=function(){this.el.addEventListener("submit",{handleEvent:this.handleSubmit.bind(this),"this":this},!1)},this.init()},App.Form.prototype=function(){"use strict";function a(){this.updateTotals(),this.checkForEmptyModel()}function b(){this.subTotalEl.innerHTML=this.model.getSubTotal().toFixed(2),this.vatEl.innerHTML=this.model.getVat().toFixed(2),this.totalEl.innerHTML=this.model.getTotal().toFixed(2)}function c(){this.model.isEmpty()&&(this.submitEl.disabled="disabled")}function d(a){cancelEvent(a),this.model.save(this.el.action)}return{handleSubmit:d,handleModelChange:a,updateTotals:b,checkForEmptyModel:c}}();var App=App||{};App.FormItem=function(a,b){"use strict";this.parentModel=a,this.el=b,this.id=this.el.id,this.plusEl=this.el.getElementsByClassName("plus")[0],this.minusEl=this.el.getElementsByClassName("minus")[0],this.inputEl=this.el.getElementsByTagName("input")[0],this.priceEl=this.el.getElementsByClassName("price")[0],this.costEl=this.el.getElementsByClassName("item-cost")[0],this.deleteEl=this.el.getElementsByClassName("delete")[0],this.model=this.parentModel.addItem({id:this.id,price:parseFloat(this.priceEl.innerHTML),quantity:parseInt(this.inputEl.value,10),parent:this.parentModel}),this.addEvents()},App.FormItem.prototype=function(){"use strict";function a(){addEvent(this.deleteEl,"click",function(a){this.handleDelete(a)}.bind(this)),addEvent(this.inputEl,"change",function(a){this.handleChange(a)}.bind(this)),addEvent(this.plusEl,"click",function(a){this.handleIncrement(a,1)}.bind(this)),addEvent(this.minusEl,"click",function(a){this.handleIncrement(a,-1)}.bind(this))}function b(a){cancelEvent(a);var b=parseInt(a.target.value,10);if(b>0){this.model.setQuantity(b),this.update();var c=new Event("modelChange");this.el.dispatchEvent(c)}else this.inputEl.value=1}function c(a,b){cancelEvent(a);var c=this.model.getQuantity()+b;if(c>0){this.model.changeQuantity(b),this.update();var d=new Event("modelChange");this.el.dispatchEvent(d)}}function d(){this.updateQuantity(),this.updateCost()}function e(){this.inputEl.value=this.model.getQuantity()}function f(){this.costEl.innerHTML=this.model.getCost().toFixed(2)}function g(a){cancelEvent(a);var b=confirm("Are your sure?");if(b===!0){this.parentModel.removeItem(this.el.id);var c=new Event("modelChange");this.el.dispatchEvent(c),removeElement(this.el)}}return{addEvents:a,update:d,updateQuantity:e,updateCost:f,handleDelete:g,handleChange:b,handleIncrement:c}}();