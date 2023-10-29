import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('before:run', () => {
        cy.task('connectToDatabase', { dbName: 'seminario' }).then(() => {
          // Carga datos de prueba en la base de datos
          cy.task('loadTestData').then(() => {
            cy.log('Base de datos de prueba configurada y datos cargados.');
          });
        });
      });
    },
  },

  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
  },
});
