import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import CityListComponent from "../components/city/CityListComponent";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import App from "../App";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/CityListComponent">
                <CityListComponent/>
            </ComponentPreview>
            <ComponentPreview path="/HeaderComponent">
                <HeaderComponent/>
            </ComponentPreview>
            <ComponentPreview path="/FooterComponent">
                <FooterComponent/>
            </ComponentPreview>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews