import React, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import axios from 'axios'

const FormPage = () =>
{
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())


    const submitHandler = async (e) =>
    {
        e.preventDefault();

        const { data } = await axios.post("localhost:5000/api/fetchStockData", { startDate, endDate })
    };


    return (
        <>
            <Container className='mt-5 col-6'>
                <Form onSubmit={submitHandler} >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control type="date" placeholder="Enter Start Date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control type="date" placeholder="Enter End Date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default FormPage