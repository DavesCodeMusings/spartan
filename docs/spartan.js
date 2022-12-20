let spartanMenuId = 'menu'            // Do not edit default values.
let spartanMenuToggleId = 'menu-btn'  // Use spartan.run(menuId, menuBtn) to override.
let routes = {}

/**
 * Remove the "open" attribute from all details elements under the same parent, except for the one that generated the click event.
 * Use with accordian-style menu navigation to auto-close unused sub-menus.
 */
function collapseSiblingDetails(event) {
  let selectedElement = event.srcElement
  if (selectedElement.tagName.toLowerCase() == 'summary') {
    selectedElement = event.srcElement.parentNode  // Summary generates the event when expanding.
    console.debug(`Collapsing all <details> under <${selectedElement.parentNode.tagName.toLowerCase()} id="${selectedElement.parentNode.id}">, except for <${selectedElement.tagName.toLowerCase()} id="${selectedElement.id}">`)
  }
  else {
    console.debug(`Collapsing all <details> under <${selectedElement.parentNode.tagName.toLowerCase()} id="${selectedElement.parentNode.id}">`)
  }
  for (let child of selectedElement.parentNode.children) {
    if (child != selectedElement) {
      child.removeAttribute('open')
    }
  }
}


/**
 * Apply the "selected" class to any <a> element under <nav id="menu"> that has an href matching window.location.hash.
 * Use with "hashchange" and "load" events to visually indicate the selected menu item when a link is followed or entered into the address bar.
 */
function selectMenuItemByHash() {
  let menuElement = document.getElementsByTagName('nav').namedItem('menu') || document.getElementsByTagName('nav')[0]
  let hash = window.location.hash
  if (!hash) {
    return false
  }

  console.debug(`Looking for matching <a href="...${hash}"> that is a child/grandchild of <${menuElement.tagName.toLowerCase()} id='${menuElement.id}'>`)
  let found = false
  for (let child of menuElement.children) {
    if (child.href && child.tagName.toLowerCase() == 'a') {
      if (child.href.endsWith(hash)) {
        console.debug(`Found: <a href="${child.href}">`)
        child.classList.add('selected')
        found = true
      }
      else {
        child.classList.remove('selected')
      }
    }
    else if (child.nodeName.toLowerCase() == 'details') {
      for (let grandchild of child.children) {
        if (grandchild.href) {
          if (grandchild.href.endsWith(hash)) {
            console.log(`Found: ${grandchild.href}`)
            child.open = true
            grandchild.classList.add('selected')
            found = true
          }
          else {
            grandchild.classList.remove('selected')
          }
        }
      }
    }
  }
  return found
}


/**
 * Alternatively show or hide navigation menu based on its current display state.
 */
function toggleMenu() {
  let menuElement = document.getElementsByTagName('nav').namedItem('menu') || document.getElementsByTagName('nav')[0]
  if (menuElement.style.display == 'none') {
    menuElement.style.display = 'block'
  }
  else {
    menuElement.style.display = 'none'
  }
}


/**
 * Register a route linking a URL hash to a function.
 */
 function route(hash, target) {
  if (typeof target === 'function') {
    routes[hash] = target
  }
  else {
    throw('Route target is not a function')
  }
}


/**
 * Execute a function in the route table based on the value of window.location.hash.
 * 
 */
 async function resolveRouteByHash() {
  let hash = window.location.hash
  if (!hash) {
    return false
  }

  if (hash.charAt(0) == '#') {
    hash = hash.substring(1)
  }
  console.debug(`Executing function for: ${hash}`)

  if (typeof routes[hash] === 'function') {
    console.debug(`Executing function: ${hash}()`)
    routes[hash]()
  }
  else {
    console.error(`Function does not exist in route table: ${hash}`)
  }
}


/**
 * Add event listeners for menu interaction.
 * @param {string} menuId  id of HTML nav element being used as the accordian menu.
 * @param {string} menuToggleId  id of HTML element used to show/hide the accordian menu.
 * @param {boolean} autoCloseSiblings  if true, close other menu details when opening new.
 */
 function run(menuId='menu', menuToggleId='menu-btn', autoCloseSiblings=false) {
  if (menuId) {
    spartanMenuId = menuId
  }
  if (menuToggleId) {
    spartanMenuToggleId = menuToggleId
  }
  window.addEventListener('hashchange', selectMenuItemByHash)
  window.addEventListener('hashchange', resolveRouteByHash)
  window.addEventListener('load', selectMenuItemByHash)
  window.addEventListener('load', resolveRouteByHash)
  if (document.getElementById(menuId) && autoCloseSiblings) {
    document.getElementById(menuId).addEventListener('click', collapseSiblingDetails)
  }
  if (document.getElementById(menuToggleId)) {
    document.getElementById(menuToggleId).addEventListener('click', toggleMenu)
  }
}


export {collapseSiblingDetails, selectMenuItemByHash, resolveRouteByHash, toggleMenu, route, run}
