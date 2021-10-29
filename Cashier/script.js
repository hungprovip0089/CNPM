var Bills = {
  draw : function () {
    var wrapper = document.getElementById("poscart");

    fetch("data.json")
    .then(response => response.json())
    .then(bills => {
      for(let pid in bills){
        // console.log(bills[pid])
        let pdt = document.createElement("input"), p = bills[pid];
  
        pdt.className = "citem";
        pdt.dataset.pid = pid;
        pdt.setAttribute("type", "button");
        pdt.setAttribute("value", `Đơn hàng ${p.id}`);
        pdt.onclick = function() { content_bill(p); };
        wrapper.appendChild(pdt);
      }

    });
  }
};
window.addEventListener("DOMContentLoaded", Bills.draw);

function total_cost(b){
  var total = 0
  // console.log(b.bill);
  for(cnt in b.bill){
    // console.log(item)
    item = b.bill[cnt]
    total += item.quantity * item.price
  }
  return numberWithCommas(total)
}

function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
  return parts.join(",");
}

function content_bill(bill){
  b = document.getElementById("bill")
  // console.log(b.innerHTML)
    // if(b == null){
  //   b = document.createElement("div")
  //   b.id = "bill"
  // }
  // while (b.lastElementChild) {
  //   b.removeChild(b.lastElementChild);
  // }
  b.innerHTML = ""
  segment = document.createElement("h1")
  segment.innerHTML = `Hóa đơn ${bill.id}`
  b.appendChild(segment)

  segment = document.createElement("p")
  segment.innerHTML = `Thời gian: ${bill.time}`
  b.appendChild(segment)

  // Table siêu khó
  table = document.createElement("table")
  table.className = "table"
  thead = document.createElement("thead")

  tr = document.createElement("tr")

  th = document.createElement("th")
  th.scope = "col"
  th.innerHTML = "#"
  tr.appendChild(th)

  th = document.createElement("th")
  th.scope = "col"
  th.innerHTML = "Món ăn"
  tr.appendChild(th)

  th = document.createElement("th")
  th.scope = "col"
  th.innerHTML = "Giá"
  tr.appendChild(th)

  th = document.createElement("th")
  th.scope = "col"
  th.innerHTML = "Số lượng"
  tr.appendChild(th)

  th = document.createElement("th")
  th.scope = "col"
  th.innerHTML = "Số tiền"
  tr.appendChild(th)

  thead.appendChild(tr)
  table.appendChild(thead)

  tbody = document.createElement("tbody");

  //for loops
  for(cnt in bill.bill){
    item = bill.bill[cnt]
    tr = document.createElement("tr")
    
    th = document.createElement("th")
    th.scope = "row"
    th.innerHTML = `${cnt}`
    tr.appendChild(th)

    td = document.createElement("td")
    td.innerHTML = `${item.name}`
    tr.appendChild(td)

    td = document.createElement("td")
    td.innerHTML = `${numberWithCommas(item.price)}`
    tr.appendChild(td)

    td = document.createElement("td")
    td.innerHTML = `${item.quantity}`
    tr.appendChild(td)

    td = document.createElement("td")
    td.innerHTML = `${numberWithCommas(item.price * item.quantity)}`
    tr.appendChild(td)

    tbody.appendChild(tr)
  }


  table.appendChild(tbody)
  b.appendChild(table)


  segment = document.createElement("div")
  segment.innerHTML = `Tổng tiền: ${total_cost(bill)} VND`
  segment.className = "ctotal";
  segment.id = "ctotal";
  b.appendChild(segment)

  segment = document.createElement("input")
  segment.setAttribute("type", "button");
  segment.setAttribute("value", "Xác nhận");
  segment.id = "cempty"
  segment.onclick = function() { content_bill(p); };
  b.appendChild(segment)

  segment = document.createElement("input")
  segment.setAttribute("type", "button");
  segment.setAttribute("value", "In");
  segment.id = "ccheckout"
  segment.onclick = function() { print_bill(); };
  b.appendChild(segment)

  hr = document.createElement("hr")
  b.appendChild(hr)

}

function print_bill(){
  // Xem  lại cái nút
  var b = document.getElementById("bill")
  var printwin = window.open();
  printwin.document.write(b.innerHTML);
  printwin.stop();
  printwin.print();
  printwin.close();
}

function delete_bill(bill){
  // how to delete a file 
  console.log("Hello World")
}
// var cart = {
//   // (A) PROPERTIES
//   items : {}, // CURRENT ITEMS IN CART

//   // (B) SAVE CURRENT CART INTO LOCALSTORAGE
//   save : function () {
//     localStorage.setItem("cart", JSON.stringify(cart.items));
//   },

//   // (C) LOAD CART FROM LOCALSTORAGE
//   load : function () {
//     cart.items = localStorage.getItem("cart");
//     if (cart.items == null) { cart.items = {}; }
//     else { cart.items = JSON.parse(cart.items); }
//   },

//   // (D) NUKE CART!
//   nuke : function () {
//     cart.items = {};
//     localStorage.removeItem("cart");
//     cart.list();
//   },

//   // (E) INITIALIZE - RESTORE PREVIOUS SESSION
//   init : function () {
//     cart.load();
//     cart.list();
//   },

//   // (F) LIST CURRENT CART ITEMS (IN HTML)
//   list : function () {
//     // (F1) DRAW CART INIT
//     var wrapper = document.getElementById("poscart"),
//         item, part, pdt,
//         total = 0, subtotal = 0,
//         empty = true;
//     wrapper.innerHTML = "";
//     for (let key in cart.items) {
//       if (cart.items.hasOwnProperty(key)) { empty = false; break; }
//     }

//     if (empty) {
//       item = document.createElement("div");
//       item.innerHTML = "Bill queue is empty";
//       wrapper.appendChild(item);
//     }

//     // (F3) CART IS NOT EMPTY - LIST ITEMS
//     else {
//       for (let pid in cart.items) {
//         // CURRENT ITEM
//         pdt = products.list[pid];
//         item = document.createElement("div");
//         item.className = "citem";
//         wrapper.appendChild(item);

//         // ITEM NAME
//         part = document.createElement("span");
//         part.innerHTML = pdt.name;
//         part.className = "cname";
//         part.addEventListener("click", cart.remove);
//         item.appendChild(part);
//       }
//     }
//   },

//   // (G) ADD ITEM TO CART
//   add : function () {
//     var pid = this.dataset.pid;
//     if (cart.items[pid] == undefined) { cart.items[pid] = 1; }
//     else { cart.items[pid]++; }
//     cart.save(); cart.list();
//   },

//   // (H) CHANGE QUANTITY
//   change : function () {
//     // (H1) REMOVE ITEM
//     var pid = this.dataset.pid;
//     if (this.value <= 0) {
//       delete cart.items[pid];
//       cart.save(); cart.list();
//     }

//     // (H2) UPDATE TOTAL ONLY
//     else {
//       cart.items[pid] = this.value;
//       var total = 0;
//       for (let id in cart.items) {
//         total += cart.items[pid] * products.list[pid].price;
//         document.getElementById("ctotal").innerHTML ="TOTAL: $" + total;
//       }
//     }
//   },

//   // (I) REMOVE ITEM FROM CART
//   remove : function () {
//     delete cart.items[this.dataset.pid];
//     cart.save(); cart.list();
//   },

//   // (J) CHECKOUT
//   checkout : function () {
//     orders.print();
//     orders.add();
//   }
// };
// window.addEventListener("DOMContentLoaded", cart.init);


// var bill = {

// }

// window.addEventListener("DOMContentLoaded", orders.init);


