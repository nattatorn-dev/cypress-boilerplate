# Cypress

## Example

- Create cypress command `custom-command` like login, logout, waitGraphql request
- Dynamic Environments such as staging, production
- Typescript
- Configurations
- Follow up best practices

## Run

Don't forget to add flag `--env configFile=$environment` to specific configuration.

```bash
npx cypress open --env configFile=staging
```

### Reference

- Recipes  
  <https://github.com/cypress-io/cypress-example-recipes>
- Ppractices  
  <https://docs.cypress.io/guides/references/best-practices>  
  <https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Cypress-Can-Be-Simple-Sometimes>