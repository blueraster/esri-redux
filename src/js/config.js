export const INITIAL_STATE = {
  locateModalVisible: false,
  shareModalVisible: false,
  viewReady: false,
  itemInfo: {}
};

export const TEXT = {
  title: 'Esri Example',
  subtitle: 'Carbon Storage of trees in Warren Wilson College'
};

export const MAP_OPTIONS = {
  basemap: 'streets'
};

export const VIEW_OPTIONS = {
  ui: { components: ['logo', 'attribution'] },
  center: [-35.55, 26.53],
  zoom: 2,
  extent: {
    xmin: -9177811,
    ymin: 4247000,
    xmax: -9176791,
    ymax: 4247784,
    spatialReference: 102100
  },
};

export const URLS = {
  itemInfo: appid => `//www.arcgis.com/sharing/rest/content/items/${appid}/data`
};
