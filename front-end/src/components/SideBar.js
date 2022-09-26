import React from "react";
import {
  Drawer,
  ListItem,
  Settings,
  ListItemText,
  Collapse,
  List,
  ListItemIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/material";

function SideBar() {
  const [openCollapse, setOpenCollapse] = React.useState(false);

  function handleOpenSettings() {
    setOpenCollapse(!openCollapse);
  }

  return (
    <div>
      <Drawer>
        <ListItem button onClick={handleOpenSettings}>
          <ListItemIcon></ListItemIcon>
          <ListItemText primary="Settings" />
          {openCollapse ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openCollapse} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button>
              <ListItemIcon></ListItemIcon>
              <ListItemText inset primary="Starred" />
            </ListItem>
          </List>
        </Collapse>
      </Drawer>
    </div>
  );
}

export default SideBar;
