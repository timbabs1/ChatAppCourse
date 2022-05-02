import {Dimensions, Platform} from "react-native";

let headerHeight = Platform.OS === 'ios' ? 66 : 46;
let footerHeight = Platform.OS === 'ios' ? 70 : 50;

const Constants = {
    headerHeight: headerHeight,
    footerHeight: footerHeight,
    viewHeight: Dimensions.get('window').height - headerHeight - footerHeight,
    screenHeight: Dimensions.get('window').height,
    screenWidth: Dimensions.get('window').width,
}

export default Constants;
