# basket-demo

A shopping basket implemented in HTML and JavaScript.

General requirements and considerations

Accessibility:  Ensure that your mark-up takes into account basic accessibility standards. For example, ensure form fields are accessible; that the page can be viewed and used without the need for JavaScript to be enabled and any alt attributes and similar are set. You will not be expected to write or connect up any server-side code for this exercise, merely to show your understanding of how such a page might work without JavaScript. Please also consider page weight when saving images. 
Standards compliance:  Ensure that your mark-up is W3C compliant. For example, all tags are correctly closed, tags are nested correctly and that all necessary attributes for a tag are set. Your page should validate against the online W3C checker. 
Semantics:  Ensure that your mark-up is semantic. For example, header tags are used where relevant, information follows a logical flow throughout the document and that information is displayed and marked up using the most appropriate tag. 
JavaScript:
Ensure you write neat, tidy JavaScript that you would consider suitable for a live web site. 
Browsers: The page should function and resemble the creative in the following web browsers:
Firefox (latest)
Google Chrome (latest)
Safari (latest)
Internet Explorer 9+

The page should also function correctly in Internet Explorer 7 and 8.

Please also consider how your page might display on devices of different screen sizes, including mobile.
‘Your Basket’ page
The page shown in the creative depicts a user’s basket on a fictitious online shopping site. Three products have been added to the basket and the names of these are shown together with their cost and the quantity desired for purchase. Beneath the product list, a sub-total of the product costs are shown, VAT is then added (at 20%) and the total is shown beneath. Finally, a ‘Buy Now’ button allows the user to go ahead and purchase the items shown at the total price given.
The fonts shown in the creative are Droid Sans and Droid Serif, available for use in your code from http://www.google.com/fonts.
The ‘Your Basket’ page should implement client-side functional behaviour as follows:
The quantity field shown beside each product should be pre-filled with the initial quantities shown in the creative. Selecting the + button beside the field should increment the quantity by 1. Selecting the – button should decrement the quantity by 1. The user should also be free to enter any positive number within the quantity field, where only whole numbers from 1 to 10 should be permitted for each product. Note: If necessary, the visual layout of the quantity field may differ from the creative if enforced so by the browser, though recall that the page must function correctly down to Internet Explorer 7. 
Whenever a quantity is changed beside any product, the cost beside should update to reflect the price of that product multiplied by its quantity. The sub-total beneath the product list should update to reflect the sum of all the costs. The VAT cost should also update whenever the sub-total changes, as should the final total cost, which is the sum of the sub-total and the VAT. 
When selected, the delete button, indicated as a trashcan icon, should remove the item beside it entirely from the basket even if it would result in no products remaining in the basket. The totals beneath the product list should be updated accordingly whenever a product is deleted. If no products remain in the basket, the ‘Buy Now’ button should be disabled. 
When there and products in the basket and the ‘Buy Now’ button is selected, you should take the product data together with the quantities, costs and totals, and simulate how you would POST this data in JSON format to an Ajax-supported web service URL. As this is purely for simulation purposes in this exercise, you may use a blank URL for this. Display an alert message on screen once the Ajax call is complete.
