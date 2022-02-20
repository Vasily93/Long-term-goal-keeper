import Stack from '@mui/material/Stack';
import GoalCard from './GoalCard';

function Goals(props) {
    return(
        <div>
            <Stack direction='column' spacing={2}>
            {props.goals.map(goal => (
               <GoalCard goal={goal} /> 
            ))}
            </Stack >
        </div>
    )
}

export default Goals;