var products = {
  // (A) PRODUCTS LIST
  list : {
    1 : { name:"Banana", img:"banana.png", price: 12 },
    2 : { name:"Cherry", img:"cherry.png", price: 23 },
    3 : { name:"Ice Cream", img:"icecream.png", price: 54 },
    4 : { name:"Orange", img:"orange.png", price: 65 },
    5 : { name:"Strawberry", img:"strawberry.png", price: 34 },
    6 : { name:"Watermelon", img:"watermelon.png", price: 67 },
    7 : { name:"Watermelon", img:"watermelon.png", price: 67 },
    8 : { name:"Watermelon", img:"watermelon.png", price: 67 },
    9 : { name:"Watermelon", img:"watermelon.png", price: 67 }
  },
  size : 9,

  // (B) DRAW HTML PRODUCTS LIST
  draw : function () {
    // (B1) TARGET WRAPPER
    var wrapper = document.getElementById("poslist");
    nums_row = Math.ceil(products.size/3)
    wrapper.style.gridTemplateRows = `repeat(${nums_row}, 210px)`;
    for (let pid in products.list) {
      // CURRENT PRODUCT
      let p = products.list[pid],
          pdt = document.createElement("div"),
          segment;

      // PRODUCT SEGMENT
      pdt.className = "pwrap";
      pdt.dataset.pid = pid;
      pdt.onclick = cart.add;
      wrapper.appendChild(pdt);

      // IMAGE
      segment = document.createElement("img");
      segment.className = "pimg";
      segment.src = "images/" + p.img;
      pdt.appendChild(segment);

      // NAME
      segment = document.createElement("div");
      segment.className = "pname";
      segment.innerHTML = p.name;
      pdt.appendChild(segment);

      // PRICE
      segment = document.createElement("div");
      segment.className = "pprice";
      segment.innerHTML = "$" + p.price;
      pdt.appendChild(segment);
    }
  }
};
window.addEventListener("DOMContentLoaded", products.draw);

var cart = {
  // (A) PROPERTIES
  items : {}, // CURRENT ITEMS IN CART

  // (B) SAVE CURRENT CART INTO LOCALSTORAGE
  save : function () {
    localStorage.setItem("cart", JSON.stringify(cart.items));
  },

  // (C) LOAD CART FROM LOCALSTORAGE
  load : function () {
    cart.items = localStorage.getItem("cart");
    if (cart.items == null) { cart.items = {}; }
    else { cart.items = JSON.parse(cart.items); }
  },

  // (D) NUKE CART!
  nuke : function () {
    cart.items = {};
    localStorage.removeItem("cart");
    cart.list();
  },

  // (E) INITIALIZE - RESTORE PREVIOUS SESSION
  init : function () {
    cart.load();
    cart.list();
  },

  // (F) LIST CURRENT CART ITEMS (IN HTML)
  list : function () {
    // (F1) DRAW CART INIT
    var wrapper = document.getElementById("poscart"),
        item, part, pdt,
        total = 0, subtotal = 0,
        empty = true;
    wrapper.innerHTML = "";
    for (let key in cart.items) {
      if (cart.items.hasOwnProperty(key)) { empty = false; break; }
    }

    if (empty) {
      item = document.createElement("div");
      item.innerHTML = "Bill queue is empty";
      wrapper.appendChild(item);
    }

    // (F3) CART IS NOT EMPTY - LIST ITEMS
    else {
      for (let pid in cart.items) {
        // CURRENT ITEM
        pdt = products.list[pid];
        item = document.createElement("div");
        item.className = "citem";
        wrapper.appendChild(item);

        // ITEM NAME
        part = document.createElement("span");
        part.innerHTML = pdt.name;
        part.className = "cname";
        part.addEventListener("click", cart.remove);
        item.appendChild(part);

        // REMOVE
        // part = document.createElement("input");
        // part.type = "button";
        // part.value = "X";
        // part.dataset.pid = pid;
        // part.className = "cdel";
        // part.addEventListener("click", cart.remove);
        // item.appendChild(part);

        // // QUANTITY
        // part = document.createElement("input");
        // part.type = "number";
        // part.min = 0;
        // part.value = cart.items[pid];
        // part.dataset.id = pid;
        // part.className = "cqty";
        // part.addEventListener("change", cart.change);
        // item.appendChild(part);

        // SUBTOTAL
        // subtotal = cart.items[pid] * pdt.price;
        // total += subtotal;
      }

      // TOTAL AMOUNT
      // item = document.createElement("div");
      // item.className = "ctotal";
      // item.id = "ctotal";
      // item.innerHTML ="TOTAL: $" + total;
      // wrapper.appendChild(item);

      // // EMPTY BUTTON
      // item = document.createElement("input");
      // item.type = "button";
      // item.value = "Empty";
      // item.addEventListener("click", cart.nuke);
      // item.id = "cempty";
      // wrapper.appendChild(item);

      // // CHECKOUT BUTTON
      // item = document.createElement("input");
      // item.type = "button";
      // item.value = "Checkout";
      // item.addEventListener("click", cart.checkout);
      // item.id = "ccheckout";
      // wrapper.appendChild(item);
    }
  },

  // (G) ADD ITEM TO CART
  add : function () {
    var pid = this.dataset.pid;
    if (cart.items[pid] == undefined) { cart.items[pid] = 1; }
    else { cart.items[pid]++; }
    cart.save(); cart.list();
  },

  // (H) CHANGE QUANTITY
  change : function () {
    // (H1) REMOVE ITEM
    var pid = this.dataset.pid;
    if (this.value <= 0) {
      delete cart.items[pid];
      cart.save(); cart.list();
    }

    // (H2) UPDATE TOTAL ONLY
    else {
      cart.items[pid] = this.value;
      var total = 0;
      for (let id in cart.items) {
        total += cart.items[pid] * products.list[pid].price;
        document.getElementById("ctotal").innerHTML ="TOTAL: $" + total;
      }
    }
  },

  // (I) REMOVE ITEM FROM CART
  remove : function () {
    delete cart.items[this.dataset.pid];
    cart.save(); cart.list();
  },

  // (J) CHECKOUT
  checkout : function () {
    orders.print();
    orders.add();
  }
};
window.addEventListener("DOMContentLoaded", cart.init);

