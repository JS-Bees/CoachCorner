import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';
import { RootStackParams } from '../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LayoutAnimation } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FindCoachByIdDocument, UpdateCoachTaskDocument } from '../generated-gql/graphql';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation } from 'urql';

const ProgressTracker = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const [userToken, setUserToken] = useState<string | null>(null); 
    const [, executeMutation] = useMutation(UpdateCoachTaskDocument);

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


  const useFetchCoachByUserID = (userID: any) => {
      const [coachResult] = useQuery({
          query: FindCoachByIdDocument, 
          variables: {
              userId: parseInt(userID),
          },
      });

      return coachResult;
  };
  const {
      data: coachData,
      loading: coachLoading,
      error: coachError,
  } = useFetchCoachByUserID(userToken);

    const handleNavigateBack = () => {
      navigation.goBack();
    };
    const handleNavigateAddTask = () => {
      navigation.navigate("AddTaskPageForCoach");
    };
    const handleNavigatePreviewTask = (task: any) => {
      navigation.navigate("PreviewTask", { task });
    };

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (coachData?.findCoachByID.tasks) {
            const newTasks = coachData.findCoachByID.tasks.map(task => ({
                id: task.id,
                title: task.title,
                description: task.description,
                date: task.date,
                completed: task.completionStatus === "COMPLETED",
            }));
            setTasks(newTasks);
        }
    }, [coachData]);

    
  
    const toggleCompletion = async (taskId: number) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      const updatedTasks = tasks.map(task => {
          if (task.id === taskId) {
              const updatedCompleted = !task.completed;
              const updatedTask = coachData?.findCoachByID.tasks.find(task => task.id === taskId);
              if (updatedTask) {
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

    const formatDate = (isoDateString: any) => {
      const date = new Date(isoDateString);
      const day = date.getDate();
      const month = date.toLocaleString("en-GB", { month: "long" });
      const year = date.getFullYear();
      return `${month} ${day}, ${year}`;
  };
  
    return (
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleNavigateBack}>
              <Icon name="arrow-back-circle-outline" size={30} color='#7E3FF0'/>
            </TouchableOpacity>
            <Text style={styles.headerText}>Taskboard</Text>
            
            <View style={styles.addTaskContainer}> 
                <TouchableOpacity onPress={handleNavigateAddTask} style={styles.addTaskBorder}>
                    <Text style={styles.addTask}>Add Task</Text>
                 </TouchableOpacity>
            </View>
          </View>
          <ScrollView style={styles.alignedTasks}>
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
                  {formatDate(task.date)} 
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
        marginTop: "15%",
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
        fontStyle: "italic",
        
      },
      addTaskContainer: {
        marginTop: "15%",
        bottom: "68%",
        left: "60%",

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
        right: "40%",
        borderColor: '#7E3FF0',
        justifyContent: 'center',
        alignItems: 'center',
      },
      addTaskBorder: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 50, 
        borderWidth: 1, 
        borderColor: '#7E3FF0', 
        width: "30%",
        alignItems: "center"
      },
      alignedTasks:  {
        left: "5%"
      }
    });
  
export default ProgressTracker;