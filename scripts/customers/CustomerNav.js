import { authHelper } from "../auth/authHelper.js"
import { getCustomer, getCustomers, joinRewards } from "../customers/CustomerProvider.js"

const eventHub = document.querySelector("#container")
const userNav = document.querySelector(".userNav")

export const CustomerNav = () => {
  if (authHelper.isUserLoggedIn()) {
    getCustomer(authHelper.getCurrentUserId())
      .then(userObject => {
        render(userObject)
      })
  }
}


let rewardsHTML = (customer) => {

  if (customer.rewardsMember === false) {
    let rewardsHTML = '<button id="joinRewards">Join our rewards program</button>'
    return rewardsHTML
  } else {
    let rewardsHTML = "Thanks for being a rewards member!"
    return rewardsHTML
  }
} 

eventHub.addEventListener("click", event => {
  
  if (event.target.id === "joinRewards") {
    
    const userId = authHelper.getCurrentUserId()
    const change = {"rewardsMember": true}
   
    joinRewards(userId, change)
    userNav.innerHTML = ""
    
    getCustomers()
      .then(CustomerNav)
    

  }
})


export const render = (customer) => {

  userNav.innerHTML = `
    <h3>Welcome ${customer.name}!</h3>
    <h4>${rewardsHTML(customer)}</h4>
    <ul class="userNav__links">
    <li class="userNav__link" id="userNav--showCart" style="cursor: pointer">My Cart</li>
    <li class="userNav__link" id="userNav--newReview" style="cursor: pointer">New Review</li>
    <li class="userNav__link" id="userNav--pastOrders" style="cursor: pointer">Order History</li>
    <li class="userNav__link" id="userNav--myReviews" style="cursor: pointer">My Reviews</li>
    <li class="userNav__link" id="userNav--logout" style="cursor: pointer">Logout</li>
    </ul>
  `
}

eventHub.addEventListener("userLoggedIn", event => {
  CustomerNav()
})

eventHub.addEventListener("click", event => {
  if (event.target.id.startsWith("userNav--")) {
    const [idPrefix, idSuffix] = event.target.id.split("--")
    let customEvent
    switch (idSuffix) {
      case "showCart":
        customEvent = new CustomEvent("showCustomerCart")
        break;
      case "newReview":
        customEvent = new CustomEvent("showNewReviewForm")
        break;
      case "pastOrders":
        customEvent = new CustomEvent("showPastOrders")
        break;
      case "logout":
        authHelper.clearSessionStorage()
        userNav.innerHTML = ""    
        customEvent = new CustomEvent("showLoginForm")
        break;
      case "myReviews":
        customEvent = new CustomEvent("showReviews")
        break;
    }
    eventHub.dispatchEvent(customEvent)
  }
})
