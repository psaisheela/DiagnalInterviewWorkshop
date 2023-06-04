import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  BackHandler,
  FlatList,
  StyleSheet
} from 'react-native';
import images from './assets/images';
import data from './API';
import MovieItem from './Components/MovieItem';
import ListHeader from './Components/ListHeader';
// Pagination control. 
var page = 1;

function Home({ route }) {

  const [movieData, setMovieData] = useState([]); // working variable to change the movie list as per search.
  const [original, setOriginal] = useState([]); // contains the original data fetch from the API. used to revert back if search is empty. 
  const [pageNumber, setPageNumber] = useState(page); // shows the current page number, will run useEffect function as soon as the value updates.  
  const [searchText, setSearchText] = useState(''); // Store the search text the user types in search box.
  const [showSearch, setShowSearch] = useState(false); // Controls the visibility of the search textbox.
  const [title, setTitle] = useState(null); // Store the title of the page fetched from the API.


  // function to handle backpress. If search is underway, it will close the search, else will exit the app.
  const handleBackPress = () => {
    showSearch ? setShowSearch(false) : BackHandler.exitApp();
    return true;
  }

  // to register backpress event at initiation, and to dereference the variable at unmounting.
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      backHandler.remove();
    }
  }, [])

  // fetch the data from the API, update title, optionally filter the data if search is on, as the pageNumber updates.
  useEffect(() => {
    setMovieData(existingList => [...existingList, ...data[pageNumber]?.page?.['content-items'].content]);
    setOriginal(existingList => [...existingList, ...data[pageNumber]?.page?.['content-items'].content])
    setTitle(data[pageNumber]?.page['title']);
    (searchText != null && searchText != '') ? filterData(searchText) : null;

  }, [pageNumber])

  // pagination function to update the page number if there is more data tobe fetched.
  const endReached = () => {
    if (page < Object.keys(data).length) {
      page = page + 1;

      setPageNumber(page);
    }
  }

  // Filter function to filter the original list as per the search text. Revert back to original if the search is empty.
  const filterData = (value) => {
    if (value != '') {
      const filterList = original.filter((item) => item.name.toString().toLowerCase().trim().includes(value.toLowerCase().trim()));
      setMovieData(filterList);
    }
    else {
      setMovieData(original)
    }
  }

  //Render function to render each movie in the movie list.
  const renderList = ({ item, index }) => {

    // MovieItem: Reusable component that takes the image and name of the movie to display.
    return <MovieItem
      image={images[item['poster-image']] != null ? images[item['poster-image']] : images['placeholder_for_missing_posters.png']}
      name={item.name} />

  }

  //render the main page with a flatlist of movies and an header.
  return (
    <SafeAreaView style={styles.mainView}>
      <FlatList
        data={movieData}
        renderItem={renderList}
        keyboardShouldPersistTaps={'always'}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={endReached}
        onEndReachedThreshold={.7}
        showsVerticalScrollIndicator={false}
        extraData={searchText}
        columnWrapperStyle={styles.columnWrapperStyle}
        ListHeaderComponent={
          /* reusable component */
          <ListHeader
            handleBackPress={handleBackPress}
            title={title}
            searchText={searchText}
            showSearch={showSearch}
            setShowSearch={() => setShowSearch(!showSearch)}
            onChangeText={(value) => {
              if (value.length > 2 && value.length < 30) {
                setSearchText(value);
                setMovieData(current => { original, filterData(value) });
                filterData(value);
              }else if(value.length < 2){
                setMovieData(original)
              }
            }}
          />
        }
        stickyHeaderIndices={[0]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000',
  },
  columnWrapperStyle: {
    flex: 1
  }
})
export default Home;