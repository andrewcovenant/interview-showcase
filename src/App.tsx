import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Box,
  Typography,
  TextField,
  Divider,
} from "@mui/material";
import "./App.scss";
import CardComponent from "./components/card.component";

type TrackingData = {
  internal: number;
  external: number;
  assigned: number;
};

type Organization = {
  name: string;
  id: string;
  tracking: TrackingData;
  protection: TrackingData;
};

type OrganizationsData = {
  organizations: Organization[];
};

function App() {
  const [allOrganizations, setAllOrganizations] = useState<Organization[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./data.json");
        const data: OrganizationsData = await response.json();
        setAllOrganizations(data.organizations);
        setOrganizations(data.organizations);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const addOrganization = () => {
    const newOrganization: Organization = {
      name: "Organization " + generateId().toString(),
      id: generateId(),
      tracking: {
        internal: 0,
        external: 0,
        assigned: 0,
      },
      protection: {
        internal: 0,
        external: 0,
        assigned: 0,
      },
    };
    setAllOrganizations([...allOrganizations, newOrganization]);
    setOrganizations([...allOrganizations, newOrganization]);
  };

  const searchOrganization = (searchInput: string) => {
    const filteredOrgs = allOrganizations.filter((org) =>
      org.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setOrganizations(filteredOrgs);
  };

  const deleteOrganization = (organizationId: number) => {
    const updatedOrganizations = organizations.filter(
      (org) => org.id !== organizationId
    );
    setOrganizations(updatedOrganizations);
    setAllOrganizations(updatedOrganizations);
  };

  //we can use a uuid package but I'm using a combination of timestamp and random number
  const generateId = () => {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${randomStr}`;
  };

  return (
    <div className="App">
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: "background.paper", p: 2 }}>
          <div className="app-header">
            <div className="left-header">
              <Typography variant="h6" component="h6" className="pad-right-20">
                All organizations ({allOrganizations.length})
              </Typography>
              <TextField
                id="outlined-basic"
                label="Search organization"
                variant="outlined"
                size="small"
                onChange={(e) => searchOrganization(e.target.value)}
              />
            </div>
            <div className="right-header">
              <Button variant="contained" onClick={() => addOrganization()}>
                Add New Organization
              </Button>
            </div>
          </div>
          <Divider />
          <Box className="cards-container">
            {organizations.map((org) => {
              return (
                <CardComponent
                  key={org.id}
                  organizationName={org.name}
                  tracking={org.tracking}
                  protection={org.protection}
                  onDelete={() => deleteOrganization(org.id)}
                />
              );
            })}
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default App;
