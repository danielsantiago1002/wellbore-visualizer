export const createLayerContainer = (width: number, height: number) => {
  const container = document.createElement('div');
  container.setAttribute('height', `${height}`);
  container.setAttribute('width', `${width}`);

  return container;
};

export const createRootContainer = (width: number) => {
  const root = document.createElement('div');
  root.setAttribute('style', `display: flex;flex:1;flex-direction:column; width: ${width}px;height:100%; background-color: white;`);

  return root;
};