/// <reference types="Cypress" />

context('Actions', () => {
	beforeEach(() => {
		cy.visit('http://localhost:5000');
	});

	it('Should render example1 map with center marker', () => {
    cy.findByText('this is a map base demo').should('exist')
	});
  
  it('Example1 map contains label "中国国家博物馆"', () => {
		cy.get('#example1').contains('中国国家博物馆').should('exist');
	});

	it('Should render example2 map default without center marker', () => {
		cy.get('#example2').contains('this is map point collection demo').should('not.exist');
	});
  
	it('Example2 map should contain copyright control content', () => {
		cy.findByText('山川异域，风月同天。').should('exist');
	});
  
	it('Example2 map should contain copyright control content', () => {
		cy.findByText('寄诸佛子，共结来缘。').should('exist');
	});
});
