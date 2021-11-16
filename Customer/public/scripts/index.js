$('document').ready(function(){
    $('#login-icon-text').click(function(req,res){
        $('#login-form').toggle();
    })
    $('.close-btn').click(function(req,res){
        $('#login-form').toggle();
    })
    $('.cancel-btn').click(function(req,res){
        $('#login-form').toggle();
    })  
})
var modal = document.getElementById('login-form');
window.onclick=  event => {
    if(event.target == modal){
        console.log('Off');
        modal.style.display = "none";
    }
}
