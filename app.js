'use strict';
/*
------select three random photos from the image directory and display them side-by-side-by-side in the browser window;
------able to receive clicks on those displayed images, and track those clicks for each image. You'll also want to track how many times each image is displayed, for statistical purposes.
------Upon receiving a click, three new non-duplicating random images need to be automatically displayed. In other words, the three images that are displayed should contain no duplicates, nor should they duplicate with any images that we displayed immediately before.
------constructor function that creates an object associated with each image, and has (at a minimum) properties for the name of the image (to be used for display purposes), its filepath, the number of times it has been shown, and the number of times it has been clicked. You'll probably find it useful to create a property that contains a text string you can use as an ID in HTML.
------After 25 selections have been made, turn off the event listeners on the images (to prevent additional voting) and also display a list of the products with votes received with each list item looking like "3 votes for the Banana Slicer".
*/

//Global Variables===========================================================================================

var resultList = document.getElementById('all_products');
var leftProduct = document.getElementById('left_product');
var middleProduct = document.getElementById('middle_product');
var rightProduct = document.getElementById('right_product');
var clickCounter = 0;
var allProducts = [];

//Constructor===================================================================================================================

var ProductImage = function (url, name) {
  this.url = url;
  this.name = name;
  this.clicks = 0;
  this.appeared = 0;
  allProducts.push(this);
};

//===============================================================================================================================
//Random 3 images and increment appeared
function pickThreeImagesAndIncrementAppeared(){
  var leftIndex = Math.floor(Math.random() * allProducts.length);
  var middleIndex = Math.floor(Math.random() * allProducts.length);
  var rightIndex = Math.floor(Math.random() * allProducts.length);

  allProducts[leftIndex].appeared++;
  allProducts[middleIndex].appeared++;
  allProducts[rightIndex].appeared++;

  leftProduct.src = allProducts[leftIndex].url;
  middleProduct.src = allProducts[middleIndex].url;
  rightProduct.src = allProducts[rightIndex].url;
}

//===============================================================================================================================
//Helpers and handlers

function handleClickOnProduct(){
  if(event.target.tagName !== 'IMG'){
  }
  clickCounter++;
  console.log(`Total clicks: ${clickCounter}`);
  //figure out which image was clicked
  // Do for all images
  for( var i = 0; i < allProducts.length; i++){
    if(event.target.src.includes(allProducts[i].url)){
      console.log(`${allProducts[i].name} was picked`);
      allProducts[i].clicks++;
    }
  }

  pickThreeImagesAndIncrementAppeared();
  // check if i have clicked 24 times, then put the chart on
    if(clickCounter > 24){
    resultList.removeEventListener('click', handleClickOnProduct);
    alert('Selection Complete. Click OK for Results.')
    //remove products from page
    document.getElementById('all_products').style.display = 'none'
    //remove header from page
    document.getElementById('header').style.display = 'none';
    //invoke chart 
    buildMyChart();

    // Save the product data;
    console.log('saving products to local storage');
    var stringProducts = JSON.stringify(allProducts);
    localStorage.setItem('allProducts', stringProducts);

  }
}

//========================================================================================================================
//ChartJS

function buildMyChart(){
var ctx = document.getElementById('myChart').getContext('2d');
var labels = [];
  var data = [];
  for(var i = 0; i < allProducts.length; i++){
    var singleProductName = allProducts[i].name;
    labels.push(singleProductName);
  }

  for(var i = 0; i < allProducts.length; i++){
    var singleProductLikes = allProducts[i].clicks;
    data.push(singleProductLikes);
    console.log(allProducts[i]);
  }
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Number of Votes',
            data: data,
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
}

//=================================================================================================================================
//instantiated images

new ProductImage('/images/bag.jpg', 'Bag')
new ProductImage('/images/banana.jpg', 'Banana')
new ProductImage('/images/bathroom.jpg', 'Bathroom')
new ProductImage('/images/boots.jpg', 'Boots')
new ProductImage('/images/breakfast.jpg', 'Breakfast')
new ProductImage('/images/bubblegum.jpg', 'Bubblegum')
new ProductImage('/images/chair.jpg', 'Chair')
new ProductImage('/images/cthulhu.jpg', 'Cthulhu')
new ProductImage('/images/dog-duck.jpg', 'Dog-duck')
new ProductImage('/images/dragon.jpg', 'Dragon')
new ProductImage('/images/pen.jpg', 'Pen')
new ProductImage('/images/pet-sweep.jpg', 'Pet-sweep')
new ProductImage('/images/scissors.jpg', 'Scissors')
new ProductImage('/images/shark.jpg', 'Shark')
new ProductImage('/images/sweep.png', 'Sweep')
new ProductImage('/images/tauntaun.jpg', 'Tauntaun')
new ProductImage('/images/unicorn.jpg', 'Unicorn')
new ProductImage('/images/usb.gif', 'USB')
new ProductImage('/images/water-can.jpg', 'Water')
new ProductImage('/images/wine-glass.jpg', 'Wine')

all_products.addEventListener('click', handleClickOnProduct);
pickThreeImagesAndIncrementAppeared();