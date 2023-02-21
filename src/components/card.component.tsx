import { FC, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./card.style.scss";

export interface CardProps {
  organizationName: string;
  tracking: {
    internal: number;
    external: number;
    assigned: number;
  };
  protection: {
    internal: number;
    external: number;
    assigned: number;
  };
  onDelete: () => void;
}

const CardComponent: FC<CardProps> = ({
  organizationName,
  tracking,
  protection,
  onDelete,
}) => {
  const totalTracking = tracking.internal + tracking.external;
  const totalProtection = protection.internal + protection.external;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    onDelete();
    handleMenuClose();
  };

  return (
    <Box className="card-container">
      <Card variant="outlined">
        <CardContent>
          <div className="card-header">
            <Typography className="bold-700" variant="h6" component="h6">
              {organizationName}
            </Typography>
            <IconButton aria-label="settings" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
              <MenuItem onClick={handleMenuClose}>Go to Organization</MenuItem>
              <MenuItem onClick={handleDeleteClick}>
                Delete Organization
              </MenuItem>
            </Menu>
          </div>
          <Divider />
          <Typography variant="h6" component="h6">
            Licenses
          </Typography>
          <div className="card-body">
            <div className="left-section">
              <Typography variant="subtitle1" component="p" gutterBottom>
                Tracking
              </Typography>
              <Typography variant="body2" component="p">
                In use:
                <span className="f-color-red">{totalTracking}</span>
              </Typography>
              <Typography variant="body2" component="p">
                Assigned:
                <span>{tracking.assigned}</span>
              </Typography>
            </div>
            <div className="right-section">
              <Typography variant="subtitle1" component="p" gutterBottom>
                Protection
              </Typography>
              <Typography variant="body2" component="p">
                In use:
                <span className="f-color-green">{totalProtection}</span>
              </Typography>
              <Typography variant="body2" component="p">
                Assigned:
                <span>{protection.assigned}</span>
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CardComponent;
