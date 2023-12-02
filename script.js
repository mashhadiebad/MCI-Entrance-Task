var totalPages = 12;
var page = 1;
var perPage = 6;
var tableData = [];
var paginatedData = [];
var allData = [];
var isFilterActive = false;
var filteredData = [];

function createTable(data){
  const tableBody = document.querySelector('#data-table tbody');
  data.forEach(item => {
    const row = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.textContent = item.id;

    const avatarCell = document.createElement('td');
    const img = document.createElement('img');

    img.src = item.avatar;
    img.alt = 'avatar';
    img.width = '40';

    avatarCell.appendChild(img);

    const firstNameCell = document.createElement('td');
    firstNameCell.textContent = item.first_name;

    const LastNameCell = document.createElement('td');
    LastNameCell.textContent = item.last_name;

    const emailCell = document.createElement('td');
    emailCell.textContent = item.email;

    row.appendChild(idCell);
    row.appendChild(avatarCell);
    row.appendChild(firstNameCell);
    row.appendChild(LastNameCell);
    row.appendChild(emailCell);

    tableBody.appendChild(row);
});
}

function newRule(){
  const tableBody = document.querySelector('#filter-table tbody');
    const row = document.createElement('tr');
    row.className = 'filterRow'

    const header = document.createElement('td');
    header.innerHTML =`                  
    <select class="filter-dropdown filter-header-dropdown">
    <option value="id">ID</option>
    <option value="first_name">First Name</option>
    <option value="last_name">Last Name</option>
    <option value="email">Email</option>
  </select>`;

    const condition = document.createElement('td');
    condition.innerHTML = `                  
    <select class="filter-dropdown filter-condition-dropdown">
    <option value="=">=</option>
    <option value="!=">&ne;</option>
    <option value="<"><</option>
    <option value=">">></option>
    <option value=">=">>=</option>
    <option value="<="><=</option>
  </select>`

    const value = document.createElement('td');
    value.innerHTML =`<input class="filter-input"/>`;

    const deleteButton = document.createElement('td');
    deleteButton.innerHTML =`<button class='delete-row-button'>Delete</button>`;

    row.appendChild(header);
    row.appendChild(condition);
    row.appendChild(value);
    row.appendChild(deleteButton);

    tableBody.appendChild(row);
}

function clearTable(){
  const element = document.querySelector("#data-table tbody");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  
}

function paginateAllData(data, perPage){
  paginatedData = [];
for (var i = 0; i < data.length; i += Number(perPage)) {
  const group = data.slice(i, i + Number(perPage));
      paginatedData.push(group);
}
  totalPages = paginatedData.length
}

