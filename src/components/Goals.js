import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import GoalCard from './GoalCard';

function Goals({ goals, changeStateById, card }) {
    console.log(card)
    return(
        <Container>
            <Stack direction='column' spacing={2}>
            {goals.map((goal) => (
               <card key={goal.id} goal={goal} changeStateById={changeStateById} /> 
            ))}
            </Stack >
        </Container>
    )
}

export default Goals;