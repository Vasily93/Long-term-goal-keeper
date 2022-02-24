import React, {useState, useEffect } from 'react';
import Goals from './Goals';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddForm from './AddForm';
// import { getMinutesLeft } from '../helpers/dateHelpers';
import { sortByDate } from '../helpers/sortArray';

function GoalsKeeper() {
    const initialGoals = JSON.parse(window.localStorage.getItem('goals')) || [];
    const [goals, setGoals] = useState(initialGoals);

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

    const changeStateById = (id) => {
        const updatedGoals = [...goals];
        updatedGoals.find(goal => goal.id === id).status = 'finished';
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
    <Goals  goals={goals} changeStateById={changeStateById} />

    </>
  )
}

export default GoalsKeeper;