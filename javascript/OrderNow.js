$(function () {
  $("#auto_search")
    .autocomplete({
      //"autocomplete.php",
      source: [
        {
          id: 1,
          value: "Mango",
          img:
            "https://devgadmango.com/wp-content/uploads/2019/11/chemical-mango.png",
          suffix: "/kg",
          price: "600",
        },
        {
          id: 2,
          value: "Banana",
          img:
            "https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG-320-80.jpg",
          suffix: "/dozen",
          price: "50",
        },
        {
          id: 3,
          value: "Watermelon",
          img:
            "https://lh3.googleusercontent.com/proxy/_sqm7i9aUKzszXgkJHMi_MJ45_EGr9PnD453OhaEWTz_gToMUiYnb9OYxEIYOd9w_YQllZ_mT1GUYs9V2XWOx8pwpD6sKaLC0AJdA6Dw62-988blAi5DNE6pquIOjtE",
          suffix: "/kg",
          price: "50",
        },
        {
          id: 4,
          value: "Melon",
          img:
            "https://lh3.googleusercontent.com/proxy/dWy8-V_iFiSwrfZEAreuYygUnipfGre559Lt9CFF_FQFS9yPRbgg8BwHmZMKhlcHCcp5Q1swwMfV5n8AG0w6LzuT94V0tJzr7VxA1qdzFvpXOaeJO2d7wVhM0Lp_YJJVhmJCsXlACWOvsCiTzWY",
          suffix: "/kg",
          price: "80",
        },
      ],
      minLength: 1,
      select: function (event, ui) {
        myFunction(ui.item.value);
        $("#auto_search").val("");
        event.preventDefault();
      },
      html: true,
      open: function (event, ui) {
        $(".ui-autocomplete").css("z-index", 1000);
      },
    })
    .autocomplete("instance")._renderItem = function (ul, item) {
    return $(
      "<li id='mysearchlist'  class='list-group-item'><div id='searchitem'><img id='searchimg' src='" +
        item.img +
        "'><span style='padding:20px'>" +
        item.value +
        "</span><span style='padding:20px'>" +
        item.price +
        item.suffix +
        "</span></div></li>"
    ).appendTo(ul);
    //return $("<ul class='list-group'><li class='list-group-item d-flex justify-content-between align-items-center'> "+item.value+"'<span class='badge badge-primary badge-pill'>"+item.value+"</span></li></ul>").appendTo( ul );
  };
});

var source = [
  {
    id: 1,
    value: "Mango",
    img:
      "https://devgadmango.com/wp-content/uploads/2019/11/chemical-mango.png",
    suffix: "/kg",
    price: "600",
  },
  {
    id: 2,
    value: "Banana",
    img: "https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG-320-80.jpg",
    suffix: "/dozen",
    price: "50",
  },
  {
    id: 3,
    value: "Watermelon",
    img:
      "https://lh3.googleusercontent.com/proxy/_sqm7i9aUKzszXgkJHMi_MJ45_EGr9PnD453OhaEWTz_gToMUiYnb9OYxEIYOd9w_YQllZ_mT1GUYs9V2XWOx8pwpD6sKaLC0AJdA6Dw62-988blAi5DNE6pquIOjtE",
    suffix: "/kg",
    price: "50",
  },
  {
    id: 4,
    value: "Melon",
    img:
      "https://lh3.googleusercontent.com/proxy/dWy8-V_iFiSwrfZEAreuYygUnipfGre559Lt9CFF_FQFS9yPRbgg8BwHmZMKhlcHCcp5Q1swwMfV5n8AG0w6LzuT94V0tJzr7VxA1qdzFvpXOaeJO2d7wVhM0Lp_YJJVhmJCsXlACWOvsCiTzWY",
    suffix: "/kg",
    price: "80",
  },
];

function myFunction(searchVal) {
  var results = [];
  var price = 0;
  var searchField = "value";
  if (searchVal == "" || searchVal.length == 0) {
    alert("Please! Enter value!!");
  } else {
    for (var i = 0; i < source.length; i++) {
      if (source[i][searchField] == searchVal) {
        results.push(source[i]);
      }
    }
    if (showTableData(searchVal) == "true") {
    }
    $("#productTable tbody").append(
      "<tr>" +
        "<td><img src='" +
        getFields(results, "img") +
        "' alt='item image'/></td>" +
        "<td>" +
        getFields(results, "value") +
        "</td>" +
        "<td  class='countable'>" +
        getFields(results, "price") +
        "</td>" +
        "<td  id='quantityvalue'><select id='quantity'><option value='1'>1 Kg</option> <option value='2'>2 Kg</option><option value='3'>3 Kg</option><option value='4'>4 Kg</option><option value='5'>5 Kg</option></select></td>" +
        "<td><button onclick='deleteRow();addfunction()' class='btn btn-danger'>Delete</button></td>" +
        "</tr>"
    );
    var cls = document
      .getElementById("productTable")
      .getElementsByTagName("td");
    var sum = 0;
    for (var i = 0; i < cls.length; i++) {
      if (cls[i].className == "countable") {
        sum += isNaN(cls[i].innerHTML) ? 0 : parseInt(cls[i].innerHTML);
      }
    }
    document.getElementById("pricetag").innerHTML = sum;
  }
  document.getElementById("auto_search").innerHTML = "";
}

function getFields(source, value) {
  var output = [];
  for (var i = 0; i < source.length; ++i) output.push(source[i][value]);
  return output;
}

function deleteRow() {
  var index,
    table = document.getElementById("productTable");
  for (var i = 1; i < table.rows.length; i++) {
    table.rows[i].cells[4].onclick = function () {
      index = this.parentElement.rowIndex;
      table.deleteRow(index);

      console.log(index);
    };
  }
}

function checkout() {
  if (document.getElementById("productTable").rows.length == 1) {
    alert("Please! add iteam to cart");
  }
}

function addfunction() {
  $("table#productTable").bind("DOMSubtreeModified", function () {
    var cls = document
      .getElementById("productTable")
      .getElementsByTagName("td");
    var sum = 0;
    for (var i = 0; i < cls.length; i++) {
      if (cls[i].className == "countable") {
        sum += isNaN(cls[i].innerHTML) ? 0 : parseInt(cls[i].innerHTML);
      }
    }
    document.getElementById("pricetag").innerHTML = sum;
  });
}
function showTableData(searchVal) {
  var myTab = document.getElementById("productTable");

  // LOOP THROUGH EACH ROW OF THE TABLE AFTER HEADER.
  for (i = 1; i < myTab.rows.length; i++) {
    // GET THE CELLS COLLECTION OF THE CURRENT ROW.
    var objCells = myTab.rows.item(i).cells;

    // LOOP THROUGH EACH CELL OF THE CURENT ROW TO READ CELL VALUES.
    // for (var j = 3; j < objCells.length - 1; j++) {
    //   console.log(objCells.item(j).innerHTML);
    // }
    for (var j = 1; j < objCells.length - 3; j++) {
      if (objCells.item(j).innerHTML == searchVal) {
        return "true";
      } else {
        return "false";
      }
    }
  }
}

// function showTableData(searchVal) {
//   var myTab = document.getElementById("productTable");

//   // LOOP THROUGH EACH ROW OF THE TABLE AFTER HEADER.
//   for (i = 1; i < myTab.rows.length; i++) {
//     // GET THE CELLS COLLECTION OF THE CURRENT ROW.
//     var objCells = myTab.rows.item(i).cells;

//     for (var j = 3; j < objCells.length - 1; j++)  {
//       if(objCells.item(j).innerHTML==searchVal){

//       }
//     }
//   }
// }
