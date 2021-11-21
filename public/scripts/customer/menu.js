if(!localStorage.getItem('cart')){
    storageData = [];
}
else storageData = JSON.parse(localStorage.getItem('cart'));

const uniqueId = (length=16) => {
    return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""))
}

if(!localStorage.getItem('receiptId')){
    receiptId = uniqueId();
    localStorage.setItem('receiptId', receiptId);
}
else receiptId = JSON.parse(localStorage.getItem('receiptId'));

const calCost = () => {
    let total = 0;
    $.each(storageData, (i,el) => {
        total += parseInt(el.price)*parseInt(el.itemsNumber);
    })
    var tax = document.getElementById('tax-value');
    tax.innerHTML = parseInt(total*0.1);
    var total_value = document.getElementById('total-value');
    total_value.innerHTML = parseInt(total*1.1);
}

const item_button_handler = (e) => {
    if (e.target.className == "item_plus_button") {
        plusItem(e.currentTarget);
    }
    else if(e.target.className == "item_minus_button"){
        minusItem(e.currentTarget);
    }
};

const minusItem = (item) => {
    const item_id = $(item).attr('id');
    for(var i = 0 ; i < storageData.length; i++){
        if (storageData[i].id == item_id.substring(7,)){
            storageData[i].itemsNumber -= 1;
            if(storageData[i].itemsNumber == 0){
                $('#'+item_id).remove();
                storageData.splice(i,1);
                break;
            }
            else{
                var li = document.getElementById(item_id);
                li.getElementsByClassName('item_quality')[0].innerHTML = storageData[i].itemsNumber;
            }
        }
    }
    localStorage.setItem('cart', JSON.stringify(storageData));  
    calCost();
};

const plusItem = (item) => {
    const item_id = $(item).attr('id');
    $.each(storageData, (i,el) => {
        if(item_id.substring(7,) == el.id){
            el.itemsNumber += 1;
            var li = document.getElementById(item_id);
            li.getElementsByClassName('item_quality')[0].innerHTML = el.itemsNumber;
        }
    });
    localStorage.setItem('cart', JSON.stringify(storageData));  
    calCost();
};

const showCart = (items) => {
    $.each(items, (i,el) => {
        var ul = document.getElementsByClassName('cart-list')[0];
        var li = document.createElement('li');
        li.setAttribute('class','item_card');
        li.setAttribute('id','item_id' + el.id);
        li.addEventListener('click',item_button_handler);
        
        var img = document.createElement('img');
        img.setAttribute('class','item_image');
        img.src = el.img;
        li.insertAdjacentElement('beforeend',img);

        var name = document.createElement('p');
        name.setAttribute('class','item_name');
        name.innerHTML = el.name;
        li.insertAdjacentElement('beforeend',name)

        var minus = document.createElement('button');
        minus.setAttribute('class', 'item_minus_button');
        minus.innerHTML = "&minus;";
        li.insertAdjacentElement('beforeend',minus);

        var quality = document.createElement('p');
        quality.setAttribute('class','item_quality');
        quality.innerHTML = el.itemsNumber;
        li.insertAdjacentElement('beforeend',quality);

        var plus = document.createElement('button');
        plus.setAttribute('class', 'item_plus_button');
        plus.innerHTML = "&plus;";
        li.insertAdjacentElement('beforeend',plus);

        var price = document.createElement('p');
        price.setAttribute('class','item_price');
        price.innerHTML = el.price;
        li.insertAdjacentElement('beforeend',price);

        ul.appendChild(li);   

    }) 

    calCost();

};

const addToCart = (product) =>{

    const productID = $('.detail-info').attr("product_id");

    var quantity = parseInt(document.getElementsByClassName('quantity')[0].innerHTML);

    const isAlreadyInCart = $.grep(storageData, element => {return element.id == productID}) != 0;
    if(isAlreadyInCart){
        $.each(storageData, (i,el) => {
            if(productID == el.id){
                el.itemsNumber += quantity;
                var li = document.getElementById('item_id'+el.id);
                li.getElementsByClassName('item_quality')[0].innerHTML = el.itemsNumber;
            }
        })
    }
    else{   
        var img = document.getElementsByClassName('detail-image')[0].getElementsByTagName('img')[0].src;
        var name = document.getElementsByClassName('name')[0].innerHTML;
        var price = document.getElementsByClassName('price')[0].innerHTML;
        var priceSplit = price.split(" ");
        const newProduct = {
            id: productID,
            name: name,
            img: img,
            price: priceSplit[1],
            itemsNumber: quantity
        }
        storageData.push(newProduct);  
        showCart([newProduct]);
    }
    localStorage.setItem('cart', JSON.stringify(storageData));  
    calCost();

    $('.detail-box').toggle();
}

