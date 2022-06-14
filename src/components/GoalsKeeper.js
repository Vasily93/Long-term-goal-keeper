import React, {useState, useEffect } from 'react';
// import Goals from './Goals';
import PendingCard from './PendingCard';
import CompletedCard from './CompletedCard';
import OngoingCard from './OngoingCard';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import AddForm from './AddForm';
import { getMinutesLeft } from '../helpers/dateHelpers';
import { sortByDate } from '../helpers/sortArray';

function GoalsKeeper() {
    const initialGoals = JSON.parse(window.localStorage.getItem('goals')) || [];
    const [goals, setGoals] = useState(initialGoals);
    const [currentList, setCurrentList] = useState('ongoing');
    const ongoingGoals = goals.filter(goal => getMinutesLeft(goal.deadline)>= 0);
    const pendingGoals = goals.filter(goal => getMinutesLeft(goal.deadline) < 0 && goal.status === 'ongoing');
    const completedGoals = goals.filter(goal => goal.status === 'completed')

    useEffect(() => {
        console.log('useEffect in GoalsKeeper')
        // goals.forEach(goal => setGoalsState(goal))
        window.localStorage.setItem('goals', JSON.stringify(goals))
    }, [goals])

    const addNewGoal = (newGoal) => {
            const updatedGoals = sortByDate([...goals, newGoal]);
            setGoals(updatedGoals)
    }

    // const setGoalsState = (obj) => {
    //     const minutes = getMinutesLeft(obj.deadline)
    //     if(minutes <= 0) {
    //         obj.status = 'finished'
    //     }
    //     return obj;
    // }

    const changeStateById = (goalObj) => {
        const updatedGoals = [...goals];
        console.log(updatedGoals.find(goal => goal.id === goalObj.id))
        setGoals(updatedGoals)
    }

  return (
    <>
    <Box sx={{ flexGrow: 1 , marginBottom: '20px'}}>
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Goals Tracker
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>

    <AddForm addNewGoal={addNewGoal} />

    <ToggleButtonGroup
      color="primary"
      value={currentList}
      exclusive
      onChange={(e, newList) => setCurrentList(newList)}
    >
      <ToggleButton value="ongoing">Ongoing</ToggleButton>
      <ToggleButton value="completed">Completed</ToggleButton>
    </ToggleButtonGroup>
    {
      currentList === 'ongoing' &&
      <Container>
        <Stack direction='column' spacing={2}>
          {pendingGoals.map((goal) => (
              <PendingCard key={goal.id} goal={goal} changeStateById={changeStateById} /> 
          ))}
          </Stack >
          <Stack direction='column' spacing={2}>
          {ongoingGoals.map((goal) => (
              <OngoingCard key={goal.id} goal={goal} changeStateById={changeStateById} /> 
          ))}
        </Stack >
      </Container>
    }

    {
      currentList === 'completed' &&
      <Container>
        <Stack direction='column' spacing={2}>
        {completedGoals.map((goal) => (
            <CompletedCard key={goal.id} goal={goal} /> 
        ))}
        </Stack >
      </Container>
    }
     
    </>
  )
}

export default GoalsKeeper;