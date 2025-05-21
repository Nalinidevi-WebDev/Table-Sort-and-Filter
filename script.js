const table = document.getElementById("table");
// sample data
let data = [
  { name: "HTML", course: "Web", status: "Completed" },
  { name: "CSS", course: "Web", status: "Pursuing" },
  { name: "JavaScript", course: "Web", status: "Completed" },
  { name: "Node Js", course: "Backend", status: "Not yet" },
  { name: "React Js", course: "Frontend", status: "Not yet" },
  { name: "MySql", course: "Database", status: "Completed" },
  { name: "Mongo DB", course: "Database", status: "Not yet" },
  { name: "Mangoose", course: "Database", status: "Not yet" },
];

// data added to table row
function additem(d, i) {
  row = table.insertRow(i + 1);
  let c0 = row.insertCell(0);
  let c1 = row.insertCell(1);
  let c2 = row.insertCell(2);
  let c3 = row.insertCell(3);
  c4 = row.insertCell(4);
  let c5 = row.insertCell(5);
  c0.innerText = i + 1;
  c1.innerText = d.name;
  c1.style.textAlign = "left";
  c1.style.textTransform = "Capitalize";
  c2.innerText = d.course;
  c2.style.textTransform = "Capitalize";
  c3.innerText = d.status;
  c3.style.textTransform = "Capitalize";
  c4.innerHTML = "&#9997;";
  c5.innerHTML = "&#9746;";
  c4.classList.add("zoom");
  c5.classList.add("zoom");
  c4.addEventListener("click", () => edit(c4, i));
  c5.addEventListener("click", () => del(i));
}
data.map((d, i) => additem(d, i));
// search item
const search = document.getElementById("searchitem");
search.addEventListener("input", function () {
  let filterItems = data.filter((d) => {
    let searchresult =
      d.name.toLowerCase().includes(search.value.toLowerCase()) ||
      d.course.toLowerCase().includes(search.value.toLowerCase());

    return searchresult;
  });
  remove();
  filterItems.map((d, i) => additem(d, i));
});
// clear table
function remove() {
  while (table.rows.length > 1) table.deleteRow(-1);
}

// add new item
const addNewItem = document.querySelector(".add");
const upadteItem = document.querySelector(".update");
let index = -1;
// get new item input elements
let newName = document.getElementById("newName");
let newCourse = document.getElementById("newCourse");
let newStatus = document.getElementById("newStatus");
addNewItem.addEventListener("click", function () {
  let check =
    newName.value != "" && newCourse.value != "" && newStatus.value != "";
  if (check) {
    let newItem = {
      name: capitalizeFirstLetter(newName.value),
      course: capitalizeFirstLetter(newCourse.value),
      status: capitalizeFirstLetter(newStatus.value)
    };
    data.push(newItem);
    [newItem].map((d, i) => additem(d, data.length - 1));
    clear();
  } else {
    alert("please enter all values");
    if (newName.value === "") newName.focus();
    else if (newCourse.value === "") newCourse.focus();
    else if (newStatus.value === "") newStatus.focus();
  }
});

// Empty new item input
function clear() {
  newName.value = "";
  newCourse.value = "";
  newStatus.value = "";
}

// Switch add and update button 
function changetoAdd() {
  upadteItem.style.display = "none";

  addNewItem.style.display = "inline";
}
function changetoEdit() {
  addNewItem.style.display = "none";
  upadteItem.style.display = "inline";
}
function capitalizeFirstLetter(string) {
  if (!string) {
    return ""; // Handle empty strings to avoid errors
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}
// edit function
function edit(editbtn, i) {
  newName.value = data[i].name;
  newCourse.value = data[i].course;
  newStatus.value = data[i].status;
  changetoEdit();
  index = i;
}

//Update item function
upadteItem.addEventListener("click", function () {
  const updatedata = {
    name: newName.value,
    course: newCourse.value,
    status: newStatus.value,
  };
  data[index] = updatedata;
  remove();
  data.map((d, i) => additem(d, i));
  clear();
  changetoAdd();
});

// Delete row function
function del(d) {
  const popUp = createPopup();

 
  const confirmBtn = popUp.querySelector("#confirmBtn");
  const cancelBtn = popUp.querySelector("#cancelBtn");
  confirmBtn.addEventListener("click", function () {
    data.splice(d, 1);
    remove();
    data.map((d, i) => additem(d, i));
    popUp.remove();
  });
  cancelBtn.addEventListener("click", function () {
    popUp.remove();
  });
}

// create Popup window
function createPopup() {
  const popupView = document.createElement("div");
  popupView.id = "popupView";
  document.body.append(popupView);
  const popupBox = document.createElement("div");
  popupBox.id = "popupBox";
  const popupTitle = document.createElement("h2");
  popupTitle.textContent = "Please Confirm";
  const popupMsg = document.createElement("p");
  popupMsg.textContent = "Do You want delete this record?";
  const buttonView = document.createElement("div");
  buttonView.id = "buttonView";
  const confirmBtn = document.createElement("button");
  confirmBtn.id = "confirmBtn";
  confirmBtn.textContent = "Confirm";
  const cancelBtn = document.createElement("button");
  cancelBtn.id = "cancelBtn";
  cancelBtn.textContent = "Cancel";
  popupView.append(popupBox);
  popupBox.append(popupTitle);
  popupBox.append(popupMsg);
  popupBox.append(buttonView);
  buttonView.append(confirmBtn);
  buttonView.append(cancelBtn);
  return popupView;
}

// table sort
// get table head
const tableHead = document.querySelector(".heading");
const headarr =  tableHead.querySelectorAll("th")
const sortName = headarr[1]
const sortCourse = headarr[2]
const sortStatus = headarr[3]

// sort by name
sortName.addEventListener("click",function()
{
  let i = 1;
  let sortvalue = data.sort((a,b)=>
  {
    let name1 = a.name.toLowerCase();
      let name2 = b.name.toLowerCase();
      if (name1 < name2)
      {
        return -1;
      }

    return 0;
  })
  remove();
  sortvalue.map((d,i)=> additem(d,i));
})

 // sort by course
sortCourse.addEventListener("click",function()
{
  let i = 1;
  let sortvalue = data.sort((a,b)=>
  {
    let name1 = a.course.toLowerCase();
      let name2 = b.course.toLowerCase();
      if (name1 < name2)
      {
        return -1;
      }

    return 0;
  })
  remove();
  sortvalue.map((d,i)=> additem(d,i));
})

 // sort by course status
sortStatus.addEventListener("click",function()
{
  let i = 1;
  let sortvalue = data.sort((a,b)=>
  {
    let name1 = a.status.toLowerCase();
      let name2 = b.status.toLowerCase();
      if (name1 < name2)
      {
        return -1;
      }

    return 0;
  })
  remove();
  sortvalue.map((d,i)=> additem(d,i));
})