var orders = {
  // (A) PROPERTY
  idb : window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB,
  posdb : null,
  db : null,

  // (A) INIT - CREATE DATABASE
  init : function () {
    // (A1) INDEXED DATABASE OBJECT
    if (!orders.idb) {
      alert("INDEXED DB IS NOT SUPPORTED ON THIS BROWSER!");
      return false;
    }

    // (A2) OPEN POS DATABASE
    orders.posdb = orders.idb.open("JSPOS", 1);
    orders.posdb.onsuccess = function () {
      orders.db = orders.posdb.result;
    };

    // (A3) CREATE POS DATABASE
    orders.posdb.onupgradeneeded = function () {
      // ORDERS STORE (TABLE)
      var db = orders.posdb.result,
      store = db.createObjectStore("Orders", {keyPath: "oid", autoIncrement: true}),
      index = store.createIndex("time", "time");

      // ORDER ITEMS STORE (TABLE)
      store = db.createObjectStore("Items", {keyPath: ["oid", "pid"]}),
      index = store.createIndex("qty", "qty");
    };

    // (A4) ERROR!
    orders.posdb.onerror = function (err) {
      alert("ERROR CREATING DATABASE!");
      console.log(err);
    };
  },

  // (B) ADD NEW ORDER
  add : function () {
    // (B1) INSERT ORDERS STORE (TABLE)
    var tx = orders.db.transaction("Orders", "readwrite"),
        store = tx.objectStore("Orders"),
        req = store.put({time: Date.now()});

    // (B2) THE PAINFUL PART - INDEXED DB IS ASYNC
    // HAVE TO WAIT UNTIL ALL IS ADDED TO DB BEFORE CLEAR CART
    // THIS IS TO TRACK THE NUMBER OF ITEMS ADDED TO DATABASE
    var size = 0, entry;
    for (entry in cart.items) {
      if (cart.items.hasOwnProperty(entry)) { size++; }
    }

    // (B3) INSERT ITEMS STORE (TABLE)
    entry = 0;
    req.onsuccess = function (e) {
      tx = orders.db.transaction("Items", "readwrite"),
      store = tx.objectStore("Items"),
      oid = req.result;
      for (let pid in cart.items) {
        req = store.put({oid: oid, pid: pid, qty: cart.items[pid]});

        // (B4) EMPTY CART ONLY AFTER ALL ENTRIES SAVED
        req.onsuccess = function () {
          entry++;
          if (entry == size) { cart.nuke(); }
        };
      }
    };
  },

  // (C) PRINT RECEIPT FOR CURRENT ORDER
  print : function () {
    // (C1) GENERATE RECEIPT
    var wrapper = document.getElementById("posreceipt");
    wrapper.innerHTML = "";
    for (let pid in cart.items) {
      let item = document.createElement("div");
      item.innerHTML = `${cart.items[pid]} X ${products.list[pid].name}`;
      wrapper.appendChild(item);
    }

    // (C2) PRINT
    var printwin = window.open();
    printwin.document.write(wrapper.innerHTML);
    printwin.stop();
    printwin.print();
    printwin.close();
  }
};
window.addEventListener("DOMContentLoaded", orders.init);

