/* @flow */

import React from 'react';
import { graphql } from 'react-relay';
import { Flex } from '@rebass/grid/emotion';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import { Link } from '../../controls/link';
import {ConnectionHandler} from 'relay-runtime';
import { type FragmentRefs, createFragment,createMutation } from '../../controls/relay';
import type { Properties_root } from './__generated__/Properties_root.graphql';
import type { PropertyDeleteMutation } from './__generated__/PropertyDeleteMutation.graphql';

type PropertiesData = {|
  root?: Properties_root,
|};

const PropertiesFragment = createFragment<PropertiesData>(
  graphql`
    fragment Properties_root on Query {
      # max GraphQLInt
      properties(first: 2147483647) @connection(key: "Properties_properties"){
        edges {
          node {
            id
            livingSurface
            landSurface
            numberOfRooms
            numberOfParkings
            createdAt
          }
        }
      }
    }
  `
);


const mutation = graphql`
mutation PropertiesDeleteMutation($input: DeletePropertyInput!) {
  deleteProperty(input: $input) {
    deletedPropertyId  
  }
}`

function sharedUpdater(store, user, deletedID) {
  const propertyProxy = store.get('client:root');
  const conn = ConnectionHandler.getConnection(propertyProxy,'Properties_properties');      
  ConnectionHandler.deleteNode(conn,deletedID);
}

const PropertiesDeleteLead = createMutation<PropertiesDeleteMutation, {}>(
  mutation,
  {
    updater: ({ store, input, payload, props }) => {  
      sharedUpdater(store,props,input.propertyId)      
    },
    optimisticUpdater: ({ store, input, props }) => {
      sharedUpdater(store,props,input.propertyId)
    },
  }
  );

type Props = {|
  ...FragmentRefs<PropertyData>,
  step?: string,
|};

export const Properties = (props: Props) => {
  return (
    <>
      <PropertiesFragment root={props.root}>
        {({ root }) => (
          <>
            <Flex justifyContent="center">
              <Grid
                container
                spacing={16}
                css={{ maxWidth: 960, marginTop: '25px' }}
              >
                <Grid item xs={12} sm={3}>
                  <Link href={{ pathname: '/property' }}>
                    <Button to="/property" color="primary" variant="contained">
                      Create New
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Flex>
            <Flex justifyContent="center">
              <Paper css={{ maxWidth: 960, marginTop: 16, width: '100%' }}>
                <Toolbar>
                  <Flex css={{ width: '100%' }}>
                    <Typography variant="h6">Properties</Typography>
                    {/* <div css={{ flex: 1 }} /> */}
                  </Flex>
                </Toolbar>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Living surface</TableCell>
                      <TableCell>Land surface</TableCell>
                      <TableCell>Number Of Rooms</TableCell>
                      <TableCell>Number of parkings</TableCell>
                      <TableCell>Created</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(root.properties.edges || []).map(({ node }) => {
                      return (
                        <TableRow key={node.id}>
                          <TableCell>{node.livingSurface}</TableCell>
                          <TableCell>{node.landSurface}</TableCell>
                          <TableCell>{node.numberOfRooms}</TableCell>
                          <TableCell>{node.numberOfParkings}</TableCell>
                          <TableCell>{node.createdAt}</TableCell>
                          <PropertiesDeleteLead>
                          {({ mutate }) => (
                            <TableCell><DeleteIcon style={{cursor:"pointer"}} onClick={()=>{mutate({ propertyId: node.id });}}/></TableCell>
                          )}
                          </PropertiesDeleteLead>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Paper>
            </Flex>
          </>
        )}
      </PropertiesFragment>
    </>
  );
};
