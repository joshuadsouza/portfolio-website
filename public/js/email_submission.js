$(document).ready(function(){
    $('#contact_us_form').on('submit', function(e){
        e.preventDefault();
        var data_send = $('#contact_us_form').serializeArray();
        $('#contact_us_form').addClass("d-none");
        $('#spinnerItem').removeClass("d-none");
        console.log(data_send);
        $.ajax({
            url:"/contact-me",
            type: "POST",
            dataType: "json",
            data: data_send,
            success: function(data){
                console.log(data);
                $('#spinnerItem').addClass("d-none");
                $('#email_submission_thank_you').removeClass("d-none");
            }
        })
    })
});