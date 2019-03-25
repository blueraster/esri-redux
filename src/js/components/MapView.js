import { MAP_OPTIONS, VIEW_OPTIONS } from 'js/config';
import LocateModal from 'js/components/modals/Locate';
import ShareModal from 'js/components/modals/Share';
import Spinner from 'js/components/shared/Spinner';
import Controls from 'js/components/Controls';
import MapView from 'esri/views/MapView';
import FeatureLayer from 'esri/layers/FeatureLayer';
import LayerList from 'esri/widgets/LayerList';
import React, { Component } from 'react';
import EsriMap from 'esri/Map';

export default class Map extends Component {
  displayName: 'Map';

  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      shareModalVisible: false,
      locateModalVisible: false,
      view: {}
    };
  }

  componentDidMount() {
    const map = new EsriMap(MAP_OPTIONS);
    // Create our map view
    const promise = new MapView({
      container: this.refs.mapView,
      map: map,
      ...VIEW_OPTIONS
    });

    promise.when(view => {
      this.setState({
        view: view
      });

    });
    // Now that we have created our Map and Mapview, here is where we would add some layers!
    // see https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=layers-featurelayer for an example!
    var treeSelect = document.getElementById('tree');
    var popupTrailheads = {
      'title': 'Treehead',
      'content': '<b>Tree Name:</b> {Sci_Name}<br> <b>Height:</b> {Height}<br><b>Tree:</b> {Tree_ID}<br><b>carbon Storage:</b> {C_Storage}<br><b>Status:</b> {Status}<br><b>Condition:</b> {Condition}<br>'
    };
    var featureLayer = new FeatureLayer({
      url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0',
      // definitionExpression: "Sci_Name = 'Ulmus pumila'",
      outFields: ['Sci_Name', 'Height', 'Tree_ID', 'Status','C_Storage', 'Condition'],
      featureReduction: {
        type: 'cluster'
      },
      popupTemplate: popupTrailheads
    });

    map.add(featureLayer);
    // set definition expression to user selected value
    function setTreeDefinitionExpression(newValue) {
      featureLayer.definitionExpression = "Condition = '" + newValue + "'";
    }
    // Get all the tree conditions to filter
    function getValues(response) {
      var features = response.features;
      var values = features.map(function (feature) {
        return feature.attributes.Condition;
      });

      return values;

    }
    // Remove duplicate values
    function getUniqueValues(values) {
      var uniqueValues = [];

      values.forEach(function (item, i) {
        if ((uniqueValues.length < 1 || uniqueValues.indexOf(item) === -1) &&
          (item !== '')) {
          uniqueValues.push(item);
        }
      });
      return uniqueValues;
    }
    // Add the values (tree names) to select filter
    function addToSelect(values) {
      values.forEach(function (value) {
        var option = document.createElement('option');
        if (value !== '') {
          option.text = value;
          console.log(option.text);
          treeSelect.add(option);
        }
      });
      return setTreeDefinitionExpression(treeSelect.value);
    }

    // Query the featureLayer Array (ArcGIS API)
    promise.when(function () {
      return featureLayer.when(function () {
        var query = featureLayer.createQuery();
        return featureLayer.queryFeatures(query);
      });
    })
    .then(getValues)
    .then(getUniqueValues)
    .then(addToSelect);

    // Get user selected input
    treeSelect.addEventListener('change', function () {
      var type = event.target.value;
      setTreeDefinitionExpression(type);
    });
  }

  toggleLocateModal = () => {
    this.setState({locateModalVisible: !this.state.locateModalVisible});
  }

  toggleShareModal = () => {
    this.setState({shareModalVisible: !this.state.shareModalVisible});
  }


  render () {
    const {shareModalVisible, locateModalVisible, view} = this.state;

    return (
      <div ref='mapView' className='map-view'>
        <ShareModal visible={shareModalVisible} toggleShareModal={this.toggleShareModal} />
        <LocateModal visible={locateModalVisible} toggleLocateModal={this.toggleLocateModal} />
        <Controls view={view} toggleShareModal={this.toggleShareModal} toggleLocateModal={this.toggleLocateModal} />
        <Spinner active={!view.ready} />
      </div>
    );
  }
}
