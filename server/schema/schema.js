const graphql = require('graphql');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID} = graphql;

const movies = [
  {id: '1', name: 'One', genre: 'Crime'},
  {id: '2', name: 'two', genre: 'Crime'},
  {id: 3, name: 'three', genre: 'a'},
  {id: 4, name: 'four', genre: 'Crime'},
]

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
  })
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return movies.find(movie => movie.id == args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: Query,
});
