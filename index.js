import { menuArray } from '/data.js'

const menuSection = document.getElementById('menu-section')
const orderItemsSection = document.getElementById('order-items-section')
const orderSection = document.getElementById('order-section')
const paymentModal = document.getElementById('modal-payment')
const modalForm = document.getElementById('modal-form')

let menuSectionHtml = ''
let addedItemsHtml = ''
let orderArr = []

menuArray.forEach(item => {
    menuSectionHtml += `
    <div class="menu-item">
        <ul>
        <li><img src="${item.img}" class="food-img"></li>
        <li>
            <div class="food-item-text">
                <p class="item-name">${item.name}</p>
                <p class="item-ingredients">${item.ingredients}</p>
                <p class="item-price">$${item.price}</p>
            </div>
        </li>
        <li class="align-right">
            <button class="add-item-btn" data-add="${item.id}">+</button>
        </li>
        </ul>
    </div>
    `
})

menuSection.innerHTML = menuSectionHtml

document.addEventListener('click', e => {
    if(e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
    }
    else if(e.target.dataset.subtract){
        handleRemoveClick(e.target.dataset.subtract)
    }
})

document.getElementById('complete-order-btn').addEventListener('click', ()=> {
    paymentModal.style.display = 'block'
})

modalForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    
    const modalFormData = new FormData(modalForm)
    const fullName = modalFormData.get('fullName')
    
    paymentModal.style.display = 'none'
    orderComplete(fullName)
})

function handleAddClick(itemId){
    const targetItemObj = menuArray.filter(item => {
        return item.id == itemId
    })[0]
    
    if(!orderArr.includes(targetItemObj)){
        orderArr.push(targetItemObj)
        renderItems(orderArr)
        renderTotalPrice(orderArr)
    }   
}

function handleRemoveClick(itemId){
    const targetItemObj = menuArray.filter(item => {
        return item.id == itemId
    })[0]
    
    const newOrderArr = orderArr.filter(item => {
        return item.id != targetItemObj.id
    })
    
    orderArr = newOrderArr
    renderItems(orderArr)
    if(newOrderArr.length > 0){
        renderTotalPrice(orderArr)
    } else {
        document.getElementById('order-section').style.display = "none"
    }
}

function renderItems(orderArr){
    addedItemsHtml = ''
    orderArr.map(item => {
        addedItemsHtml += `
        <div class="items">
            <span class="item-name">${item.name}</span>
            <button class="remove" data-subtract="${item.id}">remove</button>
            <span class="item-price">$${item.price}</span>
        </div>
        `
    })
    orderItemsSection.innerHTML = addedItemsHtml
}

function renderTotalPrice(orderArr){
    const totalPriceEl = document.getElementById('total-price')
    let totalPrice = 0
    orderArr.forEach(item => {
       totalPrice += item.price 
    })
    totalPriceEl.textContent = `$${totalPrice}`
    
    if(totalPrice != 0 || orderArr.length > 0){
        document.getElementById('order-section').style.display = "block"
    }
}

function orderComplete(name){
    orderSection.style.display = "block"
    orderSection.innerHTML = `
    <div class="complete">
        <span class=""complete-text">Thanks, ${name}! Your order is on its way!</span>
    </div>
    `
}









