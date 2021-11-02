if(!localStorage.getItem('cart')){
    storageData = [];
}
else storageData = JSON.parse(localStorage.getItem('cart'));

$('document').ready(function(){
    $('.product-card').click((e) => {
        addToCart(e.currentTarget);
    });


    const item_button_handler = (e) => {
        if (e.target.className == "item_plus_button") {
            plusItem(e.currentTarget);
        }
        else if(e.target.className == "item_minus_button"){
            minusItem(e.currentTarget);
        }
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
        // $.each(storageData, (i,el) => {
        //     if(item_id.substring(7,) == el.id){
        //         el.itemsNumber -= 1;
        //         if(el.itemsNumber == 0){
        //             $('#'+item_id).remove();
        //             storageData.splice(i,1);
        //         }
        //         else{
        //             var li = document.getElementById(item_id);
        //             li.getElementsByClassName('item_quality')[0].innerHTML = el.itemsNumber;
        //         }
        //     }
        // });
        localStorage.setItem('cart', JSON.stringify(storageData));  
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
            minus.innerHTML = "-";
            li.insertAdjacentElement('beforeend',minus);

            var quality = document.createElement('p');
            quality.setAttribute('class','item_quality');
            quality.innerHTML = el.itemsNumber;
            li.insertAdjacentElement('beforeend',quality);

            var plus = document.createElement('button');
            plus.setAttribute('class', 'item_plus_button');
            plus.innerHTML = "+";
            li.insertAdjacentElement('beforeend',plus);

            var price = document.createElement('p');
            price.setAttribute('class','item_price');
            price.innerHTML = el.price;
            li.insertAdjacentElement('beforeend',price);

            ul.appendChild(li);   
        }) 
    };

    showCart(storageData);

    const addToCart = (product) =>{
        const productID = $(product).attr("product_id");

        const isAlreadyInCart = $.grep(storageData, element => {return element.id == productID}) != 0;
        if(isAlreadyInCart){
            $.each(storageData, (i,el) => {
                if(productID == el.id){
                    el.itemsNumber += 1;
                    var li = document.getElementById('item_id'+el.id);
                    li.getElementsByClassName('item_quality')[0].innerHTML = el.itemsNumber;
                }
            })
            
        }
        else{   
            var img = document.querySelectorAll('[product_id='+productID+']')[0].getElementsByClassName("product-image")[0].getElementsByTagName('img')[0].src;
            var name = document.querySelectorAll('[product_id='+productID+']')[0].getElementsByClassName("product-info")[0].getElementsByClassName("h5")[0].innerText;
            var price = document.querySelectorAll('[product_id='+productID+']')[0].getElementsByClassName("product-info")[0].getElementsByClassName("h6")[0].innerText;
            const newProduct = {
                id: productID,
                name: name,
                img: img,
                price: price,
                itemsNumber: 1
            }
            storageData.push(newProduct);  
            showCart([newProduct]);
        }
        localStorage.setItem('cart', JSON.stringify(storageData));  
    }
})


