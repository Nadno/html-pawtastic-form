let active = false;

const $menu = document.querySelector('.l-intro__header'),
  $menuContent = $menu.querySelector('[data-menu-content]');

document.querySelector('.toggle-menu').addEventListener('click', (event) => {
  event.stopPropagation();
  active = !active;

  if (active) {
    document.body.style.overflowY = 'hidden';
    $menu.classList.add('on');
    $menuContent.dataset.active = true;
  } else {
    document.body.style.overflowY = 'initial';
    $menu.classList.remove('on');

    $menuContent.addEventListener(
      'transitionend',
      () => {
        $menuContent.dataset.active = false;
      },
      { once: true },
    );
  }
});
