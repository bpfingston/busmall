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

      while (unavailableItems.includes(leftIndex) || leftIndex === null ||  leftIndex === rightIndex || leftIndex === midIndex) {
        leftIndex = Math.floor(Math.random() * Item.allItems.length);
      }
      while (unavailableItems.includes(rightIndex) || rightIndex === null  || rightIndex ===  leftIndex || rightIndex === midIndex) {
        rightIndex = Math.floor(Math.random() * Item.allItems.length);
      }
      while (unavailableItems.includes(midIndex) || midIndex === null  || midIndex === rightIndex || midIndex === leftIndex) {
        midIndex = Math.floor(Math.random() * Item.allItems.length);
      }
  }
    let left_Item = Item.allItems[leftIndex];
    console.log(left_Item)
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
    // console.log(event.target);
    // console.log()
    if (event.target === leftImg || event.target === rightImg || event.target === midImg) {
      // console.log(leftImg)
      guesses--;
      if (event.target === leftImg) {
        //find a way to reference the current left obj.
        //update it with incrementing votes
        Item.allItems[leftIndex].vote++;
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
      liEle.textContent = `${Item.name} has ${Item.vote} clicks and was shown ${Item.shown} times.`
      ulEle.appendChild(liEle);
    }
 }


//===========================Listeners======================================

// OnClick

allItemsSection.addEventListener('click',  eventHandler);
myButton.addEventListener('click', buttonEvent);


//===========================Call Functions=================================

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
randomizeItems();