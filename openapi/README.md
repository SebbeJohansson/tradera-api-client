# Tradera REST contract

`tradera-v4.json` is a normalized copy of Tradera's canonical OpenAPI document:

- Source: https://api.tradera.com/v4/swagger/v4/swagger.json
- API version: `v4-beta`
- OpenAPI version: `3.0.1`

Run `yarn update-contract` to intentionally refresh the contract and regenerate TypeScript types and clients. `client-operations.json` assigns stable public method names and legacy service classes because the upstream contract does not provide `operationId` values. Generation fails if that metadata does not cover every REST v4 operation. Review the contract, operation metadata, and generated diff before committing an update.