const showDetail = (product) => {
    var detail_info = document.getElementsByClassName('detail-info')[0];

    detail_info.setAttribute('product_id', $(product).attr("product_id"));

    var imgsrc = $(product.getElementsByClassName('product-image')[0].getElementsByTagName('img')).attr("src");    

    detail_info.getElementsByClassName('detail-image')[0].getElementsByTagName('img')[0].src = imgsrc;

    var name = $(product.getElementsByClassName('h5')[0]).text();

    detail_info.getElementsByClassName('name')[0].innerHTML = name;

    var price = $(product.getElementsByClassName('h6')[0]).text();
    
    detail_info.getElementsByClassName('price')[0].innerHTML = price;

    var description = $(product.getElementsByClassName('h6')[1]).text()

    detail_info.getElementsByClassName('description')[0].innerHTML = description;

    var type = $(product.getElementsByClassName('h6')[2]).text()

    detail_info.getElementsByClassName('type')[0].innerHTML = type;

    detail_info.getElementsByClassName('quantity')[0].innerHTML = 1;

    detail_info.getElementsByClassName('addToCart')[0].innerHTML = price;

    $('.detail-box').toggle();

}

const sendOrder = (e) => {
    if(storageData.length == 0){
        alert("There is not anything in the cart, please choose some items");
        return;
    }
    const urlArr = window.location.href.split('/');
    $.ajax({
        url: '/' + urlArr[3] + '/' + urlArr[4],
        data: {'cart': storageData, 'receiptId' : receiptId},
        type: "POST"
    }).done(function(){
        alert("The order has been sent. Please wait for the Chef to check");
        localStorage.setItem('cart', []);  
        storageData = [];
        var ul = document.getElementsByClassName('cart-list')[0];
        ul.innerHTML = '';
        calCost();
    });
}

const callService = (e) => {
    const urlArr = window.location.href.split('/');
    console.log('/' + urlArr[3] + '/' + urlArr[4] + '/service');
    $.ajax({
        url:'/' + urlArr[3] + '/' + urlArr[4] + '/service',
        type: "POST"
    }).done(function(){
        alert("The request has been sent. Please wait for the Server a second");
    });
}

const makePayment = (e) => {
    const urlArr = window.location.href.split('/');
    $.ajax({
        url:'/' + urlArr[3] + '/' + urlArr[4] + '/payment',
        data: {'receiptId' :  receiptId},
        type: "POST"
    }).done(function(data){
        if(data == "\"nothing\""){
            alert("There is nothing to pay");
            return;
        }
        alert("The payment request has been sent. Please wait for the Server a second");
        localStorage.removeItem('receiptId');
        localStorage.removeItem('cart');
        window.location = '/';
    });
}

$('document').ready(function(){
    if(!localStorage.getItem('receiptId')){
    receiptId = uniqueId();
    localStorage.setItem('receiptId', receiptId);
    }
    else receiptId = JSON.parse(localStorage.getItem('receiptId'));
    $('.product-card').click((e) => {
        showDetail(e.currentTarget);
    });
        
    $('.cancel').click((e) => {
        $('.detail-box').toggle();
    });

    $('.addToCart').click((e) => {
        addToCart(e.currentTarget);
    });

    $('.minus').click((e) => {
        var quantity = document.getElementsByClassName('quantity')[0];
        if(parseInt($(quantity).text())==1){}
        else{
            var value = parseInt($(quantity).text()) - 1;
            quantity.innerHTML = value;
        }
        var price = $(document.getElementsByClassName('price')[0]).text();
    
        document.getElementsByClassName('addToCart')[0].innerHTML = parseInt(price)*parseInt($(quantity).text());
        
    });

    $('.plus').click((e) => {
        var quantity = document.getElementsByClassName('quantity')[0];
        var value = parseInt($(quantity).text()) + 1;
        quantity.innerHTML = value;
        var price = $(document.getElementsByClassName('price')[0]).text();
    
        document.getElementsByClassName('addToCart')[0].innerHTML = parseInt(price)*parseInt($(quantity).text());
    });

    const call_service_btn = document.getElementsByClassName('call-service-btn')[0];
    call_service_btn.addEventListener('click', callService);

    const payment_btn = document.getElementsByClassName('payment-btn')[0];
    payment_btn.addEventListener('click', makePayment);

    showCart(storageData);

    const send_order_btn = document.getElementById('send-order-btn');
    send_order_btn.addEventListener('click', sendOrder);
})
