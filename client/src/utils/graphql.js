import gql from "graphql-tag";

// graphql CRUD operations for the client (make sure you export each operation)

// Example of a delete operation to delete files
export const DELETE_FILES = gql`
  mutation deleteFiles($where: FileWhere) {
    deleteFiles(where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`;