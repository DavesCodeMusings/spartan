/**
 * Remove the "open" attribute from all details elements under the same parent, except for the one that generated the click event.
 * Use with accordian-style menu navigation to auto-close unused sub-menus.
 * Example:
 *   import * as spartan from './spartan.js'
 *   document.getElementById('menu').addEventListener('click', spartan.collapseSiblingDetails)
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
 * Example:
 *   import * as spartan from './spartan.js'
 *   window.addEventListener('hashchange', spartan.selectMenuItemByHash)
 *   window.addEventListener('load', spartan.selectMenuItemByHash)
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
 * Execute a function or load content based on the value of window.location.hash.
 * For example, given window.location.hash = #foo
 *   Look for a script named foo() and execute it.
 *   If there is no foo() script, try to load foo.html and display its contents under <main id="content">.
 *   If there is no foo.html, display an error message in <main id="content">.
 */
async function navigateToHash() {
  let hash = window.location.hash
  if (!hash) {
    return false
  }

  if (hash.charAt(0) == '#') {
    hash = hash.substring(1)
  }
  console.debug(`Navigating to: ${hash}`)

  if (typeof window[hash] === 'function') {
    console.debug(`Executing function: ${hash}()`)
    window[hash]()
  }
  else {
    let baseURL = window.location.href.substring(0, window.location.href.lastIndexOf('/'))  // Chop '/filename.html#hash' (or just plain '/#hash') off the end.
    console.debug(`Fetching content: ${baseURL}/${hash}.html`)
    let contentPromise = await fetch(`${baseURL}/${hash}.html`)
    console.debug(`Server response OK? ${contentPromise.ok}`)
    let contentElement = document.getElementById('content') || document.getElementsByTagName('main')[0]  // Fallback to first <main> if no <main id="content"> exists.
    if (contentPromise.ok) {
      contentElement.innerHTML = await contentPromise.text()
    }
    else {
      contentElement.innerHTML = `<p>Requested content does not exist.</p>`
    }
  }
}


function toggleMenu() {
  let menuElement = document.getElementsByTagName('nav').namedItem('menu') || document.getElementsByTagName('nav')[0]
  if (menuElement.style.display == 'none') {
    menuElement.style.display = 'block'
  }
  else {
    menuElement.style.display = 'none'
  }
}

export {collapseSiblingDetails, selectMenuItemByHash, navigateToHash, toggleMenu}
