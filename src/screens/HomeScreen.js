import React,{useState} from "react";
import { Text, StyleSheet,View } from "react-native";
import axios from 'axios';
import { FlatList } from "react-native-gesture-handler";


const HomeScreen = () => {

  
   const [data,setData]=useState([]);
   const [page,setPage]=useState(0);

   
 
const details = async() =>{

  const report =await axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`);
    
  let result=report.data;
  let res=result.hits;
   setData([...data.concat(res)]);
}

 const renderRow =({item}) => {
  return (
    <View style={styles.button} >
<Text>title : {item.title}</Text>
<Text>url : {item.url}</Text>
<Text>created_at : {item.created_at}</Text>
 <Text>author name :  {item.author}</Text>

      </View>

  )
}

 const handleLoadMore=()=>{
  setPage(page + 1 ,details())
}
 
  return (
    <View>
  <Text style={styles.text} onLayout={details}>HomeScreen</Text>
 
  <FlatList
  data={data}
  renderItem={renderRow}
  onEndReached={handleLoadMore}
  
  />
  </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    left:100,
    fontWeight:'bold'
  },
  button: {
    width: 410,
    marginTop: 20,
   backgroundColor: "#ddd",
    padding: 10,
   borderRadius: 5,
   left:6
   
 },


});

export default HomeScreen;
