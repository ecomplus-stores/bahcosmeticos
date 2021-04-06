// Add your custom JavaScript for storefront pages here.
const isMobile = window.innerWidth < 990 ? true : false;

if(isMobile){
    $('#search-bar').addClass('show');
    $('#user-button').clone().appendTo('#user-mobile');
}
if(ecomPassport.getCustomerName() != ""){
    $('#user-button > div > u').text('Olá ' + ecomPassport.getCustomerName())
}
$('.header__search-input').keyup(function(){
    $('body .search__input').val($(this).val()).[0].dispatchEvent(new Event('input'));
});
$('body').click(function(e){
    if($(e.target).closest('.header__search').length == 0){
        $('#instant-search .search__status .close').click();
    }
});
