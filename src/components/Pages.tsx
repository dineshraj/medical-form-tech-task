import PageOne from './Pages/PageOne';
import '../styles/Pages.css';

const Page = () => {
  return (
    <div className="page-container" data-testid="page-container">
      <PageOne />
    </div>
  );
};

export default Page;
