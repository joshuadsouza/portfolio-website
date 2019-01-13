$(document).ready(function(){
    $('#resume_form').on('submit', function(e){
        e.preventDefault();
        var data_send = $('#resume_form').serializeArray();
        $('#form_container').addClass("d-none");
        $('#spinnerItem').removeClass("d-none");
        console.log(data_send);
        $.ajax({
            url:"/resume",
            type: "POST",
            dataType: "json",
            data: data_send,
            success: function(data){
                console.log(data);  
                $('#spinnerItem').addClass("d-none");
                $('#resume_submission_thank_you').removeClass("d-none");
                $('#form_direction').addClass("d-none");
                $('#resume_emailed').append(data);
            }
        })
    })
});