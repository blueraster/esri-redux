import { MAP_OPTIONS, VIEW_OPTIONS, LAYER_OPTIONS } from 'js/config';
import LocateModal from 'js/components/modals/Locate';
import ShareModal from 'js/components/modals/Share';
import SliderModal from 'js/components/modals/Slider';
import Spinner from 'js/components/shared/Spinner';
import Controls from 'js/components/Controls';
import MapView from 'esri/views/MapView';
import FeatureLayer from 'esri/layers/FeatureLayer';
import Legend from 'esri/widgets/Legend';
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
      incomeLevel: 0,
      view: {}
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.createMap = this.createMap.bind(this);
  }

  componentDidMount() {

    console.log("Did mount")
    this.createMap();
    
    // Now that we have created our Map and Mapview, here is where we would add some layers!
    // see https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=layers-featurelayer for an example!
  }


  createMap() {
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

    const layer = new FeatureLayer({
      url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/ACS_Median_Earnings_by_Occupation_by_Sex_Boundaries/FeatureServer/",
      layerId: 2,
      popupTemplate: {
        title: "{NAME} in {County}, {State}",
        content: "{*}"
      }
    })

    layer.definitionExpression = `B24022_001E > ${this.state.incomeLevel}`;
    map.add(layer)
  }

  toggleLocateModal = () => {
    this.setState({locateModalVisible: !this.state.locateModalVisible});
  }

  toggleShareModal = () => {
    this.setState({shareModalVisible: !this.state.shareModalVisible});
  }

  handleOnChange = (event) => {
    console.log("Changing")
    this.setState({
      incomeLevel: event.target.value
    }, () =>{
      this.createMap();
    });
  }

  render () {

    const {shareModalVisible, locateModalVisible, view, incomeLevel} = this.state;
    
    return (
      <div ref='mapView' className='map-view'>
        <ShareModal visible={shareModalVisible} toggleShareModal={this.toggleShareModal}/>
        <LocateModal visible={locateModalVisible} toggleLocateModal={this.toggleLocateModal} />
        <Controls view={view} toggleShareModal={this.toggleShareModal} toggleLocateModal={this.toggleLocateModal} />
        <Spinner active={!view.ready} />
        <SliderModal id="incomeFilter" incomeLevel={this.state.incomeLevel} onChangeValue={this.handleOnChange} />
      </div>
    );
  }
}
