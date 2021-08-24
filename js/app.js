'use strict';
console.log(":D");



//===========================Global Variables===============================

const leftImg = document.getElementById(left_Item);
const leftp = document.getElementById(left_p_Item);
const midImg = document.getElementById(mid_Item);
const midp = document.getElementById(mid_p_Item);
const rightImg = document.getElementById(right_Item);
const rightp = document.getElementById(right_p_Item);
const allItemsSection = document.getElementsById('all_items');
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

function renderThreeItems(leftItem, midItem, rightItem) {
    leftItem.renderItem(leftp, leftImg);
    midItem.renderItem(midp, midImg)
    rightItem.renderItem(rightp, rightImg);
  }

function randomizeItems() {
    let leftIndex;
    let midIndex;
    let rightIndex;
    
    for(var i = 0; i < 3; i++){ 

    while ( leftIndex === undefined ||  leftIndex === rightIndex || leftIndex === midIndex) {
        leftIndex = Math.floor(Math.random() * Item.allItems.length);
    }
    while (rightIndex === undefined  || rightIndex ===  leftIndex || rightIndex === midIndex) {
        rightIndex = Math.floor(Math.random() * Item.allItems.length);
    }
    while (midIndex === undefined  || midIndex === rightIndex || midIndex === leftIndex) {
        midIndex = Math.floor(Math.random() * Item.allItems.length);
    }
    leftItem = Item.allItems[leftIndex];
    midItem = Item.allItems[midIndex];
    rightItem = Item.allItems[rightIndex];

    renderThreeItems(leftItem, midItem, rightItem);
  }
}

  function eventHandler(event) {
    console.log(event.target);
    if (event.target === leftImg || event.target === rightImg || event.target === midImg) {
      guesses--;
      if (event.target === leftImg) {
        this.vote++;
      } else if (event.target === rightImg){
        this.vote++;
      } else if (event.target === midImg){
        this.vote++
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
      myButton.removeEventListener('click', buttonEvent)
    }
  }

  function createElement (tag, parent, text) {
    let element = document.createElement(tag);
    parent.appendChild(element);
    if (text) {
      element.textContent = text;
    }
    return element;
  }

  function renderItems() {
    const ulEle = document.getElementById('Item-Click')
    ulEle.innerHTML = '';
    for (Item of Item.allItems) {
      const liEle = document.createElement('li')
      liEle.textContent = `${Item.name} had ${Item.vote} clicks and was shown ${Item.shown} times.`
      ulEle.appendChild(liEle);
    }
 }


//===========================Listeners======================================

// OnClick

allItemsSection.addEventListener('click',  eventHandler);
myButton.addEventListener('click', buttonEvent);


//===========================Call Functions=================================

new Item.allItems.push(new Item('banana', 'img/banana.jpg'))
new Item.allItems.push(new Item('bathroom', 'img/bathroom.jpg'))
new Item.allItems.push(new Item('boots', 'img/boots.jpg'))
new Item.allItems.push(new Item('breakfast', 'img/breakfast.jpg'))
new Item.allItems.push(new Item('bubblegum', 'img/bubblegum.jpg'))
new Item.allItems.push(new Item('Chair', 'img/chair.jpg'))
new Item.allItems.push(new Item('cthulhu', 'img/cthulhu.jpg'))
new Item.allItems.push(new Item('dog-duck', 'img/dog-duck.jpg'))
new Item.allItems.push(new Item('dragon', 'img/dragon.jpg'))
new Item.allItems.push(new Item('pen', 'img/pen.jpg'))
new Item.allItems.push(new Item('pet-sweep', 'img/pet-sweep.jpg'))
new Item.allItems.push(new Item('scissors', 'img/scissors.jpg'))
new Item.allItems.push(new Item('shark', 'img/shark.jpg'))
new Item.allItems.push(new Item('sweep', 'img/sweep.jpg'))
new Item.allItems.push(new Item('tauntaun', 'img/tauntaun.jpg'))
new Item.allItems.push(new Item('unicorn', 'img/unicorn.jpg'))
new Item.allItems.push(new Item('water-can', 'img/water-can.jpg'))
new Item.allItems.push(new Item('wine-glass', 'img/wineglass.jpg'))