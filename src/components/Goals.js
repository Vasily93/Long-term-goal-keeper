import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import GoalCard from './GoalCard';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState, useEffect } from 'react'

function Goals({ goals, changeStateById }) {
    const [currentList, setCurrentList] = useState('ongoing');

    useEffect(() => {
        console.log('useEffect in Goals')
    })

    let showingList = goals.filter((goal) => goal.status === currentList)

    const handleChange = (event, newCurrentList) => {
        setCurrentList(newCurrentList);
    };

    return(
        <Container>
            <ToggleButtonGroup
                color="primary"
                value={currentList}
                exclusive
                onChange={handleChange}
                >
                <ToggleButton value="ongoing">Ongoing</ToggleButton>
                <ToggleButton value="finished">Finished</ToggleButton>
            </ToggleButtonGroup>

            <Stack direction='column' spacing={2}>
            {showingList.map((goal, index) => (
               <GoalCard key={goal.id} goal={goal} changeStateById={changeStateById} index={index} /> 
            ))}
            </Stack >
        </Container>
    )
}

export default Goals;