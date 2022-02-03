// Меню навигации на index.html

let button = document.getElementById('burger');
let navigation = document.getElementById('menu');

button.addEventListener('click', function(){ 
  navigation.classList.toggle('display-block');
});

// Основное меню фильтра на catalog.html

let filterButton = document.getElementById('filter-btn');
let filter = document.getElementById('filtermenu');

filterButton.addEventListener('click', function(){  
  filter.classList.toggle('display-block');
});

// dropdown меню (левый) фильтра на catalog.html

let dropdownLeft = document.getElementById('dropdown-left');
let dropdownLeftMenu= document.getElementById('dropdown-left-menu');


dropdownLeft.addEventListener('click', function(){  
  dropdownLeftMenu.classList.toggle('display-block');
});

// dropdown меню (центральный) фильтра на catalog.html

let dropdownCenter = document.getElementById('dropdown-center');
let dropdownCenterMenu= document.getElementById('dropdown-center-menu');


dropdownCenter.addEventListener('click', function(){  
  dropdownCenterMenu.classList.toggle('display-block');
});

// dropdown меню (правый) фильтра на catalog.html

let dropdownRight = document.getElementById('dropdown-right');
let dropdownRightMenu= document.getElementById('dropdown-right-menu');


dropdownRight.addEventListener('click', function(){  
  dropdownRightMenu.classList.toggle('display-block');
});