$(document).ready(function(){
    $("#createFood").click(function(event){
        $(".create-form").toggle();
        $(".container-main").hide();
    });
    $(".close-button").click(function(event){
        $(".create-form").toggle();
        $(".container-main").show();
    });
});

