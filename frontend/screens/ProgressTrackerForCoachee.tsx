import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { RootStackParams } from '../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LayoutAnimation } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FindCoacheeByIdDocument, UpdateCoacheeTaskDocument } from '../generated-gql/graphql';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation } from 'urql';


const ProgressTrackerForCoachee = () => {

    //reminders: add task can also be edit tasks, thats why I made the tiles touchable and navigate there
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const [userToken, setUserToken] = useState<string | null>(null); // State to store the user token
    const [, executeMutation] = useMutation(UpdateCoacheeTaskDocument);

    useEffect(() => {
      const fetchUserToken = async () => {
          try {
              const token = await AsyncStorage.getItem('userToken');
              setUserToken(token);
          } catch (error) {
              console.error('Error fetching token:', error);
          }
      };

      fetchUserToken();
  }, []);

  // function to fetch coachee data by userID (token)
  const useFetchCoacheeByUserID = (userID: any) => {
      const [coacheeResult] = useQuery({
          query: FindCoacheeByIdDocument, // Use the Coachee query document
          variables: {
              userId: parseInt(userID),
          },
      });

      return coacheeResult;
  };
  const {
      data: coacheeData,
      loading: coacheeLoading,
      error: coacheeError,
  } = useFetchCoacheeByUserID(userToken);

    const handleNavigateBack = () => {
      navigation.goBack();
    };
    const handleNavigateAddTask = () => {
      navigation.navigate("AddTaskPage");
    };
    const handleNavigatePreviewTask = (task: any) => {
      navigation.navigate("PreviewTaskForCoachee", { task });
    };
  
    // const [tasks, setTasks] = useState([
    //   { id: 1, title: 'Practice with coach', date: 'June 24, 2024', completed: false },
    //   { id: 2, title: 'Dribble excercirse', date: 'March 12, 2024', completed: false },
    //   { id: 3, title: 'Lady gaga playlist', date: 'Decemeber 25, 2024', completed: false },
    //   { id: 4, title: 'Yeyuh', date: 'June 24, 2024', completed: false },
    // ]);
  

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (coacheeData?.findCoacheeByID.tasks) {
            const newTasks = coacheeData.findCoacheeByID.tasks.map(task => ({
                id: task.id,
                title: task.title,
                description: task.description,
                date: task.date,
                completed: task.completionStatus === "COMPLETED",
            }));
            setTasks(newTasks);
        }
    }, [coacheeData]);

    
  
    const toggleCompletion = async (taskId: number) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      const updatedTasks = tasks.map(task => {
          if (task.id === taskId) {
              const updatedCompleted = !task.completed;
              const updatedTask = coacheeData?.findCoacheeByID.tasks.find(task => task.id === taskId);
              if (updatedTask) {
                  // Get today's date and format it
                  const today = new Date();
                  const formattedDate = today.toISOString().slice(0, 10) + "T00:00:00.000Z";
                  executeMutation({
                      updateCoachTaskId: taskId,
                      input: {
                          completionStatus: updatedCompleted ? "COMPLETED" : "UNCOMPLETED",
                          date: formattedDate,
                          description: updatedTask.description,
                          title: updatedTask.title,
                      }
                  });
              }
              return { ...task, completed: updatedCompleted };
          }
          return task;
      });
      setTasks(updatedTasks);
  };
    
    const sortedTasks = [...tasks].sort((a, b) => {
        if (a.completed && !b.completed) {
          return 1;
        }
        if (!a.completed && b.completed) {
          return -1;
        }
        return 0;
    });
  
    return (
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleNavigateBack}>
              <Icon name="arrow-back-circle-outline" size={30} color='#7E3FF0'/>
            </TouchableOpacity>
            <Text style={styles.headerText}>Taskboard</Text>
            
            <View style={styles.addTaskContainer}> 
                <TouchableOpacity onPress={handleNavigateAddTask}>
                    <Text style={styles.addTask}>Add Task</Text>
                 </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
          {sortedTasks.map((task) => (
              <TouchableOpacity onPress={() => handleNavigatePreviewTask(task)} key={task.id} style={styles.tile}>
              <View style={styles.taskInfo}>
                <Text
                  style={[
                    styles.title,
                    {
                      textDecorationLine: task.completed ? 'line-through' : 'none',
                      color: task.completed ? '#6C757D' : 'black',
                    },
                  ]}
                >
                  {task.title}
                </Text>
                <Text
                  style={[
                    styles.date,
                    {
                      textDecorationLine: task.completed ? 'line-through' : 'none',
                      color: task.completed ? '#6C757D' : 'gray',
                    },
                  ]}
                >
                  {task.date}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => toggleCompletion(task.id)}
                style={[
                  styles.completeButton,
                  { backgroundColor: 'transparent' },
                ]}
              >
                <Icon
                  name={task.completed ? 'checkmark' : 'ellipse-outline'}
                  size={15}
                  color={task.completed ? '#7E3FF0' : 'transparent'}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
          </ScrollView>
        </View>
      );
    };
  
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'white',
      },
      iconContainer: {
        marginTop: "10.5%",
        marginLeft: "9%",
        height: "17%"
      },
      headerText: {
        marginTop: "10%",
        fontSize: 25,
        fontWeight: '400',
      },
      addTask: {
        color: "#7E3FF0",
        fontStyle: "italic"
      },
      addTaskContainer: {
        marginTop: "15%",
        bottom: "35%",
        left: "75%"
      },
      tile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "90%",
        borderBottomWidth: 1,
        borderBottomColor: '#CED4DA',
        top: "5%",
        left: "3%",
        padding: 16,
      },
      taskInfo: {
        flex: 1,
      },
      title: {
        fontSize: 18,
        marginBottom: 4,
      },
      date: {
        fontSize: 14,
        color: 'gray',
      },
      completeButton: {
        width: 20,
        height: 20,
        bottom: "5%",
        borderRadius: 12,
        borderWidth: 1,
        left: "6%",
        borderColor: '#7E3FF0',
        justifyContent: 'center',
        alignItems: 'center',
      },
    });
  
export default ProgressTrackerForCoachee;