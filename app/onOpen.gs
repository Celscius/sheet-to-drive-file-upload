function onOpen() {
  new MenuHandler({
    menuName: 'App',
    items: CONFIG.menu
  });
}

