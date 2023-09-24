import React, {useState, useEffect, useRef} from 'react';
import { View, StyleSheet, Image, Dimensions, Text, ScrollView} from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import ProfileSvg from '../../components/ProfileSvg';
import BottomComponent from '../../components/BottomSvg';


const { width, height } = Dimensions.get('window');


const CoachProfile = () => {


 
  const [mantra, setMantra] = React.useState(" A mantra goes here ")
  const [bio, setBio] = React.useState("Add your bio here...")
  const [affliation, setAffiliate] = React.useState("Add your affiliates")
  const [address, setAddres] = React.useState("Your address goes here...")

  const [isEditing, setIsEditing] = useState(false);
  const [scrollEnabled, setScrollable] = useState(false);

  const scrollViewRef = useRef(null); // Create a ref for ScrollView

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    if (scrollViewRef.current) {
      if (!isEditing) {
        (scrollViewRef.current as ScrollView);
      } else {
        (scrollViewRef.current as ScrollView);
      }
    }
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      if (isEditing) {
        (scrollViewRef.current as ScrollView)
      } else {
        (scrollViewRef.current as ScrollView).scrollTo({ y: 180, animated: true });
      }
    }
  }, [isEditing]);

  useEffect (() => {
    setScrollable(isEditing)

  },[isEditing])

 return (
    <View style={styles.container}>
      <ProfileSvg style={styles.svg} />
      <BottomComponent style={styles.bottomSVG}></BottomComponent>

      <Text style={styles.normalText}> Noelle de Cruz </Text>

      <TextInput
            style={styles.mantraTextInput}
            value={mantra}
            onChangeText={mantra => setMantra(mantra)}
            editable={isEditing}
            underlineColor='transparent'/>

      <ScrollView style={styles.scrollView}
      scrollEnabled = {scrollEnabled}
      ref ={scrollViewRef}>
        
      <Text style={styles.bio}> Bio </Text>
      <View>
        <ScrollView
         style = {styles.bioScrollInput}>   
        <TextInput
          scrollEnabled = {scrollEnabled}
          style = {styles.bioInput}
          multiline
          value={bio}
          onChangeText={bio => setBio(bio)}
          editable={isEditing}
          underlineColor='white'
          />
        </ScrollView>
      </View>
      
      <Text style={styles.affliate}> Affiliates </Text>
      <View>
        <ScrollView
         style = {styles.affiliateScrollInput}>   
        <TextInput
          scrollEnabled = {scrollEnabled}
          style = {styles.bioInput}
          multiline
          value={affliation}
          onChangeText={affliation => setAffiliate(affliation)}
          editable={isEditing}
          underlineColor='white'
          />
        </ScrollView>
      </View>
      
      
      <Text style={styles.address}> Workplace Address </Text>
      <View>
        <ScrollView
         style = {styles.addressScrollInput}>   
        <TextInput
          scrollEnabled = {scrollEnabled}
          style = {styles.bioInput}
          multiline
          value={address}
          onChangeText={address => setAddres(address)}
          editable={isEditing}
          underlineColor='white'
          />
        </ScrollView>
      </View>
      
      </ScrollView>

     

      <View style ={styles.iconContainer}>
      <IconButton
        icon={isEditing ? 'pencil' : 'pencil-off'}
        onPress={toggleEditing}
        iconColor='#60488A'
      />
      </View>

      
      <View style={styles.imageContainer}>
        <Image source={require('./Icons/User.png')} style={styles.image} />
      </View>
    </View>
  );
};

const imageSize = 100;

const styles = StyleSheet.create({

  scrollView: {
    top: 165,
    width: '95%',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FBFC',
    alignItems: 'center',
  },
  scrollContainer: {
    width: '100%',
    backgroundColor: "transparent"
  },

  mantraTextInput: {
    paddingHorizontal: 50,
    paddingVertical: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    width: 300,
    top: 180,
    fontWeight: '700',
    fontFamily: 'Roboto',
    color: '#717171',
  },

  bioScrollInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    height: 70,
    top: -120,
    right: 20,
    position: 'absolute',
    fontSize: 16,
  },

  affiliateScrollInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    height: 70,
    top: -330,
    right: 20,
    position: 'absolute',
    fontSize: 16,
    
  },

  addressScrollInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    height: 70,
    top: -550,
    right: 20,
    position: 'absolute',
    fontSize: 16,
    
  },

  bio: {
    top: 180,
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#636363',
    textAlign: 'left',
    width: 323,
    height: 327,
  },

  affliate: {
    top: -30,
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#636363',
    textAlign: 'left',
    width: 320,
    height: 327,
  },

  bioInput: {
    backgroundColor: 'white',
    borderRadius:10,
    width: '100%',
  },

  affiliateTextInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '85%',
    top: 410,
    position: 'absolute',
    fontSize: 16
  },

  address: {
    top: -245,
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#636363',
    textAlign: 'left',
    width: 320,
    height: 327,
  },

  addressTextInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '85%',
    top: 510,
    position: 'absolute',
    fontSize: 16
  },


  normalText: {
    top: 200,
    fontSize: 25,
    alignItems: 'center',
    fontWeight: '700',
    fontFamily: 'Roboto',
    color: '#915bc7',
  },

  
  svg: {
    position: 'absolute',
    top: -90,
    alignSelf: 'center',
    zIndex: 0,
  },

  imageContainer: {
    position: 'absolute',
    top: 90,
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
    borderWidth: 5,
    borderColor: 'white',
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  iconContainer: {
    position: 'absolute',
    top: 95, // Adjust the top value as needed
    right: -3, // Adjust the right value as needed
    backgroundColor: 'transparent',
  },

  bottomSVG: {
    justifyContent: 'flex-end',
    position: 'absolute',
    width: width,
    height: height,
    zIndex: 0,
  },

});

export default CoachProfile;
