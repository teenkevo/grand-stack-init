const typeDefs = /* GraphQL */ `

  type TypeDef1 {
    name: String
    typeDef2: TypeDef2 @relationship(type: "HAS_RELATION_TO_TYPEDEF2", direction: OUT)
  }

  type TypeDef2 {
    name: String
  }
`;

module.exports = typeDefs;