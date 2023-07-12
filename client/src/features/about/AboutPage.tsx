import { Alert, AlertTitle, Button, ButtonGroup, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import agent from "../../app/api/agent";

export default function AboutPage() {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    function getValidationError() {
        agent.TestErrors.getValidationError()
            .catch(error => setValidationErrors(error));
    }

    return (
        <>

            <Typography gutterBottom variant="h3" >
                Solution architecture for digital distribution web application
            </Typography>

            <Typography paragraph={true} sx={{ mb: 100 }}>
                Research object: Web development.
                <br />Research subject: Digital distribution web app development processes with optimized application state management.
                <br /><br />The purpose of the diploma project is to develop a solution architecture for a  digital distribution web app.
                <br />The goal is to provide optimized application state management by implementing an architectural solution that simplifies writing logic, configuration and centralization of an application state, supports asynchronous requests and data normalization.

            </Typography>

            <Container sx={{ mb: 20 }}>
                <Typography variant="h4" textAlign="center" sx={{ mb: 4 }}>
                    Error handling
                </Typography>

                <ButtonGroup sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                    <Button variant='contained' onClick={() =>
                        agent.TestErrors.get400Error().catch(error => console.log(error))}>Test 400 error</Button>
                    <Button variant='contained' onClick={() =>
                        agent.TestErrors.get401Error().catch(error => console.log(error))}>Test 401 error</Button>
                    <Button variant='contained' onClick={() =>
                        agent.TestErrors.get404Error().catch(error => console.log(error))}>Test 404 error</Button>
                    <Button variant='contained' onClick={() =>
                        agent.TestErrors.get500Error().catch(error => console.log(error))}>Test 500 error</Button>
                    <Button variant='contained' onClick={
                        getValidationError}>Test validation error</Button>
                </ButtonGroup>

                {validationErrors.length > 0 &&
                    <Alert severity="error" sx={{ mt: 5 }}>
                        <AlertTitle>Validation errors</AlertTitle>
                        <List>
                            {validationErrors.map(error => (
                                <ListItem key={error}>
                                    <ListItemText>{error}</ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </Alert>
                }
            </Container>
        </>
    )
}