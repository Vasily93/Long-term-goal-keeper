import React, {useState, useEffect } from 'react';
import Goals from './Goals';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import AddForm from './AddForm';


const hardcodedGoals = [
    {
        name: 'Fenruary 4 Project',
        description: 'finish four code porjects for portfolio',
        deadline: '20220228',
        bet: 'Speakers',
        partner: 'Tikhon'
    },
    {
        name: 'Get Frond End Dev Job',
        description: 'Get hired to work as a frond end developer ',
        deadline: '20221231',
        bet: '$1000',
        partner: 'Tikhon'
    },
    {
        name: 'Apply for 200 jobs',
        description: 'Send out resume to  200 employers on LinkedIn',
        deadline: '20220811',
        bet: 'car',
        partner: 'Tikhon'
    },
]

function GoalsKeeper() {
    const staticGoals = JSON.parse(window.localStorage.getItem('goals')) || hardcodedGoals;
    const [goals, setGoals] = useState(staticGoals);

    useEffect(() => {
        window.localStorage.setItem('goals', JSON.stringify(goals))
    }, [goals])

    const addNewGoal = (newGoal) => {
        console.log(newGoal)
        setGoals([...goals, newGoal])
    }

  return (
    <>
    <Box sx={{ flexGrow: 1 , marginBottom: '20px'}}>
      <AppBar position="static">
        <Toolbar>
            <Link to="addform">Add New Goal</Link>
        </Toolbar>
      </AppBar>
    </Box>
    <Routes>
        <Route path="/" element={<Goals  goals={goals} /> } />
        <Route path="addform" element={<AddForm addNewGoal={addNewGoal} />} />
    </Routes>
    </>
  )
}

export default GoalsKeeper;