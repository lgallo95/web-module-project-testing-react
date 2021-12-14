import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from './../Display';

import mockFetchShow from './../../api/fetchShow'
jest.mock('./../../api/fetchShow');

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

test('renders without errors with no props', ()=>{
    render (<Display/>)
});

test('renders Show component when the button is clicked ', async ()=>{
    mockFetchShow.mockResolvedValueOnce(testData)
    render (<Display/>)
    const btn = screen.getByRole('button')
    userEvent.click(btn)

    const show = await screen.findByTestId('show-container')
    expect(show).toBeInTheDocument()
});

test('renders show season options matching your data when the button is clicked', async ()=>{
    mockFetchShow.mockResolvedValueOnce(testData)
    render (<Display/>)
    const btn = screen.getByRole('button')
    userEvent.click(btn)

    await waitFor(() => {
        const seasonOptions = screen.queryAllByTestId('season-option')
        expect(seasonOptions).toHaveLength(2)
    })
});
