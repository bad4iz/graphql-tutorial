const graphql = require('graphql');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt} = graphql;

const movies = [
  {id: '1', name: 'One', genre: 'Crime', directorId: '1'},
  {id: '2', name: 'two', genre: 'Crime', directorId: '1'},
  {id: 3, name: 'three', genre: 'a', directorId: '2'},
  {id: 4, name: 'four', genre: 'Crime', directorId: '3'},
];

const directors = [
  {id: '1', name: 'super man', age: 44},
  {id: '2', name: 'Michal', age: 4},
  {id: '3', name: 'James ', age: 54},
  {id: '4', name: 'Guy', age: 62},
];

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return directors.find(director => director.id == parent.id);
      }
    }
  })
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
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
    },
    director: {
      type: DirectorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return directors.find(director => director.id == args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: Query,
});
