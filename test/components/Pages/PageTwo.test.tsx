import PageTwo from '../../../src/components/Pages//PageTwo'



describe('PageTwo', () => {
  describe('Back button', () => {
      it('renders the next button wrapper and the button', async () => {
        renderApp();
  
        const backButtonWrapper = await screen.findByTestId(
          'back-button-wrapper'
        );
        const backButton = screen.queryByTestId('back-button');
  
        expect(backButtonWrapper).toBeInTheDocument();
        expect(backButton).not.toBeInTheDocument();
      });
    });
});
