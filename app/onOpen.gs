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
