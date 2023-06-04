import {
  useState,
  useEffect
} from 'react'
import {
  ImageBackground,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  Dimensions,
  StyleSheet
} from "react-native";
import images from '../assets/images';
import fonts from "../Styles/fonts";  //stylesheet to fetch the fonts used in the application. 

// reusable component to display header.
const ListHeader = ({
  handleBackPress = () => { },
  showSearch,
  onChangeText = () => { },
  setShowSearch = () => { },
  title,
  searchText
}) => {
  // width and height variables to dynamically update the values at mounting, and orientation changes.
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const [height, setHeight] = useState(Dimensions.get('window').height > Dimensions.get('window').width ? Dimensions.get('screen').height * 0.08 : Dimensions.get('window').height * 0.18);

  // variable to increase the background image height depending on the orientation
  const [offSet, setOffSet] = useState(Dimensions.get('window').height > Dimensions.get('window').width ? 30 : 10);
  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      const { width, height } = Dimensions.get('window');

      if (width > height) {
        // landscape mode
        setHeight(height * 0.18);
        setWidth(width);
        setOffSet(10)
      }
      else {
        //portrait mode
        setHeight(height * 0.08);
        setWidth(width);
        setOffSet(30);
      }
    })
  }, [])

  // return the header with background image, back icon, title and search box with search icon.
  return <ImageBackground
    imageStyle={{
      width: width,
      height: height + offSet,
    }}
    style={[{
      width: width,
      height: height,
    }, styles.background,]}
    source={images['nav_bar.png']}>
    <TouchableOpacity onPress={handleBackPress}>
      <Image source={images['Back.png']} style={styles.iconImg} />
    </TouchableOpacity>

    {/* if search is off the title is visible. */}

    {
      !showSearch &&
      <Text style={[
        fonts.fontRegular,
        fonts.fontBig,
        styles.title]}>{title}</Text>
    }

    {/* while search is ON show the search box. */}
    {
      showSearch &&
      <TextInput
        placeholder='Search'
        selectionColor={'#fff'}
        placeholderTextColor={'#fff'}
        defaultValue={searchText.toString()}
        onChangeText={onChangeText}
        style={[fonts.fontRegular, styles.searchBox]}
      />
    }

    {/* control the visibility of search */}

    <TouchableOpacity onPress={setShowSearch} >
      <Image source={images['search.png']} style={styles.iconImg}
      />
    </TouchableOpacity>
  </ImageBackground>
}

//stylesheet for the header component.

const styles = StyleSheet.create({
  background: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconImg: {
    width: 20,
    height: 20
  },
  title: {
    color: '#fff',
    width: '70%'
  },
  searchBox: {
    color: '#fff',
    width: '70%',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',

  }

})

export default ListHeader; 