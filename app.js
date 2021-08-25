'use strict';
console.log(':D');



//===========================Global Variables===============================

const leftImg = document.getElementById('left_Img');
const leftp = document.getElementById('left_p_Item');
const midImg = document.getElementById('mid_Img');
const midp = document.getElementById('mid_p_Item');
const rightImg = document.getElementById('right_Img');
const rightp = document.getElementById('right_p_Item');
const allItemsSection = document.getElementById('all_items');
const myButton = document.getElementById('button');

let rightIndex = null;
let leftIndex = null;
let midIndex = null;

let guesses = 25;


//===========================Constructor Funciton===========================

function Item(name, img){
    this.name = name;
    this.img = img;
    this.shown = 0;
    this.vote = 0;
}

//===========================Prototypes=====================================

Item.prototype.renderItem = function(h2, img) {
    h2.textContent = this.name;
    img.src = this.img;
    this.shown++;
}

Item.allItems = [];  
//===========================Global Functions===============================


function randomizeItems() {

    const unavailableItems = [leftIndex, midIndex, rightIndex];
    for(var i = 0; i < 3; i++){

      while (unavailableItems.includes(leftIndex)) {
        leftIndex = Math.floor(Math.random() * Item.allItems.length);
      }
          unavailableItems.push(leftIndex);
      while (unavailableItems.includes(rightIndex)) {
        rightIndex = Math.floor(Math.random() * Item.allItems.length);
      }
          unavailableItems.push(rightIndex);
      while (unavailableItems.includes(midIndex)) {
        midIndex = Math.floor(Math.random() * Item.allItems.length);
      }
  }
    let left_Item = Item.allItems[leftIndex];
    let mid_Item = Item.allItems[midIndex];
    let right_Item = Item.allItems[rightIndex];

    renderThreeItems(left_Item, mid_Item, right_Item);
}

function renderThreeItems(left_Item, mid_Item, right_Item) {
  left_Item.renderItem(leftp, leftImg);
  mid_Item.renderItem(midp, midImg)
  right_Item.renderItem(rightp, rightImg);
}


  function eventHandler(event) {
    if (event.target === leftImg || event.target === rightImg || event.target === midImg) {
      guesses--;
      console.log(Item.allItems)
      if (event.target === leftImg) {
        // console.log(Item.allItems[leftIndex].vote)
        Item.allItems[leftIndex].vote++;
        // console.log(Item.allItems[leftIndex].vote)
      } else if (event.target === rightImg){
        Item.allItems[rightIndex].vote++;
      } else if (event.target === midImg){
        Item.allItems[midIndex].vote++
      }
      if (guesses === 0) {
        allItemsSection.removeEventListener('click', eventHandler);
        renderResults();
      }
    }
    randomizeItems();
  }

  function buttonEvent(event) {
    if (event.target === myButton) {
      renderItems();
      renderChart();
      storeItems();
      myButton.removeEventListener('click', buttonEvent)
    }
  }

  function renderChart() {
    console.log('hi~')
    const itemData = [];
    const itemLabels = [];
  
    for (let item of Item.allItems) {
      if(item.vote > 0){
      itemData.push(item.vote);
      itemLabels.push(item.name);
      }
    }
  var ctx = document.getElementById('itemChart').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: itemLabels,
          datasets: [{
              label: 'Item Votes',
              data: itemData,
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
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  }

  function itemRetrieval() {
    const stringifiedItems = localStorage.getItem('totals');
    if (stringifiedItems !== null) {
      const parsedItems = JSON.parse(stringifiedItems);
      console.log(parsedItems);
      for (let item of parsedItems) {
        const myItem = new Item(item.name, item.img);
        myItem.vote = parseInt(item.vote);
        myItem.shown = parseInt(item.shown);
        Item.allItems.push(myItem);
        console.log(Item.allItems)

      }
    } else {

      Item.allItems.push(new Item('banana', './img/banana.jpg'));
      Item.allItems.push(new Item('bathroom', './img/bathroom.jpg'));
      Item.allItems.push(new Item('boots', './img/boots.jpg'));
      Item.allItems.push(new Item('breakfast', './img/breakfast.jpg'));
      Item.allItems.push(new Item('bubblegum', './img/bubblegum.jpg'));
      Item.allItems.push(new Item('Chair', './img/chair.jpg'));
      Item.allItems.push(new Item('cthulhu', './img/cthulhu.jpg'));
      Item.allItems.push(new Item('dog-duck', './img/dog-duck.jpg'));
      Item.allItems.push(new Item('dragon', './img/dragon.jpg'));
      Item.allItems.push(new Item('pen', './img/pen.jpg'));
      Item.allItems.push(new Item('pet-sweep', './img/pet-sweep.jpg'));
      Item.allItems.push(new Item('scissors', './img/scissors.jpg'));
      Item.allItems.push(new Item('shark', './img/shark.jpg'));
      Item.allItems.push(new Item('sweep', './img/sweep.png'));
      Item.allItems.push(new Item('tauntaun', './img/tauntaun.jpg'));
      Item.allItems.push(new Item('unicorn', './img/unicorn.jpg'));
      Item.allItems.push(new Item('water-can', './img/water-can.jpg'));
      Item.allItems.push(new Item('wine-glass', './img/wine-glass.jpg'));
    }
    randomizeItems();
  }
  
  
  function storeItems() {
    const stringifiedItems = JSON.stringify(Item.allItems);
    console.log(stringifiedItems);
    localStorage.setItem('totals', stringifiedItems);
  }

  function renderItems() {
    const ulEle = document.getElementById('Item-Click')
    ulEle.innerHTML = '';
    for (let item of Item.allItems) {
      const liEle = document.createElement('li')
      liEle.textContent = `${item.name} has ${item.vote} clicks and was shown ${item.shown} times.`
      ulEle.appendChild(liEle);
    }
 }


//===========================Listeners======================================

// OnClick

allItemsSection.addEventListener('click',  eventHandler);
myButton.addEventListener('click', buttonEvent);


//===========================Call Functions=================================

itemRetrieval();

// Item.allItems.push(new Item('banana', './img/banana.jpg'));
// Item.allItems.push(new Item('bathroom', './img/bathroom.jpg'));
// Item.allItems.push(new Item('boots', './img/boots.jpg'));
// Item.allItems.push(new Item('breakfast', './img/breakfast.jpg'));
// Item.allItems.push(new Item('bubblegum', './img/bubblegum.jpg'));
// Item.allItems.push(new Item('Chair', './img/chair.jpg'));
// Item.allItems.push(new Item('cthulhu', './img/cthulhu.jpg'));
// Item.allItems.push(new Item('dog-duck', './img/dog-duck.jpg'));
// Item.allItems.push(new Item('dragon', './img/dragon.jpg'));
// Item.allItems.push(new Item('pen', './img/pen.jpg'));
// Item.allItems.push(new Item('pet-sweep', './img/pet-sweep.jpg'));
// Item.allItems.push(new Item('scissors', './img/scissors.jpg'));
// Item.allItems.push(new Item('shark', './img/shark.jpg'));
// Item.allItems.push(new Item('sweep', './img/sweep.png'));
// Item.allItems.push(new Item('tauntaun', './img/tauntaun.jpg'));
// Item.allItems.push(new Item('unicorn', './img/unicorn.jpg'));
// Item.allItems.push(new Item('water-can', './img/water-can.jpg'));
// Item.allItems.push(new Item('wine-glass', './img/wine-glass.jpg'));

// randomizeItems();