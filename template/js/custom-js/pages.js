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

$('.apx_newsletter form').submit(function(e){
    e.preventDefault();
    var news = [];
    news.form = $(this);
    news.mail = $(this).find('input[name="email"]').val();
    news.name = $(this).find('input[name="name"]').val();
    axios.post('https://us-central1-marketingtools-ecomplus.cloudfunctions.net/app/alpix/apx_newsletter', {
        storeId : storefront.settings.store_id,
        mail : news.mail,
        fullname : news.name
    })
    .then(function(response){
        alert(response.data.msg)
        if(!response.data.error){
            news.form.find('input[type="text"],input[type="email"]').val('')
        }
    })
});

$('.apx_form').submit(function(e){
    e.preventDefault();
    var mail = [];
    mail.form = $(this);
    mail.destination = $(this).find('[name="destination]').val() != undefined ? $(this).find('input[name="destination"]').val() : "falecom@bahcosmeticos.com.br";
    mail.replyTo = $(this).find('input[name="email"]').val();
    mail.subject = $(this).find('input[name="subject"]').val();
    mail.body = "";

    mail.form.find('input:not([type="hidden"]), textarea').each(function(){
        mail.body = mail.body + $(this).closest('div').find('label').text() + ': ' + $(this).val() + '<br>';
    });

    axios.post('https://us-central1-marketingtools-ecomplus.cloudfunctions.net/app/alpix/apx_sendmail', {
        storeId : storefront.settings.store_id,
        destination : mail.destination,
        subject : mail.subject,
        content : mail.body,
        reply_mail: mail.replyTo
    })
    .then(function(response){
        alert(response.data.msg)
        if(!response.data.error){
            news.form.find('input[type="text"],input[type="email"],textarea,input[type="tel"]').val('')
        }
    })
    
});
