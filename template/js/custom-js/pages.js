// Add your custom JavaScript for storefront pages here.
if(ecomPassport.getCustomerName() != ""){
    $('#user-button > div > u').text('Olá ' + ecomPassport.getCustomerName())
}