function getAllData(){
  fetch(`https://reqres.in/api/users?page=1&per_page=10000`)
  .then(response => response.json())
  .then(data => {
      allData = data.data
      paginateAllData(allData, perPage)
      setTimeout(() => {renderPagination()},0)
      createTable(paginatedData[page - 1])
      
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function setPageNumber(selectedPage) {
  page = Number(selectedPage);
  clearTable()
  createTable(paginatedData[page - 1])
  setTimeout(() => {renderPagination()},0)

}

function setPreviousPage(selectedPage) {
  if (selectedPage > 1) {
    page--;
    clearTable()
    createTable(paginatedData[page - 1])
    setTimeout(() => {renderPagination()},0)
  }
}

function setNextPage(selectedPage) {
  if (selectedPage < totalPages) {
    page++;
    clearTable()
    createTable(paginatedData[page - 1])
    setTimeout(() => {renderPagination()},0)
  }
}

function renderPagination() {
  const previousPage = document.getElementById("previousPage");
  const nextPage = document.getElementById("nextPage");
  const pageNumberContainer = document.getElementById("pageNumberContainer");

  previousPage.addEventListener("click", () => setPreviousPage(page));
  nextPage.addEventListener("click", () => setNextPage(page));

  pageNumberContainer.innerHTML = "";

  if (totalPages < 8) {
    for (let number = 1; number <= totalPages; number++) {
      const pageNumber = document.createElement("div");
      pageNumber.className = "page-number" + (page === number ? " active" : "");
      pageNumber.addEventListener("click", () => setPageNumber(number));
      pageNumber.innerText = number;
      pageNumberContainer.appendChild(pageNumber);
    }
  } else {
    if (page <= 3) {
      for (let number = 1; number <= 4; number++) {
        const pageNumber = document.createElement("div");
        pageNumber.className = "page-number" + (page === number ? " active" : "");
        pageNumber.addEventListener("click", () => setPageNumber(number));
        pageNumber.innerText = number;
        pageNumberContainer.appendChild(pageNumber);
      }

      const numberSeparator = document.createElement("div");
      numberSeparator.className = "number-separator";
      numberSeparator.innerText = "...";
      pageNumberContainer.appendChild(numberSeparator);

      const lastPageNumber = document.createElement("div");
      lastPageNumber.className =
        "page-number" + (page === totalPages ? " active" : "");
      lastPageNumber.addEventListener("click", () => setPageNumber(totalPages));
      lastPageNumber.innerText = totalPages;
      pageNumberContainer.appendChild(lastPageNumber);
    } else if (page > 3 && page <= totalPages - 3) {
      const firstPageNumber = document.createElement("div");
      firstPageNumber.className =
        "page-number" + (page === 1 ? " active" : "");
      firstPageNumber.addEventListener("click", () => setPageNumber(1));
      firstPageNumber.innerText = 1;
      pageNumberContainer.appendChild(firstPageNumber);

      const numberSeparator1 = document.createElement("div");
      numberSeparator1.className = "number-separator";
      numberSeparator1.innerText = "...";
      pageNumberContainer.appendChild(numberSeparator1);

      const previousPageNumber = document.createElement("div");
      previousPageNumber.className =
        "page-number" + (page === page - 1 ? " active" : "");
      previousPageNumber.addEventListener("click", () =>
        setPageNumber(page - 1)
      );
      previousPageNumber.innerText = page - 1;
      pageNumberContainer.appendChild(previousPageNumber);

      const currentPageNumber = document.createElement("div");
      currentPageNumber.className = "page-number active";
      currentPageNumber.innerText = page;
      pageNumberContainer.appendChild(currentPageNumber);

      const nextPageNumber = document.createElement("div");
      nextPageNumber.className =
        "page-number" + (page === page + 1 ? " active" : "");
        nextPageNumber.addEventListener("click", () => setPageNumber(page + 1));
        nextPageNumber.innerText = page + 1;
        pageNumberContainer.appendChild(nextPageNumber);
  
        const numberSeparator2 = document.createElement("div");
        numberSeparator2.className = "number-separator";
        numberSeparator2.innerText = "...";
        pageNumberContainer.appendChild(numberSeparator2);
  
        const lastPageNumber = document.createElement("div");
        lastPageNumber.className =
          "page-number" + (page === totalPages ? " active" : "");
        lastPageNumber.addEventListener("click", () => setPageNumber(totalPages));
        lastPageNumber.innerText = totalPages;
        pageNumberContainer.appendChild(lastPageNumber);
      } else {
        const firstPageNumber = document.createElement("div");
        firstPageNumber.className =
          "page-number" + (page === 1 ? " active" : "");
        firstPageNumber.addEventListener("click", () => setPageNumber(1));
        firstPageNumber.innerText = 1;
        pageNumberContainer.appendChild(firstPageNumber);
  
        const numberSeparator = document.createElement("div");
        numberSeparator.className = "number-separator";
        numberSeparator.innerText = "...";
        pageNumberContainer.appendChild(numberSeparator);
  
        const pageNumber1 = document.createElement("div");
        pageNumber1.className =
          "page-number" + (page === totalPages - 3 ? " active" : "");
        pageNumber1.addEventListener(
          "click",
          () => setPageNumber(totalPages - 3)
        );
        pageNumber1.innerText = totalPages - 3;
        pageNumberContainer.appendChild(pageNumber1);
  
        const pageNumber2 = document.createElement("div");
        pageNumber2.className =
          "page-number" + (page === totalPages - 2 ? " active" : "");
        pageNumber2.addEventListener(
          "click",
          () => setPageNumber(totalPages - 2)
        );
        pageNumber2.innerText = totalPages - 2;
        pageNumberContainer.appendChild(pageNumber2);
  
        const pageNumber3 = document.createElement("div");
        pageNumber3.className =
          "page-number" + (page === totalPages - 1 ? " active" : "");
        pageNumber3.addEventListener(
          "click",
          () => setPageNumber(totalPages - 1)
        );
        pageNumber3.innerText = totalPages - 1;
        pageNumberContainer.appendChild(pageNumber3);
  
        const lastPageNumber = document.createElement("div");
        lastPageNumber.className =
          "page-number" + (page === totalPages ? " active" : "");
        lastPageNumber.addEventListener("click", () => setPageNumber(totalPages));
        lastPageNumber.innerText = totalPages;
        pageNumberContainer.appendChild(lastPageNumber);
      }
    }
  
    previousPage.classList.remove("disable");
    nextPage.classList.remove("disable");
  
    if (page === 1) {
      previousPage.classList.add("disable");
    }
  
    if (page === totalPages) {
      nextPage.classList.add("disable");
    }
}

function openModal() {
    modal.style.display = "flex";
}
  
function closeModal() {
    modal.style.display = "none";
}

getAllData();

let menuIcon = document.querySelector(".menu-icon")
menuIcon.onclick = function() {
    let menu = document.querySelector('aside')
    if(menu.style.display !== 'none'){
        menu.style.display = 'none'
    }else{
        menu.style.display = 'block'
    }
    
};

var inputElement = document.querySelector(".per-page-input");
inputElement.addEventListener("input", function() {
  perPage = inputElement.value;
  if(perPage){
    page = 1
    clearTable()
    paginateAllData(isFilterActive ? filteredData : allData, perPage)
    createTable(paginatedData[page - 1])
    setTimeout(() => {renderPagination()},0)
  }
});

var modal = document.getElementById("filterModal");
modal.addEventListener('click', closeModal);

var openBtn = document.getElementById("openfilterModalBtn");
openBtn.addEventListener("click", openModal);

var closeBtn = document.getElementsByClassName("close")[0];
closeBtn.addEventListener("click", closeModal);

const modalContent = document.querySelector('.modal-content');
modalContent.addEventListener('click', function(event) {
  event.stopPropagation();
});

const newRuleButton = document.getElementById('new-rule')
newRuleButton.addEventListener('click', newRule)

const filterTable = document.getElementById('filter-table');
filterTable.addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-row-button')) {
    const row = event.target.closest('tr');
    row.remove();
  }
});

