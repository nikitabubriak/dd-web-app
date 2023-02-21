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

            <Typography gutterBottom variant="h3">
                Digital distribution web app solution architecture
            </Typography>

            <Container sx={{ position: "absolute", bottom: 60 }}>
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