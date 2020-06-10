import React, { useEffect } from 'react';
import clsx from 'clsx';


import { Paper, List, ListItemText, ListItem, Divider, Typography, CssBaseline, Drawer, makeStyles, useTheme } from '@material-ui/core'

import { Route, Link, useRouteMatch, useParams } from 'react-router-dom'

import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import LabelIcon from '@material-ui/icons/Label';
import StorageRoundedIcon from '@material-ui/icons/StorageRounded';

import ListItemIcon from '@material-ui/core/ListItemIcon';



import ProjectHomeDefault from './project/project-home-default/projecthomedefault'
import DatasetComponent from './dataset/dataset';
import LabelsComponent from './labels/labels';


import { getProject } from './project/projectAction'

import { useSelector, useDispatch } from 'react-redux';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginBottom: theme.spacing(2),
    margin: theme.spacing(1),
    height: '100%',
    marginTop: '72px'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    top: '65px'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '600px',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));


export default function SideNavLayout() {

  let { path, url } = useRouteMatch();
  let params = useParams();
  const sideNavFlag = useSelector((state) => state.headerReducer.drawer);
  const selectedProject = useSelector((state) => state.projectReducer.selectedproject);

  const dispatch = useDispatch();
  let getProjectAction = (id) => dispatch(getProject(id));

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!selectedProject) {
      getProjectAction(params.projectId)
    }
  })


  const sideNavList = [{
    'name': 'Home',
    'icon': HomeIcon,
    'path': ''
  },
  {
    'name': 'Dataset',
    'icon': StorageRoundedIcon,
    'path': 'dataset'
  },
  {
    'name': 'Labels',
    'icon': LabelIcon,
    'path': 'labels'
  },
  {
    'name': 'Guidelines',
    'icon': MenuBookIcon,
    'path': 'guidelines'
  },
  {
    'name': 'Statistics',
    'icon': EqualizerIcon,
    'path': 'stats'
  }
  ]

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={sideNavFlag}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Divider />


        <List>
          {sideNavList.map((text, index) => (
            <Link to={`${url}/${text.path}`}>
              <ListItem button key={text.name}>
                <ListItemIcon><text.icon></text.icon></ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItem>
            </Link>
          ))}
        </List>


        <Divider />
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: sideNavFlag,
        })}
      >



        <Paper className={classes.paper}>
          <Route exact path={`${path}`}>

            <ProjectHomeDefault></ProjectHomeDefault>
          </Route>
          <Route path={`${path}/dataset`}>
            <DatasetComponent></DatasetComponent>
          </Route>
          <Route path={`${path}/labels`}>
            <LabelsComponent></LabelsComponent>
          </Route>
        </Paper>

      </main>
    </div>
  );
}