var searchButton = document.getElementById('search');
searchButton.addEventListener('click', function() {
  isFilterActive = true
  filteredData = []
  let filtersItemData = []

  const filterRows = document.querySelectorAll('.filterRow');
  filterRows.forEach(function(rowsData) {
    const headerValue = rowsData.querySelector('.filter-header-dropdown').value;
    const conditionValue = rowsData.querySelector('.filter-condition-dropdown').value;
    const inputValue = rowsData.querySelector('.filter-input').value;
    filtersItemData.push({header:headerValue, condition:conditionValue, input:inputValue})
  });

  let correctFilters = filtersItemData.filter(item => item.input)

  filteredData = correctFilters.reduce((result, filter) => {
    const { header, condition, input } = filter;

    return result.filter(item => {

      const headerValue = item[header];
  
      switch (condition) {
        case '=':
          return headerValue == input;
        case '<':
          return headerValue < input;
        case '>':
          return headerValue > input;
        case '<=':
          return headerValue <= input;
        case '>=':
          return headerValue >= input;
        case '!=':
          return headerValue != input;
        default:
          return false;
      }
    });
  }, allData);

  clearTable()

  if(filteredData.length){
    paginateAllData(filteredData, perPage)
    createTable(paginatedData[page - 1])
    setTimeout(() => {renderPagination()
      closeModal()},0)
  }else{
    totalPages = 0
    renderPagination()
    closeModal()
  }

});


