'use strict';
/*
------select three random photos from the image directory and display them side-by-side-by-side in the browser window;
------able to receive clicks on those displayed images, and track those clicks for each image. You'll also want to track how many times each image is displayed, for statistical purposes.
------Upon receiving a click, three new non-duplicating random images need to be automatically displayed. In other words, the three images that are displayed should contain no duplicates, nor should they duplicate with any images that we displayed immediately before.
------constructor function that creates an object associated with each image, and has (at a minimum) properties for the name of the image (to be used for display purposes), its filepath, the number of times it has been shown, and the number of times it has been clicked. You'll probably find it useful to create a property that contains a text string you can use as an ID in HTML.
------After 25 selections have been made, turn off the event listeners on the images (to prevent additional voting) and also display a list of the products with votes received with each list item looking like "3 votes for the Banana Slicer".
*/

//Global Variables===========================================================================================

var clickCounter = 0;
var allProducts = [];
var resultList = document.getElementById('resultList')
var leftProduct = document.getElementById('left_product_img');
var middleProduct = document.getElementById('middle_product_img');
var rightProduct = document.getElementById('right_product_img');
var totalClicksAllowed = 24;
var leftProductOnPage;
var middleProductOnPage;
var rightProductOnPage;

//Constructor===================================================================================================================

var ProductImage = function (url, name) {
  this.url = url;
  this.name = name;
  this.clicks = 0;
  allProducts.push(this);
};

//Initialize page================================================================================================================
//Left Product Image=============================================================================================================

var leftProductDiv = document.getElementById('left_img');
var middleProductDiv = document.getElementById('middle_img');
var rightProductDiv = document.getElementById('right_img');

function handleClickOnLeftProduct(event){
  //increment total clicks
  clickCounter++;
  console.log(`total clicks: ${clickCounter}`);
  // increment left product's clicks
  leftProductOnPage.clicks;
  console.log(leftProductOnPage.clicks);


  // pick a new 3 products,
  var leftProductIndex = Math.floor(Math.random() * allProducts.length);
  var middleProductIndex = Math.floor(Math.random() * allProducts.length);
  var rightProductIndex = Math.floor(Math.random() * allProducts.length);

  leftProductOnPage = allProducts[leftProductIndex];
  middleProductOnPage = allProducts[middleProductIndex];
  rightProductOnPage = allProducts[rightProductIndex];

  // and put them on the page
  leftProduct.src = leftProductOnPage.url;
  middleProduct.src = middleProductOnPage.url;
  rightProduct.src = rightProductOnPage.url;


  // stop after 25 clicks
  if(clickCounter > 24){
    // stop listening for clicks on the left and right goat
    leftProductDiv.removeEventListener('click', handleClickOnLeftProduct);
    middleProductDiv.removeEventListener('click', handleClickOnMiddleProduct)
    rightProductDiv.removeEventListener('click', handleClickOnRightProduct);
  } 
}

leftProductDiv.addEventListener('click', handleClickOnLeftProduct);

//Middle Image Product =================================================================================================================

function handleClickOnMiddleProduct(event){
  clickCounter++;
  console.log(`total clicks: ${clickCounter}`);
  middleProductOnPage.clicks++;
  console.log(middleProductOnPage.clicks);


  // pick a new 3 products,
  var leftProductIndex = Math.floor(Math.random() * allProducts.length);
  var middleProductIndex = Math.floor(Math.random() * allProducts.length);
  var rightProductIndex = Math.floor(Math.random() * allProducts.length);

  leftProductOnPage = allProducts[leftProductIndex];
  middleProductOnPage = allProducts[middleProductIndex];
  rightProductOnPage = allProducts[rightProductIndex];

  // and put them on the page
  leftProduct.src = leftProductOnPage.url;
  middleProduct.src = middleProductOnPage.url;
  rightProduct.src = rightProductOnPage.url;


  // stop after 25 clicks
  if(clickCounter > 24){
    leftProductDiv.removeEventListener('click', handleClickOnLeftProduct);
    middleProductDiv.removeEventListener('click', handleClickOnMiddleProduct)
    rightProductDiv.removeEventListener('click', handleClickOnRightProduct);
  }
}

