import { gql } from "@apollo/client";

// Queries
export const ME = gql`
  query Me {
    me {
      username
    }
  }
`;

export const CALL = gql`
  query Call($id: ID!) {
    call(id: $id) {
      id
      direction
      from
      to
      is_archived
      created_at
      call_type
      notes {
        id
        content
      }
    }
  }
`;

export const PAGINATED_CALLS = gql`
  query PaginatedCalls($offset: Float, $limit: Float) {
    paginatedCalls(offset: $offset, limit: $limit) {
      nodes {
        id
        direction
        from
        to
        is_archived
        created_at
        call_type
      }
      totalCount
      hasNextPage
    }
  }
`;

// Mutations
export const ARCHIVE_CALL = gql`
  mutation ArchiveCall($id: ID!) {
    archiveCall(id: $id) {
      id
      is_archived
    }
  }
`;

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      access_token
      refresh_token
      user {
        id
        username
      }
    }
  }
`;
