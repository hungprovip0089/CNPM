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
  // how to delete a file or update complete from false to true
  console.log("Hello World")
}
