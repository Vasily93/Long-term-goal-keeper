import React from 'react';
import Goals from './Goals';

const goals = [
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
  return (
    <>
        <h1>GoalsKeeper</h1>
        <Goals  goals={goals} />
    </>
  )
}

export default GoalsKeeper;