middleProductDiv.addEventListener('click', handleClickOnMiddleProduct);

//Right Image Product==============================================================================================================

function handleClickOnRightProduct(event){
  clickCounter++;
  console.log(`total clicks: ${clickCounter}`);
  rightProductOnPage.clicks++;
  console.log(rightProductOnPage.clicks);


  // pick new 3 products,
  var leftProductIndex = Math.floor(Math.random() * allProducts.length);
  var middleProductIndex = Math.floor(Math.random() * allProducts.length);
  var rightProductIndex = Math.floor(Math.random() * allProducts.length);

  leftProductOnPage = allProducts[leftProductIndex];
  middleProductOnPage = allProducts[middleProductIndex];
  rightProductOnPage = allProducts[rightProductIndex];

  //render to page
  leftProduct.src = leftProductOnPage.url;
  middleProduct.src = middleProductOnPage.url;
  rightProduct.src = rightProductOnPage.url;


  // stop after 25 clicks
  if(clickCounter > 24){
    // stop listening for clicks
    leftProductDiv.removeEventListener('click', handleClickOnLeftProduct);
    middleProductDiv.removeEventListener('click', handleClickOnMiddleProduct)
    rightProductDiv.removeEventListener('click', handleClickOnRightProduct);
  }
}
rightProductDiv.addEventListener('click', handleClickOnRightProduct);

//=================================================================================================================================
//instantiated images

new ProductImage('./images/bag.jpg', 'Bag')
new ProductImage('./images/banana.jpg', 'Banana')
new ProductImage('./images/bathroom.jpg', 'Bathroom')
new ProductImage('./images/boots.jpg', 'Boots')
new ProductImage('./images/breakfast.jpg', 'Breakfast')
new ProductImage('./images/bubblegum.jpg', 'Bubblegum')
new ProductImage('./images/chair.jpg', 'Chair')
new ProductImage('./images/cthulhu.jpg', 'Cthulhu')
new ProductImage('./images/dog-duck.jpg', 'Dog-duck')
new ProductImage('./images/dragon.jpg', 'Dragon')
new ProductImage('./images/pen.jpg', 'Pen')
new ProductImage('./images/pet-sweep.jpg', 'Pet-sweep')
new ProductImage('./images/scissors.jpg', 'Scissors')
new ProductImage('./images/shark.jpg', 'Shark')
new ProductImage('./images/sweep.png', 'Sweep')
new ProductImage('./images/tauntaun.jpg', 'Tauntaun')
new ProductImage('./images/unicorn.jpg', 'Unicorn')
new ProductImage('./images/usb.gif', 'USB')
new ProductImage('./images/water-can.jpg', 'Water')
new ProductImage('./images/wine-glass.jpg', 'Wine')

leftProductOnPage = allProducts[19];
middleProductOnPage = allProducts[19];
rightProductOnPage = allProducts[19];

//=====================================================================================================================
//results after 25 selections

function resultsAfterClicks() {
  for (var i = 0; i > allProducts.length; i++) {
    if (event.target.name === allProducts[i].name){
      allProducts[i].clicks++;
    }
  }
}

//=======================================================================================================================
//render to page

function renderList (){
  for (var k in allProducts){
    var listItem = document.createElement('li');
    listItem.textContent = allProducts[k].clicks + ' votes for ' + allProducts[k].name;
    resultList.appendChild(listItem);
  }
}

//========================================================================================================================
//ChartJS
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Bag', 'Banana', 'Bathroom', 'Boots', 'Breakfast', 'Bubblegum', 'Chari','Cthulhu','Dog-duck','Dragon','Pen','Pet-sweep', 'Scissors','Shark','Sweep','Tauntaun','Unicorn','USB', 'Water','Wine',],
        datasets: [{
            label: '# of Votes',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});