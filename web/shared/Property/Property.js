/* @flow */

import React from 'react';
import { graphql } from 'react-relay';
import { Flex } from '@rebass/grid/emotion';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from '../../controls/link';

import {
  type FragmentRefs,
  createFragment,
  createMutation,
} from '../../controls/relay';

import type { Property_property } from './__generated__/Property_property.graphql';
import type { PropertyUpsertMutation } from './__generated__/PropertyUpsertMutation.graphql';
import MyEnhancedForm from './PropertyForm';

type PropertyData = {|
  lead?: Property_property,
|};

const PropertyFragment = createFragment<PropertyData>(
  graphql`
    fragment Property_property on Property {
      id
      livingSurface
    }
  `
);

const PropertyUpsertLead = createMutation<PropertyUpsertMutation, {}>(graphql`
  mutation PropertyUpsertMutation($input: UpsertPropertyInput!) {
    upsertProperty(input: $input) {
      property {
        id
        livingSurface
      }
    }
  }
`);

type Props = {|
  ...FragmentRefs<PropertyData>,
  step?: string,
|};

export const Property = (props: Props) => {
  return (
    <>
      <PropertyFragment property={props.property}>
        {(/* use { property } to get the query data*/) => (
          <>
            <Flex justifyContent="center">
              <Grid
                container
                spacing={12}
                css={{ maxWidth: 960, marginTop: '25px' }}
              >
                <Grid item xs={12} sm={3}>
                  <Link href={{ pathname: '/properties' }}>
                    <Button
                      to="/properties"
                      color="primary"
                      variant="contained"
                    >
                      Back to List
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Flex>
            <Flex justifyContent="center">
              <Paper
                css={{
                  maxWidth: 960,
                  marginTop: 16,
                  width: '100%',
                  padding: 16,
                }}
              >
                <PropertyUpsertLead>
                  {(/* use { mutate, mutating } to commit changes to the API */) => (
                    <>
                      <Typography variant="h6" css={{ marginBottom: '25px' }}>
                        Property
                      </Typography>
                      <MyEnhancedForm
                        user={{
                          living_surface: '',
                          land_surface: '',
                          number_of_rooms: '',
                          number_of_parkings: '',
                        }}
                      />
                    </>
                  )}
                </PropertyUpsertLead>
              </Paper>
            </Flex>
          </>
        )}
      </PropertyFragment>
    </>
  );
};
