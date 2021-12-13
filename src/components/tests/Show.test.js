import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';
import Episodes from '../Episodes';

const testData ={
    name: "Name",
    summary: "Summary",
    seasons: [
        {
            id: 0,
            name: "S1",
            episodes: []
        },
        {
            id: 1,
            name: "S2",
            episodes: []
        },
    ]
}

test('renders without errors', ()=>{
    render(<Show show ={testData} selectedSeason = {'none'}/>)
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} />)

    const loading = screen.queryByText(/Fetching data.../i)

    expect(loading).toBeInTheDocument()
});


test('renders same number of options seasons are passed in', ()=>{
    render(<Show show={testData} selectedSeason= {'none'} />)

    const opt = screen.queryAllByTestId('season-option')

    expect(opt).toHaveLength(2)
});

test('handleSelect is called when an season is selected', () => {
    const handleSelect = jest.fn()
    
    render(<Show show={testData} selectedSeason= {'none'} handleSelect={handleSelect} />)

    const slct = screen.getByLabelText(/Select a season/i)

    userEvent.selectOptions(slct, ['1']);

    expect(handleSelect).toBeCalled()
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const { rerender } =  render(<Show show={testData} selectedSeason= {'none'} />);
    
    let eps = screen.queryByTestId('episodes-container')
    
    expect(eps).not.toBeInTheDocument()

    rerender(<Show show={testData} selectedSeason= {1} />)

    eps = screen.queryByTestId('episodes-container')

    expect(eps).toBeInTheDocument()
});
