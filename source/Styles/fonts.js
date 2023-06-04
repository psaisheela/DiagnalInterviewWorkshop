// stylesheet to export the font family and font sizes in the entire application.

import { StyleSheet } from "react-native";

export default StyleSheet.create({
    fontBold: { 
        fontFamily: 'TitilliumWeb-Bold', 
        opacity: 0.5,
    },
    fontSemiBold: { 
        fontFamily: 'TitilliumWeb-SemiBold',
        opacity: 0.5, 
    },
    fontRegular: { 
        fontFamily: 'TitilliumWeb-Regular' ,
        opacity: 0.5,
    }, 
    fontBig: {
        fontSize: 20, 
    }, 
    fontNormal: {
        fontSize: 16
    }, 
    fontSmall: {
        fontSize: 11
    }


})