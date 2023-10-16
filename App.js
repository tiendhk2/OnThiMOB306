import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Button,Modal
} from "react-native";
import styles from "./styles";
import React, { useEffect, useState } from "react";


const URL_API = "https://6529176555b137ddc83e310d.mockapi.io/api/sinhvien"

const App = () => {




  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getSinhVien = async () => {
    try {
      const response = await fetch(URL_API);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSinhVien();
  }, []);

  var onClickItem = (item) => {
    alert(item.title)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        {isLoading ? (<ActivityIndicator />) : (
          <View>

            <Button title="Them SV" onPress={() => {

              let newSV = {
                masinhvien: 'PH20122',
                tensinhvien: 'Le Minh Anh',
                anhdaidien: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/723.jpg',
                diemtrungbinh: 9.5
              };

              fetch(URL_API, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newSV),
              })
                .then((response) => {
                  console.log(response.json())
                  getSinhVien()

                });
            }} />
            <FlatList
              data={data} 
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => {
                  alert(item.tensinhvien)
                }} >
                  <View style={styles.itemContainer}>
                    <Image style={styles.image} source={{ uri: item.anhdaidien }} />
                    <View style={styles.textContainer}>
                      <Text style={styles.idText}>{item.masinhvien}</Text>
                      <Text style={styles.titleText}>{item.tensinhvien}</Text>
                      <Text style={styles.titleText}>{item.diemtrungbinh}</Text>
                    </View>
                  </View>

                </TouchableOpacity>
              )}
            />


          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default App;
