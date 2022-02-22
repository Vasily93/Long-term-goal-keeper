import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import GoalCard from './GoalCard';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react'

function Goals({ goals }) {
    const [currentList, setCurrentList] = useState('ongoing');

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
            {showingList.map(goal => (
               <GoalCard key={goal.id} goal={goal} /> 
            ))}
            </Stack >
        </Container>
    )
}

export default Goals;