import { useEffect, useState } from 'react'
import { View, Image, Dimensions, Text, StyleSheet } from 'react-native';
import fonts from '../Styles/fonts'; //stylesheet to fetch the fonts used in the application. 

// reusable component that takes image and name as props.
const MovieItem = ({
  image, name
}) => {

  // width and height and textAlign variables to dynamically update the values at mounting, and orientation changes.
  const [width, setWidth] = useState(Dimensions.get('window').width * 0.3);
  const [height, setHeight] = useState(Dimensions.get('window').height > Dimensions.get('window').width ? Dimensions.get('window').height * 0.2 : Dimensions.get('window').height * 0.8);
  const [textAlign, setTextAlign] = useState(Dimensions.get('window').height > Dimensions.get('window').width ? 'left' : 'center');

  // to register the event to detect orientation changes and update the width height and textAlign accordingly.
  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      const { width, height } = Dimensions.get('window');
      if (width > height) {
        //landscape mode.
        setHeight(height * 0.8);
        setWidth(width * 0.3);
        setTextAlign('center')
      }
      else {
        //'portrait mode.
        setHeight(height * 0.2);
        setWidth(width * 0.3);
        setTextAlign('left')

      }
    })
  }, [])

  // return a view to display an image and movie name below the image.
  return <View style={[styles.movieView, {
    width: width,
  }]}>
    <Image
      source={image}
      style={[styles.movieImage, {
        width: width,
        height: height,
      }]} />
    <Text style={[
      fonts.fontSemiBold,
      fonts.fontNormal,
      styles.movieText, {
        textAlign: textAlign
      }]}>
      {name}
    </Text>

  </View>
}

// stylesheet to implement the styles for this component.
const styles = StyleSheet.create({
  movieView: {
    margin: '1.5%',
    marginBottom: '4%',
    flexDirection: 'column',
  },
  movieText: {
    color: '#fff',
    margin: '4%',
  },
  movieImage: {
    alignSelf: 'center',
    resizeMode: 'contain'
  }

})

export default MovieItem; 