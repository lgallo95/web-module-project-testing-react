import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';

const testData = {
    id: 1,
    name:'',
    image: 'https://static.tvmaze.com/uploads/images/medium_landscape/342/855787.jpg',
    season: "",
    number: 1,
    summary: "abc",
    runtime: 1
}

const testData2 = {
    id: 1,
    name:'',
    image: null,
    season: "",
    number: 1,
    summary: "abc",
    runtime: 1
}

test("renders without error", () => {
    render(<Episode episode={testData} />);
});

test("renders the summary test passed as prop", ()=>{
    render(<Episode episode={testData} />);

    const summary = screen.queryByText(/abc/i);

    expect(summary).toBeInTheDocument()
    expect(summary).toBeTruthy()
    expect(summary).toHaveTextContent("abc")
});

test("renders default image when image is not defined", ()=>{
    render(<Episode episode={testData2}/>);

    const image = screen.queryByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png');

    expect(image).toBeInTheDocument();
});
