import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
} from 'graphql';

export const fields = {
  id: { type: GraphQLID },
  livingSurface: { type: GraphQLFloat },
  landSurface: { type: GraphQLFloat },
  numberOfRooms: { type: GraphQLFloat },
  numberOfParkings: { type: GraphQLInt },
  createdAt: { type: GraphQLString },
};

export const PropertyInputType = new GraphQLInputObjectType({
  name: 'PropertyInput',
  fields,
});
