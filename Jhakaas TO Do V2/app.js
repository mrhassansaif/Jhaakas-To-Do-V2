var date = new Date().toLocaleDateString();

function getAndUpdate() {
  console.log("Updating List...");
  tit = document.getElementById("title").value;
  desc = document.getElementById("description").value;
  if (localStorage.getItem("itemsJson") == null) {
    itemJsonArray = [];
    itemJsonArray.push([tit, desc]);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  } else {
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.push([tit, desc]);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  }
  update();
  resetValues();
}

function update() {
  if (localStorage.getItem("itemsJson") == null) {
    itemJsonArray = [];
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  } else {
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
  }
  // Populate the table
  let tableBody = document.getElementById("tableBody");
  let str = "";
  itemJsonArray.forEach((element, index) => {
    str += `
                    <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${element[0]}</td>
                    <td>${element[1]}</td> 
                    <td>${(element, date)}</td> 
                    <td><button onclick="deleted(${index})" class="btn btn-outline-danger btn-rounded waves-effect"
                    >
                      Delete &nbsp; &nbsp;<i class="fas fa-trash pr-2"></i>
                    </button></td> 
                    </tr>`;
  });
  tableBody.innerHTML = str;
}
add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();
function deleted(itemIndex) {
  console.log("Delete", itemIndex);
  itemJsonArrayStr = localStorage.getItem("itemsJson");
  itemJsonArray = JSON.parse(itemJsonArrayStr);
  // Delete itemIndex element from the array
  itemJsonArray.splice(itemIndex, 1);
  localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  update();
}

function resetValues() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  tit = "";
  desc = "";
}

function clearStorage() {
  if (confirm("Do you areally want to clear?")) {
    console.log("Clearing the storage");
    localStorage.clear();
    update();
  }
}
