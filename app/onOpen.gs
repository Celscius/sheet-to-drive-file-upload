/**
 * this function gonna run when sheet open and create custom menus
 */

function onOpen() {
  new MenuHandler({
    menuName: 'App',
    items: [
      { label: 'upload file', functionName: 'showModal' },
    ]
  });
}

function showModal() { 
  new Modal({
    title: "upload file"
  })
}
