function checkPage() {
  if (window.location.href.includes('https://ebookjapan.yahoo.co.jp/cart/')) {
    // const targetElement = document.querySelector('ul.item-container__row.item-container__row--size-line.item-container__row--disp-list');
    const targetElement = document.querySelector('div.cart-main');
    if (targetElement) {
      // console.log('addButtonContainer')
      addButtonContainer();
    } else {
      // console.log('removeButtonContainer')
      removeButtonContainer();
    }
  } else {
    removeButtonContainer();
  }
}

function addButtonContainer() {
  if (document.getElementById('custom-button-container')) return;

  const buttonContainer = document.createElement('div');
  buttonContainer.id = 'custom-button-container';
  buttonContainer.style.position = 'fixed';
  buttonContainer.style.top = '50%';
  buttonContainer.style.right = '0';
  buttonContainer.style.transform = 'translateY(-50%)';
  buttonContainer.style.display = 'flex';
  buttonContainer.style.flexDirection = 'column';
  buttonContainer.style.flex = '1';
  buttonContainer.style.gap = '10px';
  buttonContainer.style.padding = '10px';
  buttonContainer.style.backgroundColor = '#f8485e';
  buttonContainer.style.zIndex = '9999';

  const gainButton = document.createElement('button');
  gainButton.textContent = '獲得';
  gainButton.style.padding = '5px';
  gainButton.addEventListener('click', () => filterItems('獲得'));

  const offButton = document.createElement('button');
  offButton.textContent = 'OFF';
  gainButton.style.padding = '5px';
  offButton.addEventListener('click', () => filterItems('OFF'));

  const bothButton = document.createElement('button');
  bothButton.textContent = '獲得&OFF';
  gainButton.style.padding = '5px';
  bothButton.addEventListener('click', () => filterItems('both'));

  const resetButton = document.createElement('button');
  resetButton.textContent = 'リセット';
  gainButton.style.padding = '5px';
  resetButton.addEventListener('click', resetItems);

  const expandButton = document.createElement('button');
  expandButton.textContent = '全て展開';
  gainButton.style.padding = '5px';
  expandButton.addEventListener('click', expandContents);

  buttonContainer.appendChild(gainButton);
  buttonContainer.appendChild(offButton);
  buttonContainer.appendChild(bothButton);
  buttonContainer.appendChild(resetButton);
  buttonContainer.appendChild(expandButton);

  document.body.insertBefore(buttonContainer, document.body.firstChild);
}

function removeButtonContainer() {
  const container = document.getElementById('custom-button-container');
  if (container) {
    container.remove();
  }
}

function filterItems(type) {
  const items = document.querySelectorAll('.cart-main .cart-contents__list > li, .cart-main .later-contents__list > li');
  items.forEach(item => {
    const tag = item.querySelector('span.book-caption__tagtext');
    if (type === 'both') {
      if (tag && (tag.textContent.includes('獲得') || tag.textContent.includes('OFF'))) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    } else {
      if (tag && tag.textContent.includes(type)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    }
  });
}

function resetItems() {
  const items = document.querySelectorAll('.cart-main .cart-contents__list > li, .cart-main .later-contents__list > li');
  items.forEach(item => {
    item.style.display = 'block';
  });
}

function expandContents() {
  const expandElements = document.querySelectorAll('.cart-main .contents-more-toggle__text');
  expandElements.forEach(element => {
    console.log('expandContents')
    element.click();
  });
}

checkPage();
setInterval(checkPage, 1000);
