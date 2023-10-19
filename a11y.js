const $a11y = document.getElementById('a11y-container'),
  $body = document.body;

const toggleHighContrast = (theme, force) => {
  const className = 'high-contrast',
    themeClassName = `high-contrast--${theme}`,
    classeNames = [className, themeClassName];

  const isToggled = $body.classList.contains(themeClassName),
    isTogglingOn = force === true,
    isTogglingOff = force === false;

  if ($body.classList.contains(className)) {
    const currentHighContrast = `high-contrast--${
      theme === 'light' ? 'dark' : 'light'
    }`;

    $body.classList.remove(currentHighContrast);
    localStorage.removeItem(className);
  }

  if (isTogglingOn || !isToggled) {
    $body.classList.add(...classeNames);
    localStorage.setItem(className, theme);
  }

  if (isTogglingOff || isToggled) {
    $body.classList.remove(...classeNames);
    localStorage.removeItem(className);
  }
};

(() => {
  const hasHighContrast = matchMedia('(prefers-contrast: more)').matches,
    hasDarkMode = matchMedia('(prefers-color-scheme: dark)').matches,
    theme = hasDarkMode ? 'dark' : 'light';

  const storedHighContrastTheme = localStorage.getItem('high-contrast');

  if (storedHighContrastTheme) {
    toggleHighContrast(storedHighContrastTheme, true);
  } else if (hasHighContrast) {
    toggleHighContrast(theme, hasHighContrast);
  }

  $a11y.addEventListener('click', (e) => {
    const $target = e.target;

    if (!$target.matches('[data-trigger]')) return;

    switch ($target.dataset.trigger) {
      case 'high-contrast': {
        const theme = $target.dataset.theme;
        toggleHighContrast(theme);
        return;
      }
      default:
        throw new Error(
          `The trigger "${$target.dataset.trigger}" does not exists!`,
        );
    }
  });
})();
