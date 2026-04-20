export const getByCy = (value: string) => cy.get(`[data-cy="${value}"]`);

export const visitLogin = () => cy.visit("/login");

export {};

